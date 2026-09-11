import {
  getPrincipalMessage,
  getDirectorMessage,
  getAcademicStages,
  getFacilities,
  getAchievements,
  getNews,
  getEvents,
  getGallery,
  getTestimonials,
} from "@/sanity/lib/fetch";
import { HomeClientWrapper } from "@/components/home/HomeClientWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [
    principalMessage,
    directorMessage,
    academicStages,
    facilities,
    achievements,
    news,
    events,
    gallery,
    testimonials,
  ] = await Promise.all([
    getPrincipalMessage(),
    getDirectorMessage(),
    getAcademicStages(),
    getFacilities(),
    getAchievements(),
    getNews(),
    getEvents(),
    getGallery(),
    getTestimonials(),
  ]);

  return (
    <HomeClientWrapper
      principalMessage={principalMessage}
      directorMessage={directorMessage}
      academicStages={academicStages}
      facilities={facilities}
      achievements={achievements}
      news={news}
      events={events}
      gallery={gallery}
      testimonials={testimonials}
    />
  );
}
