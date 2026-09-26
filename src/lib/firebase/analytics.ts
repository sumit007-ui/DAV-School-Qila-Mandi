/**
 * Firebase Analytics Service
 * ============================================================
 * Production-grade Google Analytics 4 integration.
 *
 * Rules enforced here:
 *  - Browser-only initialization (isSupported() guard)
 *  - Single Analytics instance (singleton)
 *  - No PII: no emails, phones, tokens, or sensitive content
 *  - Graceful degradation: every call is wrapped in try/catch
 *  - Tree-shakable modular imports
 *
 * Usage:
 *   import { trackCTAClick } from "@/lib/firebase/analytics"
 *   trackCTAClick("admission_enquiry", "hero_section")
 */

import { Analytics, getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { getFirebaseApp } from "./client";

// Singleton reference — populated once on first call
let _analytics: Analytics | null = null;

/**
 * Returns the Analytics instance, initializing it on first call.
 * Returns null in SSR or unsupported environments (no throws).
 */
async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (_analytics) return _analytics;

  try {
    const supported = await isSupported();
    if (!supported) return null;

    const app = getFirebaseApp();
    _analytics = getAnalytics(app);
    return _analytics;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Init failed:", err);
    }
    return null;
  }
}

// ─── Core wrapper ──────────────────────────────────────────────────────────

/**
 * Generic event tracker — the foundation for all other helpers.
 * Silently swallows errors so analytics never breaks the UI.
 */
export async function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): Promise<void> {
  try {
    const analytics = await getAnalyticsInstance();
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Analytics] trackEvent "${eventName}" failed:`, err);
    }
  }
}

// ─── Page tracking ─────────────────────────────────────────────────────────

/**
 * Track a page view. Called from the AnalyticsProvider on route change.
 * GA4 automatically tracks page_view on web — this is for explicit SPA navigation.
 */
export async function trackPageView(path: string, title?: string): Promise<void> {
  await trackEvent("page_view", {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

// ─── CTA events ────────────────────────────────────────────────────────────

/**
 * Track a CTA button click.
 * @param ctaName  Human-readable CTA name (e.g. "admission_enquiry")
 * @param location Section where the CTA lives (e.g. "hero", "footer", "navbar")
 */
export async function trackCTAClick(ctaName: string, location: string): Promise<void> {
  await trackEvent("cta_click", { cta_name: ctaName, location });
}

// ─── Contact / Admission form events ───────────────────────────────────────

/**
 * User opens or starts filling a form.
 * @param formName  e.g. "contact_form" or "admission_enquiry"
 */
export async function trackFormStart(formName: string): Promise<void> {
  await trackEvent("form_start", { form_name: formName });
}

/**
 * Form submitted successfully.
 * ⚠️ NEVER include email, phone, name, or any PII in params.
 */
export async function trackFormSubmit(formName: string, extraParams?: Record<string, string | number>): Promise<void> {
  await trackEvent("form_submit", { form_name: formName, ...extraParams });
}

/**
 * Form submission failed.
 */
export async function trackFormError(formName: string, reason?: string): Promise<void> {
  await trackEvent("form_error", {
    form_name: formName,
    error_reason: reason || "unknown",
  });
}

// ─── Navigation & engagement events ────────────────────────────────────────

/**
 * Track external link clicks (social media, maps, WhatsApp, phone).
 * ⚠️ Do NOT pass phone numbers or email addresses as link_url.
 */
export async function trackExternalLink(linkName: string, linkCategory: string): Promise<void> {
  await trackEvent("external_link_click", {
    link_name: linkName,
    link_category: linkCategory,
  });
}

/**
 * Track important navigation interactions.
 */
export async function trackNavigation(itemName: string): Promise<void> {
  await trackEvent("navigation_click", { item_name: itemName });
}

/**
 * Track site search queries.
 * ⚠️ Only pass the search term — never the results or user details.
 */
export async function trackSearch(searchTerm: string): Promise<void> {
  if (!searchTerm || searchTerm.trim().length < 2) return;
  await trackEvent("search", { search_term: searchTerm.trim().slice(0, 100) });
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%).
 */
export async function trackScrollDepth(percentage: 25 | 50 | 75 | 100): Promise<void> {
  await trackEvent("scroll", { percent_scrolled: percentage });
}

/**
 * Track WhatsApp button click (school-specific conversion event).
 */
export async function trackWhatsAppClick(source: string): Promise<void> {
  await trackEvent("whatsapp_click", { source });
}

/**
 * Track phone number click (school-specific conversion event).
 */
export async function trackPhoneClick(source: string): Promise<void> {
  await trackEvent("phone_click", { source });
}
