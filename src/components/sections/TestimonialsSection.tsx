import { Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { LineReveal, Reveal } from "@/components/motion";

interface TestimonialsSectionProps {
  testimonials?: any[];
}

export function TestimonialsSection({ testimonials = TESTIMONIALS }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS;

  return (
    <section className="py-14 lg:py-20 bg-[#F6F3ED] text-[#1C2730] border-b border-[#163A5F]/10 relative overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/10 text-[#2F5D62] text-[11px] font-mono font-medium tracking-[0.16em] uppercase">
              09 · COMMUNITY PERSPECTIVES
            </div>
          </Reveal>
          <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl text-[#0B1F33] font-semibold tracking-tight">
            {"VOICES OF TRUST."}
          </LineReveal>
          <Reveal direction="up" delay={0.25}>
            <p className="text-[#1C2730] text-xs sm:text-sm font-normal">
              Authentic reflections from parents, alumni, and educators on the transformational impact of DAV education in Batala.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Large Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {items.map((item, idx) => (
            <Reveal key={item.id} direction="up" delay={0.1 * idx + 0.1}>
              <div
                className="space-y-4 border-t border-[#163A5F]/20 pt-6 flex flex-col justify-between h-full group"
                data-cursor="QUOTE"
              >
                <div className="space-y-3">
                  <Quote className="w-7 h-7 text-[#2F5D62]/40" />

                  <p className="font-editorial text-xl sm:text-2xl text-[#0B1F33] leading-relaxed italic font-normal">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#163A5F]/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-editorial text-lg font-bold text-[#0B1F33]">
                      {item.authorName}
                    </h4>
                    <p className="text-xs text-[#68747C] font-mono">
                      {item.detail}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#2F5D62] bg-[#2F5D62]/10 px-2.5 py-1 rounded">
                    {item.relationship}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
