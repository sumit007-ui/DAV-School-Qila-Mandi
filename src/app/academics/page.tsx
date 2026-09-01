import { getAcademicStages } from "@/sanity/lib/fetch";
import { AcademicsClientView } from "@/components/academics/AcademicsClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AcademicsPage() {
  const programs = await getAcademicStages();

  return <AcademicsClientView programs={programs} />;
}
