import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SCHOOL_CONFIG } from "@/config/school";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const currentYear = new Date().getFullYear();
  const defaultEstablishedYear = SCHOOL_CONFIG.establishedYear || 1990;
  const autoCalculatedYears = Math.max(1, currentYear - defaultEstablishedYear);

  try {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("school_settings")
        .select("*")
        .eq("id", "default")
        .single();

      if (!error && data) {
        const estYear = data.established_year || defaultEstablishedYear;
        const calcYears = Math.max(1, currentYear - estYear);
        const finalYears = data.years_override ? Number(data.years_override) : calcYears;

        return NextResponse.json({
          success: true,
          settings: {
            schoolName: data.school_name || SCHOOL_CONFIG.name,
            subName: data.sub_name || SCHOOL_CONFIG.subName,
            establishedYear: estYear,
            yearsOverride: data.years_override,
            yearsCount: finalYears,
            officeHours: data.office_hours || SCHOOL_CONFIG.contact.officeHours,
            primaryPhone: data.primary_phone || SCHOOL_CONFIG.contact.primaryPhone,
            receptionPhone: data.reception_phone || SCHOOL_CONFIG.contact.receptionPhone,
            officePhone: data.office_phone || SCHOOL_CONFIG.contact.officePhone,
            email: data.email || SCHOOL_CONFIG.contact.email,
            address: data.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
            googleMapsUrl: data.google_maps_url || SCHOOL_CONFIG.address.googleMapsUrl,
            youtubeUrl: data.youtube_url || SCHOOL_CONFIG.links.youtube,
            facebookUrl: data.facebook_url || SCHOOL_CONFIG.links.facebook,
            instagramUrl: data.instagram_url || SCHOOL_CONFIG.links.instagram,
          }
        });
      }
    }
  } catch (err) {
    console.warn("[API/Settings] Supabase settings query failed, falling back to default config:", err);
  }

  // Graceful fallback to default config
  return NextResponse.json({
    success: true,
    settings: {
      schoolName: SCHOOL_CONFIG.name,
      subName: SCHOOL_CONFIG.subName,
      establishedYear: defaultEstablishedYear,
      yearsOverride: null,
      yearsCount: autoCalculatedYears,
      officeHours: SCHOOL_CONFIG.contact.officeHours,
      primaryPhone: SCHOOL_CONFIG.contact.primaryPhone,
      receptionPhone: SCHOOL_CONFIG.contact.receptionPhone,
      officePhone: SCHOOL_CONFIG.contact.officePhone,
      email: SCHOOL_CONFIG.contact.email,
      address: `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
      googleMapsUrl: SCHOOL_CONFIG.address.googleMapsUrl,
      youtubeUrl: SCHOOL_CONFIG.links.youtube,
      facebookUrl: SCHOOL_CONFIG.links.facebook,
      instagramUrl: SCHOOL_CONFIG.links.instagram,
    }
  });
}
