import { getNews, getEvents } from "@/sanity/lib/fetch";
import { NewsClientView } from "@/components/news/NewsClientView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const [news, events] = await Promise.all([
    getNews(),
    getEvents(),
  ]);

  return <NewsClientView news={news} events={events} />;
}
