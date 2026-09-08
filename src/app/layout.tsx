import type { Metadata } from "next";
import "./globals.css";
import { generateSchoolMetadata, generateEducationalOrgJsonLd } from "@/lib/seo/metadata";
import { ClientAppWrapper } from "@/components/layout/ClientAppWrapper";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Dr. MRS Bhalla DAV High School Qilla Mandi Batala",
  description: "Official portal of Dr. MRS Bhalla DAV High School, Qilla Mandi, Batala (Punjab). Affiliated to Punjab School Education Board (PSEB), Mohali. Admissions open for session 2026-27 for Nursery to Class 10.",
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
      <body className="bg-[#F7F1DE] text-[#4E220F] antialiased min-h-screen flex flex-col font-sans selection:bg-[#9D6638]/30 selection:text-[#4E220F] overflow-x-hidden">
        <ClientAppWrapper siteSettings={siteSettings}>
          {children}
        </ClientAppWrapper>
      </body>
    </html>
  );
}
