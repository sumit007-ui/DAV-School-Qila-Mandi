import { Metadata } from "next";
import { SCHOOL_CONFIG } from "@/config/school";

export const BASE_URL = "https://davqillamandi.edu.in";

export function generateSchoolMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogImage = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1200",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | ${SCHOOL_CONFIG.name}, ${SCHOOL_CONFIG.subName}`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "DAV Public School",
      "DAV Qilla Mandi Batala",
      "Best School in Batala",
      "CBSE School Batala Punjab",
      "DAV College Managing Committee",
      "Admissions 2026-27",
      "Best CBSE School Gurdaspur",
      "Top senior secondary school Punjab",
      ...keywords,
    ],
    authors: [{ name: SCHOOL_CONFIG.name }],
    creator: "Devnxy",
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
          alt: `${SCHOOL_CONFIG.name} Campus`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
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

export function generateEducationalOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "name": `${SCHOOL_CONFIG.name} ${SCHOOL_CONFIG.subName}`,
    "alternateName": "DAV Public School Qilla Mandi",
    "description": SCHOOL_CONFIG.tagline,
    "url": BASE_URL,
    "logo": `${BASE_URL}/images/dav-logo.svg`,
    "telephone": SCHOOL_CONFIG.contact.primaryPhone,
    "email": SCHOOL_CONFIG.contact.email,
    "foundingDate": "1989",
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
    ],
  };
}
