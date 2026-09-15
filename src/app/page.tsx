import {
  getPrincipalMessage,
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
    academicStages,
    facilities,
    achievements,
    news,
    events,
    gallery,
    testimonials,
  ] = await Promise.all([
    getPrincipalMessage(),
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
