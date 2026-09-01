"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, FileText, ChevronRight, X } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-navy-950 text-cream-100 border-b border-navy-800 text-xs py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Admissions Notice */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider animate-pulse-subtle">
            <Sparkles className="w-3 h-3" /> Admissions {SCHOOL_CONFIG.admissionsSession}
          </span>
          <span className="text-cream-200 hidden sm:inline">
            Registration open for Nursery to Class XI • Merit Scholarships available.
          </span>
          <Link
            href="/admissions"
            className="text-gold-400 font-medium hover:underline inline-flex items-center gap-0.5 ml-1"
          >
            Apply Online <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Quick School Info & TC */}
        <div className="flex items-center gap-4 text-cream-300 text-[11px]">
          <div className="hidden lg:flex items-center gap-2">
            <span className="font-mono text-gold-300/80">CBSE Affiliation No: {SCHOOL_CONFIG.affiliationNo}</span>
            <span className="text-navy-700">|</span>
          </div>

          <a
            href={`tel:${SCHOOL_CONFIG.contact.admissionsHelpline}`}
            className="flex items-center gap-1 hover:text-gold-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-gold-400" />
            <span className="font-mono">{SCHOOL_CONFIG.contact.admissionsHelpline}</span>
          </a>

          <Link
            href="/admissions#fee-structure"
            className="hidden md:flex items-center gap-1 hover:text-gold-300 transition-colors"
          >
            <FileText className="w-3 h-3 text-gold-400" />
            <span>Fee Structure</span>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="text-cream-400 hover:text-white p-0.5 ml-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
