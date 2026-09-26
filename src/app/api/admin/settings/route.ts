import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SCHOOL_CONFIG } from "@/config/school";
import { validateAdminRequest } from "@/lib/security/adminAuth";
import { sanitizeString } from "@/lib/security/sanitize";

export const dynamic = "force-dynamic";

export async function GET() {
  const currentYear = new Date().getFullYear();
  const defaultEstablishedYear = SCHOOL_CONFIG.establishedYear || 1990;

  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const { data, error } = await supabase
      .from("school_settings")
      .select("*")
      .eq("id", "default")
      .single();

    if (error && error.code !== "PGRST116") {
      console.warn("[Admin Settings] Fetch error:", error.message);
    }

    const estYear = data?.established_year || defaultEstablishedYear;
    const calcYears = Math.max(1, currentYear - estYear);
    const finalYears = data?.years_override ? Number(data.years_override) : calcYears;

    return NextResponse.json({
      success: true,
      settings: {
        schoolName: data?.school_name || SCHOOL_CONFIG.name,
        subName: data?.sub_name || SCHOOL_CONFIG.subName,
        establishedYear: estYear,
        yearsOverride: data?.years_override ?? null,
        yearsCount: finalYears,
        calculatedYears: calcYears,
        officeHours: data?.office_hours || SCHOOL_CONFIG.contact.officeHours,
        primaryPhone: data?.primary_phone || SCHOOL_CONFIG.contact.primaryPhone,
        receptionPhone: data?.reception_phone || SCHOOL_CONFIG.contact.receptionPhone,
        officePhone: data?.office_phone || SCHOOL_CONFIG.contact.officePhone,
        email: data?.email || SCHOOL_CONFIG.contact.email,
        address: data?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
        googleMapsUrl: data?.google_maps_url || SCHOOL_CONFIG.address.googleMapsUrl,
        youtubeUrl: data?.youtube_url || SCHOOL_CONFIG.links.youtube,
        facebookUrl: data?.facebook_url || SCHOOL_CONFIG.links.facebook,
        instagramUrl: data?.instagram_url || SCHOOL_CONFIG.links.instagram,
        heroBadgeText: data?.hero_badge_text || SCHOOL_CONFIG.hero.badgeText,
        heroTitleLine1: data?.hero_title_line1 || SCHOOL_CONFIG.hero.titleLine1,
        heroTitleLine2: data?.hero_title_line2 || SCHOOL_CONFIG.hero.titleLine2,
        heroDescription: data?.hero_description || SCHOOL_CONFIG.hero.description,
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Enforce administrative authorization
    const authResult = await validateAdminRequest(req);
    if (!authResult.authorized) {
      return authResult.response!;
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not initialized" }, { status: 500 });
    }

    const body = await req.json();
    const {
      schoolName,
      subName,
      establishedYear,
      yearsOverride,
      officeHours,
      receptionPhone,
      officePhone,
      email,
      address,
      googleMapsUrl,
      youtubeUrl,
      facebookUrl,
      instagramUrl,
      heroBadgeText,
      heroTitleLine1,
      heroTitleLine2,
      heroDescription
    } = body;

    const payload: Record<string, any> = {
      id: "default",
      school_name: sanitizeString(schoolName) || SCHOOL_CONFIG.name,
      sub_name: sanitizeString(subName) || SCHOOL_CONFIG.subName,
      established_year: establishedYear ? Number(establishedYear) : (SCHOOL_CONFIG.establishedYear || 1990),
      years_override: yearsOverride !== undefined && yearsOverride !== "" && yearsOverride !== null ? Number(yearsOverride) : null,
      office_hours: sanitizeString(officeHours) || SCHOOL_CONFIG.contact.officeHours,
      reception_phone: sanitizeString(receptionPhone) || SCHOOL_CONFIG.contact.receptionPhone,
      office_phone: sanitizeString(officePhone) || SCHOOL_CONFIG.contact.officePhone,
      primary_phone: sanitizeString(receptionPhone) || SCHOOL_CONFIG.contact.primaryPhone,
      email: sanitizeString(email) || SCHOOL_CONFIG.contact.email,
      address: sanitizeString(address) || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
      google_maps_url: sanitizeString(googleMapsUrl) || SCHOOL_CONFIG.address.googleMapsUrl,
      youtube_url: sanitizeString(youtubeUrl) || SCHOOL_CONFIG.links.youtube,
      facebook_url: sanitizeString(facebookUrl) || SCHOOL_CONFIG.links.facebook,
      instagram_url: sanitizeString(instagramUrl) || SCHOOL_CONFIG.links.instagram,
      hero_badge_text: heroBadgeText !== undefined ? sanitizeString(heroBadgeText) : SCHOOL_CONFIG.hero.badgeText,
      hero_title_line1: heroTitleLine1 !== undefined ? sanitizeString(heroTitleLine1) : SCHOOL_CONFIG.hero.titleLine1,
      hero_title_line2: heroTitleLine2 !== undefined ? sanitizeString(heroTitleLine2) : SCHOOL_CONFIG.hero.titleLine2,
      hero_description: heroDescription !== undefined ? sanitizeString(heroDescription) : SCHOOL_CONFIG.hero.description,
      updated_at: new Date().toISOString()
    };

    let { data, error } = await supabase
      .from("school_settings")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      // If error is due to missing hero columns, fallback to base payload
      if (error.message?.includes("column") || error.code === "42703") {
        const basePayload = { ...payload };
        delete basePayload.hero_badge_text;
        delete basePayload.hero_title_line1;
        delete basePayload.hero_title_line2;
        delete basePayload.hero_description;

        const fallbackResult = await supabase
          .from("school_settings")
          .upsert(basePayload, { onConflict: "id" })
          .select()
          .single();

        if (!fallbackResult.error) {
          return NextResponse.json({
            success: true,
            warning: "Settings saved, but hero columns do not exist in database yet. Please run migration 006 in Supabase SQL editor.",
            message: "School settings updated successfully",
            settings: fallbackResult.data
          });
        }
      }

      console.error("[Admin Settings Save Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "School settings updated successfully",
      settings: data
    });
  } catch (err: any) {
    console.error("[Admin Settings Save Exception]:", err);
    return NextResponse.json({ error: err.message || "Failed to update settings" }, { status: 500 });
  }
}
