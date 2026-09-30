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

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    // Check size limit: 25MB
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds 25MB size limit." },
        { status: 400 }
      );
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a JPEG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `news-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const supabase = getSupabaseServerClient();
    const bucketName = "news-images";

    // Attempt upload to Supabase storage bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("[Storage Upload Error]:", uploadError);

      // If bucket does not exist, return a helpful message
      if (uploadError.message?.toLowerCase().includes("bucket not found") || (uploadError as any).statusCode === "404") {
        return NextResponse.json(
          {
            success: false,
            error: `Storage bucket '${bucketName}' not found. Please run the SQL migration script (supabase/migrations/002_create_news_cms_tables.sql) in your Supabase dashboard SQL editor to create the bucket and storage policies.`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName,
      message: "Image uploaded to bucket successfully!",
    });
  } catch (err: any) {
    console.error("[Admin Image Upload POST] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
