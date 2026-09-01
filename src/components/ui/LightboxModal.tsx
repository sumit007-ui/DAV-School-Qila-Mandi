"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryItem } from "@/types";

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function LightboxModal({ item, onClose, onPrev, onNext }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-navy-950/95 backdrop-blur-xl animate-fade-in">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-navy-900/80 text-cream-100 hover:bg-navy-800 hover:text-white border border-navy-700 transition-colors"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav buttons */}
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-navy-900/80 text-cream-100 hover:bg-gold-500 hover:text-navy-950 border border-navy-700 transition-all shadow-xl"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-navy-900/80 text-cream-100 hover:bg-gold-500 hover:text-navy-950 border border-navy-700 transition-all shadow-xl"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image and Caption Card */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col bg-navy-900/90 rounded-2xl overflow-hidden border border-navy-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[55vh] sm:h-[68vh] bg-black">
          <Image
            src={item.imageUrl}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        <div className="p-5 sm:p-6 bg-navy-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-navy-800">
          <div>
            <span className="text-[11px] font-mono font-bold text-gold-400 uppercase tracking-widest block mb-1">
              {item.category}
            </span>
            <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-xs sm:text-sm text-cream-300 mt-1 max-w-2xl">
                {item.caption}
              </p>
            )}
          </div>

          <div className="text-xs text-cream-400 font-mono hidden sm:block text-right">
            <span>DAV Public School Qilla Mandi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
