import { getFacilities } from "@/sanity/lib/fetch";
import { CampusClientView } from "@/components/campus/CampusClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CampusPage() {
  const facilities = await getFacilities();

  return <CampusClientView facilities={facilities} />;
}
