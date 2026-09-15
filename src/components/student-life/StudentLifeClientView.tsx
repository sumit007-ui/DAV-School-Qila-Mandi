"use client";

import Image from "next/image";
import { Sparkles, Flag, Trophy, Cpu, Music, BookOpen, Flame, Leaf, ArrowRight } from "lucide-react";
import { useAppModals } from "@/components/layout/ClientAppWrapper";
import { SCHOOL_CONFIG } from "@/config/school";

interface StudentLifeClientViewProps {
  activities?: any[];
  siteSettings?: any;
}

const DEFAULT_ACTIVITIES = [
  {
    id: "computer-club",
    title: "Computer Science & IT Club",
    category: "Technology & Coding",
    description: "Hands-on computer training, Scratch programming, digital creativity, multimedia presentations, and typing skills in our modern lab.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    icon: Cpu,
  },
  {
    id: "sports-athletics",
    title: "Sports Academy & Martial Arts",
    category: "Sports Excellence",
    description: "Rigorous coaching in Taekwondo, Badminton, Cricket, Volleyball, and Track & Field tournaments with district and state championship medals.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
    icon: Trophy,
  },
  {
    id: "music-arts",
    title: "Classical Music & Performing Arts",
    category: "Fine Arts & Music",
    description: "Vocal training, classical Indian instrumentation (Harmonium, Tabla, Keyboard), folk dances (Bhangra & Giddha), and theatrical drama.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
    icon: Music,
  },
  {
    id: "literary-debates",
    title: "Literary, Debates & Model UN",
    category: "Oratory & Intellect",
    description: "Inter-school bilingual debate championships, declamations in English, Hindi & Punjabi, creative writing forums, and national quiz meets.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
    icon: BookOpen,
  },
  {
    id: "vedic-yajnashala",
    title: "Vedic Yajnashala & Ethical Leadership",
    category: "Vedic Values & Seva",
    description: "Daily morning Havan, Vedic chanting, Dharam Shiksha discourses, character formation, and community service guided by Maharshi Dayanand ideals.",
    image: "https://images.unsplash.com/photo-1609137144822-2639fb80ec6e?auto=format&fit=crop&q=80&w=800",
    icon: Flame,
  },
  {
    id: "eco-green",
    title: "Eco Guild & Nature Conservation",
    category: "Environment & Action",
    description: "Student-led tree plantation drives, clean-air campaigns, organic campus garden maintenance, and environmental sustainability advocacy.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    icon: Leaf,
  },
];

export function StudentLifeClientView({ activities = [], siteSettings }: StudentLifeClientViewProps) {
  const { openAdmissionModal } = useAppModals();
  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;

  const houses = [
    {
      name: "Bose House",
      leader: "Netaji Subhash Chandra Bose",
      color: "bg-amber-600",
      accent: "border-amber-500/40 text-amber-800",
      pill: "bg-amber-100 text-amber-900 border-amber-300",
      motto: "Valour, Vision & Indomitable Will",
      description: "Inspired by Netaji Subhash Chandra Bose, cultivating fearless determination, visionary leadership, discipline, and uncompromising patriotic devotion.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Azad House",
      leader: "Chandra Shekhar Azad",
      color: "bg-blue-600",
      accent: "border-blue-500/40 text-blue-800",
      pill: "bg-blue-100 text-blue-900 border-blue-300",
      motto: "Courage, Honor & Self-Reliance",
      description: "Honoring Chandra Shekhar Azad, instilling unyielding bravery, moral fortitude, intellectual freedom, and selfless commitment to society.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Bhagat House",
      leader: "Shaheed Bhagat Singh",
      color: "bg-rose-600",
      accent: "border-rose-500/40 text-rose-800",
      pill: "bg-rose-100 text-rose-900 border-rose-300",
      motto: "Intellect, Sacrifice & Revolutionary Zeal",
      description: "Commemorating Shaheed Bhagat Singh, igniting critical inquiry, passionate youth dynamism, selfless sacrifice, and relentless pursuit of justice.",
      image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Patel House",
      leader: "Sardar Vallabhbhai Patel",
      color: "bg-emerald-600",
      accent: "border-emerald-500/40 text-emerald-800",
      pill: "bg-emerald-100 text-emerald-900 border-emerald-300",
      motto: "Unity, Integrity & Iron Will",
      description: "Inspired by the Iron Man of India, Sardar Vallabhbhai Patel, championing brotherhood, resolute moral fortitude, organizational strength, and nation-building.",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const displayActivities = activities && activities.length > 0 ? activities : DEFAULT_ACTIVITIES;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1920"
            alt={`${schoolName} Student Life`}
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Culture, Leadership & Houses</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Vibrant campus life.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            Beyond the textbooks lies a world of discovery. Inter-house rivalry, athletic tournaments, community seva, and classical arts.
          </p>
        </div>
      </section>

      {/* House System */}
      <section className="py-20 bg-cream-50 text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              The Four Houses of DAV
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              Leadership, Camaraderie & Glory
            </h2>
            <p className="text-navy-700 text-xs sm:text-sm">
              Every scholar is inducted into one of four houses, named after India&apos;s greatest icons of courage and unity, competing in academics, sports, and cultural festivals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((h, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-cream-300 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* House Internet Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${h.color} shadow-sm border border-white/40`} />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white font-semibold drop-shadow">
                      House 0{idx + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-xl font-bold drop-shadow">
                      {h.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 text-navy-500 shrink-0" />
                      <span className="text-[11px] font-mono text-navy-600 font-medium">
                        {h.leader}
                      </span>
                    </div>

                    <div className={`px-2.5 py-1 rounded-md border text-[11px] font-mono font-semibold ${h.pill}`}>
                      &ldquo;{h.motto}&rdquo;
                    </div>

                    <p className="text-xs text-navy-600 leading-relaxed pt-1">
                      {h.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-[11px] font-mono text-gold-700 font-bold">
                    <span>Inter-House League</span>
                    <span className="text-navy-400">#HousePride</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities & Clubs Grid with Internet Images */}
      <section className="py-20 bg-white text-navy-950 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
              Active Clubs & Co-Curriculars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
              Explore Your Passion
            </h2>
            <p className="text-navy-700 text-xs sm:text-sm">
              Discover a wide spectrum of co-curricular societies, athletic academies, and creative forums designed to build well-rounded scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayActivities.map((act: any) => {
              const Icon = act.icon || Sparkles;
              return (
                <div
                  key={act.id || act.title}
                  className="bg-cream-50 rounded-2xl overflow-hidden border border-cream-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {act.image && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950">
                      <Image
                        src={act.image}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-navy-900/90 backdrop-blur-xs text-gold-300 text-[10px] font-mono font-bold uppercase tracking-widest border border-gold-500/30">
                          {act.category}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-navy-900">
                        <Icon className="w-4 h-4 text-gold-700" />
                        <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-700 transition-colors">
                          {act.title}
                        </h3>
                      </div>
                      <p className="text-xs text-navy-600 leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-cream-200">
                      <button
                        onClick={() => openAdmissionModal("Nursery")}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-gold-700 hover:text-navy-900 transition-colors"
                      >
                        <span>Join This Club</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
