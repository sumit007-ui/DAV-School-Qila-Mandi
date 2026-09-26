"use client";

import { useState, useEffect } from "react";
import { SiteSettings } from "@/types";
import { SCHOOL_CONFIG } from "@/config/school";

const defaultSettings: SiteSettings = {
  schoolName: SCHOOL_CONFIG.name,
  subName: SCHOOL_CONFIG.subName,
  establishedYear: SCHOOL_CONFIG.establishedYear || 1990,
  yearsOverride: null,
  yearsCount: Math.max(1, new Date().getFullYear() - (SCHOOL_CONFIG.establishedYear || 1990)),
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
  heroBadgeText: SCHOOL_CONFIG.hero.badgeText,
  heroTitleLine1: SCHOOL_CONFIG.hero.titleLine1,
  heroTitleLine2: SCHOOL_CONFIG.hero.titleLine2,
  heroDescription: SCHOOL_CONFIG.hero.description,
};

let cachedSettings: SiteSettings | null = null;
let fetchPromise: Promise<SiteSettings> | null = null;

async function fetchSchoolSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch("/api/settings", { cache: "no-store" });
    if (!res.ok) return defaultSettings;
    const data = await res.json();
    if (data.success && data.settings) {
      const merged: SiteSettings = {
        ...defaultSettings,
        ...data.settings,
      };
      cachedSettings = merged;
      return merged;
    }
    return defaultSettings;
  } catch (err) {
    console.warn("Failed to fetch dynamic school settings, using fallback:", err);
    return defaultSettings;
  }
}

export function useSchoolSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    let isMounted = true;

    if (!cachedSettings) {
      if (!fetchPromise) {
        fetchPromise = fetchSchoolSettings();
      }
      fetchPromise.then((s) => {
        if (isMounted) {
          setSettings(s);
          setLoading(false);
        }
      });
    } else {
      setSettings(cachedSettings);
      setLoading(false);
    }

    const handleUpdate = () => {
      fetchPromise = fetchSchoolSettings();
      fetchPromise.then((s) => {
        if (isMounted) setSettings(s);
      });
    };

    window.addEventListener("school_settings_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("school_settings_updated", handleUpdate);
    };
  }, []);

  return { settings, loading };
}
