import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { validateAdminRequest } from "@/lib/security/adminAuth";
import { optimizeImage, validateMagicBytes, isOptimizableImage, formatFileSize } from "@/lib/imageOptimize";
import { checkRateLimit, getClientIp } from "@/lib/security/rateLimit";
import { logAdminAction, getAdminEmail } from "@/lib/security/auditLog";

export const dynamic = "force-dynamic";

const BUCKET_NAME = "website-photos";
const MAX_INPUT_SIZE_MB = 20;  // Accept up to 20 MB input
const MAX_OUTPUT_SIZE_MB = 5;  // Reject if still >5 MB after optimization

export async function POST(req: NextRequest) {
  try {
    // 1. Auth
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) return authResult.response!;

    // 2. Rate limit — max 30 uploads per admin per 10 minutes
    const ip = getClientIp(req);
    const rateLimit = checkRateLimit(`upload:${ip}`, 30, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Upload rate limit exceeded. Please wait." }, { status: 429 });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const photoKey = formData.get("key") as string | null;

    // 3. File presence
    if (!file) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    // 4. MIME type whitelist (no SVG, no GIF for website photos)
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only safe image files (JPEG, PNG, WEBP) are permitted. SVG and GIF are not allowed." },
        { status: 400 }
      );
    }

    // 5. Input size limit
    if (file.size > MAX_INPUT_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `File exceeds maximum allowed size of ${MAX_INPUT_SIZE_MB}MB.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // 6. Magic byte validation — prevents disguised HTML/SVG attacks
    const magicValid = validateMagicBytes(inputBuffer, file.type);
    if (!magicValid) {
      return NextResponse.json(
        { error: "File content does not match declared type. Upload rejected for security." },
        { status: 400 }
      );
    }

    // 7. Optimize: convert to WebP, resize to max 1920px, strip EXIF
    let uploadBuffer: Buffer;
    let uploadMimeType: string;
    let uploadExtension: string;
    let originalSize = inputBuffer.length;
    let optimizedSize: number;
    let width: number;
    let height: number;

    try {
      const result = await optimizeImage(inputBuffer, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 82,
        format: "webp",
        stripMetadata: true,
      });

      // Safety: if the optimized output is still too large, reject
      if (result.optimizedSize > MAX_OUTPUT_SIZE_MB * 1024 * 1024) {
        return NextResponse.json(
          { error: `Optimized image still exceeds ${MAX_OUTPUT_SIZE_MB}MB. Please use a smaller or simpler image.` },
          { status: 400 }
        );
      }

      uploadBuffer = result.buffer;
      uploadMimeType = result.mimeType;
      uploadExtension = result.extension;
      optimizedSize = result.optimizedSize;
      width = result.width;
      height = result.height;
    } catch (sharpErr: any) {
      console.error("[Photo Upload] Image optimization failed:", sharpErr.message);
      return NextResponse.json(
        { error: "Image processing failed. The file may be corrupted or unsupported." },
        { status: 400 }
      );
    }

    // 8. Build safe filename
    const prefix = photoKey ? photoKey.replace(/[^a-zA-Z0-9_-]/g, "") : "photo";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const filename = `${prefix}_${timestamp}_${random}.${uploadExtension}`;

    // 9. Ensure bucket exists and upload
    try {
      await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    } catch {
      // Bucket already exists — fine
    }

    const uploadResult = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, uploadBuffer, {
        contentType: uploadMimeType,
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadResult.error) {
      console.error("[Photo Upload] Storage upload error:", uploadResult.error);
      return NextResponse.json(
        { error: `Storage upload failed: ${uploadResult.error.message}` },
        { status: 500 }
      );
    }

    // 10. Get public CDN URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;

    // 11. Update website_photos record if photoKey provided
    if (photoKey) {
      await supabase
        .from("website_photos")
        .update({
          url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("key", photoKey);
    }

    const savedPercent = originalSize > 0
      ? Math.round((1 - optimizedSize / originalSize) * 100)
      : 0;

    await logAdminAction({
      action: "photo_upload",
      adminEmail: getAdminEmail(authResult.user),
      ip: getClientIp(req),
      details: { key: photoKey, filename, originalSize, optimizedSize, savedPercent },
    });

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      key: photoKey,
      optimization: {
        originalSize: formatFileSize(originalSize),
        optimizedSize: formatFileSize(optimizedSize),
        savedPercent: `${savedPercent}%`,
        format: uploadExtension.toUpperCase(),
        dimensions: `${width}×${height}px`,
      },
    });
  } catch (err: any) {
    console.error("[Photo Upload Exception]:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
