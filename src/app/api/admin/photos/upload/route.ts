import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { validateAdminRequest } from "@/lib/security/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const photoKey = formData.get("key") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    // Strict raster image MIME types (disallowing SVG to prevent embedded script attacks)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only safe image files (JPEG, PNG, WEBP) are permitted" }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds maximum size of 10MB" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp"].includes(ext) ? ext : "jpg";
    const prefix = photoKey ? photoKey.replace(/[^a-zA-Z0-9_-]/g, "") : "photo";
    const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${safeExt}`;

    const BUCKET_NAME = "website-photos";

    // Attempt upload to website-photos bucket
    let uploadResult = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    // If bucket doesn't exist, try creating it or fallback to news-images
    if (uploadResult.error && (uploadResult.error.message.includes("Bucket not found") || uploadResult.error.message.includes("not found"))) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: true });
      uploadResult = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadResult.error) {
        // Fallback to existing news-images bucket
        uploadResult = await supabase.storage
          .from("news-images")
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });
      }
    }

    if (uploadResult.error) {
      console.error("[Storage Upload Error]:", uploadResult.error);
      return NextResponse.json({ error: `Storage upload failed: ${uploadResult.error.message}` }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    const publicUrl = publicUrlData.publicUrl;

    // If a photoKey was passed, update the table right away
    if (photoKey) {
      await supabase
        .from("website_photos")
        .update({
          url: publicUrl,
          updated_at: new Date().toISOString()
        })
        .eq("key", photoKey);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      key: photoKey
    });
  } catch (err: any) {
    console.error("[Photo Upload Exception]:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
