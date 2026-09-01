import { getSiteSettings, getFAQs } from "@/sanity/lib/fetch";
import { ContactClientView } from "@/components/contact/ContactClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [siteSettings, faqs] = await Promise.all([
    getSiteSettings(),
    getFAQs(),
  ]);

  return <ContactClientView siteSettings={siteSettings} faqs={faqs} />;
}
