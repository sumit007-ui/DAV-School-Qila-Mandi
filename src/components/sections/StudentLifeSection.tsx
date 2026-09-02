"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Palette, Compass, Flag, Sparkles, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import { LineReveal, Reveal } from "@/components/motion";

const CAMPUS_LIFE_CARDS = [
  {
    id: "house-system",
    title: "Four House Fraternity",
    tagline: "Dayanand · Hansraj · Shraddhanand · Lajpat",
    category: "House Culture",
    description: "Instilling camaraderie, sportsmanship, and healthy competitive pride through weekly inter-house challenges and cultural championships.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=85&w=900",
    badge: "Legacy Tradition",
    icon: Flag,
    href: "/student-life#houses"
  },
  {
    id: "robotics-hub",
    title: "Robotics & Innovation Lab",
    tagline: "Atal Tinkering Cell & IoT Hub",
    category: "STEM & Tech",
    description: "Young technocrats building autonomous robotics, 3D prototypes, IoT sensors, and competing in prestigious National Science Olympiads.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=85&w=900",
    badge: "Atal Tinkering Hub",
    icon: Compass,
    href: "/student-life#clubs"
  },
  {
    id: "performing-arts",
    title: "Classical & Folk Arts",
    tagline: "Harmonium, Tabla & Theatre",
    category: "Aesthetics & Stage",
    description: "Vocal and instrumental melodies echoed in our 800-seat auditorium, celebrating Vedic hymns alongside vibrant Punjabi cultural festivals.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85&w=900",
    badge: "800-Seat Grand Stage",
    icon: Palette,
    href: "/student-life#arts"
  },
  {
    id: "championship-athletics",
    title: "Athletics & Martial Arts",
    tagline: "Cricket Turf, Skating & Taekwondo",
    category: "Sports Excellence",
    description: "Certified NIS trainers developing discipline, physical stamina, tactical teamwork, and state medalists on our championship arenas.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=85&w=900",
    badge: "State & National Champions",
    icon: Trophy,
    href: "/student-life#sports"
  },
  {
    id: "eco-nature",
    title: "Eco-Green Campus Life",
    tagline: "12 Acres Organic Botanical Flora",
    category: "Campus Sanctuaries",
    description: "Lush outdoor learning groves, tree plantation drives, and solar sustainability cells fostering deep environmental reverence.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=85&w=900",
    badge: "12 Green Acres",
    icon: Star,
    href: "/campus"
  },
  {
    id: "student-leadership",
    title: "Prefectorial Guild & Council",
    tagline: "Democratic Student Governance",
    category: "Leadership",
    description: "Head boys, head girls, and house captains orchestrating morning assemblies, social outreach drives, and student peer mentoring.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=85&w=900",
    badge: "Student Council",
    icon: Users,
    href: "/student-life"
  }
];

export function StudentLifeSection() {
  // Duplicate for endless loop
  const marqueeItems = [...CAMPUS_LIFE_CARDS, ...CAMPUS_LIFE_CARDS, ...CAMPUS_LIFE_CARDS];

  return (
    <section className="py-16 lg:py-24 bg-[#0D2238] text-white border-b border-white/10 relative overflow-hidden font-sans">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] via-[#0D2238] to-[#081827] pointer-events-none" />

      {/* Top Header Strip - Wide Architecture */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2F5D62]/40 border border-[#2F5D62] text-[#A8C3BC] text-[11px] font-mono font-medium tracking-[0.16em] uppercase">
                <Users className="w-3.5 h-3.5 text-[#A8C3BC]" />
                <span>05 · VIBRANT CAMPUS CULTURE</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.05]">
              {"Life Beyond the Lecture Hall."}
            </LineReveal>
          </div>

          <Link
            href="/student-life"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#A8C3BC] hover:text-white transition-colors border-b border-[#A8C3BC] pb-0.5 font-mono self-start md:self-auto"
          >
            <span>Explore All Guilds & Houses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Continuous Smooth Infinite Marquee Strip */}
      <div className="w-full overflow-hidden relative z-10 py-2">
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-6 w-max"
        >
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${idx}`}
                className="w-[300px] sm:w-[380px] lg:w-[420px] aspect-[4/5] sm:aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group cursor-pointer shrink-0 transition-all duration-500 hover:border-[#A8C3BC]/60 hover:scale-[1.02]"
                data-cursor="DISCOVER"
              >
                {/* Photographic Layer */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 320px, 440px"
                />

                {/* High Contrast Deep Gradient for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1 rounded bg-[#0B1F33]/90 backdrop-blur-md text-[#A8C3BC] text-[10px] font-mono font-medium uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-[#A8C3BC]" />
                    <span>{item.category}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Overlay Typography Directly on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2.5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#A8C3BC] block font-semibold">
                      {item.tagline}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white group-hover:text-[#A8C3BC] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-[#A8C3BC] transition-colors">
                    <span className="uppercase tracking-wider">Explore Activity</span>
                    <ArrowRight className="w-4 h-4 text-[#A8C3BC] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Sub-bar Guidance */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 mt-6 flex items-center justify-between text-xs font-mono text-white/60">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A8C3BC] animate-pulse" />
          Continuous Living Campus Stream · Four House System & Athletics
        </span>
        <span className="hidden sm:inline">06 Active Campus Guilds</span>
      </div>
    </section>
  );
}
