import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal, CountUp } from "@/components/motion";

export function StatsSection() {
  const statNumbers = [
    { value: 50, suffix: "+", label: "Years Legacy", description: "Serving Batala since 1975" },
    { value: 1250, suffix: "+", label: "Students Enrolled", description: "Nursery to Class 10" },
    { value: 100, suffix: "%", label: "Board Pass Rate", description: "PSEB Class 10 record" },
    { value: 60, suffix: "+", label: "Expert Faculty", description: "PSEB trained educators" },
    { value: 50, suffix: "+", label: "Annual Awards", description: "Sports & Olympiads" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/15 relative overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4E220F] text-[#F7F1DE] text-[11px] font-mono font-semibold tracking-[0.16em] uppercase shadow-xs">
                INSTITUTIONAL METRICS
              </div>
            </Reveal>
            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl text-[#4E220F] font-semibold tracking-tight">
              {"Excellence Measured in Impact."}
            </LineReveal>
          </div>
          <Reveal direction="up" delay={0.25}>
            <p className="text-xs sm:text-sm text-[#7E5F4E] max-w-sm font-sans">
              Empowering curious young minds in Batala with values, scientific temper, and academic distinction since 1975.
            </p>
          </Reveal>
        </div>

        {/* Editorial Numerals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-2">
          {statNumbers.map((stat, idx) => (
            <Reveal key={idx} direction="up" delay={0.08 * idx + 0.05}>
              <div className="space-y-1.5 border-t border-[#9D6638]/20 pt-5 group">
                <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#4E220F] tracking-tight group-hover:text-[#9D6638] transition-colors leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={1.2} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#4E220F] leading-snug pt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#7E5F4E] leading-tight">
                  {stat.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
