"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { CampusFacility } from "@/types";
import { CAMPUS_FACILITIES } from "@/lib/data/campus";
import { LineReveal, Reveal } from "@/components/motion";

const FALLBACK_FACILITIES: CampusFacility[] = [
  {
    id: "atal-tinkering-lab",
    title: "Atal Tinkering Innovation Lab",
    headline: "NITI Aayog STEM Robotics & 3D Prototyping Hub",
    description: "Equipped with 3D printers, microcontrollers, IoT sensors, and drone kits where students engineer solutions for real-world challenges.",
    category: "STEM & Robotics",
    slug: "atal-tinkering-lab",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    specifications: ["3D Printing & CAD Station", "Arduino & Raspberry Pi Kits", "Drones & Sensor Interfacing"],
    badge: "NITI Aayog Certified"
  },
  {
    id: "composite-science-labs",
    title: "Composite Science Laboratories",
    headline: "Physics, Chemistry & Biology Experiential Stations",
    description: "State-of-the-art laboratory apparatus allowing students from Class 6 to 10 to conduct hands-on experiments safely.",
    category: "Scientific Research",
    slug: "composite-science-labs",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    specifications: ["Microscopy & Specimen Bank", "Fume Hood & Titration Racks", "Safety Eyewash & First Aid"],
    badge: "PSEB Standardized"
  },
  {
    id: "digital-ict-lab",
    title: "Digital Computer & Coding Studio",
    headline: "High-Speed Computing with Python & Web Tech",
    description: "Fully networked lab with individual work terminals, gigabit internet, interactive smartboards, and coding software.",
    category: "IT & Technology",
    slug: "digital-ict-lab",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    specifications: ["1:1 Student Computer Ratio", "Gigabit Fiber Backbone", "Scratch & Python Workstations"],
    badge: "100% Online Ready"
  },
  {
    id: "library-knowledge-center",
    title: "Vedic & Modern Knowledge Library",
    headline: "Over 10,000+ Volumes, Encyclopedias & E-Resources",
    description: "Quiet reading sanctuary housing classical literature, PSEB reference texts, national periodicals, and digital research bays.",
    category: "Academic Sanctuary",
    slug: "library-knowledge-center",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    specifications: ["10,000+ Printed Volumes", "National Periodicals & Journals", "Ergonomic Silent Reading Zone"],
    badge: "Open 6 Days/Week"
  },
  {
    id: "sports-complex",
    title: "Athletics & Martial Arts Arena",
    headline: "Taekwondo, Badminton, Cricket & Multi-Sport Grounds",
    description: "Expansive outdoor playfields and indoor activity mats for physical conditioning, team sports, and martial arts mastery.",
    category: "Sports & Athletics",
    slug: "sports-complex",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    specifications: ["200m Running Track", "Taekwondo & Karate Ring", "Volleyball & Badminton Courts"],
    badge: "State Level Hosting"
  },
  {
    id: "yajnashala-auditorium",
    title: "Yajnashala & Cultural Hall",
    headline: "Vedic Heritage Ceremonies & Assembly Pavilion",
    description: "Dedicated spiritual architecture for daily morning Yajna, havan ceremonies, guest lectures, and inter-house debates.",
    category: "Heritage & Ethos",
    slug: "yajnashala-auditorium",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    specifications: ["Open-Air Sacred Yajnashala", "Acoustic Assembly Pavilion", "Audio-Visual Projection System"],
    badge: "DAV Tradition"
  }
];

function FacilityCard({ facility, index }: { facility: CampusFacility; index: number }) {
  const specs = facility.specifications || (facility as any).features || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden shadow-xl border border-white/15 group min-h-[420px] sm:min-h-[460px] flex flex-col justify-between bg-[#5C2A15] hover:border-[#9D6638] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      data-cursor="FACILITY"
    >
      {/* Photographic Background Layer */}
      <Image
        src={facility.image}
        alt={facility.title}
        fill
        className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Layered High-Contrast Dark Gradient for Extreme Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#3B190B] via-[#3B190B]/60 to-[#3B190B]/20 group-hover:via-[#3B190B]/50 transition-colors" />

      {/* Top Header Badge Strip */}
      <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded bg-[#4E220F]/90 backdrop-blur-md text-[#B0BA99] text-[10px] font-mono uppercase tracking-[0.16em] font-semibold border border-white/10">
          {facility.category}
        </span>

        {facility.badge && (
          <span className="px-2.5 py-0.5 rounded bg-white/10 text-white/90 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xs border border-white/15">
            {facility.badge}
          </span>
        )}
      </div>

      {/* Bottom Content Overlaid Directly on Image */}
      <div className="relative z-10 p-6 sm:p-7 text-white space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#B0BA99] block font-semibold">
            FACILITY 0{index + 1}
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight text-white group-hover:text-[#B0BA99] transition-colors">
            {facility.title}
          </h3>
          <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2">
            {facility.headline || facility.description}
          </p>
        </div>

        {/* Specifications Pills */}
        {specs.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-white/15">
            {specs.slice(0, 3).map((spec: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] text-white/90 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-[#B0BA99] transition-colors">
          <span>Explore Campus Space</span>
          <ArrowRight className="w-4 h-4 text-[#B0BA99] group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function ImmersiveCampusSection({ facilities: propsFacilities }: { facilities?: CampusFacility[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const facilities = (propsFacilities && propsFacilities.length > 0) ? propsFacilities : FALLBACK_FACILITIES;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const col1 = facilities.filter((_, i) => i % 3 === 0);
  const col2 = facilities.filter((_, i) => i % 3 === 1);
  const col3 = facilities.filter((_, i) => i % 3 === 2);

  return (
    <section
      ref={containerRef}
      id="campus-infrastructure"
      className="py-16 lg:py-28 bg-[#4E220F] text-white border-b border-white/10 relative overflow-hidden font-sans"
    >
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B190B] via-[#4E220F] to-[#5C2A15] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-14">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold tracking-[0.16em] uppercase shadow-md">
                <Building2 className="w-3.5 h-3.5 text-[#F7F1DE]" />
                <span>04 · PURPOSE-BUILT CAMPUS SPACES</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.05]">
              {"Spaces Engineered For Discovery."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-normal leading-relaxed">
              Explore purpose-built learning sanctuaries across our campus. All highlights, research apparatus, and specifications are displayed directly on each facility.
            </p>
          </div>

          <Link
            href="/campus"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#B0BA99] hover:text-white transition-colors border-b border-[#B0BA99] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>Explore Campus Facilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Multi-Column Staggered Parallax Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="space-y-6 lg:space-y-8">
            {col1.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="space-y-6 lg:space-y-8 lg:pt-14">
            {col2.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3 + 1} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="space-y-6 lg:space-y-8 lg:pt-6">
            {col3.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3 + 2} />
            ))}
          </motion.div>
        </div>

        {/* Footer Quick Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B0BA99] animate-pulse" />
            <span>09 Purpose-Built Academic, Sports & Innovation Pavilions</span>
          </div>

          <Link
            href="/campus"
            className="text-[#B0BA99] hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold"
          >
            <span>Book In-Person Campus Walkthrough</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
