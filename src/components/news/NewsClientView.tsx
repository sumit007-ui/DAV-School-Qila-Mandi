"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, Calendar, Clock, User } from "lucide-react";
import { NewsStory, SchoolEvent } from "@/types";

interface NewsClientViewProps {
  news: NewsStory[];
  events: SchoolEvent[];
}

export function NewsClientView({ news, events }: NewsClientViewProps) {
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Academic", "Campus Life", "Celebration", "Achievements", "Announcement"];

  const filteredNews = selectedCategory === "All"
    ? news
    : news.filter((item) => item.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1920"
            alt="Dr. M.R.S Bhalla D.A.V High School News & Events"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Campus Publications & Noticeboard</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            News & Calendar.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            Stay connected with the latest circulars, innovation showcases, sports achievements, and upcoming institutional convocations.
          </p>

          {/* Toggle Switch */}
          <div className="pt-4 flex items-center gap-2">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "news"
                  ? "bg-gold-500 text-navy-950 shadow-md"
                  : "bg-navy-900/80 text-cream-200 hover:bg-navy-800 border border-navy-700"
              }`}
            >
              School News & Circulars ({news.length})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "events"
                  ? "bg-gold-500 text-navy-950 shadow-md"
                  : "bg-navy-900/80 text-cream-200 hover:bg-navy-800 border border-navy-700"
              }`}
            >
              Upcoming Events ({events.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {activeTab === "news" ? (
            <>
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-gold-500 text-navy-950 font-bold shadow-sm"
                        : "bg-white text-navy-700 hover:bg-cream-100 border border-cream-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((story) => (
                  <article
                    key={story.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-cream-200 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy-950/85 text-gold-300 text-[10px] font-mono font-bold uppercase">
                        {story.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-navy-500">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>

                        <h3 className="font-serif text-xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                          {story.title}
                        </h3>

                        <p className="text-xs text-navy-600 line-clamp-3 leading-relaxed">
                          {story.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                        <span className="text-navy-500 font-mono text-[11px]">
                          By {story.author?.name || "Editorial Desk"}
                        </span>
                        <Link 
                          href={`/news/${story.id}`} 
                          className="text-gold-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            /* Events Calendar Tab */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-navy-950 text-gold-400 flex flex-col items-center justify-center shrink-0 border border-gold-500/30">
                        <span className="font-serif text-2xl font-bold leading-none">
                          {event.startDate?.split(" ")[1]?.replace(",", "") || "15"}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cream-300">
                          {event.startDate?.split(" ")[0]?.substring(0, 3) || "OCT"}
                        </span>
                      </div>

                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 block">
                          {event.category} • {event.time}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-navy-950 leading-snug">
                          {event.title}
                        </h3>
                        <p className="text-xs text-navy-500">
                          📍 {event.venue}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {event.description}
                    </p>

                    {event.highlights && event.highlights.length > 0 && (
                      <div className="space-y-1.5 pt-3 border-t border-cream-200">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-navy-900 block">
                          Event Highlights:
                        </span>
                        {event.highlights.map((hl, hIdx) => (
                          <p key={hIdx} className="text-xs text-navy-700 flex items-start gap-1.5">
                            <span className="text-gold-600 font-bold">•</span>
                            <span>{hl}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold">
                      {event.isUpcoming ? "● Upcoming Event" : "Completed Event"}
                    </span>
                    <Link
                      href={`/events/${event.slug || event.id}`}
                      className="text-gold-700 font-bold hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
