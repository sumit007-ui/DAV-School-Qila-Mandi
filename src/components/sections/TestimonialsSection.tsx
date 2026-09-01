import { Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { EditorialEyebrow } from "@/components/ui/SplitText";

interface TestimonialsSectionProps {
  testimonials?: any[];
}

export function TestimonialsSection({ testimonials = TESTIMONIALS }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : TESTIMONIALS;

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] text-navy-950 border-b border-cream-300/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <EditorialEyebrow>Community Voices</EditorialEyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
            FROM OUR SCHOOL COMMUNITY.
          </h2>
          <p className="text-navy-700 text-xs sm:text-sm">
            Authentic reflections from parents, alumni, and educators on the transformational impact of DAV education in Batala.
          </p>
        </div>

        {/* 2-Column Large Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item) => (
            <div
              key={item.id}
              className="space-y-6 border-t border-navy-950/15 pt-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-gold-600/40" />

                <p className="font-serif text-lg sm:text-xl text-navy-900 leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-300/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-navy-950">
                    {item.authorName}
                  </h4>
                  <p className="text-xs text-navy-600 font-mono">
                    {item.detail}
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-700 bg-cream-200/80 px-2.5 py-1 rounded">
                  {item.relationship}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
