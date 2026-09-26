"use client";

/**
 * AnalyticsProvider
 * ============================================================
 * Handles:
 *  1. Firebase Analytics initialization (browser-only, once)
 *  2. Page view tracking on every SPA route change
 *  3. Scroll depth milestone tracking (25 / 50 / 75 / 100%)
 *
 * Architecture:
 *  - Rendered inside ClientAppWrapper (public routes only, not admin)
 *  - Uses usePathname() for Next.js App Router route detection
 *  - Strictly client-side — no SSR execution
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, trackScrollDepth } from "@/lib/firebase/analytics";

export function AnalyticsProvider() {
  const pathname = usePathname();
  const scrollMilestones = useRef<Set<number>>(new Set());

  // ─── Page view on route change ────────────────────────────────────────
  useEffect(() => {
    // Reset scroll milestones on every page change
    scrollMilestones.current = new Set();

    // Short delay to let the document title update first
    const timer = setTimeout(() => {
      trackPageView(pathname, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // ─── Scroll depth tracking ────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);
      const milestones = [25, 50, 75, 100] as const;

      for (const milestone of milestones) {
        if (pct >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    // Passive listener — does NOT block scroll rendering
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // This component renders nothing — it's a pure side-effect provider
  return null;
}
