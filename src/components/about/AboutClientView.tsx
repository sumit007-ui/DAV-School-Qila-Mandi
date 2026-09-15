"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Compass, BookOpen, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { SCHOOL_CONFIG } from "@/config/school";
import { useAppModals } from "@/components/layout/ClientAppWrapper";

interface LeadershipProfile {
  name: string;
  designation: string;
  qualifications?: string;
  photoUrl?: string;
  image?: string;
  shortMessage?: string;
  fullMessage?: string[];
}

interface AboutClientViewProps {
  principal: LeadershipProfile;
  siteSettings?: any;
}

export function AboutClientView({ principal, siteSettings }: AboutClientViewProps) {
  const { openAdmissionModal } = useAppModals();
  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;

  const coreValues = [
    {
      title: "Vedic Wisdom & Ethical Integrity",
      description: "Rooted in the eternal philosophy of Maharshi Dayanand Saraswati, promoting truthfulness, discipline, daily Havans, and universal brotherhood (Vasudhaiva Kutumbakam)."
    },
    {
      title: "Scientific Temper & Empirical Rigor",
      description: "Cultivating inquisitive inquiry, hands-on experimentation in our modern science and computer laboratories, and rational problem-solving."
    },
    {
      title: "Holistic Human Excellence",
      description: "Developing mind, body, and character through competitive sports, performing arts, debate, and social community outreach."
    },
    {
      title: "Democratic Inclusivity & Respect",
      description: "Nurturing an egalitarian campus culture where every scholar is respected, safe, heard, and inspired to reach their highest potential."
    }
  ];

  const fullPrincipalMessageList = principal.fullMessage && principal.fullMessage.length > 0
    ? principal.fullMessage
    : (principal.shortMessage ? [principal.shortMessage] : SCHOOL_CONFIG.leadership.principal.fullMessage);

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
            alt={`${schoolName} Heritage`}
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
            <span>Heritage & Leadership</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Tradition meets tomorrow.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            {schoolName}, Qilla Mandi, Batala. Affiliated to Punjab School Education Board (PSEB Mohali). Dedicated to cultivating enlightened, value-driven global citizens.
          </p>
        </div>
      </section>

      {/* Legacy & History Section */}
      <section className="py-20 bg-cream-50 text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
                Institutional Genesis
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal leading-tight">
                Over 50 Years of Educational Luminescence in Batala
              </h2>

              <div className="space-y-4 text-navy-700 text-sm sm:text-base leading-relaxed">
                <p>
                  {schoolName} was established to provide the youth of Batala and surrounding regions an institution combining the pristine ideals of Vedic civilization with world-class PSEB modern education.
                </p>
                <p>
                  Operated directly under the prestigious <strong>DAV College Managing Committee (DAVCMC)</strong>—the largest non-governmental educational organization in India—the school has grown into a benchmark educational landmark.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-cream-300 space-y-2">
                <p className="font-serif italic text-gold-700 font-medium">
                  "{SCHOOL_CONFIG.motto}"
                </p>
                <p className="text-xs text-navy-600">
                  Leading generations from the darkness of ignorance into the luminous dawn of wisdom.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-cream-300">
                <Image
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000"
                  alt={`${schoolName} Campus Grounds`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-navy-950 text-white p-6 rounded-2xl border border-gold-500/30 shadow-xl hidden sm:block max-w-xs">
                <span className="font-serif text-3xl text-gold-400 font-bold block">1975</span>
                <span className="text-xs text-cream-200 mt-1 block">Founded with a vision to nurture nation-builders and ethical visionaries.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="py-20 bg-white text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-navy-950 text-white border border-gold-500/30 space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl text-white font-normal">Our Vision</h3>
                <p className="text-cream-200 text-sm sm:text-base leading-relaxed">
                  To be an acclaimed center of academic and ethical excellence that inspires students to realize their highest cognitive, moral, and creative potential while serving society with humility, leadership, and Vedic values.
                </p>
              </div>
              <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                Enlightened Global Leadership
              </span>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-10 rounded-2xl bg-cream-50 text-navy-950 border border-cream-300 space-y-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-navy-900 text-cream-100 flex items-center justify-center shadow-xs">
                  <BookOpen className="w-6 h-6 text-cream-100" />
                </div>
                <h3 className="font-serif text-3xl text-navy-950 font-normal">Our Mission</h3>
                <ul className="text-navy-700 text-sm space-y-2.5 list-disc list-inside">
                  <li>Provide an enriching PSEB curriculum enhanced with experiential learning and computer science labs.</li>
                  <li>Inculcate profound respect for Indian heritage, environmental conservation, and social empathy.</li>
                  <li>Foster athletic conditioning, sportsmanship, and mental resilience.</li>
                  <li>Prepare students for PSEB High School board examinations and overall career excellence.</li>
                </ul>
              </div>
              <span className="text-xs font-mono text-gold-700 uppercase tracking-widest font-bold">
                Holistic Student Transformation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Institutional Values */}
      <section className="py-20 bg-cream-50 text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              The Four Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              Values That Anchor Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-cream-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-serif text-2xl font-bold text-gold-700">0{idx + 1}.</span>
                  <h3 className="font-serif text-lg font-bold text-navy-950 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-xs text-navy-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profile Section - Principal */}
      <section id="leadership-messages" className="py-20 bg-white text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Principal's Message */}
          <div id="principal-message" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-4 relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#9D6638]/20 group bg-[#4E220F]">
                <Image
                  src={principal.photoUrl || principal.image || SCHOOL_CONFIG.leadership.principal.image}
                  alt={principal.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#321509]/95 via-[#321509]/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#9D6638] text-white text-[9px] font-mono uppercase tracking-wider mb-2 font-semibold">
                    <Award className="w-3 h-3 text-gold-300" /> HEAD OF INSTITUTION
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl font-normal text-white">
                    {principal.name}
                  </h3>
                </div>
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 w-full max-w-[320px] sm:max-w-[360px] h-full rounded-2xl border border-[#9D6638]/20 -z-10 hidden sm:block pointer-events-none" />
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase">
                <Award className="w-3.5 h-3.5 text-gold-300" />
                <span>Head of Institution</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
                {principal.name}
              </h2>

              <p className="text-xs font-mono text-gold-700 font-bold">
                {principal.designation}
              </p>

              <div className="space-y-4 text-sm text-navy-700 leading-relaxed">
                {fullPrincipalMessageList.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-cream-200 flex items-center gap-4">
                <button
                  onClick={() => openAdmissionModal("Nursery")}
                  className="px-6 py-3 rounded-xl bg-navy-900 text-white hover:text-cream-100 font-bold text-xs uppercase tracking-wider hover:bg-navy-950 transition-all shadow-md active:scale-95"
                >
                  Apply for Admission 2026-27
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
