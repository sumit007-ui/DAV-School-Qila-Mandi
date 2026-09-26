"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full loop
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export function Marquee({
  items,
  speed = 28,
  className = "",
  itemClassName = "",
  separator = "",
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto whitespace-nowrap flex items-center gap-6 sm:gap-8 ${className}`}>
        {items.map((item, idx) => (
          <span key={idx} className={`inline-flex items-center ${itemClassName}`}>
            <span>{item}</span>
            {separator ? <span className="opacity-40 ml-3">{separator}</span> : null}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full flex whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
        className="flex shrink-0 items-center gap-6 sm:gap-8"
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className={`inline-flex items-center ${itemClassName}`}>
            <span>{item}</span>
            {separator ? <span className="opacity-40 text-[0.8em] ml-3">{separator}</span> : null}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
