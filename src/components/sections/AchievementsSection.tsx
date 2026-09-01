"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Award, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/data/achievements";
import { Achievement } from "@/types";

interface AchievementsSectionProps {
  achievements?: Achievement[];
}

export function AchievementsSection({ achievements = ACHIEVEMENTS }: AchievementsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const list = achievements && achievements.length > 0 ? achievements : ACHIEVEMENTS;
  const categories = ["All", "Academics", "Olympiad", "Sports", "Co-Curricular"];

  const filteredAchievements = selectedCategory === "All"
    ? list
    : list.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 lg:py-28 bg-white text-navy-950 border-b border-cream-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700">
              <Trophy className="w-3.5 h-3.5" />
              <span>Hall of Distinction</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
              Excellence worth celebrating.
            </h2>
            <p className="text-navy-700 text-sm sm:text-base max-w-xl">
              Our scholars consistently establish new academic records in CBSE Boards, conquer National Science Olympiads, and lead the podium in athletic competitions.
            </p>
          </div>

          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-gold-400 hover:bg-navy-950 text-xs font-bold uppercase tracking-wider transition-colors self-start md:self-auto border border-gold-500/20"
          >
            <span>View All Accolades</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gold-500 text-navy-950 shadow-md font-bold"
                  : "bg-cream-100 text-navy-700 hover:bg-cream-200 border border-cream-300"
              }`}
            >
              {cat === "All" ? "All Accolades" : cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-cream-50/70 rounded-2xl p-6 border border-cream-200 shadow-sm hover:shadow-xl hover:border-gold-400/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 bg-gold-100 px-2.5 py-1 rounded-full border border-gold-200">
                    {item.category} • {item.year}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-bold text-navy-900 bg-white px-2 py-0.5 rounded shadow-xs border border-cream-300">
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.image && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-inner">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-gold-700">
                    {item.studentOrTeam} {item.classOrGrade ? `(${item.classOrGrade})` : ""}
                  </p>
                </div>

                <p className="text-xs text-navy-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-cream-200 flex items-center justify-between text-xs">
                <span className="text-navy-500 font-mono text-[11px]">DAV Public School Qilla Mandi</span>
                <Award className="w-4 h-4 text-gold-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
