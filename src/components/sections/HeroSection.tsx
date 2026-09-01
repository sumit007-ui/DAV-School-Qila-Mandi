"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowDown, ShieldCheck, Compass, Users, Award } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

interface HeroSectionProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
}

export function HeroSection({ onOpenAdmissionModal, onOpenProspectusModal }: HeroSectionProps) {
  const scrollToExplore = () => {
    const el = document.getElementById("editorial-statement");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-[#060F1E] text-white overflow-hidden pt-28 pb-10">
      {/* Cinematic Full-Bleed Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=90&w=2400"
          alt="DAV Public School Qilla Mandi Architecture"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Layered Editorial Overlays for High Legibility & Warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/60 to-[#060F1E]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/95 via-[#060F1E]/60 to-transparent" />
        <div className="absolute inset-0 editorial-dark-grain opacity-25 pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="max-w-4xl space-y-6 sm:space-y-8">
          {/* Letter-Spaced Monospace Eyebrow */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-gold-300 text-[11px] font-mono tracking-[0.25em] uppercase">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span>DAV Public School • Qilla Mandi • Nursery to Class 10</span>
          </div>

          {/* Grand Fluid Display Headline */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] tracking-tight text-white">
              Growing minds. <br />
              <span className="italic font-light text-gold-300">
                Building futures.
              </span>
            </h1>

            <p className="text-cream-200 text-lg sm:text-2xl font-light leading-relaxed max-w-2xl">
              A prestigious, values-grounded educational sanctuary where every child's curiosity is nurtured from Nursery through Class 10.
            </p>
          </div>

          {/* Minimalist Editorial Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={onOpenAdmissionModal}
              className="px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 shadow-xl shadow-gold-500/25 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span>Admissions {SCHOOL_CONFIG.admissionsSession}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToExplore}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] backdrop-blur-md border border-white/20 transition-all duration-300 flex items-center gap-2.5"
            >
              <Compass className="w-4 h-4 text-gold-400" />
              <span>Explore Our Story</span>
            </button>

            <button
              onClick={onOpenProspectusModal}
              className="text-xs uppercase tracking-widest text-cream-300 hover:text-gold-300 underline underline-offset-8 py-2 px-3 transition-colors font-mono"
            >
              Download Prospectus PDF
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Meta Bar & Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cream-300/80">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>CBSE Affiliated #{SCHOOL_CONFIG.affiliationNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold-400" />
            <span>Managed by DAVCMC, New Delhi</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-gold-400" />
            <span>100% Class 10 Distinction</span>
          </div>
        </div>

        <button
          onClick={scrollToExplore}
          className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors uppercase tracking-widest text-[11px]"
          aria-label="Scroll to discover"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
