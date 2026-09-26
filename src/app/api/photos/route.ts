import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DEFAULT_WEBSITE_PHOTOS } from "@/lib/constants/photos";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("website_photos")
        .select("*")
        .order("page", { ascending: true });

      if (!error && data && data.length > 0) {
        const photoMap: Record<string, string> = {};
        const items = data.map((item: any) => {
          photoMap[item.key] = item.url;
          return {
            key: item.key,
            page: item.page,
            title: item.title,
            section: item.section,
            url: item.url,
            defaultUrl: item.default_url,
            alt: item.alt,
            updatedAt: item.updated_at
          };
        });

        return NextResponse.json({
          success: true,
          photoMap,
          items
        });
      }
    }
  } catch (err) {
    console.warn("[API/Photos] Supabase query failed, returning fallback defaults:", err);
  }

  // Fallback defaults
  const photoMap: Record<string, string> = {};
  const items = Object.entries(DEFAULT_WEBSITE_PHOTOS).map(([key, val]) => {
    photoMap[key] = val.url;
    return {
      key,
      page: val.page,
      title: val.title,
      section: val.section,
      url: val.url,
      defaultUrl: val.url,
      alt: val.title,
      updatedAt: new Date().toISOString()
    };
  });

  return NextResponse.json({
    success: true,
    photoMap,
    items
  });
}
