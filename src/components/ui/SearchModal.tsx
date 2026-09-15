"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Building2, Trophy, Newspaper, ArrowRight, Compass, Sparkles } from "lucide-react";
import { ACADEMIC_PROGRAMS } from "@/lib/data/academics";
import { CAMPUS_FACILITIES } from "@/lib/data/campus";
import { ACHIEVEMENTS } from "@/lib/data/achievements";
import { NEWS_STORIES } from "@/lib/data/news";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchPageItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  keywords: string[];
}

const SITE_PAGES: SearchPageItem[] = [
  {
    id: "admissions-page",
    title: "Admissions 2026-27 Session",
    category: "Admissions",
    description: "Admission guidelines, application form, required documents, and age criteria for Nursery to Class 10.",
    href: "/admissions",
    keywords: ["admission", "admissions 2026-27", "apply", "enrolment", "nursery admission", "registration", "form"],
  },
  {
    id: "fee-structure",
    title: "School Fee Structure 2026-27",
    category: "Admissions",
    description: "Detailed breakdown of tuition, quarterly fee schedule, and transparent fee policies.",
    href: "/admissions#fee-structure",
    keywords: ["fee", "fee structure", "fees", "cost", "tuition", "charges", "quarterly"],
  },
  {
    id: "about-page",
    title: "About Dr. MRS Bhalla DAV High School",
    category: "About Us",
    description: "Institutional genesis since 1990, over 35 years of educational legacy, and DAVCMC New Delhi management.",
    href: "/about",
    keywords: ["about", "about school", "history", "genesis", "1990", "davcmc", "heritage", "legacy", "motto"],
  },
  {
    id: "principal-message",
    title: "Principal's Message",
    category: "Leadership",
    description: "Inspiring perspective from Head of Institution Mrs. Paramjit Kaur on character building and holistic education.",
    href: "/about#principal-message",
    keywords: ["principal", "principal message", "paramjit", "head", "leadership"],
  },
  {
    id: "house-system",
    title: "The Four House System",
    category: "Student Life",
    description: "Bose House, Azad House, Bhagat House, and Patel House fostering leadership, camaraderie, and sports championships.",
    href: "/student-life",
    keywords: ["house", "houses", "house system", "bose house", "azad house", "bhagat house", "patel house", "student life"],
  },
  {
    id: "campus-page",
    title: "Campus Infrastructure & Facilities",
    category: "Campus",
    description: "Explore our modern classrooms, computer labs, composite science laboratories, and campus grounds.",
    href: "/campus",
    keywords: ["campus", "facilities", "infrastructure", "building", "grounds"],
  },
  {
    id: "computer-lab-page",
    title: "Modern Computer & IT Laboratory",
    category: "Facilities",
    description: "Equipped with high-speed internet, coding tools, multimedia learning, and digital education suites.",
    href: "/campus#computer-lab",
    keywords: ["computer", "computer lab", "it lab", "coding", "software", "technology", "multimedia"],
  },
  {
    id: "science-labs-page",
    title: "Advanced Composite & Science Labs",
    category: "Facilities",
    description: "Practical Physics, Chemistry, and Biology experiment stations for hands-on empirical discovery.",
    href: "/campus#science-laboratories",
    keywords: ["science", "science lab", "physics", "chemistry", "biology", "experiments", "practical"],
  },
  {
    id: "mandatory-disclosure",
    title: "PSEB Mandatory Public Disclosure",
    category: "Statutory",
    description: "Official institutional credentials, board affiliation under PSEB Mohali, and DAVCMC management details.",
    href: "/mandatory-disclosure",
    keywords: ["disclosure", "mandatory disclosure", "pseb disclosure", "affiliation", "statutory", "pseb"],
  },
  {
    id: "contact-page",
    title: "Contact Us & Location Helpdesk",
    category: "Contact",
    description: "Qilla Mandi Batala campus address, phone numbers, email, inquiry desk, and visiting hours.",
    href: "/contact",
    keywords: ["contact", "contact us", "phone", "email", "address", "location", "batala", "qilla mandi", "helpdesk"],
  },
  {
    id: "gallery-page",
    title: "Campus Photo Gallery",
    category: "Media",
    description: "Photographic glimpses of campus activities, athletic meets, havan ceremonies, and school celebrations.",
    href: "/gallery",
    keywords: ["gallery", "photos", "pictures", "images", "events gallery"],
  },
  {
    id: "events-page",
    title: "Events Calendar & Sports Championship",
    category: "Events",
    description: "Annual sports meet, parent-teacher conclaves, academic festivals, and cultural events schedule.",
    href: "/events",
    keywords: ["events", "calendar", "sports meet", "athletic", "conclave", "annual function"],
  },
];

const QUICK_SUGGESTIONS = [
  "Admissions 2026-27",
  "Fee Structure",
  "About School",
  "Computer Lab",
  "Science Labs",
  "House System",
  "PSEB Toppers",
  "Contact Us",
];

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

  // Reset query on open
  useEffect(() => {
    if (isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredPages = SITE_PAGES.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.keywords.some((k) => k.includes(normalizedQuery) || normalizedQuery.includes(k))
  );

  const filteredAcademics = ACADEMIC_PROGRAMS.filter(
    (item) =>
      item.level.toLowerCase().includes(normalizedQuery) ||
      item.classes.toLowerCase().includes(normalizedQuery) ||
      item.tagline.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery)
  );

  const filteredFacilities = CAMPUS_FACILITIES.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.headline.toLowerCase().includes(normalizedQuery)
  );

  const filteredAchievements = ACHIEVEMENTS.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.studentOrTeam.toLowerCase().includes(normalizedQuery) ||
      (normalizedQuery.includes("topper") || normalizedQuery.includes("pseb"))
  );

  const filteredNews = NEWS_STORIES.filter(
    (item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.excerpt.toLowerCase().includes(normalizedQuery)
  );

  const totalResults =
    filteredPages.length +
    filteredAcademics.length +
    filteredFacilities.length +
    filteredAchievements.length +
    filteredNews.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-[#4E220F]/80 backdrop-blur-md animate-fade-in font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#4E220F]/10 flex items-center gap-3 bg-[#F7F1DE]">
          <Search className="w-5 h-5 text-[#9D6638] shrink-0" />
          <input
            type="text"
            placeholder="Search admissions, fee, labs, houses, contact..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-[#4E220F] placeholder-[#9D6638]/60 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#4E220F]/60 hover:text-[#4E220F] rounded-lg transition-colors text-xs font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#4E220F]/60 hover:text-[#4E220F] rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6">
          {normalizedQuery === "" ? (
            <div className="py-8 text-center text-[#4E220F]/70 space-y-3">
              <p className="text-sm font-medium">Quick Suggestions:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                {QUICK_SUGGESTIONS.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-3 py-1.5 rounded-lg bg-[#F7F1DE] text-xs text-[#4E220F] hover:bg-[#9D6638] hover:text-[#F7F1DE] transition-colors border border-[#4E220F]/10 font-medium cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-[#4E220F]/70 space-y-2">
              <p className="text-base font-serif text-[#4E220F] font-bold">No direct matches found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#4E220F]/60 font-normal">
                Try searching for &quot;Admissions&quot;, &quot;Fee&quot;, &quot;Science Lab&quot;, &quot;Houses&quot;, or &quot;Contact&quot;.
              </p>
            </div>
          ) : (
            <>
              {/* Pages & Portals Section */}
              {filteredPages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9D6638] uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Pages & Portals ({filteredPages.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredPages.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F1DE] border border-transparent hover:border-[#4E220F]/10 transition-colors group"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-[#4E220F] group-hover:text-[#9D6638]">
                              {item.title}
                            </p>
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#4E220F]/10 text-[#4E220F]">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#4E220F]/70 line-clamp-1 font-normal">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9D6638] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus Facilities */}
              {filteredFacilities.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9D6638] uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Campus Facilities ({filteredFacilities.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredFacilities.map((item) => (
                      <Link
                        key={item.id}
                        href={`/campus#${item.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F1DE] border border-transparent hover:border-[#4E220F]/10 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#4E220F] group-hover:text-[#9D6638]">{item.title}</p>
                          <p className="text-xs text-[#4E220F]/70 line-clamp-1 font-normal">{item.headline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9D6638] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Wings */}
              {filteredAcademics.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9D6638] uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Wings ({filteredAcademics.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredAcademics.map((item) => (
                      <Link
                        key={item.id}
                        href={`/academics#${item.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F1DE] border border-transparent hover:border-[#4E220F]/10 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#4E220F] group-hover:text-[#9D6638]">{item.level}</p>
                          <p className="text-xs text-[#4E220F]/70 line-clamp-1 font-normal">{item.classes} • {item.tagline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9D6638] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {filteredAchievements.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9D6638] uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Achievements & Awards ({filteredAchievements.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredAchievements.map((item) => (
                      <Link
                        key={item.id}
                        href="/achievements"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F1DE] border border-transparent hover:border-[#4E220F]/10 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#4E220F] group-hover:text-[#9D6638]">{item.title}</p>
                          <p className="text-xs text-[#4E220F]/70 font-normal">{item.studentOrTeam} ({item.year})</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9D6638] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* News & Stories */}
              {filteredNews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9D6638] uppercase tracking-wider">
                    <Newspaper className="w-3.5 h-3.5" />
                    <span>News & Stories ({filteredNews.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredNews.map((item) => (
                      <Link
                        key={item.id}
                        href="/news"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F1DE] border border-transparent hover:border-[#4E220F]/10 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#4E220F] group-hover:text-[#9D6638]">{item.title}</p>
                          <p className="text-xs text-[#4E220F]/70 line-clamp-1 font-normal">{item.date} • {item.excerpt}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9D6638] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F7F1DE] border-t border-[#4E220F]/10 text-center text-xs text-[#4E220F]/70 flex items-center justify-between px-4">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded text-[#4E220F] border border-[#4E220F]/10 font-bold">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
