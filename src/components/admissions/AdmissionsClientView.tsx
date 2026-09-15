"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, Phone, CheckCircle2, ShieldCheck, HelpCircle, FileText } from "lucide-react";
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
  const { openAdmissionModal } = useAppModals();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = info.process || [];
  const faqs = info.faqs || [];

  return (
    <div className="w-full font-sans">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-[#4E220F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920"
            alt="Dr. MRS Bhalla DAV School Admissions"
            fill
            className="object-cover object-center scale-105 opacity-30"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F] via-[#4E220F]/85 to-[#4E220F]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-xs font-mono font-bold uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F7F1DE]" />
            <span>Admissions Session {info.academicYear || SCHOOL_CONFIG.admissionsSession}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-semibold leading-tight">
            Join the DAV Family.
          </h1>

          <p className="text-white/80 text-base sm:text-xl font-normal max-w-2xl">
            We welcome ambitious scholars seeking holistic character building, PSEB academic excellence, and modern STEM innovation in Batala.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openAdmissionModal("Nursery")}
              className="px-8 py-4 rounded-xl bg-[#9D6638] hover:bg-[#82522B] text-[#F7F1DE] font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 border border-white/10"
            >
              <span>Begin Online Application</span>
              <ArrowRight className="w-4 h-4 text-[#F7F1DE]" />
            </button>
          </div>
        </div>
      </section>

      {/* Step-by-Step Admission Process */}
      <section className="py-20 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9D6638]">
              Admission Roadmap
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4E220F] font-bold">
              4-Step Transparent Enrolment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-[#9D6638]/20 flex flex-col justify-between space-y-6 relative group hover:border-[#9D6638] transition-colors shadow-xs"
              >
                <div className="space-y-4">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-[#9D6638] block">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#4E220F]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#4E220F]/80 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions FAQ Accordion */}
      <section className="py-20 bg-white text-[#4E220F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#9D6638]">
              Clarifications & Guidelines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#4E220F] font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F1DE]/50 rounded-2xl border border-[#9D6638]/20 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-bold text-[#4E220F] hover:text-[#9D6638] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#9D6638] font-mono text-xl font-bold">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#4E220F]/80 leading-relaxed border-t border-[#9D6638]/15 pt-4">
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
