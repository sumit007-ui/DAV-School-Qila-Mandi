"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, FileCheck, Calendar, ShieldCheck, CheckCircle2, Phone } from "lucide-react";
import { ADMISSION_STEPS, ELIGIBILITY_CRITERIA } from "@/lib/data/admissions";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal } from "@/components/motion";

interface AdmissionsConversionSectionProps {
  onOpenAdmissionModal?: () => void;
}

export function AdmissionsConversionSection({
  onOpenAdmissionModal,
}: AdmissionsConversionSectionProps) {
  return (
    <section className="py-14 lg:py-20 bg-[#4E220F] text-white relative overflow-hidden border-b border-white/10 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-10">
        {/* Top Headline & Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold uppercase tracking-[0.16em] shadow-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#F7F1DE]" />
              <span>ADMISSIONS OPEN · SESSION {SCHOOL_CONFIG.admissionsSession}</span>
            </div>
          </Reveal>

          <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl text-white font-semibold leading-tight">
            {"THE NEXT CHAPTER\nSTARTS HERE."}
          </LineReveal>

          <Reveal direction="up" delay={0.25}>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
              Transparent admissions process designed for parental clarity. Limited seats across Pre-Primary, Preparatory, Middle School, and Classes 9–10.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.35}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenAdmissionModal}
                className="px-6 py-3 rounded bg-[#9D6638] hover:bg-[#82522B] text-[#F7F1DE] font-bold text-xs uppercase tracking-[0.14em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans border border-white/10"
              >
                <span>Begin Admission Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#F7F1DE]" />
              </button>

              <a
                href={`tel:${SCHOOL_CONFIG.contact.officePhone}`}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#B0BA99]" />
                <span>Office: {SCHOOL_CONFIG.contact.officePhone}</span>
              </a>

              <a
                href={`tel:${SCHOOL_CONFIG.contact.receptionPhone}`}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#B0BA99]" />
                <span>Reception: {SCHOOL_CONFIG.contact.receptionPhone}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Roadmap */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#B0BA99]">
              Four Simple Steps to Enrollment
            </span>
            <span className="text-xs text-[#F7F1DE]/70 hidden sm:inline font-mono">
              Average processing time: 48 Hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-[#5C2A15] border border-white/10 hover:border-[#9D6638] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="font-serif text-3xl font-semibold text-[#B0BA99] group-hover:scale-110 transition-transform origin-left">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  {step.deliverables.slice(0, 2).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-white/90">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B0BA99] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Eligibility Matrix Summary */}
        <div className="bg-[#5C2A15] rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <h3 className="font-serif text-xl text-white font-medium flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#B0BA99]" />
              <span>Age & Eligibility Guidelines ({SCHOOL_CONFIG.admissionsSession})</span>
            </h3>
            <Link
              href="/admissions"
              className="text-xs text-[#B0BA99] hover:text-white hover:underline inline-flex items-center gap-1 font-semibold"
            >
              View Full Fee Structure & Dates <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            {ELIGIBILITY_CRITERIA.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#4E220F]/90 border border-white/10 space-y-1">
                <span className="font-serif font-bold text-[#B0BA99] text-sm block">{item.class}</span>
                <p className="text-white font-medium text-[11px]">{item.age}</p>
                <p className="text-[10px] text-white/70 leading-tight">{item.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
