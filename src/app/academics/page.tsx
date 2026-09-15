import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getAcademicStages } from "@/sanity/lib/fetch";
import { AcademicsClientView } from "@/components/academics/AcademicsClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Academics & Curriculum | Nursery to 10th PSEB",
  description:
    "Explore academic programs from Pre-Primary (Nursery, LKG, UKG) to High School (Class 9 & 10) at Dr. MRS Bhalla DAV High School, Batala. PSEB curriculum with holistic Vedic values.",
  path: "/academics",
  keywords: [
    "DAV Batala Curriculum",
    "PSEB High School Batala",
    "Pre-Primary School Batala",
    "Secondary Education Batala",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AcademicsPage() {
  const programs = await getAcademicStages();

  return <AcademicsClientView programs={programs} />;
}
