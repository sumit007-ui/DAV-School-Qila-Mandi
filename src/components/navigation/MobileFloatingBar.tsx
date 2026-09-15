"use client";

import { useState, useEffect } from "react";
import { Phone, Sparkles, MapPin } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

export function MobileFloatingBar({ onOpenAdmissionModal }: { onOpenAdmissionModal?: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled beyond 300px (past top hero)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside aria-label="Quick School Actions" className="fixed bottom-0 left-0 right-0 z-50 bg-[#4E220F]/95 backdrop-blur-xl border-t border-white/10 p-2 sm:hidden shadow-2xl font-sans pb-[max(8px,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono font-medium text-white/80">
        {/* Reception Call */}
        <a
          href={`tel:${SCHOOL_CONFIG.contact.receptionPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-white transition-all min-h-[46px] border border-white/10"
        >
          <Phone className="w-4 h-4 text-[#B0BA99]" />
          <span>Reception</span>
        </a>

        {/* Office Call */}
        <a
          href={`tel:${SCHOOL_CONFIG.contact.officePhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-[#9D6638]/60 border border-[#9D6638] text-[#B0BA99] active:scale-95 transition-all min-h-[46px]"
        >
          <Phone className="w-4 h-4 text-[#B0BA99]" />
          <span>Office</span>
        </a>

        {/* Directions */}
        <a
          href={SCHOOL_CONFIG.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 text-white transition-all min-h-[46px] border border-white/10"
        >
          <MapPin className="w-4 h-4 text-[#B0BA99]" />
          <span>Location</span>
        </a>

        {/* Apply Now Primary CTA */}
        <button
          onClick={onOpenAdmissionModal}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-[#9D6638] text-white font-bold active:scale-95 transition-all min-h-[46px] shadow-sm cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>Apply</span>
        </button>
      </div>
    </aside>
  );
}
