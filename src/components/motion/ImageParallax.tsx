"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ImageParallaxProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; // e.g. 0.15 to 0.3
  sizes?: string;
}

export function ImageParallax({
  src,
  alt,
  className = "",
  speed = 0.2,
  sizes = "100vw",
}: ImageParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 w-full h-full">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} />
      </motion.div>
    </div>
  );
}
