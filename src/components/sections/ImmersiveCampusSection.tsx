"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Building2, Shield, Trophy, BookOpen, Compass, Cpu, Palette, Trees, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CAMPUS_FACILITIES } from "@/lib/data/campus";
import { CampusFacility } from "@/types";
import { LineReveal, Reveal } from "@/components/motion";

interface ImmersiveCampusSectionProps {
  facilities?: CampusFacility[];
}

const BALANCED_CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "smart-classrooms",
    slug: "smart-classrooms",
    title: "Interactive Smart Classrooms",
    category: "Academic",
    headline: "Digitally empowered interactive lecture studios with 4K touch panels.",
    description: "Every classroom from Primary to Senior Secondary is equipped with high-definition digital smart boards, acoustic paneling, ergonomic modular seating, and high-speed campus intranet.",
    specifications: [
      "75-inch Ultra HD Interactive Flat Panels",
      "Comprehensive 3D simulations & AR modules",
      "Ergonomically designed dual posture desks"
    ],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=85&w=1000",
    badge: "Next-Gen Learning"
  },
  {
    id: "science-laboratories",
    slug: "science-laboratories",
    title: "Advanced Science Research Labs",
    category: "Technology",
    headline: "Separate cutting-edge Physics, Chemistry, and Biology research laboratories.",
    description: "Built to international safety benchmarks, our composite labs allow students to transition from textbook theory to tactile empirical validation.",
    specifications: [
      "Over 40 individual experiment stations per lab",
      "High-power binocular optical microscopes",
      "Fume hoods & emergency eye-wash safety"
    ],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=85&w=1000",
    badge: "Empirical Rigor"
  },
  {
    id: "atal-tinkering-lab",
    slug: "atal-tinkering-lab",
    title: "Atal Tinkering Robotics Hub",
    category: "Technology",
    headline: "NITI Aayog-supported innovation lab with 3D printers & IoT kits.",
    description: "Where future engineers and inventors program microcontrollers, assemble autonomous robots, and develop AI models.",
    specifications: [
      "Dual-extrusion 3D Printers & Laser Cutters",
      "Arduino, Raspberry Pi & sensor arrays",
      "National Robotics Olympiad mentorship"
    ],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=1000",
    badge: "AI & Innovation"
  },
  {
    id: "knowledge-resource-center",
    slug: "knowledge-resource-center",
    title: "Central Knowledge Commons",
    category: "Academic",
    headline: "Over 15,000 curated titles, academic journals, and automated digital lending.",
    description: "A sanctuary of quiet study, intellectual reflection, and literary exploration featuring an expansive open-access stack and Kindle stations.",
    specifications: [
      "15,000+ fiction, non-fiction & encyclopaedias",
      "Subscriptions to 30+ national research journals",
      "Automated Koha barcode LMS digital catalog"
    ],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=85&w=1000",
    badge: "15,000+ Volumes"
  },
  {
    id: "sports-complex",
    slug: "sports-complex",
    title: "Sports Pavilion & Cricket Turf",
    category: "Sports",
    headline: "Multi-sport arenas covering Cricket, Basketball, Skating & Athletics.",
    description: "Physical conditioning and sportsmanship are foundational to DAV culture with regulation turf cricket pitch and certified NIS trainers.",
    specifications: [
      "Full-size grass sports oval & turf cricket nets",
      "FIBA-standard all-weather Basketball Court",
      "Speed skating rink & NIS certified coaches"
    ],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=85&w=1000",
    badge: "Athletic Excellence"
  },
  {
    id: "performing-arts-auditorium",
    slug: "performing-arts-auditorium",
    title: "Maharshi Dayanand Grand Hall",
    category: "Cultural",
    headline: "Acoustically treated 800-seat amphitheatre for performing arts.",
    description: "The vibrant heart of school festivals, theatrical productions, classical music recitals, inter-school debates, and graduation ceremonies.",
    specifications: [
      "800-seat tiered acoustic auditorium",
      "Professional line-array sound & stage lighting",
      "Green rooms & backstage makeup suites"
    ],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85&w=1000",
    badge: "800-Seat Grand Hall"
  },
  {
    id: "taekwondo-martial-arts",
    slug: "taekwondo-martial-arts",
    title: "Taekwondo & Martial Arts Dojo",
    category: "Sports",
    headline: "Specialized combat training floor for agility, self-defense & discipline.",
    description: "Equipped with high-density tatami impact mats, sparring gear, and NIS certified black-belt instructors training state champions.",
    specifications: [
      "Olympic-standard shock-absorbent tatami mats",
      "Complete protective sparring & speed shields",
      "Daily self-defense modules for boys & girls"
    ],
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=85&w=1000",
    badge: "State Medalists"
  },
  {
    id: "eco-botanical-groves",
    slug: "eco-botanical-groves",
    title: "12-Acre Eco-Botanical Groves",
    category: "Wellness",
    headline: "Lush botanical gardens, organic farming plots, and study pavilions.",
    description: "A tranquil emerald campus filled with native trees, herbal botanical gardens, solar lighting, and bird-friendly biodiversity spaces.",
    specifications: [
      "500+ shade-giving trees & herbal garden",
      "Rainwater harvesting & solar power grid",
      "Open-air shaded reading lawn carrels"
    ],
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=85&w=1000",
    badge: "12 Green Acres"
  },
  {
    id: "vedic-yagyashala",
    slug: "vedic-yagyashala",
    title: "Vedic Yagyashala & Heritage Pavilion",
    category: "Cultural",
    headline: "Daily morning Vedic Havans, sacred chants, and moral grounding.",
    description: "A sacred open-air pavilion where students gather for morning prayers and Gayatri Mantra chanting, instilling discipline, empathy, and reverence for nature.",
    specifications: [
      "Consecrated open-air Havan Kund pavilion",
      "Daily student chanting of Vedic hymns",
      "Morning moral discourse & values assembly"
    ],
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=85&w=1000",
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
      className="relative rounded-2xl overflow-hidden shadow-xl border border-white/15 group min-h-[420px] sm:min-h-[460px] flex flex-col justify-between bg-[#0B1F33] hover:border-[#A8C3BC]/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-[#0B1F33]/20 group-hover:via-[#0B1F33]/50 transition-colors" />

      {/* Top Header Badge Strip */}
      <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 rounded bg-[#0B1F33]/90 backdrop-blur-md text-[#A8C3BC] text-[10px] font-mono uppercase tracking-[0.16em] font-semibold border border-white/10">
          {facility.category}
        </span>

        {facility.badge && (
          <span className="px-2.5 py-0.5 rounded bg-white/10 text-white/90 text-[10px] font-mono uppercase tracking-wider backdrop-blur-xs border border-white/15">
            {facility.badge}
          </span>
        )}
      </div>

      {/* Bottom Content Overlaid Directly on Image (Zero Hard Work for User) */}
      <div className="relative z-10 p-6 sm:p-7 text-white space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#A8C3BC] block font-semibold">
            FACILITY 0{index + 1}
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal leading-tight text-white group-hover:text-[#A8C3BC] transition-colors">
            {facility.title}
          </h3>
          <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2">
            {facility.headline || facility.description}
          </p>
        </div>

        {/* Highlights Matrix */}
        {specs.length > 0 && (
          <div className="space-y-1.5 pt-3 border-t border-white/15">
            {specs.slice(0, 2).map((spec: string, sIdx: number) => (
              <div key={sIdx} className="flex items-center gap-2 text-xs text-white/90 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <span className="truncate">{spec}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-[#A8C3BC] transition-colors">
          <span className="uppercase tracking-wider">Explore Infrastructure</span>
          <ArrowRight className="w-4 h-4 text-[#A8C3BC] group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function ImmersiveCampusSection({ facilities: propFacilities }: ImmersiveCampusSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge Sanity facilities with defaults so all 9 are populated
  const facilities = propFacilities && propFacilities.length > 4 
    ? propFacilities 
    : BALANCED_CAMPUS_FACILITIES;

  // High-depth Parallax scroll hooks with Spring Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY1 = useTransform(scrollYProgress, [0, 1], [70, -110]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], [-50, 90]);
  const rawY3 = useTransform(scrollYProgress, [0, 1], [50, -80]);

  const springConfig = { damping: 20, stiffness: 90 };
  const y1 = useSpring(rawY1, springConfig);
  const y2 = useSpring(rawY2, springConfig);
  const y3 = useSpring(rawY3, springConfig);

  // Split into 3 balanced columns (3 in each column)
  const col1 = facilities.filter((_, i) => i % 3 === 0);
  const col2 = facilities.filter((_, i) => i % 3 === 1);
  const col3 = facilities.filter((_, i) => i % 3 === 2);

  return (
    <section
      ref={containerRef}
      id="campus-infrastructure"
      className="py-16 lg:py-28 bg-[#163A5F] text-white border-b border-white/10 relative overflow-hidden font-sans"
    >
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2742] via-[#163A5F] to-[#0A1D33] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-14">
        {/* Section Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-3xl">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[#A8C3BC] text-[11px] font-mono font-medium tracking-[0.16em] uppercase border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-[#A8C3BC]" />
                <span>04 · IMMERSIVE 12-ACRE CAMPUS SPACES</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.05]">
              {"Spaces Engineered For Discovery."}
            </LineReveal>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-normal leading-relaxed">
              Explore 9 purpose-built learning sanctuaries across our 12-acre campus. All highlights, research apparatus, and specifications are displayed directly on each facility.
            </p>
          </div>

          <Link
            href="/campus"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A8C3BC] hover:text-white transition-colors border-b border-[#A8C3BC] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>Complete 12-Acre Campus Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Multi-Column Staggered Parallax Mosaic - High Tactile Parallax Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Column 1 with Upward Parallax y1 */}
          <motion.div style={{ y: y1 }} className="space-y-6 lg:space-y-8">
            {col1.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3} />
            ))}
          </motion.div>

          {/* Column 2 with Downward Stagger Parallax y2 */}
          <motion.div style={{ y: y2 }} className="space-y-6 lg:space-y-8 lg:pt-14">
            {col2.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3 + 1} />
            ))}
          </motion.div>

          {/* Column 3 with Floating Parallax y3 */}
          <motion.div style={{ y: y3 }} className="space-y-6 lg:space-y-8 lg:pt-6">
            {col3.map((facility, idx) => (
              <FacilityCard key={facility.id} facility={facility} index={idx * 3 + 2} />
            ))}
          </motion.div>
        </div>

        {/* Footer Quick Strip */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A8C3BC] animate-pulse" />
            <span>09 Purpose-Built Academic, Sports & Innovation Pavilions</span>
          </div>

          <Link
            href="/campus"
            className="text-[#A8C3BC] hover:text-white flex items-center gap-1 uppercase tracking-wider font-semibold"
          >
            <span>Book In-Person Campus Walkthrough</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
