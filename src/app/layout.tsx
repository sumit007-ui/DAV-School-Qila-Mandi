import type { Metadata } from "next";
import "./globals.css";
import { generateSchoolMetadata, generateEducationalOrgJsonLd } from "@/lib/seo/metadata";
import { ClientAppWrapper } from "@/components/layout/ClientAppWrapper";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = generateSchoolMetadata({
  title: "DAV Public School Qilla Mandi Batala | Shaping Curious Minds",
  description: "Official portal of DAV Public School Qilla Mandi, Batala (Punjab). Affiliated to CBSE New Delhi. Admissions open for session 2026-27 for Nursery to Class XI.",
  path: "",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateEducationalOrgJsonLd();
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FCFBF7] text-[#0A192F] antialiased min-h-screen flex flex-col font-sans selection:bg-gold-500/20 selection:text-navy-950">
        <ClientAppWrapper siteSettings={siteSettings}>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}
