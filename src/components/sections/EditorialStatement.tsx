import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal, ImageReveal, Marquee } from "@/components/motion";

export function EditorialStatement() {
  const marqueeWords = [
    "WORK IS WORSHIP",
    "तमसो मा ज्योतिर्गमय",
    "LEARN · EXPLORE · CREATE · LEAD",
    "DAV PUBLIC SCHOOL QILLA MANDI",
    "35+ YEARS OF ACADEMIC EXCELLENCE",
    "CBSE AFFILIATED",
    "HOLISTIC VEDIC PEDAGOGY",
  ];

  return (
    <section id="editorial-statement" className="py-14 lg:py-20 bg-[#F6F3ED] text-[#1C2730] relative overflow-hidden border-b border-[#163A5F]/10 font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Large Statement Column (Span 6) */}
          <div className="lg:col-span-6 space-y-5">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/10 text-[#2F5D62] text-[11px] font-mono font-medium tracking-[0.16em] uppercase">
                01 · INSTITUTIONAL PHILOSOPHY
              </div>
            </Reveal>
            
            <LineReveal as="h2" className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#0B1F33] font-semibold leading-[0.98] tracking-tight">
              {"MORE THAN\nA CLASSROOM."}
            </LineReveal>

            <Reveal direction="up" delay={0.25}>
              <div className="p-5 rounded-xl bg-white border border-[#163A5F]/10 shadow-xs space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2F5D62] block font-semibold">
                  Timeless Vedic Motto
                </span>
                <p className="font-editorial text-2xl text-[#0B1F33] italic">
                  "{SCHOOL_CONFIG.motto}"
                </p>
                <p className="text-xs text-[#68747C]">
                  Lead us from darkness unto light — shaping intellect and character since 1989.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Narrative Paragraphs & Values (Span 6) */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <Reveal direction="up" delay={0.15}>
              <p className="font-editorial text-2xl sm:text-3xl text-[#0B1F33] leading-snug font-normal">
                At DAV Public School Qilla Mandi, we believe true education is not merely the transmission of syllabus facts, but the awakening of conscience, critical courage, and foundational character.
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="text-[#1C2730] text-sm sm:text-base leading-relaxed font-normal">
                Established under the esteemed DAV College Managing Committee (DAVCMC), New Delhi, we weave together the timeless moral depth of Vedic wisdom with the empirical rigor of modern STEM laboratories, Atal Robotics, and international sports arenas for children from Nursery to Class 10.
              </p>
            </Reveal>

            {/* 3 Value Pillars with Hairline Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#163A5F]/15">
              <Reveal direction="up" delay={0.3}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#2F5D62]">01.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B1F33]">Care & Values</h4>
                  <p className="text-xs text-[#68747C]">Rooted in humility, daily Havans, and moral guidance.</p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.4}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#2F5D62]">02.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B1F33]">Joyful Intellect</h4>
                  <p className="text-xs text-[#68747C]">Concept clarity, science inquiry, and Olympiad rigor.</p>
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.5}>
                <div className="space-y-1">
                  <span className="font-mono text-xs font-semibold text-[#2F5D62]">03.</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#0B1F33]">Confidence</h4>
                  <p className="text-xs text-[#68747C]">Public speaking, athletic resilience, and teamwork.</p>
                </div>
              </Reveal>
            </div>

            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1F33] hover:text-[#2F5D62] transition-colors group"
              >
                <span>Read the Complete DAV Heritage Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2F5D62] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Photography Collage (60% Main + 2 Stacked Side Images) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-4">
          {/* Main Large Image (Span 7) */}
          <div className="md:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-[#163A5F]/10 group" data-cursor="CAMPUS">
            <ImageReveal
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=85&w=1200"
              alt="Students collaborating in library"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/70 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A8C3BC]">
                SCHOLASTIC ENVIRONMENT
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-normal">
                Cultivating curiosity, empathy, and intellectual independence.
              </p>
            </div>
          </div>

          {/* 2 Vertical Stacked Side Images (Span 5) */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-[#163A5F]/10 group" data-cursor="LAB">
              <ImageReveal
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=85&w=800"
                alt="Teacher mentoring students in STEM lab"
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1F33]/90 backdrop-blur-xs text-[#A8C3BC] text-[9px] font-mono uppercase tracking-wider">
                STEM Inquiry & Robotics
              </div>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-sm border border-[#163A5F]/10 group" data-cursor="ARTS">
              <ImageReveal
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85&w=800"
                alt="Student performing arts & cultural tradition"
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1F33]/90 backdrop-blur-xs text-[#A8C3BC] text-[9px] font-mono uppercase tracking-wider">
                Vedic Arts & Culture
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Marquee Ribbon */}
        <div className="pt-4 border-t border-[#163A5F]/10">
          <Marquee
            items={marqueeWords}
            speed={35}
            itemClassName="text-[11px] font-mono uppercase tracking-[0.2em] text-[#2F5D62]"
          />
        </div>
      </div>
    </section>
  );
}
