import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal, CountUp } from "@/components/motion";

export function StatsSection() {
  const statNumbers = [
    { value: 35, suffix: "+", label: "Years Legacy", description: "Serving Batala since 1989" },
    { value: 2400, suffix: "+", label: "Students Enrolled", description: "Nursery to Class 10" },
    { value: 100, suffix: "%", label: "Board Pass Rate", description: "CBSE Class 10 record" },
    { value: 100, suffix: "+", label: "Expert Faculty", description: "CBSE trained educators" },
    { value: 12, suffix: "+", label: "Green Acres", description: "Eco-friendly campus" },
    { value: 50, suffix: "+", label: "Annual Awards", description: "Sports & Olympiads" },
  ];

  return (
    <section className="py-12 lg:py-16 bg-[#F6F3ED] text-[#1C2730] border-b border-[#163A5F]/10 relative overflow-hidden font-sans">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/10 text-[#2F5D62] text-[11px] font-mono font-medium tracking-[0.16em] uppercase">
                INSTITUTIONAL METRICS
              </div>
            </Reveal>
            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl text-[#0B1F33] font-semibold tracking-tight">
              {"Excellence Measured in Impact."}
            </LineReveal>
          </div>
          <Reveal direction="up" delay={0.25}>
            <p className="text-xs sm:text-sm text-[#68747C] max-w-sm font-sans">
              Empowering curious young minds in Batala with values, scientific temper, and academic distinction since 1989.
            </p>
          </Reveal>
        </div>

        {/* Editorial Numerals Grid with Cormorant Garamond */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-2">
          {statNumbers.map((stat, idx) => (
            <Reveal key={idx} direction="up" delay={0.08 * idx + 0.05}>
              <div className="space-y-1.5 border-t border-[#163A5F]/15 pt-5 group">
                <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0B1F33] tracking-tight group-hover:text-[#2F5D62] transition-colors leading-none">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={1.2} />
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#0B1F33] leading-snug pt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#68747C] leading-tight">
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
