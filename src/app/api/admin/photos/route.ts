import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEFAULT_WEBSITE_PHOTOS } from "@/lib/constants/photos";
import { validateAdminRequest } from "@/lib/security/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("website_photos")
      .select("*")
      .order("page", { ascending: true });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ success: true, items: data });
    }

    // If table exists but empty, or table doesn't exist yet, return defaults
    const defaultItems = Object.entries(DEFAULT_WEBSITE_PHOTOS).map(([key, val]) => ({
      key,
      page: val.page,
      title: val.title,
      section: val.section,
      url: val.url,
      default_url: val.url,
      alt: val.title,
      updated_at: new Date().toISOString()
    }));

    return NextResponse.json({ success: true, items: defaultItems });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch photos" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const body = await req.json();
    const { key, url, reset } = body;

    if (!key) {
      return NextResponse.json({ error: "Photo key is required" }, { status: 400 });
    }

    let targetUrl = url;

    // If reset is true, restore default_url
    if (reset) {
      const defaultEntry = DEFAULT_WEBSITE_PHOTOS[key];
      targetUrl = defaultEntry ? defaultEntry.url : url;
    }

    const { data, error } = await supabase
      .from("website_photos")
      .update({
        url: targetUrl,
        updated_at: new Date().toISOString()
      })
      .eq("key", key)
      .select()
      .single();

    if (error) {
      // If record doesn't exist yet, upsert it
      const defaultEntry = DEFAULT_WEBSITE_PHOTOS[key];
      const upsertPayload = {
        key,
        page: defaultEntry?.page || "General",
        title: defaultEntry?.title || key,
        section: defaultEntry?.section || "General",
        url: targetUrl,
        default_url: defaultEntry?.url || targetUrl,
        updated_at: new Date().toISOString()
      };

      const { data: upsertData, error: upsertErr } = await supabase
        .from("website_photos")
        .upsert(upsertPayload, { onConflict: "key" })
        .select()
        .single();

      if (upsertErr) {
        return NextResponse.json({ error: upsertErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, item: upsertData });
    }

    return NextResponse.json({ success: true, item: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update photo" }, { status: 500 });
  }
}
