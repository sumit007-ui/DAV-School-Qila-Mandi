"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowDown, ShieldCheck, Compass, Users, Award } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal, MagneticButton } from "@/components/motion";

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
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-[#0B1F33] text-white overflow-hidden pt-28 pb-8 font-sans">
      {/* Cinematic Full-Bleed Background Media */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=90&w=2400"
          alt="DAV Public School Qilla Mandi Academic Campus"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out opacity-45"
          sizes="100vw"
        />
        {/* Layered Overlays for High Legibility & Warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-[#0B1F33]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F33]/90 via-[#0B1F33]/60 to-transparent" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 my-auto py-12 lg:py-16">
        <div className="max-w-4xl space-y-7">
          {/* Eyebrow Pill in DM Mono */}
          <Reveal direction="down" delay={0.05}>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-md text-[#A8C3BC] text-xs font-mono tracking-[0.16em] uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#A8C3BC] animate-pulse" />
              <span>DAV PUBLIC SCHOOL · QILLA MANDI, BATALA · EST. 1989</span>
            </div>
          </Reveal>

          {/* Grand Prestigious Headline */}
          <div className="space-y-4">
            <LineReveal as="h1" className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-bold leading-[1.02] tracking-[-0.015em] text-white drop-shadow-md">
              {"Where Curiosity Begins,\nLeaders Emerge."}
            </LineReveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-white/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl font-sans pt-1 text-balance">
                Empowering young scholars from Nursery to Class 10 with Vedic integrity, scientific inquiry, and holistic leadership in Batala.
              </p>
            </Reveal>
          </div>

          {/* Action Buttons */}
          <Reveal direction="up" delay={0.35}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton onClick={onOpenAdmissionModal}>
                <button
                  className="px-7 py-3.5 rounded-lg bg-white hover:bg-[#F6F3ED] text-[#0B1F33] font-bold text-xs uppercase tracking-[0.14em] transition-all duration-300 shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-95 flex items-center gap-2.5 cursor-pointer font-sans"
                >
                  <span>Admissions {SCHOOL_CONFIG.admissionsSession}</span>
                  <ArrowRight className="w-4 h-4 text-[#0B1F33]" />
                </button>
              </MagneticButton>

              <button
                onClick={scrollToExplore}
                className="px-6 py-3.5 rounded-lg bg-[#163A5F]/85 hover:bg-[#163A5F] text-white font-semibold text-xs uppercase tracking-[0.14em] backdrop-blur-md border border-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer font-sans hover:border-white/40"
              >
                <Compass className="w-4 h-4 text-[#A8C3BC]" />
                <span>Explore School</span>
              </button>

              <button
                onClick={onOpenProspectusModal}
                className="text-xs uppercase tracking-[0.14em] text-white/80 hover:text-white underline underline-offset-8 py-2 px-3 transition-colors font-mono cursor-pointer font-medium"
              >
                Download Prospectus
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Meta Bar in DM Mono & Clean Spacing */}
      <Reveal direction="up" delay={0.6} className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/70">
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span className="tracking-wide">CBSE AFFILIATED #{SCHOOL_CONFIG.affiliationNo}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span className="tracking-wide">DAVCMC NEW DELHI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span className="tracking-wide">100% BOARD DISTINCTION</span>
            </div>
          </div>

          <button
            onClick={scrollToExplore}
            className="flex items-center gap-1.5 text-[#A8C3BC] hover:text-white transition-colors uppercase tracking-widest text-[10px] font-mono cursor-pointer"
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
