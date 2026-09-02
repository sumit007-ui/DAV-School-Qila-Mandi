"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImageReveal({
  src,
  alt,
  fill = true,
  width,
  height,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 800px",
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={`object-cover ${imageClassName}`}
          priority={priority}
          sizes={sizes}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative"
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={`object-cover ${imageClassName}`}
          priority={priority}
          sizes={sizes}
        />
      </motion.div>
    </motion.div>
  );
}
