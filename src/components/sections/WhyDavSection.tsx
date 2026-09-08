"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Compass, Trophy, Palette, HeartHandshake, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { LineReveal, Reveal } from "@/components/motion";

const PILLARS = [
  {
    id: "academic-excellence",
    index: "01",
    title: "Academic Rigor & Concept Mastery",
    category: "ACADEMICS",
    subtitle: "PSEB Curriculum & 100% Board Distinction",
    description: "Our PSEB-aligned pedagogy emphasizes deep conceptual clarity over rote memorization. Consistent 100% board pass rates and district rank toppers in Class 10 reflect our unwavering academic devotion in Batala.",
    image: "/images/ethos-learning.jpg",
    icon: Award,
    badge: "100% PSEB Pass Record",
    metrics: "Rank 1 in Batala · 100% Pass Rate"
  },
  {
    id: "values-character",
    index: "02",
    title: "Vedic Values & Moral Fortitude",
    category: "HERITAGE",
    subtitle: "DAVCMC Tradition & Daily Ethical Grounding",
    description: "Under DAVCMC New Delhi, we weave timeless Vedic principles, morning Hawans, and social empathy into daily life, cultivating humble, disciplined, and morally courageous scholars.",
    image: "/images/vedic-values.jpg",
    icon: HeartHandshake,
    badge: "Vedic Heritage",
    metrics: "Daily Hawan · Character Pedagogy"
  },
  {
    id: "atal-technology",
    index: "03",
    title: "Technology & Atal Robotics Lab",
    category: "INNOVATION",
    subtitle: "Atal Tinkering Cell, 3D Printers & IoT",
    description: "Equipped with an advanced Atal Tinkering Lab, 3D printers, Python IoT robotics kits, and interactive digital smart panels in every classroom from Class 1 upwards.",
    image: "/images/stem-robotics.jpg",
    icon: Compass,
    badge: "Atal Tinkering Hub",
    metrics: "75\" Smart Panels · Robotics Kits"
  },
  {
    id: "sports-conditioning",
    index: "04",
    title: "Athletics, Turf Nets & Martial Arts",
    category: "ATHLETICS",
    subtitle: "Championship Arenas & Certified NIS Trainers",
    description: "Dedicated cricket turf nets, FIBA-grade basketball courts, speed skating rink, and NIS-certified coaches training champions for district, state, and national tournaments.",
    image: "/images/sports-champions.jpg",
    icon: Trophy,
    badge: "State & National Medals",
    metrics: "Cricket Turf · Taekwondo Dojo"
  },
  {
    id: "arts-expression",
    index: "05",
    title: "Classical Arts & Theatrical Expression",
    category: "CULTURE",
    subtitle: "800-Seat Grand Stage & Musical Studios",
    description: "Vocal and instrumental mastery in Indian classical music, harmonium, tabla, and folk theatre celebrated in our 800-seat acoustic auditorium.",
    image: "/images/bhangra-giddha.jpg",
    icon: Palette,
    badge: "800-Seat Auditorium",
    metrics: "Harmonium & Tabla · Drama Guild"
  },
  {
    id: "safety-wellness",
    index: "06",
    title: "Safe, Caring & Child-First Campus",
    category: "SAFETY",
    subtitle: "100+ CCTV Cameras, GPS Busses & Infirmary",
    description: "Complete perimeter security with 100+ HD CCTV cameras, GPS-tracked bus fleet covering all of Batala and surrounding towns, verified attendants, and on-campus medical care.",
    image: "/images/school-building.png",
    icon: ShieldCheck,
    badge: "Child-First Security",
    metrics: "GPS Fleet · 100+ CCTV Surveillance"
  }
];

export function WhyDavSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { openAdmissionModal } = useAppModals();

  return (
    <section className="py-14 lg:py-20 bg-white text-[#4E220F] border-b border-[#9D6638]/15 relative font-sans overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#9D6638]/20 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9D6638]/15 text-[#4E220F] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#9D6638]" />
                <span>03 · THE DAV ADVANTAGE</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#4E220F] font-semibold tracking-tight leading-[1.05]">
              {"Why Discerning Families Choose Us."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-[#7E5F4E] max-w-2xl font-normal leading-relaxed">
              Hover over each institutional pillar below to reveal our academic strengths, modern facilities, and cultural traditions.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors border-b border-[#4E220F] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>Read Institutional Legacy</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
          </Link>
        </div>

        {/* Full-Width Interactive Hover Accordion List */}
        <div className="divide-y divide-[#9D6638]/15 border-y border-[#9D6638]/15">
          {PILLARS.map((pillar, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => setHoveredIndex(idx)}
                className={`py-6 lg:py-8 transition-all duration-300 cursor-pointer group px-2 sm:px-4 ${
                  isHovered ? "bg-[#F7F1DE]/90 rounded-xl" : "hover:bg-[#F7F1DE]/40"
                }`}
                data-cursor="REVEAL"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  {/* Left Label & Category (Span 3) */}
                  <div className="lg:col-span-3 flex items-center gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#9D6638] tracking-wider">
                      {pillar.index}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[10px] font-mono uppercase tracking-[0.18em] font-semibold">
                      {pillar.category}
                    </span>
                  </div>

                  {/* Center Title & Subtitle (Span 6) */}
                  <div className="lg:col-span-6 space-y-1">
                    <h3 className={`font-editorial text-2xl sm:text-3xl lg:text-4xl transition-colors duration-200 ${
                      isHovered ? "text-[#4E220F] font-medium" : "text-[#4E220F]/80 group-hover:text-[#4E220F]"
                    }`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-[#7E5F4E]">
                      {pillar.subtitle}
                    </p>
                  </div>

                  {/* Right Badge & Arrow (Span 3) */}
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border transition-all ${
                      isHovered 
                        ? "bg-[#4E220F] text-[#F7F1DE] border-[#4E220F]" 
                        : "bg-[#F7F1DE] text-[#4E220F] border-[#9D6638]/30 font-semibold"
                    }`}>
                      {pillar.badge}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isHovered ? "bg-[#9D6638] text-white rotate-0" : "bg-[#9D6638]/10 text-[#9D6638] -rotate-45"
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Smooth Expandable Narrative on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-[#9D6638]/15 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        {/* Expanded Photographic Artwork (Span 5) */}
                        <div className="lg:col-span-5 relative aspect-[16/9] rounded-xl overflow-hidden shadow-md">
                          <Image
                            src={pillar.image}
                            alt={pillar.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-white text-xs font-mono">
                            <span className="bg-[#4E220F]/90 px-2 py-1 rounded border border-white/10">
                              {pillar.metrics}
                            </span>
                          </div>
                        </div>

                        {/* Expanded Text Narrative (Span 7) */}
                        <div className="lg:col-span-7 space-y-3">
                          <p className="text-xs sm:text-sm text-[#4E220F]/90 leading-relaxed font-normal">
                            {pillar.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openAdmissionModal("General");
                              }}
                              className="px-4 py-2 rounded bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-sans"
                            >
                              Admissions Open {pillar.category}
                            </button>

                            <span className="text-xs text-[#9D6638] font-mono flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {pillar.metrics}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
