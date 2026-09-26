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
    : `${title} | DAV School Batala`;
  const canonicalUrl = `${BASE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      "DAV School",
      "DAV School Batala",
      "DAV Batala",
      "DAV Public School Batala",
      "DAV School Qila Mandi",
      "DAV Qila Mandi Batala",
      "Dr. MRS Bhalla DAV School",
      "Dr. MRS Bhalla DAV School Batala",
      "Dr MRS Bhalla DAV Public School",
      "DAV Senior Secondary School Batala",
      "DAV High School Batala",
      "Best School in Batala",
      "Top School in Batala",
      "Schools in Batala Punjab",
      "Best PSEB School in Batala",
      "DAV College Managing Committee Batala",
      "DAV Admissions Batala 2026",
      "Nursery to 10th School in Batala",
      "drmrsbhalladavschool.com",
      ...keywords,
    ],
    authors: [{ name: "DAV School Batala", url: BASE_URL }],
    creator: "DAV School Batala",
    publisher: "DAV School Batala",
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "DAV School Batala - Dr. MRS Bhalla DAV Public School",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "DAV School Batala Campus & Crest",
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
    "name": "DAV School Batala",
    "alternateName": [
      "DAV School",
      "DAV Batala",
      "DAV Public School Batala",
      "DAV School Qila Mandi",
      "Dr. MRS Bhalla DAV School",
      "Dr. MRS Bhalla DAV School, Qila Mandi, Batala",
      "Dr MRS Bhalla DAV Public School",
      "DAV High School Batala"
    ],
    "url": BASE_URL,
    "inLanguage": "en-IN",
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${BASE_URL}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateEducationalOrgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "School"],
    "@id": `${BASE_URL}/#organization`,
    "name": "DAV School Batala - Dr. MRS Bhalla DAV Senior Secondary Public School",
    "legalName": "Dr. M.R.S. Bhalla D.A.V. Senior Secondary Public School, Qila Mandi, Batala",
    "alternateName": [
      "DAV School",
      "DAV School Batala",
      "DAV Batala",
      "DAV Public School Batala",
      "DAV School Qila Mandi",
      "DAV Qila Mandi Batala",
      "Dr. MRS Bhalla DAV School",
      "Dr. MRS Bhalla DAV School Qila Mandi, Batala",
      "Dr MRS Bhalla DAV Public School",
      "DAV High School Qila Mandi Batala",
      "DAV Senior Secondary School Batala"
    ],
    "description": "Dr. MRS Bhalla DAV School Batala is a premier PSEB-affiliated Nursery to Class 10 school in Batala, Punjab, managed by DAV College Managing Committee (DAVCMC) New Delhi.",
    "url": BASE_URL,
    "hasMap": "https://maps.google.com/?q=Dr.+MRS+Bhalla+DAV+School+Qila+Mandi+Batala",
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/favicon-512x512.png`,
      "width": "512",
      "height": "512",
      "caption": "DAV School Batala Crest"
    },
    "image": `${BASE_URL}/images/og-school.jpg`,
    "telephone": [
      SCHOOL_CONFIG.contact.receptionPhone,
      SCHOOL_CONFIG.contact.officePhone,
    ],
    "email": SCHOOL_CONFIG.contact.email,
    "foundingDate": "1990",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Bank Transfer, UPI",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Batala, Gurdaspur, Punjab, India"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "15:30"
      }
    ],
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

export function generateBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `${BASE_URL}${item.path}`,
      })),
    ],
  };
}

export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
