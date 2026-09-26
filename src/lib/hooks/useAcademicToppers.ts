"use client";

import { useState, useEffect, useCallback } from "react";
import { AcademicTopper, DEFAULT_TOPPERS } from "@/lib/constants/toppers";

export function useAcademicToppers() {
  const [toppers, setToppers] = useState<AcademicTopper[]>(DEFAULT_TOPPERS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToppers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/toppers", {
        headers: { "Cache-Control": "no-cache" }
      });
      if (!res.ok) {
        throw new Error(`Failed to load toppers (${res.status})`);
      }
      const data = await res.json();
      if (data.toppers && Array.isArray(data.toppers)) {
        setToppers(data.toppers);
      }
    } catch (err: any) {
      console.warn("[useAcademicToppers] Notice:", err.message);
      // Fallback stays as DEFAULT_TOPPERS
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToppers();
  }, [fetchToppers]);

  return { toppers, loading, error, refetch: fetchToppers };
}
