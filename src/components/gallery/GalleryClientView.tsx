"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Image as ImageIcon, Maximize2, Filter } from "lucide-react";
import { GalleryItem } from "@/types";
import { LightboxModal } from "@/components/ui/LightboxModal";

interface GalleryClientViewProps {
  items: GalleryItem[];
}

export function GalleryClientView({ items }: GalleryClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    "All",
    "Campus & Architecture",
    "Academic Life",
    "Sports & Athletics",
    "Cultural & Arts",
    "Science & Robotics"
  ];

  const filtered = selectedCategory === "All"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const activeIndex = activeLightboxItem
    ? filtered.findIndex((i) => i.id === activeLightboxItem.id)
    : -1;

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveLightboxItem(filtered[activeIndex - 1]);
    } else {
      setActiveLightboxItem(filtered[filtered.length - 1]);
    }
  };

  const handleNext = () => {
    if (activeIndex < filtered.length - 1) {
      setActiveLightboxItem(filtered[activeIndex + 1]);
    } else {
      setActiveLightboxItem(filtered[0]);
    }
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
            alt="DAV Public School Qilla Mandi Gallery"
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Campus Photography Archive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            Life through the lens.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            A visual retrospective of intellectual discoveries, athletic triumphs, cultural jubilees, and daily heritage on our Batala campus.
          </p>
        </div>
      </section>

      {/* Main Gallery Grid with Filter */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Category Filter Pills */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-cream-200 shadow-sm flex items-center justify-between overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-navy-500 uppercase mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-gold-700" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-navy-900 text-gold-400 font-bold"
                      : "bg-cream-100 text-navy-700 hover:bg-cream-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-200 shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer border border-cream-200"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.alt || item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                  <div className="self-end p-2 rounded-full bg-white/20 backdrop-blur-xs text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gold-300">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-lg font-normal leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <LightboxModal
          item={activeLightboxItem}
          onClose={() => setActiveLightboxItem(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
