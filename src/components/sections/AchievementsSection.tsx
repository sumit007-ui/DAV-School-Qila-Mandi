"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, Sparkles, ArrowRight, Medal, Star, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ACHIEVEMENTS, ACADEMIC_TOPPERS } from "@/lib/data/achievements";
import { Achievement, AcademicTopper } from "@/types";
import { LineReveal, Reveal } from "@/components/motion";

interface AchievementsSectionProps {
  achievements?: Achievement[];
}

export function AchievementsSection({ achievements: propAchievements }: AchievementsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Merge prop achievements with rich defaults so the grid is never solitary
  const list = propAchievements && propAchievements.length > 2 
    ? propAchievements 
    : ACHIEVEMENTS;

  const categories = ["All", "Academics", "Olympiad", "Sports", "Co-Curricular"];

  const filteredAchievements = selectedCategory === "All"
    ? list
    : list.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-14 lg:py-20 bg-white text-[#1C2730] border-b border-[#163A5F]/10 relative overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#163A5F]/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/10 text-[#2F5D62] text-[11px] font-mono font-medium tracking-[0.16em] uppercase">
                <Trophy className="w-3.5 h-3.5 text-[#2F5D62]" />
                <span>06 · MERIT & DISTINCTION</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#0B1F33] font-semibold tracking-tight leading-[1.05]">
              {"Excellence Written in Golden Ink."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-[#1C2730] max-w-2xl font-normal leading-relaxed">
              Celebrating our scholars who set benchmark records in CBSE Boards, international STEM olympiads, and national sports podiums.
            </p>
          </div>

          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1F33] hover:text-[#2F5D62] transition-colors border-b border-[#0B1F33] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>View All Accolades</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2F5D62]" />
          </Link>
        </div>

        {/* Top Feature: 3 Board Toppers Podium Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#2F5D62] font-semibold flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#2F5D62]" />
              CLASS 10 CBSE BOARD HALL OF FAME
            </span>
            <span className="text-[11px] font-mono text-[#68747C]">BATCH 2024–25</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMIC_TOPPERS.map((topper, idx) => (
              <Reveal key={topper.name} direction="up" delay={0.1 * idx}>
                <div
                  className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                    idx === 0 
                      ? "bg-[#0B1F33] text-white border-[#2F5D62] shadow-lg hover:shadow-xl" 
                      : "bg-[#F6F3ED] text-[#0B1F33] border-[#163A5F]/15 hover:border-[#2F5D62] hover:bg-white shadow-xs hover:shadow-md"
                  }`}
                  data-cursor="TOPPER"
                >
                  {/* Subtle Corner Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                      idx === 0 ? "bg-[#2F5D62] text-white" : "bg-white text-[#2F5D62] border border-[#163A5F]/15"
                    }`}>
                      {idx === 0 ? "District Rank 1" : "Subject Centum"}
                    </span>
                    <Medal className={`w-5 h-5 ${idx === 0 ? "text-[#A8C3BC]" : "text-[#2F5D62]"}`} />
                  </div>

                  {/* Oversized Cormorant Garamond Numeral */}
                  <div className="my-4">
                    <div className={`font-editorial text-5xl sm:text-6xl font-semibold tracking-tight ${
                      idx === 0 ? "text-[#A8C3BC]" : "text-[#0B1F33]"
                    }`}>
                      {topper.score}
                    </div>
                    <h3 className={`font-editorial text-2xl font-normal mt-1 ${idx === 0 ? "text-white" : "text-[#0B1F33]"}`}>
                      {topper.name}
                    </h3>
                    <p className={`text-xs font-mono mt-0.5 ${idx === 0 ? "text-white/70" : "text-[#68747C]"}`}>
                      {topper.streamOrGrade}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed italic border-t pt-3 ${
                    idx === 0 ? "border-white/10 text-white/80" : "border-[#163A5F]/10 text-[#1C2730]"
                  }`}>
                    "{topper.testimonial}"
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Category Filters in DM Mono */}
        <div className="space-y-6 pt-4 border-t border-[#163A5F]/10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#0B1F33] text-white font-bold border-[#0B1F33] shadow-xs"
                      : "bg-[#F6F3ED] text-[#0B1F33] border-[#163A5F]/10 hover:border-[#2F5D62]"
                  }`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-[#68747C]">
              Showing {filteredAchievements.length} distinctions
            </span>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#F6F3ED] rounded-2xl overflow-hidden border border-[#163A5F]/15 shadow-xs hover:shadow-xl hover:border-[#2F5D62] transition-all duration-500 flex flex-col justify-between group h-full hover:-translate-y-1.5"
                data-cursor="HONOR"
              >
                <div className="space-y-4">
                  {/* Card Image */}
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1F33]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/85 via-[#0B1F33]/20 to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8C3BC] bg-[#0B1F33]/90 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-semibold">
                          {item.category} · {item.year}
                        </span>

                        {item.badge && (
                          <span className="text-[10px] font-mono font-bold text-white bg-[#2F5D62] px-2 py-0.5 rounded shadow-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <p className="text-xs font-mono text-[#A8C3BC] font-semibold">
                          {item.studentOrTeam}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="p-5 pt-0 space-y-2">
                    <h3 className="font-editorial text-2xl font-normal text-[#0B1F33] group-hover:text-[#2F5D62] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#1C2730] leading-relaxed font-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#163A5F]/10 flex items-center justify-between text-xs bg-white/50">
                  <span className="text-[#68747C] font-mono text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D62]" />
                    DAV Qilla Mandi Legacy
                  </span>
                  <Award className="w-4 h-4 text-[#2F5D62] group-hover:rotate-12 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
