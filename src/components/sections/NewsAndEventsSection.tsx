import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Clock } from "lucide-react";
import { NEWS_STORIES } from "@/lib/data/news";
import { SCHOOL_EVENTS } from "@/lib/data/events";
import { EditorialEyebrow } from "@/components/ui/SplitText";

import { NewsStory, SchoolEvent } from "@/types";

interface NewsAndEventsSectionProps {
  news?: NewsStory[];
  events?: SchoolEvent[];
}

export function NewsAndEventsSection({ news = NEWS_STORIES, events = SCHOOL_EVENTS }: NewsAndEventsSectionProps) {
  const stories = news && news.length > 0 ? news : NEWS_STORIES;
  const featuredStory = stories.find((s) => s.featured) || stories[0];
  const supportingStories = stories.filter((s) => s.id !== featuredStory.id).slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] text-navy-950 border-b border-cream-300/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <EditorialEyebrow>Chronicle & Publications</EditorialEyebrow>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
              SCHOOL STORIES.
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy-950 hover:text-gold-700 transition-colors self-start md:self-auto editorial-link-hover"
          >
            <span>View All Stories & Circulars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Magazine Editorial Layout: Lead Story (Span 7) + Supporting List (Span 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Lead Featured Story (Span 7) */}
          <article className="lg:col-span-7 space-y-5 group cursor-pointer">
            <Link href="/news">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-cream-300">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-xs text-gold-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Featured • {featuredStory.category}
                </div>
              </div>

              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3 text-xs font-mono text-navy-500">
                  <span>{featuredStory.date}</span>
                  <span>•</span>
                  <span>{featuredStory.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors leading-tight">
                  {featuredStory.title}
                </h3>

                <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                  {featuredStory.excerpt}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-700 pt-1">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </article>

          {/* Supporting Stories Stack (Span 5) */}
          <div className="lg:col-span-5 space-y-6 divide-y divide-cream-300/80">
            {supportingStories.map((story, idx) => (
              <article key={story.id} className={`group cursor-pointer ${idx > 0 ? "pt-6" : ""}`}>
                <Link href="/news" className="space-y-2 block">
                  <div className="flex items-center justify-between text-[11px] font-mono text-navy-500">
                    <span className="text-gold-700 font-bold uppercase">{story.category}</span>
                    <span>{story.date}</span>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                    {story.title}
                  </h4>

                  <p className="text-xs text-navy-600 line-clamp-2 leading-relaxed">
                    {story.excerpt}
                  </p>
                </Link>
              </article>
            ))}

            {/* Upcoming Academic Highlight */}
            <div className="pt-6">
              <div className="p-5 rounded-2xl bg-white border border-cream-300 space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 block">
                  Upcoming Campus Calendar
                </span>
                <h4 className="font-serif text-lg text-navy-950 font-medium">
                  {SCHOOL_EVENTS[0]?.title || "Open House & Parent Conclave"}
                </h4>
                <p className="text-xs text-navy-500 font-mono">
                  🗓️ {SCHOOL_EVENTS[0]?.startDate} • {SCHOOL_EVENTS[0]?.time}
                </p>
                <Link
                  href="/news"
                  className="text-xs text-gold-700 font-bold hover:underline inline-block pt-1"
                >
                  View Full Event Calendar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
