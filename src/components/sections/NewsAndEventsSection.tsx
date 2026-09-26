"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Newspaper, 
  Clock, 
  Calendar, 
  BellRing, 
  Sparkles, 
  Tag, 
  ChevronRight,
  BookOpen
} from "lucide-react";
import { NEWS_STORIES } from "@/lib/data/news";
import { SCHOOL_EVENTS } from "@/lib/data/events";
import { NewsStory, SchoolEvent } from "@/types";
import { LineReveal, Reveal } from "@/components/motion";

interface NewsAndEventsSectionProps {
  news?: NewsStory[];
  events?: SchoolEvent[];
}

export function NewsAndEventsSection({ 
  news: initialNews = NEWS_STORIES, 
  events = SCHOOL_EVENTS 
}: NewsAndEventsSectionProps) {
  const [stories, setStories] = useState<NewsStory[]>(
    initialNews && initialNews.length > 0 ? initialNews : NEWS_STORIES
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Fetch live articles from CMS API
  useEffect(() => {
    let isMounted = true;
    const fetchLiveNews = async () => {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.news) && data.news.length > 0 && isMounted) {
            setStories(data.news);
          }
        }
      } catch (e) {
        // Fallback to initial stories seamlessly
      }
    };

    fetchLiveNews();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter stories by category
  const filteredStories = useMemo(() => {
    if (activeCategory === "All") return stories;
    return stories.filter(
      (s) => s.category.toLowerCase().includes(activeCategory.toLowerCase())
    );
  }, [stories, activeCategory]);

  const featuredStory = useMemo(() => {
    return filteredStories.find((s) => s.featured) || filteredStories[0] || stories[0];
  }, [filteredStories, stories]);

  const secondaryStories = useMemo(() => {
    return filteredStories.filter((s) => s.id !== featuredStory?.id).slice(0, 3);
  }, [filteredStories, featuredStory]);

  const categories = [
    { label: "All Stories", value: "All" },
    { label: "Academic", value: "Academic" },
    { label: "Vedic Heritage", value: "Heritage" },
    { label: "Sports & Arts", value: "Sports" },
    { label: "Circulars", value: "Notice" },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/20 relative font-sans overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAF6EB] rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#EFE4C8] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#9D6638]/20">
          <div className="space-y-3.5">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-bold tracking-[0.16em] uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>07 · CAMPUS CHRONICLE & PRESS DISPATCHES</span>
              </div>
            </Reveal>
            <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl text-[#4E220F] font-semibold tracking-tight leading-[1.1]">
              JOURNALS, HONORS & NOTICES.
            </LineReveal>
            <p className="text-sm sm:text-base text-[#4E220F]/80 max-w-2xl font-light">
              Official school announcements, academic recognitions, cultural celebrations, and curriculum circulars from Dr. MRS Bhalla DAV School, Qila Mandi, Batala.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#4E220F] hover:bg-[#9D6638] text-[#F7F1DE] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md group"
            >
              <span>Explore All Dispatches</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#9D6638] text-white shadow-sm"
                    : "bg-[#FAF6EB] text-[#4E220F]/80 hover:bg-[#EFE4C8] hover:text-[#4E220F] border border-[#9D6638]/20"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Magazine Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Featured Editorial (Span 7) */}
          {featuredStory && (
            <article className="lg:col-span-7 bg-[#FAF6EB] rounded-2xl sm:rounded-3xl border border-[#9D6638]/25 p-5 sm:p-7 shadow-sm hover:border-[#9D6638]/50 transition-all duration-300 group flex flex-col justify-between">
              <Link href="/news" className="space-y-5 block">
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-[#9D6638]/20 bg-[#4E220F]/5">
                  <Image
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 750px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#4E220F]/90 backdrop-blur-md text-[#B0BA99] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      ★ FEATURED DISPATCH
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#4E220F] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      {featuredStory.category}
                    </span>
                  </div>

                  {/* Read time floating */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono">
                    <Clock className="w-3 h-3 text-[#B0BA99]" />
                    <span>{featuredStory.readTime || "3 min read"}</span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#7E5F4E]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#9D6638]" />
                      <span>{featuredStory.date}</span>
                    </span>
                    <span>·</span>
                    <span>By {featuredStory.author?.name || "Editorial Board"}</span>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#4E220F] font-semibold group-hover:text-[#9D6638] transition-colors leading-[1.2]">
                    {featuredStory.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4E220F]/85 leading-relaxed font-normal line-clamp-3">
                    {featuredStory.excerpt}
                  </p>
                </div>
              </Link>

              <div className="pt-5 mt-5 border-t border-[#9D6638]/20 flex items-center justify-between">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#4E220F] group-hover:text-[#9D6638] transition-colors"
                >
                  <span>Read Complete Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform text-[#9D6638]" />
                </Link>

                <span className="text-[11px] font-mono text-[#7E5F4E]">
                  Dr. MRS Bhalla DAV Public School
                </span>
              </div>
            </article>
          )}

          {/* Supporting News & Fast Circulars (Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center justify-between border-b border-[#9D6638]/20 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9D6638] flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Recent Bulletins & Highlights</span>
              </span>
              <span className="text-[11px] font-mono text-[#7E5F4E]">
                {secondaryStories.length} updates
              </span>
            </div>

            {/* List of Secondary Stories */}
            <div className="space-y-3.5">
              {secondaryStories.map((story) => (
                <article 
                  key={story.id} 
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF6EB] border border-[#9D6638]/20 hover:border-[#9D6638]/50 hover:shadow-sm transition-all duration-300 group"
                >
                  <Link href="/news" className="flex items-start gap-4">
                    {story.image && (
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-[#9D6638]/20">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="96px"
                        />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#7E5F4E]">
                        <span className="px-2 py-0.5 rounded bg-[#9D6638]/15 text-[#9D6638] font-bold uppercase">
                          {story.category}
                        </span>
                        <span>·</span>
                        <span>{story.date}</span>
                      </div>

                      <h4 className="font-editorial text-base sm:text-lg text-[#4E220F] font-semibold leading-snug group-hover:text-[#9D6638] transition-colors line-clamp-2">
                        {story.title}
                      </h4>

                      <p className="text-xs text-[#7E5F4E] line-clamp-2 leading-relaxed font-light">
                        {story.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Upcoming Academic Calendar Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#4E220F] to-[#361507] text-[#F7F1DE] shadow-md space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9D6638]/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B0BA99] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>Upcoming Campus Event</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono uppercase tracking-wider text-cream-200">
                  Confirmed
                </span>
              </div>

              <h4 className="font-editorial text-lg sm:text-xl text-[#F7F1DE] font-medium leading-snug">
                {events[0]?.title || "Annual Vedic Conclave & Academic Honours"}
              </h4>

              <div className="flex items-center gap-3 text-xs text-[#B0BA99] font-mono">
                <span>{events[0]?.startDate || "Spring 2026"}</span>
                <span>·</span>
                <span>{events[0]?.venue || "Main School Auditorium"}</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/news"
                  className="text-xs text-gold-300 hover:text-white font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>View Full Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[10px] font-mono text-cream-400">
                  Batala, Punjab
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
