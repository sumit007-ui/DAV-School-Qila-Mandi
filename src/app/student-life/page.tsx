import { getStudentLife, getSiteSettings } from "@/sanity/lib/fetch";
import { StudentLifeClientView } from "@/components/student-life/StudentLifeClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudentLifePage() {
  const [activities, siteSettings] = await Promise.all([
    getStudentLife(),
    getSiteSettings(),
  ]);

  return <StudentLifeClientView activities={activities} siteSettings={siteSettings} />;
}
