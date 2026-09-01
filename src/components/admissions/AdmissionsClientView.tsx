"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Download, Phone, MessageCircle, CheckCircle2, ShieldCheck, HelpCircle, FileText } from "lucide-react";
import { AdmissionStep, FAQItem } from "@/types";
import { SCHOOL_CONFIG } from "@/config/school";
import { useAppModals } from "@/components/layout/ClientAppWrapper";

interface AdmissionsClientViewProps {
  info: {
    academicYear: string;
    process: AdmissionStep[];
    faqs: FAQItem[];
  };
}

export function AdmissionsClientView({ info }: AdmissionsClientViewProps) {
  const { openAdmissionModal, openProspectusModal } = useAppModals();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = info.process || [];
  const faqs = info.faqs || [];

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920"
            alt="DAV Public School Qilla Mandi Admissions"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Session {info.academicYear || SCHOOL_CONFIG.admissionsSession}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Join the DAV Family.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            We welcome ambitious scholars seeking holistic character building, CBSE academic excellence, and modern STEM innovation in Batala.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openAdmissionModal("Nursery")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-navy-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-gold-500/25 flex items-center gap-2"
            >
              <span>Begin Online Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={openProspectusModal}
              className="px-6 py-4 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-cream-100 font-semibold text-xs uppercase tracking-wider border border-navy-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download Prospectus</span>
            </button>
          </div>
        </div>
      </section>

      {/* Step-by-Step Admission Process */}
      <section className="py-20 bg-white text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              Admission Roadmap
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              4-Step Transparent Enrolment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-cream-50 p-6 sm:p-8 rounded-2xl border border-cream-300 flex flex-col justify-between space-y-6 relative group hover:border-gold-500/50 transition-colors"
              >
                <div className="space-y-4">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-gold-600/40 block">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    {step.title}
                  </h3>
                  <p className="text-xs text-navy-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions FAQ Accordion */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              Clarifications & Guidelines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-normal text-navy-950 hover:text-gold-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-gold-600 font-mono text-xl">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-navy-700 leading-relaxed border-t border-cream-200 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
