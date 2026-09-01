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
      <section className="py-20 lg:py-28 bg-white text-navy-950 border-b border-cream-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Portrait (Span 5) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-cream-300 group">
                <Image
                  src={principal.image}
                  alt={principal.name}
                  fill
                  className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-500/90 text-navy-950 text-[10px] font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3 h-3" /> Head of Institution
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {principal.name}
                  </h3>
                  <p className="text-xs text-gold-300 font-mono mt-0.5">
                    {principal.qualifications}
                  </p>
                </div>
              </div>

              {/* Decorative Background Offset Frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold-400/40 -z-10 hidden sm:block pointer-events-none" />
            </div>

            {/* Right Message Content (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Leadership Perspective</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-navy-950 font-normal leading-tight">
                "{principal.messageExcerpt}"
              </h2>

              <div className="space-y-4 text-navy-700 text-sm sm:text-base leading-relaxed">
                {principal.fullMessage && principal.fullMessage.length > 0 ? (
                  principal.fullMessage.slice(0, 2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{principal.messageExcerpt}</p>
                )}
              </div>

              {/* Principal Signature Block & Action */}
              <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-navy-950">
                    {principal.name}
                  </h4>
                  <p className="text-xs text-navy-600 font-mono">
                    {principal.designation}
                  </p>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-100 hover:bg-gold-100 text-navy-950 font-bold text-xs uppercase tracking-wider transition-colors border border-cream-300"
                >
                  <span>Read Full Message</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Message Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-fade-in">
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-navy-950 text-white relative border-b border-navy-800">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-1 rounded-lg text-cream-300 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-xs text-gold-400 font-mono uppercase tracking-widest block mb-1">
                From the Principal’s Desk
              </span>
              <h3 className="font-serif text-2xl text-white font-normal">
                {principal.name}
              </h3>
              <p className="text-xs text-cream-300 font-mono">{principal.qualifications}</p>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-sm text-navy-800 leading-relaxed">
              <Quote className="w-8 h-8 text-gold-500/30" />
              {principal.fullMessage.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <div className="pt-6 border-t border-cream-200 mt-6 flex items-center justify-between">
                <div>
                  <p className="font-serif font-bold text-navy-950 text-base">{principal.name}</p>
                  <p className="text-xs text-navy-500">{principal.designation}, DAV Public School Qilla Mandi</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-navy-900 text-cream-100 font-bold text-xs uppercase tracking-wider"
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
