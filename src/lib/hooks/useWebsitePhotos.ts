"use client";

import { useState, useEffect } from "react";

// Global in-memory cache to prevent multiple fetches per page load
let cachedPhotos: Record<string, string> | null = null;
let fetchPromise: Promise<Record<string, string>> | null = null;

async function fetchWebsitePhotos(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/api/photos", { cache: "no-store" });
    if (!res.ok) return {};
    const data = await res.json();
    if (data.success && data.photoMap) {
      cachedPhotos = data.photoMap;
      return data.photoMap;
    }
    return {};
  } catch (err) {
    console.warn("Failed to fetch website photos, using fallbacks:", err);
    return {};
  }
}

export function useWebsitePhotos() {
  const [photos, setPhotos] = useState<Record<string, string>>(cachedPhotos || {});
  const [loading, setLoading] = useState(!cachedPhotos);

  useEffect(() => {
    let isMounted = true;

    if (!cachedPhotos) {
      if (!fetchPromise) {
        fetchPromise = fetchWebsitePhotos();
      }
      fetchPromise.then((map) => {
        if (isMounted) {
          setPhotos(map);
          setLoading(false);
        }
      });
    } else {
      setPhotos(cachedPhotos);
      setLoading(false);
    }

    const handleUpdate = () => {
      fetchPromise = fetchWebsitePhotos();
      fetchPromise.then((map) => {
        if (isMounted) setPhotos(map);
      });
    };

    window.addEventListener("website_photos_updated", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("website_photos_updated", handleUpdate);
    };
  }, []);

  const getPhoto = (slotKey: string, fallbackUrl: string): string => {
    return photos[slotKey] || fallbackUrl;
  };

  return { photos, getPhoto, loading };
}
