"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Award, Compass, Trophy, Palette, HeartHandshake, ShieldCheck } from "lucide-react";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { EditorialEyebrow } from "@/components/ui/SplitText";

export function WhyDavSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openAdmissionModal } = useAppModals();

  const features = [
    {
      id: "academic-excellence",
      title: "Academic Excellence & Concept Mastery",
      category: "Academics",
      description: "Our CBSE-aligned pedagogy focuses on conceptual clarity over rote learning. Consistent 100% board distinction rates and district toppers in Class 10 reflect our academic devotion.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=85&w=1400",
      icon: Award,
      badge: "100% Class 10 Pass Record"
    },
    {
      id: "values-character",
      title: "Vedic Values & Moral Fortitude",
      category: "Heritage",
      description: "Under DAVCMC New Delhi, we weave timeless moral principles, morning Havans, and social empathy into daily life, cultivating humble and grounded human beings.",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=85&w=1400",
      icon: HeartHandshake,
      badge: "Vedic Principles"
    },
    {
      id: "atal-technology",
      title: "Technology-Enabled Innovation & Robotics",
      category: "Innovation",
      description: "Equipped with an Atal Tinkering Lab, 3D printers, IoT coding kits, and 75-inch smart panels in every classroom from Class 1 upwards.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1400",
      icon: Compass,
      badge: "Atal Tinkering Hub"
    },
    {
      id: "sports-conditioning",
      title: "Sports, Athletics & Martial Arts",
      category: "Athletics",
      description: "Dedicated cricket turf nets, FIBA-grade basketball courts, speed skating track, and certified NIS coaches training champions for national tournaments.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=85&w=1400",
      icon: Trophy,
      badge: "Olympic Arenas"
    },
    {
      id: "arts-creativity",
      title: "Classical Arts, Music & Theatrical Expression",
      category: "Culture",
      description: "800-seat Maharshi Dayanand Auditorium, classical tabla and harmonium ateliers, debate societies, and annual 'Pratibha' cultural showcases.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85&w=1400",
      icon: Palette,
      badge: "800-Seat Grand Hall"
    },
    {
      id: "safe-supportive",
      title: "Safe, Caring & Child-First Environment",
      category: "Safety",
      description: "120+ CCTV surveillance cameras, biometric access, female attendants on all GPS-enabled school bus routes, and full-time infirmary healthcare staff.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=1400",
      icon: ShieldCheck,
      badge: "120+ CCTV Safe"
    }
  ];

  const activeFeature = features[activeIndex] || features[0];

  return (
    <section className="py-28 lg:py-36 bg-white text-navy-950 border-b border-cream-300/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <EditorialEyebrow>03 • Institutional Strengths</EditorialEyebrow>
            <h2 className="font-serif text-4xl sm:text-6xl text-navy-950 font-normal tracking-tight">
              WHY DAV.
            </h2>
            <p className="text-navy-700 text-sm sm:text-base max-w-xl font-light">
              An ecosystem engineered for character, intellectual depth, and safety. Discover what sets our school apart for families across Batala.
            </p>
          </div>

          <button
            onClick={() => openAdmissionModal("Nursery")}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 hover:text-gold-700 transition-colors self-start md:self-auto border-b border-navy-950 pb-1"
          >
            <span>Book a Campus Tour</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editorial Feature List & Sticky Dynamic Photo Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Feature List (Span 6) */}
          <div className="lg:col-span-6 space-y-2">
            {features.map((item, idx) => {
              const isActive = activeIndex === idx;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-[#FBF9F4] border-gold-500/60 shadow-lg translate-x-2"
                      : "bg-white border-transparent hover:bg-[#FBF9F4]/60 hover:border-cream-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? "bg-[#060F1E] text-gold-400" : "bg-cream-100 text-navy-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-700 font-bold block">
                          0{idx + 1} • {item.category}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-navy-950 font-normal">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform ${
                        isActive ? "text-gold-700 translate-x-1" : "text-cream-300 opacity-0"
                      }`}
                    />
                  </div>

                  {isActive && (
                    <p className="text-xs sm:text-sm text-navy-600 mt-4 pt-4 border-t border-cream-300/80 leading-relaxed animate-fade-in pl-14 font-light">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Dynamic Photo Canvas (Span 6) */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-cream-300 group">
              <Image
                src={activeFeature.image}
                alt={activeFeature.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 650px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-[#060F1E]/30 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-mono font-bold tracking-wider">
                  {activeFeature.badge}
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {activeFeature.title}
                </h4>
                <p className="text-xs text-cream-200 line-clamp-2 font-light">
                  {activeFeature.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
