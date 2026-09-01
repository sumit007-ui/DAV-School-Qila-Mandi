import { SCHOOL_CONFIG } from "@/config/school";
import { EditorialEyebrow } from "@/components/ui/SplitText";

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] text-navy-950 border-b border-cream-300/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <EditorialEyebrow>Institutional Metrics</EditorialEyebrow>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
              Excellence Measured in Impact.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-navy-600 max-w-sm">
            Empowering curious young minds in Batala with values, scientific temper, and academic distinction since 1989.
          </p>
        </div>

        {/* Editorial Numerals Grid with Hairline Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-4">
          {SCHOOL_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="space-y-2 border-t border-navy-950/15 pt-6 group"
            >
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-navy-950 tracking-tight group-hover:text-gold-700 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-navy-900 leading-snug">
                {stat.label}
              </div>
              <div className="text-[11px] text-navy-600/80 leading-tight">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
