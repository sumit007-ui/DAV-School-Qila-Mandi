import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEFAULT_TOPPERS, AcademicTopper } from "@/lib/constants/toppers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default" });
    }

    const { data, error } = await supabase
      .from("academic_toppers")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("year", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) {
        console.warn("[Toppers Public API] Supabase query notice:", error.message);
      }
      return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default" });
    }

    return NextResponse.json({
      toppers: data as AcademicTopper[],
      source: "database"
    });
  } catch (err: any) {
    console.error("[Toppers Public API Exception]:", err);
    return NextResponse.json({ toppers: DEFAULT_TOPPERS, source: "default" });
  }
}
