import { getAdmissionsInfo } from "@/sanity/lib/fetch";
import { AdmissionsClientView } from "@/components/admissions/AdmissionsClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdmissionsPage() {
  const info = await getAdmissionsInfo();

  return <AdmissionsClientView info={info} />;
}
