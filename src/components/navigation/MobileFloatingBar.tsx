"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Sparkles, MapPin } from "lucide-react";
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
    <aside aria-label="Quick School Actions" className="fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-lg border-t border-navy-800 p-2 sm:hidden shadow-2xl animate-fade-in">
      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-medium text-cream-200">
        {/* Quick Call */}
        <a
          href={`tel:${SCHOOL_CONFIG.contact.primaryPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-navy-900/80 hover:bg-navy-800 text-cream-100 transition-colors min-h-[44px]"
        >
          <Phone className="w-4 h-4 text-gold-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={SCHOOL_CONFIG.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-emerald-950/90 border border-emerald-700/40 text-emerald-300 transition-colors min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={SCHOOL_CONFIG.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-navy-900/80 hover:bg-navy-800 text-cream-200 transition-colors min-h-[44px]"
        >
          <MapPin className="w-4 h-4 text-gold-400" />
          <span>Directions</span>
        </a>

        {/* Apply Now Primary CTA */}
        <button
          onClick={onOpenAdmissionModal}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-1 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 font-bold transition-all shadow-md active:scale-95 min-h-[44px]"
        >
          <Sparkles className="w-4 h-4 text-navy-950" />
          <span>Admissions</span>
        </button>
      </div>
    </aside>
  );
}
