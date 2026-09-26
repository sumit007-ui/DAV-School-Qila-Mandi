import { Metadata } from "next";
import { generateSchoolMetadata, generateFaqJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo/metadata";
import { getSiteSettings, getFAQs } from "@/sanity/lib/fetch";
import { ContactClientView } from "@/components/contact/ContactClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Contact Us & Location | Helpline & Timings",
  description:
    "Contact Dr. MRS Bhalla DAV School, Qila Mandi, Batala, Punjab. Phone: 01871-501096. Office hours Monday to Saturday 8:00 AM - 3:30 PM. Get directions and contact details.",
  path: "/contact",
  keywords: [
    "Contact DAV Batala",
    "DAV Qila Mandi Phone",
    "Dr MRS Bhalla DAV School Address",
    "DAV Qila Mandi Batala Phone",
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

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Contact Us", path: "/contact" }
  ]);
  const faqJsonLd = Array.isArray(faqs) && faqs.length > 0 ? generateFaqJsonLd(faqs) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ContactClientView siteSettings={siteSettings} faqs={faqs} />
    </>
  );
}
