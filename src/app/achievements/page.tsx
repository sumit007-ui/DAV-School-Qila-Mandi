import { getAchievements } from "@/sanity/lib/fetch";
import { AchievementsClientView } from "@/components/achievements/AchievementsClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return <AchievementsClientView achievements={achievements} />;
}
