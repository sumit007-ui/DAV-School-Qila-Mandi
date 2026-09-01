import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { EditorialEyebrow } from "@/components/ui/SplitText";

export function EditorialStatement() {
  return (
    <section id="editorial-statement" className="py-28 lg:py-40 bg-[#FBF9F4] text-navy-950 relative overflow-hidden border-b border-cream-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Large Statement Column (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <EditorialEyebrow>01 • Institutional Philosophy</EditorialEyebrow>
            
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-navy-950 font-normal leading-[0.98] tracking-tight">
              MORE THAN <br />
              <span className="italic text-gold-600 font-light">A CLASSROOM.</span>
            </h2>

            <div className="p-6 rounded-2xl bg-white border border-cream-300/80 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-700 block font-bold">
                Timeless Vedic Motto
              </span>
              <p className="font-serif text-xl sm:text-2xl text-navy-900 italic">
                "{SCHOOL_CONFIG.motto}"
              </p>
              <p className="text-xs font-mono text-navy-600">
                Lead us from darkness unto light — shaping intellect and integrity since 1989.
              </p>
            </div>
          </div>

          {/* Right Narrative Paragraphs & Values (Span 6) */}
          <div className="lg:col-span-6 space-y-8 lg:pt-8">
            <p className="font-serif text-2xl sm:text-3xl text-navy-900 leading-snug font-light">
              At DAV Public School Qilla Mandi, we believe true education is not merely the transmission of syllabus facts, but the awakening of conscience, critical courage, and foundational character.
            </p>

            <p className="text-navy-700 text-sm sm:text-base leading-relaxed">
              Established under the esteemed DAV College Managing Committee (DAVCMC), New Delhi, we weave together the timeless moral depth of Vedic wisdom with the empirical rigor of modern STEM laboratories, Atal Robotics, and international sports arenas for children from Nursery to Class 10.
            </p>

            {/* 3 Value Pillars with Hairline Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-navy-950/15">
              <div className="space-y-1.5">
                <span className="font-serif text-2xl font-light text-gold-700">01.</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-navy-950">Care & Values</h4>
                <p className="text-xs text-navy-600">Rooted in humility, daily Havans, and moral guidance.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-serif text-2xl font-light text-gold-700">02.</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-navy-950">Joyful Intellect</h4>
                <p className="text-xs text-navy-600">Concept clarity, science inquiry, and Olympiad rigor.</p>
              </div>
              <div className="space-y-1.5">
                <span className="font-serif text-2xl font-light text-gold-700">03.</span>
                <h4 className="font-bold text-xs uppercase tracking-wider text-navy-950">Confidence</h4>
                <p className="text-xs text-navy-600">Public speaking, athletic resilience, and teamwork.</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-navy-950 hover:text-gold-700 transition-colors group"
              >
                <span>Read the Complete DAV Heritage Story</span>
                <ArrowRight className="w-4 h-4 text-gold-600 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
