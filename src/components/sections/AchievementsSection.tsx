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

  const list = propAchievements && propAchievements.length > 2 
    ? propAchievements 
    : ACHIEVEMENTS;

  const categories = ["All", "Academics", "Olympiad", "Sports", "Co-Curricular"];

  const filteredAchievements = selectedCategory === "All"
    ? list
    : list.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-14 lg:py-20 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/20 relative overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#9D6638]/20 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold tracking-[0.16em] uppercase shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-[#F7F1DE]" />
                <span>06 · MERIT & DISTINCTION</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#4E220F] font-bold tracking-tight leading-[1.05]">
              {"Excellence Written in Golden Ink."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-[#4E220F]/80 max-w-2xl font-normal leading-relaxed">
              Celebrating our scholars who set benchmark records in PSEB Boards, international STEM olympiads, and national sports podiums.
            </p>
          </div>

          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors border-b border-[#4E220F] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>View All Accolades</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
          </Link>
        </div>

        {/* Top Feature: 3 Board Toppers Podium Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#9D6638] font-bold flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-[#9D6638]" />
              CLASS 10 PSEB BOARD HALL OF FAME
            </span>
            <span className="text-[11px] font-mono text-[#4E220F]/60 font-semibold">BATCH 2024–25</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ACADEMIC_TOPPERS.map((topper, idx) => (
              <Reveal key={topper.name} direction="up" delay={0.1 * idx}>
                <div
                  className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
                    idx === 0 
                      ? "bg-[#4E220F] text-white border-[#9D6638] shadow-lg hover:shadow-xl" 
                      : "bg-white text-[#4E220F] border-[#9D6638]/20 hover:border-[#9D6638] shadow-xs hover:shadow-md"
                  }`}
                  data-cursor="TOPPER"
                >
                  {/* Subtle Corner Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded font-bold ${
                      idx === 0 ? "bg-[#9D6638] text-white" : "bg-[#F7F1DE] text-[#9D6638] border border-[#9D6638]/20"
                    }`}>
                      {idx === 0 ? "District Rank 1" : "Subject Centum"}
                    </span>
                    <Medal className={`w-5 h-5 ${idx === 0 ? "text-[#B0BA99]" : "text-[#9D6638]"}`} />
                  </div>

                  {/* Oversized Cormorant Garamond Numeral */}
                  <div className="my-4">
                    <div className={`font-editorial text-5xl sm:text-6xl font-bold tracking-tight ${
                      idx === 0 ? "text-[#B0BA99]" : "text-[#4E220F]"
                    }`}>
                      {topper.score}
                    </div>
                    <h3 className={`font-editorial text-2xl font-bold mt-1 ${idx === 0 ? "text-white" : "text-[#4E220F]"}`}>
                      {topper.name}
                    </h3>
                    <p className={`text-xs font-mono mt-0.5 ${idx === 0 ? "text-white/70" : "text-[#4E220F]/60"}`}>
                      {topper.streamOrGrade}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed italic border-t pt-3 ${
                    idx === 0 ? "border-white/10 text-white/80" : "border-[#9D6638]/15 text-[#4E220F]/80"
                  }`}>
                    "{topper.testimonial}"
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Category Filters in DM Mono */}
        <div className="space-y-6 pt-4 border-t border-[#9D6638]/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#4E220F] text-white font-bold border-[#4E220F] shadow-xs"
                      : "bg-white text-[#4E220F] border-[#9D6638]/20 hover:border-[#9D6638]"
                  }`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-[#4E220F]/60">
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
                className="bg-white rounded-2xl overflow-hidden border border-[#9D6638]/20 shadow-xs hover:shadow-xl hover:border-[#9D6638] transition-all duration-500 flex flex-col justify-between group h-full hover:-translate-y-1.5"
                data-cursor="HONOR"
              >
                <div className="space-y-4">
                  {/* Card Image */}
                  {item.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#4E220F]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/85 via-[#4E220F]/20 to-transparent" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B0BA99] bg-[#4E220F]/90 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-bold">
                          {item.category} · {item.year}
                        </span>

                        {item.badge && (
                          <span className="text-[10px] font-mono font-bold text-white bg-[#9D6638] px-2 py-0.5 rounded shadow-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <p className="text-xs font-mono text-[#B0BA99] font-bold">
                          {item.studentOrTeam}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="p-5 pt-0 space-y-2">
                    <h3 className="font-editorial text-2xl font-bold text-[#4E220F] group-hover:text-[#9D6638] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#4E220F]/80 leading-relaxed font-normal line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#9D6638]/15 flex items-center justify-between text-xs bg-[#F7F1DE]/40">
                  <span className="text-[#4E220F]/60 font-mono text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9D6638]" />
                    DAV Qilla Mandi Legacy
                  </span>
                  <Award className="w-4 h-4 text-[#9D6638] group-hover:rotate-12 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
