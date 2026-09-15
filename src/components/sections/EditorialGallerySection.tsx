"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Maximize2, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/gallery";
import { GalleryItem } from "@/types";
import { LightboxModal } from "@/components/ui/LightboxModal";

import { LineReveal, Reveal } from "@/components/motion";

interface EditorialGallerySectionProps {
  gallery?: GalleryItem[];
}

export function EditorialGallerySection({ gallery = GALLERY_ITEMS }: EditorialGallerySectionProps) {
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const items = gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS;

  const handleOpenLightbox = (item: GalleryItem) => {
    setActiveLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    setActiveLightboxItem(null);
  };

  return (
    <>
      <section className="py-14 lg:py-20 bg-[#F7F1DE] text-[#4E220F] border-b border-[#9D6638]/20 relative overflow-hidden font-sans">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <Reveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold tracking-[0.16em] uppercase shadow-sm">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>08 · CAMPUS ARCHIVE</span>
                </div>
              </Reveal>
              <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl text-[#4E220F] font-bold tracking-tight">
                {"MOMENTS OF WONDER."}
              </LineReveal>
              <Reveal direction="up" delay={0.25}>
                <p className="text-[#4E220F]/80 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                  A photographic glimpse into life, learning, spirit, and heritage on the Dr. MRS Bhalla DAV School campus.
                </p>
              </Reveal>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4E220F] hover:text-[#9D6638] transition-colors self-start md:self-auto border-b border-[#4E220F] pb-0.5 font-mono"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9D6638]" />
            </Link>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.slice(0, 6).map((item, idx) => {
              const isTall = idx === 0 || idx === 3;
              return (
                <Reveal key={item.id} direction="up" delay={0.08 * idx + 0.05} className={isTall ? "sm:col-span-2" : ""}>
                  <div
                    onClick={() => handleOpenLightbox(item)}
                    className={`group relative rounded-xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer border border-[#9D6638]/20 transition-all duration-300 ${
                      isTall ? "aspect-[16/10]" : "aspect-square"
                    }`}
                    data-cursor="EXPAND"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F]/90 via-[#4E220F]/25 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                    {/* Hover Overlay Content */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                      <div className="flex justify-end">
                        <div className="p-1.5 rounded bg-[#4E220F]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5 text-[#B0BA99]" />
                        </div>
                      </div>

                      <div className="space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#B0BA99] font-bold">
                          {item.category}
                        </span>
                        <h4 className="font-editorial text-lg sm:text-xl font-medium leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
