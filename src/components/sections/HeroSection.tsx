"use client";

import Image from "next/image";
import { ArrowRight, ArrowDown, Compass, ShieldCheck, Users, MapPin, Award } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal } from "@/components/motion";

interface HeroSectionProps {
  onOpenAdmissionModal?: () => void;
}

export function HeroSection({ onOpenAdmissionModal }: HeroSectionProps) {
  const scrollToExplore = () => {
    const el = document.getElementById("editorial-statement");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-between bg-[#4E220F] text-white overflow-hidden pt-28 lg:pt-32 pb-8 font-sans border-b border-white/10">
      {/* Full Background School Building Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/school-building.png"
          alt="DR. M.R.S. BHALLA D.A.V. SCHOOL Qila Mandi Batala Building"
          fill
          priority
          className="object-cover object-center lg:object-right scale-100 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        
        {/* Transparent Gradient Overlays - Left dark gradient for text contrast, right open for building visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4E220F] via-[#4E220F]/90 sm:via-[#4E220F]/65 to-transparent w-full sm:w-[75%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F] via-transparent to-black/30" />
      </div>

      {/* Main Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 my-auto py-6 sm:py-8 lg:py-16">
        <div className="max-w-2xl sm:max-w-3xl space-y-5 sm:space-y-6">
          {/* Eyebrow Pill with Official Crest Logo */}
          <Reveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#4E220F]/85 border border-white/20 backdrop-blur-md text-[#B0BA99] text-[10px] sm:text-xs font-mono tracking-[0.12em] uppercase shadow-lg max-w-full">
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Dr. M.R.S. Bhalla D.A.V. School Crest"
                  width={28}
                  height={28}
                  className="object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="font-semibold text-white tracking-wider sm:tracking-widest truncate">WELCOME TO DR. M.R.S. BHALLA D.A.V. SCHOOL</span>
            </div>
          </Reveal>

          {/* Grand Prestigious Headline */}
          <div className="space-y-3">
            <LineReveal as="h1" className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.08] sm:leading-[1.05] tracking-[-0.015em] drop-shadow-lg">
              {"Nurturing Excellence,\nInspiring Futures."}
            </LineReveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-[#F7F1DE] text-sm sm:text-lg md:text-xl font-normal leading-relaxed max-w-xl font-sans pt-1 drop-shadow-md">
                A welcoming environment where students learn, grow and prepare for a brighter future at Qila Mandi, Batala.
              </p>
            </Reveal>
          </div>

          {/* Action CTAs */}
          <Reveal direction="up" delay={0.35}>
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={scrollToExplore}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer font-sans border border-white/10"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Explore Our School</span>
              </button>

              <button
                onClick={onOpenAdmissionModal}
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#4E220F]/90 hover:bg-[#4E220F] text-white font-bold text-xs uppercase tracking-[0.14em] backdrop-blur-md border border-white/30 transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <span>Admissions</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Meta Bar in DM Mono & Clean Spacing */}
      <Reveal direction="up" delay={0.5} className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 border-t border-white/15 bg-gradient-to-t from-[#4E220F] to-transparent">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-white/90">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
              <span className="tracking-wide">QILA MANDI, BATALA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
              <span className="tracking-wide">PSEB AFFILIATED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
              <span className="tracking-wide">DAVCMC NEW DELHI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
              <span className="tracking-wide">100% PSEB PASS</span>
            </div>
          </div>

          <button
            onClick={scrollToExplore}
            className="flex items-center gap-1.5 text-[#B0BA99] hover:text-white transition-colors uppercase tracking-widest text-[10px] font-mono cursor-pointer self-end sm:self-auto pt-2 sm:pt-0"
            aria-label="Scroll to explore"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
