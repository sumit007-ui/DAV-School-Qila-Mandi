import { Metadata } from "next";
import { SCHOOL_CONFIG } from "@/config/school";

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.drmrsbhalladavschool.com";

export function generateSchoolMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = `${BASE_URL}/images/og-school.jpg`,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const fullTitle = path === ""
    ? `${title}`
    : `${title} | ${SCHOOL_CONFIG.name}, ${SCHOOL_CONFIG.subName}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "Dr. MRS Bhalla DAV High School",
      "Dr. MRS Bhalla DAV High School Batala",
      "DAV School Batala",
      "DAV Qilla Mandi Batala",
      "drmrsbhalladavschool.com",
      "Best School in Batala",
      "PSEB School Batala Punjab",
      "DAV College Managing Committee",
      "Admissions 2026-27",
      "Best PSEB School Gurdaspur",
      "Top High School Punjab Board",
      "Nursery to 10th School in Batala",
      ...keywords,
    ],
    authors: [{ name: SCHOOL_CONFIG.name, url: BASE_URL }],
    creator: SCHOOL_CONFIG.name,
    publisher: SCHOOL_CONFIG.name,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: `${SCHOOL_CONFIG.name} ${SCHOOL_CONFIG.subName}`,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SCHOOL_CONFIG.name} Campus & Emblem`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "name": `${SCHOOL_CONFIG.name}`,
    "alternateName": [
      `${SCHOOL_CONFIG.name}, ${SCHOOL_CONFIG.subName}`,
      "Dr. MRS Bhalla DAV High School Qilla Mandi",
      "DAV School Batala",
      "DAV High School Batala"
    ],
    "url": BASE_URL,
    "inLanguage": "en-IN",
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    }
  };
}

export function generateEducationalOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "@id": `${BASE_URL}/#organization`,
    "name": `${SCHOOL_CONFIG.name} ${SCHOOL_CONFIG.subName}`,
    "alternateName": [
      "Dr. MRS Bhalla DAV High School",
      "Dr. MRS Bhalla DAV High School Qilla Mandi, Batala",
      "DAV High School Qilla Mandi Batala"
    ],
    "description": SCHOOL_CONFIG.tagline,
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/favicon-512x512.png`,
      "width": "512",
      "height": "512",
      "caption": `${SCHOOL_CONFIG.name} Emblem`
    },
    "image": `${BASE_URL}/images/og-school.jpg`,
    "telephone": [
      SCHOOL_CONFIG.contact.receptionPhone,
      SCHOOL_CONFIG.contact.officePhone,
    ],
    "email": SCHOOL_CONFIG.contact.email,
    "foundingDate": "1990",
    "parentOrganization": {
      "@type": "EducationalOrganization",
      "name": SCHOOL_CONFIG.managedBy,
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SCHOOL_CONFIG.address.street,
      "addressLocality": SCHOOL_CONFIG.address.city,
      "addressRegion": SCHOOL_CONFIG.address.state,
      "postalCode": SCHOOL_CONFIG.address.pincode,
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.8186",
      "longitude": "75.2046",
    },
    "sameAs": [
      SCHOOL_CONFIG.links.facebook,
      SCHOOL_CONFIG.links.instagram,
      SCHOOL_CONFIG.links.youtube,
    ].filter(Boolean),
  };
}
