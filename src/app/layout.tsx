import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  generateSchoolMetadata,
  generateEducationalOrgJsonLd,
  generateWebSiteJsonLd,
} from "@/lib/seo/metadata";
import { ClientAppWrapper } from "@/components/layout/ClientAppWrapper";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const viewport: Viewport = {
  themeColor: "#800000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = generateSchoolMetadata({
  title: "Dr. MRS Bhalla DAV High School Qilla Mandi, Batala",
  description:
    "Official portal of Dr. MRS Bhalla DAV High School, Qilla Mandi, Batala (Punjab). Affiliated to Punjab School Education Board (PSEB), Mohali. Admissions open for session 2026-27 for Nursery to Class 10.",
  path: "",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateEducationalOrgJsonLd();
  const webSiteJsonLd = generateWebSiteJsonLd();
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-[#F7F1DE] text-[#4E220F] antialiased min-h-screen flex flex-col font-sans selection:bg-[#9D6638]/30 selection:text-[#4E220F] overflow-x-hidden">
        <ClientAppWrapper siteSettings={siteSettings}>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}
