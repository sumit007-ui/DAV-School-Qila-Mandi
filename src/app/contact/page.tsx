import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getSiteSettings, getFAQs } from "@/sanity/lib/fetch";
import { ContactClientView } from "@/components/contact/ContactClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Contact Us & Location | Helpline & Timings",
  description:
    "Contact Dr. MRS Bhalla DAV High School, Qilla Mandi Road, Batala, Punjab. Phone: 01871-221285. Office hours Monday to Saturday 8:00 AM - 3:30 PM. Get directions and contact details.",
  path: "/contact",
  keywords: [
    "DAV School Batala Contact Number",
    "Dr MRS Bhalla DAV High School Address",
    "DAV Qilla Mandi Batala Phone",
    "School Helpline Batala",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [siteSettings, faqs] = await Promise.all([
    getSiteSettings(),
    getFAQs(),
  ]);

  return <ContactClientView siteSettings={siteSettings} faqs={faqs} />;
}
