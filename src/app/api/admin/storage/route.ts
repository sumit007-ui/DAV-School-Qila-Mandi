import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { validateAdminRequest } from "@/lib/security/adminAuth";

export const dynamic = "force-dynamic";

const KNOWN_BUCKETS = [
  { id: "website-photos", name: "Website Photos", description: "Banners, hero images, and layout media" },
  { id: "news-images", name: "News & Dispatches", description: "News stories, notices, and press releases" },
  { id: "gallery-media", name: "Gallery & Events", description: "Campus albums, annual day, and sports meet" },
  { id: "avatars", name: "Avatars & Portraits", description: "Leadership, faculty, and student topper photos" }
];

// GET: List files in a bucket
export async function GET(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const bucket = searchParams.get("bucket") || "website-photos";
    const folder = searchParams.get("folder") || "";

    // Ensure bucket exists in Supabase
    try {
      await supabase.storage.createBucket(bucket, { public: true });
    } catch {
      // Ignore if bucket already exists
    }

    // List files
    const { data: fileList, error: listError } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" }
      });

    if (listError) {
      console.warn(`[Storage API] Error listing bucket ${bucket}:`, listError.message);
      return NextResponse.json({
        success: true,
        bucket,
        buckets: KNOWN_BUCKETS,
        files: [],
        notice: listError.message
      });
    }

    // Filter out .emptyFolderPlaceholder and map with public URLs
    const files = (fileList || [])
      .filter((item: any) => item.name && !item.name.startsWith("."))
      .map((item: any) => {
        const filePath = folder ? `${folder}/${item.name}` : item.name;
        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath);

        return {
          id: item.id || item.name,
          name: item.name,
          path: filePath,
          size: item.metadata?.size || 0,
          mimetype: item.metadata?.mimetype || "image/jpeg",
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at || item.created_at || new Date().toISOString(),
          publicUrl: publicData.publicUrl
        };
      });

    return NextResponse.json({
      success: true,
      bucket,
      buckets: KNOWN_BUCKETS,
      files,
      count: files.length
    });
  } catch (err: any) {
    console.error("[Storage GET Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch storage items" }, { status: 500 });
  }
}

// POST: Upload file into selected bucket
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
    const bucket = (formData.get("bucket") as string) || "website-photos";
    const customName = formData.get("customName") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided for upload" }, { status: 400 });
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({
        error: "Only image files (JPEG, PNG, WEBP, GIF) and PDF documents are allowed"
      }, { status: 400 });
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 15MB size limit" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "pdf"].includes(ext) ? ext : "jpg";
    
    // Sanitize filename
    const baseName = customName 
      ? customName.replace(/[^a-zA-Z0-9_-]/g, "_")
      : file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
      
    const filename = `${baseName}_${Date.now()}.${safeExt}`;

    // Ensure bucket exists
    try {
      await supabase.storage.createBucket(bucket, { public: true });
    } catch {
      // Ignore if exists
    }

    const uploadRes = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (uploadRes.error) {
      console.error("[Storage Upload Error]:", uploadRes.error.message);
      return NextResponse.json({ error: uploadRes.error.message }, { status: 500 });
    }

    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    const publicUrl = publicData.publicUrl;

    // Optional: Log to media_assets table if it exists
    try {
      await supabase.from("media_assets").insert({
        filename,
        storage_bucket: bucket,
        storage_path: filename,
        public_url: publicUrl,
        mime_type: file.type,
        file_size: file.size,
        title: baseName
      });
    } catch {
      // Table may not yet be initialized
    }

    return NextResponse.json({
      success: true,
      bucket,
      filename,
      publicUrl,
      size: file.size,
      mimetype: file.type
    });
  } catch (err: any) {
    console.error("[Storage POST Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to upload file" }, { status: 500 });
  }
}

// DELETE: Remove file from selected bucket
export async function DELETE(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const bucket = searchParams.get("bucket") || "website-photos";
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "Filename is required for deletion" }, { status: 400 });
    }

    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove([filename]);

    if (removeError) {
      console.error("[Storage Delete Error]:", removeError.message);
      return NextResponse.json({ error: removeError.message }, { status: 500 });
    }

    // Optional: remove from media_assets table
    try {
      await supabase.from("media_assets").delete().eq("storage_path", filename);
    } catch {
      // Ignore
    }

    return NextResponse.json({
      success: true,
      bucket,
      deleted: filename
    });
  } catch (err: any) {
    console.error("[Storage DELETE Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to delete file" }, { status: 500 });
  }
}
