import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import {
  getPrincipalMessage,
  getAcademicStages,
  getFacilities,
  getAchievements,
  getNews,
  getEvents,
  getGallery,
} from "@/sanity/lib/fetch";
import { HomeClientWrapper } from "@/components/home/HomeClientWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generateSchoolMetadata({
  title: "Dr. MRS Bhalla DAV School Qila Mandi Batala | Admissions 2026-27 Open",
  description:
    "Official website of Dr. M.R.S. Bhalla D.A.V. Senior Secondary Public School, Qila Mandi, Batala. PSEB affiliated, 100% board result legacy, smart classes, modern labs & sports. Apply for Nursery to Class 10.",
  path: "",
  keywords: [
    "Dr MRS Bhalla DAV School",
    "DAV School Batala",
    "DAV Public School Qila Mandi",
    "Best School in Batala",
    "Top PSEB School Gurdaspur",
    "School Admission Batala 2026",
    "Nursery Admission Batala",
    "High School Batala",
  ],
});

export default async function HomePage() {
  const [
    principalMessage,
    academicStages,
    facilities,
    achievements,
    news,
    events,
    gallery,
  ] = await Promise.all([
    getPrincipalMessage(),
    getAcademicStages(),
    getFacilities(),
    getAchievements(),
    getNews(),
    getEvents(),
    getGallery(),
  ]);

  return (
    <HomeClientWrapper
      principalMessage={principalMessage}
      academicStages={academicStages}
      facilities={facilities}
      achievements={achievements}
      news={news}
      events={events}
      gallery={gallery}
    />
  );
}
