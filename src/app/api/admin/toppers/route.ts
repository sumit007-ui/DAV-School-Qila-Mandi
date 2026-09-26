import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { validateAdminRequest } from "@/lib/security/adminAuth";
import { sanitizeString } from "@/lib/security/sanitize";
import { DEFAULT_TOPPERS, AcademicTopper } from "@/lib/constants/toppers";

export const dynamic = "force-dynamic";

// GET all toppers for Admin CMS
export async function GET(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default" });
    }

    const { data, error } = await supabase
      .from("academic_toppers")
      .select("*")
      .order("display_order", { ascending: true })
      .order("year", { ascending: false });

    if (error) {
      console.warn("[Admin Toppers GET] Database query notice:", error.message);
      return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default", error: error.message });
    }

    // If table exists but is empty, seed defaults
    if (!data || data.length === 0) {
      return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default" });
    }

    return NextResponse.json({ toppers: data as AcademicTopper[], source: "database" });
  } catch (err: any) {
    console.error("[Admin Toppers GET Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch toppers" }, { status: 500 });
  }
}

// POST create new topper
export async function POST(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
    }

    const body = await req.json();
    const name = sanitizeString(body.name || "");
    const score = sanitizeString(body.score || "");
    const exam = sanitizeString(body.exam || "PSEB Class 10 Board");
    const year = sanitizeString(body.year || new Date().getFullYear().toString());
    const rank = sanitizeString(body.rank || "");
    const badge_text = sanitizeString(body.badge_text || "DISTINCTION MERIT");
    const distinctions = sanitizeString(body.distinctions || "");
    const testimonial = sanitizeString(body.testimonial || "");
    const parent_info = sanitizeString(body.parent_info || "");
    const image_url = sanitizeString(body.image_url || "/images/secondary-school.jpg");
    const display_order = typeof body.display_order === "number" ? body.display_order : 1;
    const is_active = body.is_active !== undefined ? Boolean(body.is_active) : true;

    if (!name || !score) {
      return NextResponse.json({ error: "Student name and score percentage are required" }, { status: 400 });
    }

    const newRecord = {
      name,
      score,
      exam,
      year,
      rank,
      badge_text,
      distinctions,
      testimonial,
      parent_info,
      image_url,
      display_order,
      is_active,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("academic_toppers")
      .insert(newRecord)
      .select()
      .single();

    if (error) {
      console.error("[Admin Toppers POST] Insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, topper: data });
  } catch (err: any) {
    console.error("[Admin Toppers POST Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to create topper" }, { status: 500 });
  }
}

// PUT update existing topper
export async function PUT(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
    }

    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ error: "Topper ID is required" }, { status: 400 });
    }

    const updates: Partial<AcademicTopper> = {
      updated_at: new Date().toISOString()
    };

    if (body.name !== undefined) updates.name = sanitizeString(body.name);
    if (body.score !== undefined) updates.score = sanitizeString(body.score);
    if (body.exam !== undefined) updates.exam = sanitizeString(body.exam);
    if (body.year !== undefined) updates.year = sanitizeString(body.year);
    if (body.rank !== undefined) updates.rank = sanitizeString(body.rank);
    if (body.badge_text !== undefined) updates.badge_text = sanitizeString(body.badge_text);
    if (body.distinctions !== undefined) updates.distinctions = sanitizeString(body.distinctions);
    if (body.testimonial !== undefined) updates.testimonial = sanitizeString(body.testimonial);
    if (body.parent_info !== undefined) updates.parent_info = sanitizeString(body.parent_info);
    if (body.image_url !== undefined) updates.image_url = sanitizeString(body.image_url);
    if (body.display_order !== undefined) updates.display_order = Number(body.display_order);
    if (body.is_active !== undefined) updates.is_active = Boolean(body.is_active);

    const { data, error } = await supabase
      .from("academic_toppers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Admin Toppers PUT] Update error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, topper: data });
  } catch (err: any) {
    console.error("[Admin Toppers PUT Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to update topper" }, { status: 500 });
  }
}

// DELETE topper
export async function DELETE(req: NextRequest) {
  try {
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Topper ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("academic_toppers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Admin Toppers DELETE] Delete error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error("[Admin Toppers DELETE Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to delete topper" }, { status: 500 });
  }
}
