"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Building2, Trophy, Newspaper, ArrowRight } from "lucide-react";
import { ACADEMIC_PROGRAMS } from "@/lib/data/academics";
import { CAMPUS_FACILITIES } from "@/lib/data/campus";
import { ACHIEVEMENTS } from "@/lib/data/achievements";
import { NEWS_STORIES } from "@/lib/data/news";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAcademics = ACADEMIC_PROGRAMS.filter(
    (item) =>
      item.level.toLowerCase().includes(query.toLowerCase()) ||
      item.classes.toLowerCase().includes(query.toLowerCase()) ||
      item.tagline.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFacilities = CAMPUS_FACILITIES.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAchievements = ACHIEVEMENTS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.studentOrTeam.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNews = NEWS_STORIES.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    filteredAcademics.length +
    filteredFacilities.length +
    filteredAchievements.length +
    filteredNews.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-cream-200 flex items-center gap-3 bg-cream-50/50">
          <Search className="w-5 h-5 text-gold-600 shrink-0" />
          <input
            type="text"
            placeholder="Search programs, labs, achievements, admissions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-navy-950 placeholder-navy-400 focus:outline-none text-base"
          />
          <button
            onClick={onClose}
            className="p-1 text-navy-400 hover:text-navy-950 rounded-lg hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-navy-500 space-y-3">
              <p className="text-sm font-medium">Quick Suggestions:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                {["Admissions 2026-27", "Fee Structure", "Atal Tinkering Lab", "Senior Secondary Streams", "CBSE Toppers", "Robotics"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-3 py-1.5 rounded-lg bg-cream-100 text-xs text-navy-800 hover:bg-gold-50 hover:text-gold-700 transition-colors border border-cream-200"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-navy-500">
              <p className="text-base font-serif text-navy-900 font-semibold">No direct matches found</p>
              <p className="text-xs text-navy-500 mt-1">Try searching for "Nursery", "Science Lab", "Fee", or "Sports".</p>
            </div>
          ) : (
            <>
              {/* Academics Section */}
              {filteredAcademics.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Programs ({filteredAcademics.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredAcademics.map((item) => (
                      <Link
                        key={item.id}
                        href={`/academics#${item.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-cream-50 border border-transparent hover:border-cream-200 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-navy-950 group-hover:text-gold-700">{item.level}</p>
                          <p className="text-xs text-navy-600 line-clamp-1">{item.classes} • {item.tagline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus Facilities */}
              {filteredFacilities.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Campus Facilities ({filteredFacilities.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredFacilities.map((item) => (
                      <Link
                        key={item.id}
                        href={`/campus#${item.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-cream-50 border border-transparent hover:border-cream-200 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-navy-950 group-hover:text-gold-700">{item.title}</p>
                          <p className="text-xs text-navy-600 line-clamp-1">{item.headline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {filteredAchievements.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Achievements & Awards ({filteredAchievements.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredAchievements.map((item) => (
                      <Link
                        key={item.id}
                        href="/achievements"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-cream-50 border border-transparent hover:border-cream-200 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-navy-950 group-hover:text-gold-700">{item.title}</p>
                          <p className="text-xs text-navy-600">{item.studentOrTeam} ({item.year})</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News & Stories */}
              {filteredNews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>News & Stories ({filteredNews.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredNews.map((item) => (
                      <Link
                        key={item.id}
                        href="/news"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-cream-50 border border-transparent hover:border-cream-200 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-navy-950 group-hover:text-gold-700">{item.title}</p>
                          <p className="text-xs text-navy-600 line-clamp-1">{item.date} • {item.excerpt}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-cream-50 border-t border-cream-200 text-center text-xs text-navy-500 flex items-center justify-between px-4">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono text-[11px] bg-cream-200 px-1.5 py-0.5 rounded text-navy-700">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
