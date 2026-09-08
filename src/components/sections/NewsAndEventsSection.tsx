import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Clock, Calendar } from "lucide-react";
import { NEWS_STORIES } from "@/lib/data/news";
import { SCHOOL_EVENTS } from "@/lib/data/events";
import { NewsStory, SchoolEvent } from "@/types";
import { LineReveal, Reveal } from "@/components/motion";

interface NewsAndEventsSectionProps {
  news?: NewsStory[];
  events?: SchoolEvent[];
}

export function NewsAndEventsSection({ news = NEWS_STORIES, events = SCHOOL_EVENTS }: NewsAndEventsSectionProps) {
  const stories = news && news.length > 0 ? news : NEWS_STORIES;
  const featuredStory = stories.find((s) => s.featured) || stories[0];
  const supportingStories = stories.filter((s) => s.id !== featuredStory.id).slice(0, 3);

  return (
    <section className="py-14 lg:py-20 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/15 relative font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                07 · ACADEMIC CHRONICLE
              </div>
            </Reveal>
            <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl text-[#4E220F] font-semibold tracking-tight">
              {"STORIES & DISPATCHES."}
            </LineReveal>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors self-start md:self-auto border-b border-[#4E220F] pb-0.5 font-mono"
          >
            <span>View All Dispatches</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
          </Link>
        </div>

        {/* Magazine Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lead Featured Story (Span 7) */}
          <article className="lg:col-span-7 space-y-4 group cursor-pointer" data-cursor="READ">
            <Link href="/news">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[#9D6638]/20 shadow-xs">
                <Image
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  priority
                />
                <div className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded bg-[#4E220F]/90 backdrop-blur-xs text-[#B0BA99] text-[9px] font-mono font-bold uppercase tracking-wider">
                  FEATURED · {featuredStory.category}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#7E5F4E]">
                  <span>{featuredStory.date}</span>
                  <span>·</span>
                  <span>{featuredStory.readTime}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[#4E220F] font-normal group-hover:text-[#9D6638] transition-colors leading-snug">
                  {featuredStory.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#4E220F]/90 leading-relaxed line-clamp-3 font-normal">
                  {featuredStory.excerpt}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#4E220F] group-hover:text-[#9D6638] transition-colors pt-1">
                  <span className="uppercase tracking-wider">Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#9D6638]" />
                </div>
              </div>
            </Link>
          </article>

          {/* Supporting Stories List (Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#9D6638] block border-b border-[#9D6638]/20 pb-2">
              Recent Dispatches & Circulars
            </span>

            <div className="space-y-3">
              {supportingStories.map((story) => (
                <article key={story.id} className="p-4 rounded-xl bg-white border border-[#9D6638]/20 hover:border-[#9D6638]/40 transition-all duration-300 group">
                  <Link href="/news" className="space-y-1.5 block">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#7E5F4E]">
                      <span className="text-[#9D6638] font-semibold uppercase">{story.category}</span>
                      <span>·</span>
                      <span>{story.date}</span>
                    </div>

                    <h4 className="font-editorial text-lg sm:text-xl text-[#4E220F] font-normal leading-snug group-hover:text-[#9D6638] transition-colors">
                      {story.title}
                    </h4>

                    <p className="text-xs text-[#7E5F4E] line-clamp-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>

            {/* Upcoming Academic Highlight */}
            <div className="pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#9D6638]/20 space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#9D6638] block">
                  Upcoming Campus Calendar
                </span>
                <h4 className="font-editorial text-lg text-[#4E220F] font-normal">
                  {SCHOOL_EVENTS[0]?.title || "Open House & Parent Conclave"}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#9D6638] font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#9D6638]" />
                  <span>{SCHOOL_EVENTS[0]?.startDate} · {SCHOOL_EVENTS[0]?.time}</span>
                </div>
                <Link
                  href="/news"
                  className="text-xs text-[#9D6638] font-bold hover:underline inline-block font-mono"
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
