"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Maximize2, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data/gallery";
import { GalleryItem } from "@/types";
import { LightboxModal } from "@/components/ui/LightboxModal";

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
      <section className="py-20 lg:py-28 bg-white text-navy-950 border-b border-cream-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-700">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Visual Retrospective</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-navy-950 font-normal tracking-tight">
                Moments that matter.
              </h2>
              <p className="text-navy-700 text-sm sm:text-base max-w-xl">
                A photographic glimpse into life, learning, spirit, and heritage on the DAV Public School Qilla Mandi campus.
              </p>
            </div>

            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-gold-400 hover:bg-navy-950 text-xs font-bold uppercase tracking-wider transition-colors self-start md:self-auto border border-gold-500/20"
            >
              <span>View Full Photo Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.slice(0, 6).map((item, idx) => {
              // Create asymmetric height variations
              const isTall = idx === 0 || idx === 3;
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(item)}
                  className={`group relative rounded-2xl overflow-hidden shadow-md cursor-pointer border border-cream-300 ${
                    isTall ? "sm:col-span-2 aspect-[16/10]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Hover Overlay Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                    <div className="flex justify-end">
                      <div className="p-2 rounded-full bg-navy-950/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-4 h-4 text-gold-400" />
                      </div>
                    </div>

                    <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl font-medium leading-snug">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
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
