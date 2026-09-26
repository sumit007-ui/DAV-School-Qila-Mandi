import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { NEWS_STORIES } from "@/lib/data/news";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      // Fallback to static NEWS_STORIES if table doesn't exist yet or is empty
      return NextResponse.json({
        success: true,
        source: "fallback",
        news: NEWS_STORIES,
      });
    }

    const formattedNews = data.map((item: any) => ({
      id: item.id,
      slug: item.slug || item.id,
      title: item.title,
      category: item.category || "General",
      date: item.date,
      readTime: item.read_time || "3 min read",
      excerpt: item.excerpt,
      content: Array.isArray(item.content) ? item.content : [item.excerpt],
      author: {
        name: item.author_name || "DAV Editorial Board",
        role: item.author_role || "Dr. MRS Bhalla DAV School Qila Mandi",
      },
      image: item.image || "/images/school-building.png",
      featured: Boolean(item.featured),
    }));

    return NextResponse.json({
      success: true,
      source: "supabase",
      news: formattedNews,
    });
  } catch (err: any) {
    console.error("[API News GET] Error:", err);
    return NextResponse.json({
      success: true,
      source: "fallback",
      news: NEWS_STORIES,
    });
  }
}
