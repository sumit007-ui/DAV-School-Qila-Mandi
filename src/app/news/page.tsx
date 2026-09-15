import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { getNews, getEvents } from "@/sanity/lib/fetch";
import { NewsClientView } from "@/components/news/NewsClientView";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Latest News, Circulars & Upcoming Events",
  description:
    "Stay updated with recent announcements, official circulars, examination schedules, and upcoming campus events at Dr. MRS Bhalla DAV School, Batala.",
  path: "/news",
  keywords: [
    "DAV Batala News",
    "DAV Batala Circulars",
    "School Events Batala",
    "DAV Qilla Mandi Notices",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const [news, events] = await Promise.all([
    getNews(),
    getEvents(),
  ]);

  return <NewsClientView news={news} events={events} />;
}
