"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, BookOpen, Award, Compass, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { LineReveal, Reveal } from "@/components/motion";

const JOURNEY_STAGES = [
  {
    phase: "01",
    tag: "EARLY YEARS",
    title: "Nursery & Kindergarten",
    classes: "Pre-Nursery, Nursery, LKG, UKG",
    age: "Ages 2.5 to 5 Years",
    tagline: "Foundational Wonder, Play-Based Inquiry & Emotional Safety",
    description: "Our early childhood sanctuary is built around play-infused sensory discovery. Children cultivate early phonetic fluency, gross motor agility, collaborative empathy, and joy of discovery in a nurturing environment with dedicated female care attendants.",
    image: "https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=85&w=1200",
    milestones: ["Phonetic & Pre-Reading Mastery", "Montessori Spatial & Tactile Kits", "Joyful Music & Motor Coordination", "Safe, Caring Female Attendant Care"]
  },
  {
    phase: "02",
    tag: "PRIMARY EDUCATION",
    title: "Primary School",
    classes: "Classes 1 to 5",
    age: "Ages 6 to 10 Years",
    tagline: "Strong Fundamentals, Bilingual Clarity & Scientific Curiosities",
    description: "Transitioning from early wonder into structured conceptual understanding. We emphasize mathematical logic, expressive English & Punjabi articulation, environmental studies, and weekly hands-on experiments in our junior lab.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1200",
    milestones: ["Conceptual Numeracy & Mental Math", "75-inch Interactive Smart Panels", "Bilingual Public Speaking & Poetry", "Weekly Computer & Science Lab Practical"]
  },
  {
    phase: "03",
    tag: "MIDDLE WING",
    title: "Middle School",
    classes: "Classes 6 to 8",
    age: "Ages 11 to 13 Years",
    tagline: "Independent Critical Thinking, Robotics & Broadened Horizons",
    description: "Middle schoolers develop analytical depth, scientific experimentation in composite laboratories, inter-house debates, competitive athletics, and value-based Vedic grounding with daily moral discourses.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=85&w=1200",
    milestones: ["Hands-on Science Lab Experiments", "Robotics, IoT & Python Coding", "Inter-House Championship League", "Vedic Heritage & Moral Ethics"]
  },
  {
    phase: "04",
    tag: "SECONDARY TRANSITION",
    title: "Secondary Wing",
    classes: "Class 9",
    age: "Ages 14+ Years",
    tagline: "Rigorous Subject Deep-Dive, Discipline & Future Blueprinting",
    description: "Preparing students for high-stakes academic pathways with specialized educators, rigorous periodic assessments, olympiad coaching, and leadership roles in the student council prefectorial board.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=85&w=1200",
    milestones: ["PSEB Board Aligned Question Banks", "Olympiad & NTSE Focused Modules", "Student Council & Prefectorial Board", "Individual Academic Mentorship"]
  },
  {
    phase: "05",
    tag: "BOARD DISTINCTION",
    title: "Class 10 PSEB Board",
    classes: "Class 10 Milestone",
    age: "Ages 15+ Years",
    tagline: "Academic Triumph, 100% Pass Record & Confident Leadership",
    description: "The culmination of school life at DAV Qilla Mandi. Comprehensive mock boards, personalized doubt resolution, and psychological resilience coaching producing district toppers year after year in Batala.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=85&w=1200",
    milestones: ["100% PSEB Board Pass Record", "District Rank 1 Legacy in Batala", "Dedicated 1-on-1 Faculty Cliniques", "Career Counseling & Stream Roadmaps"]
  }
];

function PhaseCard({ stage, index, onInView }: { stage: typeof JOURNEY_STAGES[0]; index: number; onInView: (idx: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const { openAdmissionModal } = useAppModals();

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <motion.div
      ref={ref}
      id={`phase-${stage.phase}`}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#9D6638]/20 transition-all duration-500 hover:shadow-xl hover:border-[#9D6638]/40 group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[420px]">
        {/* Left Image (Span 7) */}
        <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[440px] overflow-hidden bg-[#4E220F]">
          <Image
            src={stage.image}
            alt={stage.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/90 via-transparent to-transparent" />
          
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#4E220F]/90 backdrop-blur-md text-[#B0BA99] text-xs font-mono font-semibold tracking-wider border border-white/10">
            PHASE {stage.phase} · {stage.classes}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white lg:hidden">
            <span className="text-[10px] font-mono text-[#B0BA99] block">{stage.age}</span>
            <h3 className="font-editorial text-2xl font-normal">{stage.title}</h3>
          </div>
        </div>

        {/* Right Info (Span 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#9D6638] font-bold">
                STAGE {stage.phase} OF 05 · {stage.tag}
              </span>
              <span className="text-[11px] font-mono text-[#7E5F4E] bg-[#F7F1DE] px-2 py-0.5 rounded font-medium">
                {stage.age}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#4E220F] font-normal leading-tight">
                {stage.title}
              </h3>
              <p className="text-xs font-bold text-[#9D6638]">
                {stage.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#4E220F]/90 leading-relaxed font-normal">
              {stage.description}
            </p>

            {/* Milestones Matrix */}
            <div className="space-y-1.5 pt-2 border-t border-[#9D6638]/20">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#4E220F] block font-semibold">
                Developmental Milestones:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {stage.milestones.map((milestone, mIdx) => (
                  <div key={mIdx} className="flex items-center gap-2 text-xs text-[#4E220F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9D6638] shrink-0" />
                    <span>{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#9D6638]/20 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => openAdmissionModal(stage.title.split(" ")[0])}
              className="px-5 py-2 rounded bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-sans active:scale-95"
            >
              Apply for {stage.title.split(" ")[0]}
            </button>

            <Link
              href="/academics"
              className="text-xs text-[#4E220F] hover:text-[#9D6638] font-mono uppercase tracking-wider inline-flex items-center gap-1 font-semibold"
            >
              <span>Full Curriculum</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#9D6638]" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface LearningJourneySectionProps {
  stages?: any[];
}

export function LearningJourneySection({ stages }: LearningJourneySectionProps = {}) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const scrollToPhase = (index: number) => {
    const el = document.getElementById(`phase-${JOURNEY_STAGES[index].phase}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="learning-journey" className="py-14 lg:py-20 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/15 relative font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#9D6638]/20 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B0BA99]" />
                <span>02 · CONTINUOUS LEARNING CONTINUUM</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#4E220F] font-semibold tracking-tight leading-[1.05]">
              {"A Journey That Grows With Every Step."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-[#7E5F4E] max-w-2xl font-normal leading-relaxed">
              Scroll down to explore the 5 developmental phases from early kindergarten play to Class 10 PSEB Board distinction.
            </p>
          </div>

          <Link
            href="/academics"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors border-b border-[#4E220F] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>Explore Complete Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
          </Link>
        </div>

        {/* Mobile Horizontal Quick-Jump Pills */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {JOURNEY_STAGES.map((stage, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={stage.phase}
                onClick={() => scrollToPhase(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                  isActive
                    ? "bg-[#4E220F] text-[#F7F1DE] font-bold border-[#4E220F] shadow-xs"
                    : "bg-white text-[#4E220F] border-[#9D6638]/20 hover:border-[#9D6638]"
                }`}
              >
                {stage.phase} · {stage.title.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* 2-Column Sticky Architecture: Left Sticky Roadmap + Right Natural Scroll Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Timeline Tracker (Span 4) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 p-6 rounded-2xl bg-white border border-[#9D6638]/20 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#9D6638] uppercase tracking-[0.2em] font-bold">
                PHASE NAVIGATION
              </span>
              <h4 className="font-editorial text-2xl text-[#4E220F] font-normal">
                Academic Roadmap
              </h4>
            </div>

            {/* Vertical Phase Steps */}
            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#9D6638]/20">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = activePhaseIndex === idx;
                return (
                  <button
                    key={stage.phase}
                    onClick={() => scrollToPhase(idx)}
                    className={`w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-all cursor-pointer relative z-10 ${
                      isActive
                        ? "bg-[#4E220F] text-[#F7F1DE] shadow-sm"
                        : "hover:bg-[#F7F1DE] text-[#4E220F]"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isActive
                          ? "bg-[#9D6638] text-[#F7F1DE]"
                          : "bg-[#F7F1DE] text-[#4E220F] border border-[#9D6638]/30"
                      }`}
                    >
                      {stage.phase}
                    </div>

                    <div className="space-y-0.5">
                      <p className={`text-xs font-bold leading-none ${isActive ? "text-[#F7F1DE]" : "text-[#4E220F]"}`}>
                        {stage.title}
                      </p>
                      <p className={`text-[10px] font-mono ${isActive ? "text-[#F7F1DE]/90" : "text-[#7E5F4E]"}`}>
                        {stage.classes}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#9D6638]/20 text-xs text-[#7E5F4E] font-mono">
              <p>Scroll down to reveal each phase naturally.</p>
            </div>
          </div>

          {/* Right Column: Stacked Scroll Cards (Span 8) */}
          <div className="lg:col-span-8 space-y-8">
            {JOURNEY_STAGES.map((stage, idx) => (
              <PhaseCard
                key={stage.phase}
                stage={stage}
                index={idx}
                onInView={setActivePhaseIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
