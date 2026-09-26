import { Metadata } from "next";
import { generateSchoolMetadata, generateBreadcrumbJsonLd } from "@/lib/seo/metadata";
import { getAdmissionsInfo } from "@/sanity/lib/fetch";
import { AdmissionsClientView } from "@/components/admissions/AdmissionsClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Admissions Open 2026-27 | Nursery to Class 10",
  description:
    "Apply for admission at Dr. MRS Bhalla DAV School, Qila Mandi, Batala. Admissions open for session 2026-27 from Nursery to Class 10. Check eligibility, fee structure, and procedure.",
  path: "/admissions",
  keywords: [
    "DAV Batala Admissions",
    "School Admission Batala 2026",
    "Nursery Admission Batala",
    "PSEB School Admission Batala",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdmissionsPage() {
  const info = await getAdmissionsInfo();
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Admissions", path: "/admissions" }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AdmissionsClientView info={info} />
    </>
  );
}
