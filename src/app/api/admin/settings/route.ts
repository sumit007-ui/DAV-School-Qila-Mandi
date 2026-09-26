import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SCHOOL_CONFIG } from "@/config/school";
import { validateAdminRequest } from "@/lib/security/adminAuth";
import { sanitizeString } from "@/lib/security/sanitize";
import { logAdminAction, getAdminEmail } from "@/lib/security/auditLog";
import { getClientIp } from "@/lib/security/rateLimit";

export const dynamic = "force-dynamic";

export async function GET() {
  const currentYear = new Date().getFullYear();
  const defaultEstablishedYear = SCHOOL_CONFIG.establishedYear || 1990;

  try {
    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase client not available" }, { status: 500 });
    }

    const [settingsRes, principalRes] = await Promise.all([
      supabase.from("school_settings").select("*").eq("id", "default").single(),
      supabase.from("leadership_messages").select("*").eq("role", "principal").single(),
    ]);

    const data = settingsRes.data;
    const principalData = principalRes.data;

    const estYear = data?.established_year || defaultEstablishedYear;
    const calcYears = Math.max(1, currentYear - estYear);
    const finalYears = data?.years_override ? Number(data.years_override) : calcYears;

    const fullMsgArray = Array.isArray(principalData?.full_message) && principalData.full_message.length > 0
      ? principalData.full_message
      : SCHOOL_CONFIG.leadership.principal.fullMessage || [];

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
        // Principal's Desk settings
        principalName: principalData?.name || SCHOOL_CONFIG.leadership.principal.name,
        principalDesignation: principalData?.designation || SCHOOL_CONFIG.leadership.principal.designation,
        principalQualifications: principalData?.qualifications || SCHOOL_CONFIG.leadership.principal.qualifications,
        principalExcerpt: principalData?.message_excerpt || SCHOOL_CONFIG.leadership.principal.messageExcerpt,
        principalFullMessage: fullMsgArray.join("\n\n"),
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
      heroDescription,
      principalName,
      principalDesignation,
      principalQualifications,
      principalExcerpt,
      principalFullMessage
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

    // Update Principal leadership message if provided
    if (principalName || principalExcerpt || principalFullMessage) {
      const rawParagraphs = typeof principalFullMessage === "string"
        ? principalFullMessage.split("\n\n").map((p: string) => sanitizeString(p.trim())).filter(Boolean)
        : SCHOOL_CONFIG.leadership.principal.fullMessage;

      const principalPayload: Record<string, any> = {
        role: "principal",
        name: sanitizeString(principalName) || SCHOOL_CONFIG.leadership.principal.name,
        designation: sanitizeString(principalDesignation) || SCHOOL_CONFIG.leadership.principal.designation,
        qualifications: sanitizeString(principalQualifications) || SCHOOL_CONFIG.leadership.principal.qualifications,
        photo_url: SCHOOL_CONFIG.leadership.principal.image,
        message_excerpt: sanitizeString(principalExcerpt) || SCHOOL_CONFIG.leadership.principal.messageExcerpt,
        full_message: rawParagraphs && rawParagraphs.length > 0 ? rawParagraphs : [SCHOOL_CONFIG.leadership.principal.messageExcerpt],
        is_published: true,
        updated_at: new Date().toISOString()
      };

      const principalUpsert = await supabase
        .from("leadership_messages")
        .upsert(principalPayload, { onConflict: "role" });

      if (principalUpsert.error) {
        console.warn("[Admin Settings] Principal leadership upsert warning:", principalUpsert.error.message);
      }
    }

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

    await logAdminAction({
      action: "settings_update",
      adminEmail: getAdminEmail(authResult.user),
      ip: getClientIp(req),
      details: { heroTitleLine1, heroTitleLine2, principalName },
    });

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
