"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Quote, Sparkles, X, ArrowRight, Award } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

interface PrincipalMessageSectionProps {
  principal?: {
    name?: string;
    designation?: string;
    qualifications?: string;
    messageExcerpt?: string;
    shortMessage?: string;
    fullMessage?: string[];
    image?: string;
    photoUrl?: string;
  };
}

import { ImageReveal, Reveal } from "@/components/motion";

export function PrincipalMessageSection({ principal: propPrincipal }: PrincipalMessageSectionProps = {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const fallback = SCHOOL_CONFIG.leadership.principal;
  const principal = {
    name: propPrincipal?.name || fallback.name,
    designation: propPrincipal?.designation || fallback.designation,
    qualifications: propPrincipal?.qualifications || fallback.qualifications,
    messageExcerpt: propPrincipal?.shortMessage || propPrincipal?.messageExcerpt || fallback.messageExcerpt,
    fullMessage: (propPrincipal?.fullMessage && propPrincipal.fullMessage.length > 0) ? propPrincipal.fullMessage : fallback.fullMessage,
    image: propPrincipal?.photoUrl || propPrincipal?.image || fallback.image,
  };

  return (
    <>
      <section className="py-14 lg:py-20 bg-white text-[#4E220F] border-b border-[#9D6638]/15 relative overflow-hidden font-sans">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Portrait (Span 5) */}
            <div className="lg:col-span-5 relative" data-cursor="LEADERSHIP">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-md border border-[#9D6638]/20 group">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=85&w=900"
                  alt={principal.name}
                  className="w-full h-full"
                  imageClassName="object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F] via-[#4E220F]/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#9D6638] text-white text-[9px] font-mono uppercase tracking-wider mb-1.5 font-semibold">
                    <Award className="w-3 h-3 text-[#B0BA99]" /> HEAD OF INSTITUTION
                  </div>
                  <h3 className="font-editorial text-2xl font-normal text-white">
                    {principal.name}
                  </h3>
                  <p className="text-xs text-[#B0BA99] font-mono mt-0.5">
                    {principal.qualifications}
                  </p>
                </div>
              </div>

              {/* Decorative Background Offset Frame */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl border border-[#9D6638]/30 -z-10 hidden sm:block pointer-events-none" />
            </div>

            {/* Right Message Content (Span 7) */}
            <div className="lg:col-span-7 space-y-5">
              <Reveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#B0BA99]" />
                  <span>PRINCIPAL'S PERSPECTIVE</span>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#4E220F] font-normal leading-snug">
                  "{principal.messageExcerpt}"
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="space-y-3.5 text-[#4E220F]/90 text-sm sm:text-base leading-relaxed">
                  {principal.fullMessage && principal.fullMessage.length > 0 ? (
                    principal.fullMessage.slice(0, 2).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  ) : (
                    <p>{principal.messageExcerpt}</p>
                  )}
                </div>
              </Reveal>

              {/* Principal Signature Block & Action */}
              <Reveal direction="up" delay={0.4}>
                <div className="pt-3 border-t border-[#9D6638]/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-editorial text-xl font-bold text-[#4E220F]">
                      {principal.name}
                    </h4>
                    <p className="text-xs text-[#7E5F4E] font-mono">
                      {principal.designation}
                    </p>
                  </div>

                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#F7F1DE] hover:bg-[#9D6638]/20 text-[#4E220F] font-bold text-xs uppercase tracking-wider transition-colors border border-[#9D6638]/30 cursor-pointer font-sans"
                  >
                    <span>Read Full Message</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Full Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#4E220F]/80 backdrop-blur-md animate-fade-in font-sans">
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-[#4E220F] text-white relative border-b border-white/10">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-lg text-[#B0BA99] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs text-[#B0BA99] font-mono uppercase tracking-widest block mb-1">
                From the Principal’s Desk
              </span>
              <h3 className="font-editorial text-2xl text-white font-normal">
                {principal.name}
              </h3>
              <p className="text-xs text-white/80 font-sans">{principal.qualifications}</p>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-[#4E220F] leading-relaxed">
              <Quote className="w-8 h-8 text-[#9D6638]/40" />
              {principal.fullMessage.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="pt-6 border-t border-[#9D6638]/20 mt-6 flex items-center justify-between">
                <div>
                  <p className="font-editorial font-bold text-[#4E220F] text-base">{principal.name}</p>
                  <p className="text-xs text-[#7E5F4E]">{principal.designation}, Dr. MRS Bhalla DAV High School</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#4E220F] text-white font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
