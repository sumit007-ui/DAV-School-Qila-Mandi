"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Phone, FileText, ChevronRight, X } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#4E220F] text-white border-b border-white/10 text-xs py-2 px-4 relative z-50 font-sans">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Admissions Notice */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1 bg-[#9D6638]/40 text-[#B0BA99] border border-[#9D6638] px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-[0.14em]">
            <Sparkles className="w-3 h-3 text-[#B0BA99]" /> Admissions {SCHOOL_CONFIG.admissionsSession}
          </span>
          <span className="text-white/80 hidden sm:inline text-xs">
            Registration open for Nursery to Class 10 • Merit Scholarships available.
          </span>
          <Link
            href="/admissions"
            className="text-[#B0BA99] font-semibold hover:underline inline-flex items-center gap-0.5 ml-1 text-xs"
          >
            Apply Online <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Right: Quick School Info & TC */}
        <div className="flex items-center gap-4 text-white/70 text-xs font-mono">
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-white/60 tracking-wider text-[11px]">PSEB #{SCHOOL_CONFIG.affiliationNo}</span>
            <span className="text-white/20">|</span>
          </div>

          <a
            href={`tel:${SCHOOL_CONFIG.contact.admissionsHelpline}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors text-[11px] tracking-wide"
          >
            <Phone className="w-3 h-3 text-[#B0BA99]" />
            <span>{SCHOOL_CONFIG.contact.admissionsHelpline}</span>
          </a>

          <Link
            href="/admissions#fee-structure"
            className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors text-[11px] tracking-wide"
          >
            <FileText className="w-3.5 h-3.5 text-[#B0BA99]" />
            <span>Fee Structure</span>
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white p-0.5 ml-1 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
