import {
  getPrincipalMessage,
  getAcademicStages,
  getFacilities,
  getAchievements,
  getNews,
  getEvents,
  getGallery,
} from "@/sanity/lib/fetch";
import { HomeClientWrapper } from "@/components/home/HomeClientWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [
    principalMessage,
    academicStages,
    facilities,
    achievements,
    news,
    events,
    gallery,
  ] = await Promise.all([
    getPrincipalMessage(),
    getAcademicStages(),
    getFacilities(),
    getAchievements(),
    getNews(),
    getEvents(),
    getGallery(),
  ]);

  return (
    <HomeClientWrapper
      principalMessage={principalMessage}
      academicStages={academicStages}
      facilities={facilities}
      achievements={achievements}
      news={news}
      events={events}
      gallery={gallery}
    />
  );
}
