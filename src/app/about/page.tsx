import { getPrincipalMessage, getSiteSettings } from "@/sanity/lib/fetch";
import { AboutClientView } from "@/components/about/AboutClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const [principal, siteSettings] = await Promise.all([
    getPrincipalMessage(),
    getSiteSettings(),
  ]);

  return <AboutClientView principal={principal} siteSettings={siteSettings} />;
}
