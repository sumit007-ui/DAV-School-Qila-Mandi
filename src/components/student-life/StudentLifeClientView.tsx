"use client";

import Image from "next/image";
import { Sparkles, Flag, Trophy, Palette, Compass, Users, HeartHandshake, ShieldCheck } from "lucide-react";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { SCHOOL_CONFIG } from "@/config/school";

interface StudentLifeClientViewProps {
  activities?: any[];
  siteSettings?: any;
}

export function StudentLifeClientView({ activities = [], siteSettings }: StudentLifeClientViewProps) {
  const { openAdmissionModal } = useAppModals();
  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;

  const houses = [
    {
      name: "Dayanand House",
      color: "bg-amber-600",
      motto: "Knowledge & Righteous Action",
      description: "Named after Maharshi Dayanand Saraswati, upholding truth, philosophical inquiry, and selfless scholarship."
    },
    {
      name: "Hansraj House",
      color: "bg-blue-600",
      motto: "Dedication & Selfless Service",
      description: "Honoring Mahatma Hansraj, the pioneer of DAV institutions, emphasizing humility, discipline, and community uplift."
    },
    {
      name: "Shraddhanand House",
      color: "bg-emerald-600",
      motto: "Courage & Moral Strength",
      description: "Named after Swami Shraddhanand, champion of educational reform, fearlessness, and moral fortitude."
    },
    {
      name: "Lajpat House",
      color: "bg-rose-600",
      motto: "Patriotism & Athletic Glory",
      description: "Inspired by Lala Lajpat Rai ('Punjab Kesari'), driving national devotion, sportsmanship, and leadership."
    }
  ];

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1920"
            alt={`${schoolName} Student Life`}
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
            <span>Culture, Leadership & Clubs</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Vibrant campus life.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            Beyond the textbooks lies a world of discovery. Inter-house rivalry, athletic tournaments, community seva, and classical arts.
          </p>
        </div>
      </section>

      {/* House System */}
      <section className="py-20 bg-cream-50 text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              The Four Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              The Four Houses of DAV
            </h2>
            <p className="text-navy-700 text-xs sm:text-sm">
              Every scholar is inducted into a house that fosters camaraderie, leadership, and athletic passion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((h, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`w-3 h-3 rounded-full ${h.color}`} />
                    <Flag className="w-4 h-4 text-navy-400" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-navy-950">
                    {h.name}
                  </h3>
                  <p className="text-xs font-mono text-gold-700 font-semibold">
                    "{h.motto}"
                  </p>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CMS Activities Grid (if any added in Sanity) */}
      {activities && activities.length > 0 && (
        <section className="py-20 bg-white text-navy-950 border-b border-cream-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
                Active Clubs & Co-Curriculars
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                Explore Your Passion
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activities.map((act) => (
                <div
                  key={act.id}
                  className="bg-cream-50 rounded-2xl overflow-hidden border border-cream-200 shadow-sm hover:shadow-lg transition-all"
                >
                  {act.image && (
                    <div className="relative aspect-[16/10]">
                      <Image src={act.image} alt={act.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700">
                      {act.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-navy-950">
                      {act.title}
                    </h3>
                    <p className="text-xs text-navy-600 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
