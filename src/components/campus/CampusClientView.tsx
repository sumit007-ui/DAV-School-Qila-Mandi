"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Building2, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { CampusFacility } from "@/types";
import { useAppModals } from "@/components/layout/ClientAppWrapper";

interface CampusClientViewProps {
  facilities: CampusFacility[];
}

export function CampusClientView({ facilities }: CampusClientViewProps) {
  const { openAdmissionModal } = useAppModals();

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
            alt="DAV Public School Qilla Mandi Campus Architecture"
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
            <span>Campus Infrastructure & Facilities</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Infrastructure designed for brilliance.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            A sanctuary where architecture inspires inquiry. Advanced research labs, digital smart classrooms, sports grounds, and peaceful study commons.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              Campus Facilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              State-of-the-Art Learning Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                id={facility.slug}
                className="bg-white rounded-2xl border border-cream-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-xs text-gold-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {facility.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-normal text-navy-950 group-hover:text-gold-700 transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-700 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-cream-200">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-navy-600">
                      Key Highlights:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {facility.specifications.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-navy-800 font-medium">
                          <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
