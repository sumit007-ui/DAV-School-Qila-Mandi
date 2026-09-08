"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowRight, Trophy, Music, Palette, Cpu, Compass } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion";

const CAMPUS_LIFE_CARDS = [
  {
    id: "house-system",
    category: "CHARACTER & COMMUNITY",
    title: "The Four House System",
    tagline: "Leadership · Honor · Unity",
    description: "Dayanand, Hansraj, Shraddhanand, and Virjanand Houses compete in annual sports, debates, and cultural showcases.",
    image: "/images/independence-day.jpg",
    badge: "Inter-House Championship",
    icon: ShieldCheckIcon,
  },
  {
    id: "atl-innovators",
    category: "STEM & ROBOTICS",
    title: "Atal Tinkering Lab Guild",
    tagline: "Design · Prototype · Code",
    description: "Students build real-world IoT sensors, 3D printed prototypes, and automated robotics systems under NITI Aayog guidelines.",
    image: "/images/computer-lab.jpg",
    badge: "NITI Aayog Funded",
    icon: Cpu,
  },
  {
    id: "sports-athletics",
    category: "SPORTS EXCELLENCE",
    title: "Athletics & Martial Arts",
    tagline: "Discipline · Speed · Resilience",
    description: "Dedicated coaching in Taekwondo, Badminton, Cricket, Volleyball, and Track Events with state-level tournament wins.",
    image: "/images/sports-ground.jpg",
    badge: "State Tournament Medals",
    icon: Trophy,
  },
  {
    id: "cultural-arts",
    category: "FINE ARTS & MUSIC",
    title: "Classical Music & Performing Arts",
    tagline: "Expression · Heritage · Harmony",
    description: "Vocal music, classical instrument training, folk dances, and dramatic performances celebrating Indian heritage.",
    image: "/images/bhangra-giddha.jpg",
    badge: "Annual Kalanjali Fest",
    icon: Music,
  },
  {
    id: "eco-club",
    category: "ENVIRONMENT & SERVICE",
    title: "Vedic Yajnashala & Eco Guild",
    tagline: "Sustainability · Action",
    description: "Student-led tree plantation drives, organic waste management, and rainwater harvesting awareness in Batala region.",
    image: "/images/yajnashala-havan.jpg",
    badge: "Green School Initiative",
    icon: Compass,
  },
];

function ShieldCheckIcon(props: any) {
  return <Users {...props} />;
}

export function StudentLifeSection() {
  const marqueeItems = [...CAMPUS_LIFE_CARDS, ...CAMPUS_LIFE_CARDS, ...CAMPUS_LIFE_CARDS];

  return (
    <section className="py-16 lg:py-24 bg-[#4E220F] text-white border-b border-white/10 relative overflow-hidden font-sans">
      {/* Background Subtle Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4E220F] via-[#5C2A15] to-[#3B190B] pointer-events-none" />

      {/* Top Header Strip - Wide Architecture */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <Reveal direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold tracking-[0.16em] uppercase shadow-md">
                <Users className="w-3.5 h-3.5 text-[#F7F1DE]" />
                <span>05 · VIBRANT CAMPUS CULTURE</span>
              </div>
            </Reveal>

            <LineReveal as="h2" className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-white font-semibold tracking-tight leading-[1.05]">
              {"Life Beyond the Lecture Hall."}
            </LineReveal>
          </div>

          <Link
            href="/student-life"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#B0BA99] hover:text-white transition-colors border-b border-[#B0BA99] pb-0.5 font-mono self-start md:self-auto"
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
                className="w-[300px] sm:w-[380px] lg:w-[420px] aspect-[4/5] sm:aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group cursor-pointer shrink-0 transition-all duration-500 hover:border-[#9D6638] hover:scale-[1.02]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B190B] via-[#3B190B]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1 rounded bg-[#4E220F]/90 backdrop-blur-md text-[#B0BA99] text-[10px] font-mono font-medium uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-[#B0BA99]" />
                    <span>{item.category}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[9px] font-mono uppercase tracking-wider backdrop-blur-xs">
                    {item.badge}
                  </span>
                </div>

                {/* Bottom Overlay Typography Directly on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2.5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#B0BA99] block font-semibold">
                      {item.tagline}
                    </span>
                    <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white group-hover:text-[#B0BA99] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-white/80 leading-relaxed font-sans line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-[#B0BA99] transition-colors">
                    <span className="uppercase tracking-wider">Explore Activity</span>
                    <ArrowRight className="w-4 h-4 text-[#B0BA99] group-hover:translate-x-1.5 transition-transform" />
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
          <span className="w-2 h-2 rounded-full bg-[#B0BA99] animate-pulse" />
          Continuous Living Campus Stream · Four House System & Athletics
        </span>
        <span className="hidden sm:inline">06 Active Campus Guilds</span>
      </div>
    </section>
  );
}
