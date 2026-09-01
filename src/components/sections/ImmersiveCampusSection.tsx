"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Sparkles, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { CAMPUS_FACILITIES } from "@/lib/data/campus";
import { CampusFacility } from "@/types";

interface ImmersiveCampusSectionProps {
  facilities?: CampusFacility[];
}

export function ImmersiveCampusSection({ facilities = CAMPUS_FACILITIES }: ImmersiveCampusSectionProps) {
  const [selectedFacility, setSelectedFacility] = useState(0);
  const list = facilities && facilities.length > 0 ? facilities : CAMPUS_FACILITIES;
  const facility = list[selectedFacility] || list[0];

  const handlePrev = () => {
    setSelectedFacility((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedFacility((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white border-b border-navy-800 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 editorial-dark-grain opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Campus Infrastructure & Laboratories</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
              A campus designed for discovery.
            </h2>
            <p className="text-cream-300 text-sm sm:text-base max-w-xl">
              Spread over 12 green acres in Batala, our purpose-built infrastructure blends modern science laboratories, robotics ateliers, athletic arenas, and peaceful study sanctuaries.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-navy-900 border border-navy-700 text-cream-100 hover:bg-gold-500 hover:text-navy-950 transition-colors"
              aria-label="Previous facility"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-navy-900 border border-navy-700 text-cream-100 hover:bg-gold-500 hover:text-navy-950 transition-colors"
              aria-label="Next facility"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Facility Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CAMPUS_FACILITIES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedFacility(idx)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFacility === idx
                  ? "bg-gold-500 text-navy-950 shadow-md"
                  : "bg-navy-900 text-cream-300 hover:bg-navy-800 hover:text-white border border-navy-800"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Active Facility Hero Card */}
        <div className="bg-navy-900/90 rounded-2xl border border-navy-800 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Image Area (Span 7) */}
            <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[440px]">
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 800px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
              
              {/* Badge */}
              {facility.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-950/80 border border-gold-500/40 text-gold-300 text-xs font-mono font-semibold backdrop-blur-md">
                  {facility.badge}
                </div>
              )}
            </div>

            {/* Right Details Area (Span 5) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                  {facility.category} Facility • 0{selectedFacility + 1}/{CAMPUS_FACILITIES.length}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                  {facility.title}
                </h3>

                <p className="text-sm font-medium text-gold-200">
                  {facility.headline}
                </p>

                <p className="text-xs sm:text-sm text-cream-300 leading-relaxed">
                  {facility.description}
                </p>

                {/* Specs List */}
                <div className="space-y-2 pt-2 border-t border-navy-800">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 font-bold block">
                    Specifications & Capabilities:
                  </span>
                  <div className="space-y-1.5">
                    {facility.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-xs text-cream-200">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-navy-800 flex items-center justify-between">
                <Link
                  href="/campus"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <span>View Full Campus Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[11px] text-cream-400 font-mono">
                  12 Acres • CCTV Safe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
