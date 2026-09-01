import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Share2, Tag } from "lucide-react";
import { getNews } from "@/sanity/lib/fetch";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface NewsDetailPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const newsList = await getNews();
  const story = newsList.find((s) => s.slug === params.slug || s.id === params.slug);

  if (!story) {
    return { title: "Story Not Found | DAV Public School Qilla Mandi" };
  }

  return {
    title: `${story.title} | DAV Public School Qilla Mandi`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: story.image ? [{ url: story.image }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const newsList = await getNews();
  const story = newsList.find((s) => s.slug === params.slug || s.id === params.slug);

  if (!story) {
    notFound();
  }

  return (
    <article className="w-full bg-cream-50 min-h-screen text-navy-950">
      {/* Header Banner */}
      <section className="relative py-16 lg:py-24 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News & Publications</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" />
              <span>{story.category}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cream-200 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                {story.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-400" />
                {story.author?.name} ({story.author?.role})
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {story.image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-cream-200">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
            </div>
          )}

          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-cream-200 shadow-sm space-y-6">
            <p className="font-serif text-xl sm:text-2xl text-navy-900 italic leading-relaxed border-l-4 border-gold-500 pl-6">
              {story.excerpt}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-navy-800 leading-relaxed font-light">
              {Array.isArray(story.content) ? (
                story.content.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{story.content}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
