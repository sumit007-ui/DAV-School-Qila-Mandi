"use client";

import { useAcademicToppers } from "@/lib/hooks/useAcademicToppers";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { Award, Trophy, Star, CheckCircle, GraduationCap, Quote, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AcademicRollSection() {
  const { toppers, loading } = useAcademicToppers();
  const { openAdmissionModal } = useAppModals();

  return (
    <section
      id="academic-roll"
      className="py-16 lg:py-24 bg-[#FAF6EE] text-[#4E220F] border-b border-[#9D6638]/20 relative font-sans overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4E220F_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#9D6638]/20 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9D6638]/15 text-[#4E220F] text-[11px] font-mono font-bold tracking-[0.16em] uppercase">
              <Trophy className="w-3.5 h-3.5 text-[#9D6638]" />
              <span>VERIFIED ACADEMIC ROLL OF HONOR · BATALA</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#4E220F] font-normal leading-[1.15]">
              Class 10 Board Distinctions & Merit Scholars
            </h2>

            <p className="text-sm sm:text-base text-[#6B5548] font-sans leading-relaxed">
              Authentic Punjab School Education Board (PSEB) distinctions achieved through classroom diligence, regular doubt clearing, and zero reliance on private commercial tuitions. Real Batala students, verified board scores, and proud parents.
            </p>
          </div>

          {/* Quick Institutional Stats Pill */}
          <div className="shrink-0 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-white border border-[#9D6638]/25 shadow-sm text-center">
              <span className="block text-xl font-editorial font-bold text-[#4E220F]">100%</span>
              <span className="text-[10px] font-mono text-[#8C6D58] uppercase tracking-wider font-semibold">
                PSEB Pass Rate
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white border border-[#9D6638]/25 shadow-sm text-center">
              <span className="block text-xl font-editorial font-bold text-[#4E220F]">98.4%</span>
              <span className="text-[10px] font-mono text-[#8C6D58] uppercase tracking-wider font-semibold">
                Top Distinction
              </span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#4E220F] text-[#F7F1DE] border border-[#4E220F] shadow-sm text-center">
              <span className="block text-xl font-editorial font-bold text-[#F4E4AF]">32+</span>
              <span className="text-[10px] font-mono text-[#B0BA99] uppercase tracking-wider font-semibold">
                Students &gt; 85%
              </span>
            </div>
          </div>
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {toppers.map((topper, idx) => (
            <motion.div
              key={topper.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-[#9D6638]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#9D6638]/40"
            >
              {/* Card Top: Photo & Score */}
              <div className="p-5 pb-0">
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#4E220F]">
                  <Image
                    src={topper.image_url || "/images/secondary-school.jpg"}
                    alt={topper.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/90 via-black/20 to-transparent" />

                  {/* Distinction Tag Top-Left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F4E4AF] font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span>{topper.badge_text || "DISTINCTION"}</span>
                  </div>

                  {/* Score Pill Bottom-Right */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#9D6638] to-[#7E5F4E] text-white shadow-lg border border-white/20 text-right">
                    <span className="font-editorial text-2xl font-bold leading-none tracking-tight block">
                      {topper.score}
                    </span>
                    <span className="text-[9px] font-mono tracking-wider uppercase opacity-90 block">
                      PSEB Board {topper.year}
                    </span>
                  </div>
                </div>

                {/* Student Info */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-editorial text-xl font-bold text-[#4E220F] group-hover:text-[#9D6638] transition-colors">
                      {topper.name}
                    </h3>
                  </div>

                  {topper.rank && (
                    <p className="text-xs font-mono font-semibold text-[#9D6638] uppercase tracking-wide flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#9D6638] shrink-0" />
                      <span>{topper.rank}</span>
                    </p>
                  )}

                  {topper.distinctions && (
                    <div className="p-2.5 rounded-lg bg-[#FAF6EE] border border-[#9D6638]/15 text-[11px] font-mono text-[#6B5548] leading-relaxed">
                      {topper.distinctions}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Bottom: Testimonial & Parent Info */}
              <div className="p-5 pt-3 space-y-3 mt-auto">
                {topper.testimonial && (
                  <div className="relative pl-3 border-l-2 border-[#9D6638]/40">
                    <p className="text-xs text-[#523B2F] italic leading-relaxed font-sans">
                      &ldquo;{topper.testimonial}&rdquo;
                    </p>
                  </div>
                )}

                {topper.parent_info && (
                  <div className="pt-2 border-t border-black/5 flex items-center gap-1.5 text-[11px] text-[#7E5F4E] font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{topper.parent_info}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reassurance Call-To-Action Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#4E220F] to-[#2E1206] text-white shadow-xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-[#F4E4AF] font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Certified Gazette Records Available On-Campus</span>
            </div>
            <h4 className="font-editorial text-xl sm:text-2xl text-white font-normal">
              Preparing your child for Class 10 Board Excellence without mental stress?
            </h4>
            <p className="text-xs sm:text-sm text-cream-200 max-w-2xl font-sans">
              Visit our administrative office at Qila Mandi, Batala to review authentic merit marksheets, interact with faculty heads, and secure Nursery to Class 10 admission.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => openAdmissionModal("Class 10")}
              className="px-6 py-3 rounded-xl bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer font-sans border border-white/15"
            >
              Apply for Class 10 Admissions
            </button>
            <a
              href="/contact"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#F4E4AF] font-mono text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15"
            >
              Visit Batala Campus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
