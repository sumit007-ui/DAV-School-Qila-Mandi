"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, BookOpen, Award, Compass, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { LineReveal, Reveal } from "@/components/motion";
import { useWebsitePhotos } from "@/lib/hooks/useWebsitePhotos";

const JOURNEY_STAGES = [
  {
    phase: "01",
    tag: "EARLY YEARS",
    title: "Nursery & Kindergarten",
    classes: "Pre-Nursery, Nursery, LKG, UKG",
    age: "Ages 2.5 to 5 Years",
    tagline: "Foundational Wonder, Play-Based Inquiry & Emotional Safety",
    description: "Our early childhood wing is built around play-infused sensory discovery. Children cultivate early phonetic fluency, gross motor agility, collaborative empathy, and joyful curiosity in a nurturing environment with dedicated female care attendants.",
    image: "/images/pre-primary.jpg",
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
    image: "/images/primary-school.jpg",
    milestones: ["Conceptual Numeracy & Mental Math", "75-inch Interactive Smart Panels", "Bilingual Public Speaking & Poetry", "Weekly Computer & Science Lab Practical"]
  },
  {
    phase: "03",
    tag: "MIDDLE WING",
    title: "Middle School",
    classes: "Classes 6 to 8",
    age: "Ages 11 to 13 Years",
    tagline: "Independent Critical Thinking, Applied Science & Broadened Horizons",
    description: "Middle schoolers develop analytical depth, scientific experimentation in composite laboratories, inter-house debates, competitive athletics, and value-based Vedic grounding with daily moral discourses.",
    image: "/images/middle-school.jpg",
    milestones: ["Hands-on Science Lab Experiments", "Computer Science & Digital Literacy", "Inter-House Championship League", "Vedic Heritage & Moral Ethics"]
  },
  {
    phase: "04",
    tag: "SECONDARY TRANSITION",
    title: "Secondary Wing",
    classes: "Class 9",
    age: "Ages 14+ Years",
    tagline: "Rigorous Subject Deep-Dive, Discipline & Future Blueprinting",
    description: "Preparing students for high-stakes academic pathways with specialized educators, rigorous periodic assessments, olympiad coaching, and leadership roles in the student council prefectorial board.",
    image: "/images/secondary-school.jpg",
    milestones: ["PSEB Board Aligned Question Banks", "Olympiad & NTSE Focused Modules", "Student Council & Prefectorial Board", "Individual Academic Mentorship"]
  },
  {
    phase: "05",
    tag: "BOARD DISTINCTION",
    title: "Class 10 PSEB Board",
    classes: "Class 10 Milestone",
    age: "Ages 15+ Years",
    tagline: "Academic Triumph, 100% Pass Record & Confident Leadership",
    description: "The culmination of school life at DAV Qila Mandi. Comprehensive mock boards, personalized doubt resolution, and psychological resilience coaching producing district toppers year after year in Batala.",
    image: "/images/ethos-learning.jpg",
    milestones: ["100% PSEB Board Pass Record", "District Rank 1 Legacy in Batala", "Dedicated 1-on-1 Faculty Cliniques", "Career Counseling & Stream Roadmaps"]
  }
];

const STAGE_SLOT_KEYS: Record<string, string> = {
  "01": "journey_early_years",
  "02": "journey_primary",
  "03": "journey_middle",
  "04": "journey_secondary",
  "05": "journey_board"
};

function PhaseCard({ stage, index, onInView }: { stage: typeof JOURNEY_STAGES[0]; index: number; onInView: (idx: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const { openAdmissionModal } = useAppModals();
  const { getPhoto } = useWebsitePhotos();
  const slotKey = STAGE_SLOT_KEYS[stage.phase] || "";
  const dynamicImage = getPhoto(slotKey, stage.image);

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  if (stage.phase === "05") {
    return (
      <motion.div
        ref={ref}
        id={`phase-${stage.phase}`}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#4E220F] text-white rounded-3xl overflow-hidden shadow-xl border-2 border-gold-400/40 relative group"
      >
        {/* Subtle Gold Accents */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
          {/* Left Content (Span 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-[#F4E4AF] text-[11px] font-mono font-semibold tracking-wider border border-gold-500/30">
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>FINAL CULMINATION STAGE · PSEB BOARD BENCHMARK</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                  Class 10 PSEB Board Distinction
                </h3>
                <p className="text-sm font-semibold text-[#F4E4AF]">
                  Proven 100% Board Pass Rate & Consistent District Toppers
                </p>
              </div>

              <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed font-sans">
                The pinnacle of school life at Dr. MRS Bhalla DAV School. We provide personalized academic mentorship, continuous mock board test series, 1-on-1 subject doubt clearing, and psychological confidence building that empowers every student to excel in their PSEB Class 10 Board exams.
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-gold-300 leading-none">100%</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cream-300 mt-1 block">PSEB Pass Rate</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-gold-300 leading-none">95%+</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cream-300 mt-1 block">Distinctions</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                  <span className="block font-editorial text-2xl sm:text-3xl font-bold text-gold-300 leading-none">35+</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cream-300 mt-1 block">Years Legacy</span>
                </div>
              </div>

              {/* Milestones Matrix */}
              <div className="space-y-2 pt-2 border-t border-white/15">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gold-300 block font-semibold">
                  Board Distinction Pillars:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(stage.milestones || (stage as any).keyFeatures || []).map((milestone: string, mIdx: number) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-cream-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openAdmissionModal("Class 10")}
                className="px-6 py-2.5 rounded-xl bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-sans shadow-lg active:scale-95 border border-white/15"
              >
                Apply for Class 10 Transition
              </button>

              <a
                href="#academic-roll"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F4E4AF] font-mono text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15"
              >
                <span>View Board Toppers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Image Showcase (Span 5) */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <Image
              src={dynamicImage}
              alt={stage.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F] via-[#4E220F]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white space-y-1">
              <span className="text-[10px] font-mono text-gold-300 uppercase tracking-widest block font-bold">
                DISTINCTION ROLL
              </span>
              <p className="font-editorial text-lg text-white font-normal">
                Cultivating academic courage and leadership since 1990 in Qila Mandi.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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
            src={dynamicImage}
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
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 pt-8 sm:pt-10 flex flex-col justify-between space-y-5 bg-white">
          <div className="space-y-4 pt-1 sm:pt-2">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.1em] text-[#9D6638] font-bold">
                STAGE {stage.phase} OF 05 · {stage.tag}
              </span>
              <span className="text-[11px] font-mono text-[#7E5F4E] bg-[#F7F1DE] px-2.5 py-0.5 rounded font-medium shrink-0">
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
                {(stage.milestones || (stage as any).keyFeatures || []).map((milestone: string, mIdx: number) => (
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#9D6638]/20 pb-8 sm:pb-10">
          <div className="space-y-3.5 sm:space-y-4 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#B0BA99]" />
                <span>ACADEMIC ROADMAP · NURSERY TO CLASS 10</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#4E220F] font-semibold tracking-tight leading-[1.05]">
              {"A Journey That Grows With Every Step."}
            </LineReveal>

            <p className="text-xs sm:text-sm md:text-base text-[#7E5F4E] max-w-2xl font-normal leading-relaxed pt-1">
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
