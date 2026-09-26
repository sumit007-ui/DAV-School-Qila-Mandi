import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, BookOpen, Monitor, Bus } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal, ImageReveal } from "@/components/motion";

export function EditorialStatement() {
  const currentYear = new Date().getFullYear();
  const yearsCount = Math.max(1, currentYear - (SCHOOL_CONFIG.establishedYear || 1990));

  return (
    <section id="editorial-statement" className="py-12 lg:py-16 bg-[#F7F1DE] text-[#4E220F] relative overflow-hidden border-b border-[#9D6638]/15 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Large Statement Column (Span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                FOUNDATIONAL ETHOS · EST. 1990
              </div>
            </Reveal>
            
            <LineReveal as="h2" className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#4E220F] font-semibold leading-[1.0] tracking-tight">
              {"MORE THAN\nA CLASSROOM."}
            </LineReveal>

            <Reveal direction="up" delay={0.2}>
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#9D6638]/20 shadow-xs space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9D6638] block font-semibold">
                  Timeless Vedic Motto
                </span>
                <p className="font-editorial text-xl sm:text-2xl text-[#4E220F] italic">
                  "{SCHOOL_CONFIG.motto}"
                </p>
                <p className="text-xs text-[#7E5F4E]">
                  Lead us from darkness unto light — shaping intellect, humility, and character in Batala since 1990.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Narrative Paragraphs & Values (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal direction="up" delay={0.15}>
              <p className="font-editorial text-xl sm:text-2xl lg:text-[26px] text-[#4E220F] leading-snug font-normal">
                We believe true school education must balance rigorous academic achievement with deep cultural humility, emotional safety, and personal character.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.2}>
              <p className="text-[#4E220F]/90 text-sm sm:text-base leading-relaxed font-normal">
                Operating under the esteemed DAV College Managing Committee (DAVCMC), New Delhi, our educators partner closely with parents in Batala. From foundational play and phonics in Nursery to high-percentage PSEB Class 10 distinctions, every student receives patient, individual guidance in a disciplined and affectionate environment.
              </p>
            </Reveal>

            {/* 3 Value Pillars with Hairline Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-[#9D6638]/20">
              <Reveal direction="up" delay={0.25}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#9D6638]">01.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#4E220F]">Safety & Values</h4>
                  <p className="text-xs text-[#7E5F4E]">Caring female attendants, CCTV security, and daily moral grounding.</p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#9D6638]">02.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#4E220F]">Conceptual Clarity</h4>
                  <p className="text-xs text-[#7E5F4E]">Interactive smart panels, science practicals, and math logic.</p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.35}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#9D6638]">03.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#4E220F]">Confidence & Speech</h4>
                  <p className="text-xs text-[#7E5F4E]">Bilingual English & Punjabi fluency, public speaking, and team sports.</p>
                </div>
              </Reveal>
            </div>

            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors group"
              >
                <span>Read the Complete DAV Heritage Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9D6638] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Photography Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Main Large Image (Span 7) */}
          <div className="md:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-[#9D6638]/20 group" data-cursor="CAMPUS">
            <ImageReveal
              src="/images/ethos-learning.jpg"
              alt="Students collaborating in classroom at DAV School"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B0BA99]">
                CAMPUS ENVIRONMENT
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-normal">
                Cultivating curiosity, empathy, and intellectual independence.
              </p>
            </div>
          </div>

          {/* 2 Vertical Stacked Side Images (Span 5) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-[#9D6638]/20 group" data-cursor="LAB">
              <ImageReveal
                src="/images/science-lab.jpg"
                alt="Students experimenting in science lab"
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#4E220F]/90 backdrop-blur-xs text-[#B0BA99] text-[9px] font-mono uppercase tracking-wider">
                Practical Science Laboratories
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-[#9D6638]/20 group" data-cursor="ARTS">
              <ImageReveal
                src="/images/bhangra-giddha.jpg"
                alt="Student performing arts & cultural tradition"
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#4E220F]/90 backdrop-blur-xs text-[#B0BA99] text-[9px] font-mono uppercase tracking-wider">
                Vedic Arts & Cultural Heritage
              </div>
            </div>
          </div>
        </div>

        {/* Static Institutional Hallmarks Bar (Replacing generic Marquee) */}
        <div className="pt-6 border-t border-[#9D6638]/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#9D6638]/20 shadow-xs space-y-1.5 hover:border-[#9D6638]/40 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9D6638]" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9D6638]">Affiliation</span>
              </div>
              <h4 className="font-editorial text-lg text-[#4E220F] font-semibold leading-tight">PSEB Affiliated</h4>
              <p className="text-xs text-[#7E5F4E]">Punjab Board Code PB-20176 with consistent 100% Class 10 pass record.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#9D6638]/20 shadow-xs space-y-1.5 hover:border-[#9D6638]/40 transition-colors">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9D6638]" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9D6638]">Ethos & Dharma</span>
              </div>
              <h4 className="font-editorial text-lg text-[#4E220F] font-semibold leading-tight">Vedic Heritage</h4>
              <p className="text-xs text-[#7E5F4E]">Daily Yajna, Gayatri Mantra, and moral discipline rooted in Arya Samaj values.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#9D6638]/20 shadow-xs space-y-1.5 hover:border-[#9D6638]/40 transition-colors">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#9D6638]" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9D6638]">Classrooms</span>
              </div>
              <h4 className="font-editorial text-lg text-[#4E220F] font-semibold leading-tight">Smart Digital Labs</h4>
              <p className="text-xs text-[#7E5F4E]">Interactive 75" panels, composite science laboratory, and computer education.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#9D6638]/20 shadow-xs space-y-1.5 hover:border-[#9D6638]/40 transition-colors">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#9D6638]" />
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9D6638]">Parent Reassurance</span>
              </div>
              <h4 className="font-editorial text-lg text-[#4E220F] font-semibold leading-tight">Safe Van Transport</h4>
              <p className="text-xs text-[#7E5F4E]">CCTV monitored campus with dedicated female attendants for primary students.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
