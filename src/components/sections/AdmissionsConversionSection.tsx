"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, FileCheck, Calendar, ShieldCheck, Download, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { ADMISSION_STEPS, ELIGIBILITY_CRITERIA } from "@/lib/data/admissions";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal } from "@/components/motion";

interface AdmissionsConversionSectionProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
}

export function AdmissionsConversionSection({
  onOpenAdmissionModal,
  onOpenProspectusModal,
}: AdmissionsConversionSectionProps) {
  const steps = [
    { number: "01", title: "EXPLORE", desc: "Review syllabus, campus facilities, and curriculum overview." },
    { number: "02", title: "APPLY", desc: "Submit the online enquiry or visit the admissions campus desk." },
    { number: "03", title: "CONNECT", desc: "Friendly student-parent interaction and document verification." },
    { number: "04", title: "BEGIN", desc: "Welcome kit, uniform guidance, and starting the DAV journey." },
  ];

  return (
    <section className="py-14 lg:py-20 bg-[#0B1F33] text-white relative overflow-hidden border-b border-white/10 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-10">
        {/* Top Headline & Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/40 border border-[#2F5D62] text-[#A8C3BC] text-[11px] font-mono font-medium uppercase tracking-[0.16em]">
              <Sparkles className="w-3.5 h-3.5 text-[#A8C3BC]" />
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
                className="px-6 py-3 rounded bg-white hover:bg-white/90 text-[#0B1F33] font-bold text-xs uppercase tracking-[0.14em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>Begin Admission Enquiry</span>
                <ArrowRight className="w-4 h-4 text-[#0B1F33]" />
              </button>

              <button
                onClick={onOpenProspectusModal}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#A8C3BC]" />
                <span>Prospectus</span>
              </button>

              <a
                href={`tel:${SCHOOL_CONFIG.contact.primaryPhone}`}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#A8C3BC]" />
                <span>{SCHOOL_CONFIG.contact.primaryPhone}</span>
              </a>

              <a
                href={SCHOOL_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded bg-[#2F5D62]/50 hover:bg-[#2F5D62] text-white font-mono text-xs uppercase tracking-wider border border-[#2F5D62] transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#A8C3BC]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* 4-Step Roadmap */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <span className="text-xs font-sans font-bold uppercase tracking-widest text-sage-300">
              Four Simple Steps to Enrollment
            </span>
            <span className="text-xs text-ivory-400 hidden sm:inline">
              Average processing time: 48 Hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-[#0E2135] border border-white/10 hover:border-teal-400/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="font-serif text-3xl font-semibold text-sage-200 group-hover:scale-110 transition-transform origin-left">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs text-ivory-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/10">
                  {step.deliverables.slice(0, 2).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-ivory-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Eligibility Matrix Summary */}
        <div className="bg-[#0E2135] rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <h3 className="font-serif text-xl text-white font-medium flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-sage-300" />
              <span>Age & Eligibility Guidelines ({SCHOOL_CONFIG.admissionsSession})</span>
            </h3>
            <Link
              href="/admissions"
              className="text-xs text-sage-300 hover:text-white hover:underline inline-flex items-center gap-1 font-semibold"
            >
              View Full Fee Structure & Dates <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            {ELIGIBILITY_CRITERIA.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#16324F]/80 border border-white/10 space-y-1">
                <span className="font-serif font-bold text-sage-200 text-sm block">{item.class}</span>
                <p className="text-white font-medium text-[11px]">{item.age}</p>
                <p className="text-[10px] text-ivory-400 leading-tight">{item.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
