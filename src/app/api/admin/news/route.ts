import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { NEWS_STORIES } from "@/lib/data/news";

export const dynamic = "force-dynamic";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// 1. GET ALL NEWS (FOR ADMIN DASHBOARD)
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("[Admin News GET] Supabase table query error, fallback to static:", error.message);
      // Return static news mapped so admin still sees default records
      const fallbackList = NEWS_STORIES.map((s, idx) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        category: s.category,
        excerpt: s.excerpt,
        content: s.content,
        date: s.date,
        read_time: s.readTime,
        author_name: s.author.name,
        author_role: s.author.role,
        image: s.image,
        featured: Boolean(s.featured),
        status: "published",
        created_at: new Date(Date.now() - idx * 86400000).toISOString(),
      }));
      return NextResponse.json({
        success: true,
        source: "fallback",
        news: fallbackList,
        message: "Notice: Please run the SQL migration query in Supabase to enable full database persistence.",
      });
    }

    return NextResponse.json({
      success: true,
      source: "supabase",
      news: data || [],
    });
  } catch (err: any) {
    console.error("[Admin News GET] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load news" },
      { status: 500 }
    );
  }
}

// 2. CREATE NEW ARTICLE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      category = "General",
      excerpt,
      content,
      date,
      read_time = "3 min read",
      author_name = "DAV Editorial Board",
      author_role = "Dr. MRS Bhalla DAV School Qila Mandi",
      image = "/images/school-building.png",
      featured = false,
      status = "published",
    } = body;

    if (!title || !excerpt) {
      return NextResponse.json(
        { success: false, error: "Title and Excerpt are required fields." },
        { status: 400 }
      );
    }

    const baseSlug = generateSlug(title);
    const uniqueSlug = `${baseSlug}-${Date.now().toString(36)}`;

    const contentArray = Array.isArray(content)
      ? content
      : typeof content === "string"
      ? content.split("\n\n").map((p: string) => p.trim()).filter(Boolean)
      : [excerpt];

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("news")
      .insert({
        title,
        slug: uniqueSlug,
        category,
        excerpt,
        content: contentArray,
        date: date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        read_time,
        author_name,
        author_role,
        image,
        featured: Boolean(featured),
        status,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("[Admin News POST] Insert error:", error);
      return NextResponse.json(
        {
          success: false,
          error: `${error.message}. Please make sure you have run the '002_create_news_cms_tables.sql' in your Supabase SQL Editor.`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      news: data,
      message: "Article published successfully!",
    });
  } catch (err: any) {
    console.error("[Admin News POST] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create article" },
      { status: 500 }
    );
  }
}

// 3. UPDATE ARTICLE
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Article ID is required." },
        { status: 400 }
      );
    }

    if (updates.content && typeof updates.content === "string") {
      updates.content = updates.content
        .split("\n\n")
        .map((p: string) => p.trim())
        .filter(Boolean);
    }

    updates.updated_at = new Date().toISOString();

    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("news")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Admin News PUT] Update error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      news: data,
      message: "Article updated successfully!",
    });
  } catch (err: any) {
    console.error("[Admin News PUT] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update article" },
      { status: 500 }
    );
  }
}

// 4. DELETE ARTICLE
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Article ID is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("news").delete().eq("id", id);

    if (error) {
      console.error("[Admin News DELETE] Delete error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (err: any) {
    console.error("[Admin News DELETE] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to delete article" },
      { status: 500 }
    );
  }
}
