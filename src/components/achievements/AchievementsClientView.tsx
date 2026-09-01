"use client";

import { useState } from "react";
import Image from "next/image";
import { Trophy, Filter, Award } from "lucide-react";
import { Achievement } from "@/types";

interface AchievementsClientViewProps {
  achievements: Achievement[];
}

export function AchievementsClientView({ achievements }: AchievementsClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const categories = ["All", "Academics", "Olympiad", "Sports", "Co-Curricular"];
  
  // Extract unique years from data or default
  const years = [
    "All",
    ...Array.from(new Set(achievements.map((item) => item.year).filter(Boolean))),
  ];

  const filtered = achievements.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchYear = selectedYear === "All" || item.year === selectedYear;
    return matchCat && matchYear;
  });

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920"
            alt="Dr. M.R.S Bhalla D.A.V High School Achievements"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Distinctions</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Hall of Distinction.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            Celebrating the monumental triumphs of DAV scholars across PSEB Board exams, State & National Olympiads, athletic tournaments, and youth symposia.
          </p>
        </div>
      </section>

      {/* Filterable Grid */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Bar */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-cream-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <span className="text-xs font-mono font-bold text-navy-500 uppercase mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-gold-500 text-navy-950 font-bold shadow-sm"
                      : "bg-cream-100 text-navy-700 hover:bg-cream-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-mono font-bold text-navy-500 uppercase">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cream-100 text-navy-900 border border-cream-300 focus:outline-none"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-16 text-navy-600 font-mono text-sm">
                No achievements recorded under this selection.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-cream-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
                        {item.category} • {item.year}
                      </span>
                      {item.badge && (
                        <span className="text-xs font-bold text-navy-900 bg-cream-100 px-2.5 py-0.5 rounded border border-cream-300">
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
                      <h3 className="font-serif text-xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-gold-700 font-semibold">
                        {item.studentOrTeam} {item.classOrGrade ? `(${item.classOrGrade})` : ""}
                      </p>
                    </div>

                    <p className="text-xs text-navy-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between text-xs text-navy-500">
                    <span className="font-mono text-[11px]">Dr. M.R.S Bhalla D.A.V High School</span>
                    <Award className="w-4 h-4 text-gold-600" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
