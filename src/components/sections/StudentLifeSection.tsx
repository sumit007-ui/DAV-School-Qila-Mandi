import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Heart, Palette, Compass, Flag, Users } from "lucide-react";

export function StudentLifeSection() {
  const cards = [
    {
      title: "Four House System",
      subtitle: "Dayanand • Hansraj • Shraddhanand • Lajpat",
      description: "Instilling camaraderie, sportsmanship, and healthy competitive drive through inter-house tournaments and cultural feasts.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      tag: "House Culture",
      icon: Flag
    },
    {
      title: "Robotics & Innovation Guild",
      subtitle: "Atal Tinkering Cell",
      description: "Young technocrats building autonomous robotics, IoT sensors, and participating in National STEM hackathons.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      tag: "STEM Innovation",
      icon: Compass
    },
    {
      title: "Performing Arts & Music",
      subtitle: "Vocal, Instrumental & Classical Dance",
      description: "Indian classical harmonium, tabla, and Punjabi folk traditions showcased on the grand auditorium stage.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      tag: "Cultural Arts",
      icon: Palette
    },
    {
      title: "Athletics & Martial Arts",
      subtitle: "Cricket, Skating & Taekwondo",
      description: "Daily coaching by NIS-certified trainers preparing athletes for state and national championships.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
      tag: "Sports Excellence",
      icon: Trophy
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream-50 text-navy-950 border-b border-cream-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700">
              <Users className="w-3.5 h-3.5" />
              <span>Campus Culture & Co-Curriculars</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
              Beyond the classroom.
            </h2>
            <p className="text-navy-700 text-sm sm:text-base max-w-xl">
              Education at DAV Qilla Mandi flourishes in the art studios, playing fields, robotics labs, and debate stages where passions turn into lifelong mastery.
            </p>
          </div>

          <Link
            href="/student-life"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-gold-400 hover:bg-navy-950 text-xs font-bold uppercase tracking-wider transition-colors self-start md:self-auto border border-gold-500/20"
          >
            <span>Explore Student Life</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-cream-200 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-navy-950 text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-gold-600" />
                    <span>{card.tag}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-gold-700 uppercase tracking-widest block">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl text-navy-950 font-normal group-hover:text-gold-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-cream-200 flex items-center justify-between">
                    <Link
                      href="/student-life"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy-900 group-hover:text-gold-700 transition-colors"
                    >
                      <span>Discover Programs</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
