import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getPrincipalMessage, getSiteSettings } from "@/sanity/lib/fetch";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "About Our School | Legacy, Leadership & Ethos",
  description:
    "Discover the 35+ year legacy of Dr. MRS Bhalla DAV High School, Qilla Mandi, Batala. Managed by DAVCMC New Delhi. Fostering academic excellence and Vedic values since 1990.",
  path: "/about",
  keywords: [
    "About DAV Batala",
    "Dr MRS Bhalla DAV School History",
    "DAVCMC New Delhi Schools Punjab",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const [principal, siteSettings] = await Promise.all([
    getPrincipalMessage(),
    getSiteSettings(),
  ]);

  return <AboutClientView principal={principal} siteSettings={siteSettings} />;
}
