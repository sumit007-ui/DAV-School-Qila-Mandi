import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getAchievements } from "@/sanity/lib/fetch";
import { AchievementsClientView } from "@/components/achievements/AchievementsClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Achievements & Accolades | Board Merits & Sports",
  description:
    "Celebrating 100% PSEB Class 10 board results, state-level sports championships, Olympiad winners, and cultural honors at Dr. MRS Bhalla DAV School, Batala.",
  path: "/achievements",
  keywords: [
    "DAV Batala Board Results",
    "PSEB Merit Holders Batala",
    "DAV School Batala Sports Champions",
    "DAV Accolades Punjab",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return <AchievementsClientView achievements={achievements} />;
}
