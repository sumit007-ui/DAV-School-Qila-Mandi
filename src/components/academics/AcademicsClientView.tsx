"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, BookOpen, CheckCircle2, ArrowRight, Layers, Award, Target, Zap } from "lucide-react";
import { AcademicProgram } from "@/types";
import { useAppModals } from "@/components/layout/ClientAppWrapper";

interface AcademicsClientViewProps {
  programs: AcademicProgram[];
}

export function AcademicsClientView({ programs }: AcademicsClientViewProps) {
  const { openAdmissionModal } = useAppModals();

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920"
            alt="DAV Public School Qilla Mandi Academics"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PSEB Affiliated Curriculum</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Academics with depth & purpose.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            From foundational play-based inquiry to specialized pre-university Senior Secondary streams, our pedagogy empowers every learner with conceptual rigor.
          </p>
        </div>
      </section>

      {/* Academic Methodology Pillars */}
      <section className="py-16 bg-cream-50 text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-cream-300 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy-950">Experiential Pedagogy</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Concepts are internalized through tactile experiments in laboratories, mathematics manipulatives, and real-world projects rather than textbook rote.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-cream-300 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-navy-100 text-navy-900 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy-950">Atal Tinkering & STEM</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Hands-on training in robotics, 3D prototyping, coding, and sensor electronics fosters early creative problem-solving and innovation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-cream-300 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy-950">Vedic & Moral Ethos</h3>
              <p className="text-xs text-navy-600 leading-relaxed">
                Morning Hawan ceremonies, character-building discourses, and community service instill humility, resilience, and ethical leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Levels Breakdown */}
      <section className="py-20 bg-white text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700 block">
              Graded Developmental Trajectory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              Educational Stages at DAV
            </h2>
          </div>

          <div className="space-y-16">
            {programs.map((prog, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={prog.id}
                  id={prog.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`lg:col-span-6 space-y-4 ${isEven ? "lg:order-2" : ""}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-200 text-navy-900 text-xs font-mono font-bold">
                      <span>{prog.classes}</span>
                      <span>•</span>
                      <span className="text-gold-700">{prog.level}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-navy-950 font-normal">
                      {prog.tagline}
                    </h3>

                    <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-mono font-bold text-navy-900 uppercase tracking-wider">
                        Key Curricular Pillars:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {prog.keyFeatures.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-navy-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <button
                        onClick={() => openAdmissionModal(prog.level)}
                        className="px-5 py-2.5 rounded-xl bg-navy-900 text-white hover:text-cream-100 hover:bg-navy-950 text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md active:scale-95"
                      >
                        <span>Apply for {prog.level}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/90" />
                      </button>
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : ""}`}>
                    <div className="relative aspect-[16/11] rounded-2xl overflow-hidden shadow-lg border border-cream-300">
                      <Image
                        src={prog.image}
                        alt={prog.level}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 600px"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
