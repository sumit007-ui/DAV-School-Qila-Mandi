import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getFacilities } from "@/sanity/lib/fetch";
import { CampusClientView } from "@/components/campus/CampusClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Campus & Facilities | Smart Labs, Library & Sports",
  description:
    "Tour the campus of Dr. MRS Bhalla DAV High School, Batala. Featuring modern computer labs, science laboratories, well-stocked library, sports grounds, and Vedic Yajnashala.",
  path: "/campus",
  keywords: [
    "DAV School Batala Campus",
    "DAV Batala Facilities",
    "School Infrastructure Batala",
    "Science Lab Computer Lab Batala School",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CampusPage() {
  const facilities = await getFacilities();

  return <CampusClientView facilities={facilities} />;
}
