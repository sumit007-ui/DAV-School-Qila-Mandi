import { Metadata } from "next";
import { generateSchoolMetadata, generateBreadcrumbJsonLd } from "@/lib/seo/metadata";
import { getStudentLife, getSiteSettings } from "@/sanity/lib/fetch";
import { StudentLifeClientView } from "@/components/student-life/StudentLifeClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = generateSchoolMetadata({
  title: "Student Life & Co-Curriculars | Sports, Arts & Houses",
  description:
    "Experience student life at Dr. MRS Bhalla DAV School, Batala. Explore the 4 Houses, Sports Academy, IT & Robotics Club, Performing Arts, Literary Societies, and Vedic Ethos.",
  path: "/student-life",
  keywords: [
    "DAV Batala Student Life",
    "School Activities Batala",
    "Sports Academy Batala",
    "DAV School Houses",
    "Co Curricular Activities Batala",
  ],
});

export default async function StudentLifePage() {
  const [activities, siteSettings] = await Promise.all([
    getStudentLife(),
    getSiteSettings(),
  ]);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Student Life", path: "/student-life" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StudentLifeClientView activities={activities} siteSettings={siteSettings} />
    </>
  );
}
