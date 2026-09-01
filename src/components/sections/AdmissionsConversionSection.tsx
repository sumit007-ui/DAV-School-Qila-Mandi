"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, FileCheck, Calendar, ShieldCheck, Download, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { ADMISSION_STEPS, ELIGIBILITY_CRITERIA } from "@/lib/data/admissions";
import { SCHOOL_CONFIG } from "@/config/school";

interface AdmissionsConversionSectionProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
}

export function AdmissionsConversionSection({
  onOpenAdmissionModal,
  onOpenProspectusModal,
}: AdmissionsConversionSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden border-b border-navy-800">
      {/* Background grain */}
      <div className="absolute inset-0 editorial-dark-grain opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Headline & Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Open For Session {SCHOOL_CONFIG.admissionsSession}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
            THE NEXT CHAPTER <br />
            <span className="italic text-gold-300">STARTS HERE.</span>
          </h2>

          <p className="text-gold-300 font-serif text-lg sm:text-xl font-normal">
            Admissions for Nursery to Class 10.
          </p>

          <p className="text-cream-200 text-sm sm:text-base leading-relaxed">
            Transparent admissions process designed for parental clarity. Limited seats across Pre-Primary, Preparatory, Middle School, and Class 9-10.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAdmissionModal}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Begin Admission Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenProspectusModal}
              className="px-5 py-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-cream-100 font-semibold text-xs sm:text-sm uppercase tracking-wider border border-navy-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download Prospectus</span>
            </button>

            <a
              href={`tel:${SCHOOL_CONFIG.contact.primaryPhone}`}
              className="px-5 py-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-cream-100 font-semibold text-xs sm:text-sm uppercase tracking-wider border border-navy-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call School</span>
            </a>

            <a
              href={SCHOOL_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4-Step Roadmap */}
        <div className="space-y-6">
          <div className="border-b border-navy-800 pb-3 flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-400">
              Four Simple Steps to Enrollment
            </span>
            <span className="text-xs text-cream-400 hidden sm:inline">
              Average processing time: 48 Hours
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 hover:border-gold-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="font-serif text-3xl font-normal text-gold-400 group-hover:scale-110 transition-transform origin-left">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-xl text-white font-medium">
                    {step.title}
                  </h3>
                  <p className="text-xs text-cream-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-navy-800/80">
                  {step.deliverables.slice(0, 2).map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-cream-300/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Eligibility Matrix Summary */}
        <div className="bg-navy-900/60 rounded-2xl p-6 sm:p-8 border border-navy-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-3">
            <h3 className="font-serif text-xl text-white font-medium flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gold-400" />
              <span>Age & Eligibility Guidelines ({SCHOOL_CONFIG.admissionsSession})</span>
            </h3>
            <Link
              href="/admissions"
              className="text-xs text-gold-400 hover:underline inline-flex items-center gap-1"
            >
              View Full Fee Structure & Dates <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            {ELIGIBILITY_CRITERIA.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-navy-950/80 border border-navy-800 space-y-1">
                <span className="font-serif font-bold text-gold-300 text-sm block">{item.class}</span>
                <p className="text-white font-medium text-[11px]">{item.age}</p>
                <p className="text-[10px] text-cream-400 leading-tight">{item.criteria}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
