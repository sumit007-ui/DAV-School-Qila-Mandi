import { getPrincipalMessage, getDirectorMessage, getSiteSettings } from "@/sanity/lib/fetch";
import { AboutClientView } from "@/components/about/AboutClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const [principal, director, siteSettings] = await Promise.all([
    getPrincipalMessage(),
    getDirectorMessage(),
    getSiteSettings(),
  ]);

  return <AboutClientView principal={principal} director={director} siteSettings={siteSettings} />;
}
