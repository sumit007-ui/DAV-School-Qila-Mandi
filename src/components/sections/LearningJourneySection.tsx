"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { ACADEMIC_PROGRAMS } from "@/lib/data/academics";
import { AcademicProgram } from "@/types";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { EditorialEyebrow } from "@/components/ui/SplitText";

interface LearningJourneySectionProps {
  stages?: AcademicProgram[];
}

export function LearningJourneySection({ stages: propStages = ACADEMIC_PROGRAMS }: LearningJourneySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openAdmissionModal } = useAppModals();
  const programs = propStages && propStages.length > 0 ? propStages : ACADEMIC_PROGRAMS;
  const activeProgram = programs[activeIndex] || programs[0];

  const stages = [
    { title: "Nursery", subtitle: "Pre-Nursery, Nursery, LKG, UKG", summary: "Early learning, curiosity, confidence and foundational development." },
    { title: "Primary", subtitle: "Classes 1 to 5", summary: "Strong fundamentals, exploration and joyful learning." },
    { title: "Middle School", subtitle: "Classes 6 to 8", summary: "Independent thinking, discovery and broader academic development." },
    { title: "Secondary", subtitle: "Class 9", summary: "Deeper subject understanding, discipline and personal growth." },
    { title: "Class 10", subtitle: "CBSE Board Examination", summary: "Academic preparation, confidence, responsibility and future readiness." }
  ];

  return (
    <section id="learning-journey" className="py-28 lg:py-36 bg-[#FBF9F4] text-navy-950 border-b border-cream-300/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <EditorialEyebrow>02 • Educational Continuum</EditorialEyebrow>
            <h2 className="font-serif text-4xl sm:text-6xl text-navy-950 font-normal tracking-tight">
              A JOURNEY THAT <br />
              <span className="italic text-gold-600 font-light">GROWS WITH THEM.</span>
            </h2>
            <p className="text-navy-700 text-sm sm:text-base max-w-xl font-light">
              From early childhood play and wonder in Nursery to confident Class 10 CBSE Board triumph, every phase of your child's education is carefully nurtured.
            </p>
          </div>

          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 hover:text-gold-700 transition-colors self-start md:self-auto border-b border-navy-950 pb-1"
          >
            <span>Explore Complete Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stage Timeline Navigation Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#060F1E] text-white border-gold-500/60 shadow-2xl scale-[1.02]"
                    : "bg-white text-navy-900 border-cream-300 hover:bg-cream-100/80 hover:border-gold-400"
                }`}
              >
                <div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-[0.25em] block mb-2 ${
                      isActive ? "text-gold-400" : "text-gold-700"
                    }`}
                  >
                    Phase 0{idx + 1}
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-normal ${isActive ? "text-white" : "text-navy-950"}`}>
                    {stage.title}
                  </h3>
                </div>
                <p className={`text-xs mt-3 line-clamp-2 ${isActive ? "text-cream-300" : "text-navy-600"}`}>
                  {stage.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Showcase Canvas */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-cream-300/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
            {/* Left Full-Height Photographic Canvas (Span 6) */}
            <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto lg:h-[540px]">
              <Image
                src={activeProgram.image}
                alt={activeProgram.level}
                fill
                className="object-cover transition-transform duration-1000 ease-out scale-105"
                sizes="(max-width: 1024px) 100vw, 650px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E]/80 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#060F1E]/90 backdrop-blur-md text-gold-300 text-xs font-mono font-bold tracking-wider">
                {activeProgram.classes}
              </div>
            </div>

            {/* Right Narrative Area (Span 6) */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-gold-700">
                  Stage 0{activeIndex + 1} of 05 • {activeProgram.classes}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                  {activeProgram.level}
                </h3>
                <p className="text-sm font-semibold text-gold-800">
                  {activeProgram.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-navy-700 leading-relaxed font-light">
                {activeProgram.description}
              </p>

              {/* Key Features */}
              <div className="space-y-3 pt-3 border-t border-cream-300/80">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-navy-900 block">
                  Developmental Milestones:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProgram.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-navy-800">
                      <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-cream-300/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => openAdmissionModal(activeProgram.level.split(" ")[0])}
                  className="px-6 py-3 rounded-full bg-[#060F1E] hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Apply for {activeProgram.level.split(" ")[0]}
                </button>

                <Link
                  href={`/academics#${activeProgram.slug}`}
                  className="text-xs text-navy-950 hover:text-gold-700 font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <span>Syllabus & Subjects</span>
                  <ChevronRight className="w-4 h-4 text-gold-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
