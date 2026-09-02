"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ColourTransitionProps {
  children: React.ReactNode;
  fromBg?: string; // e.g. "#F5F3EE"
  toBg?: string;   // e.g. "#16324F"
  className?: string;
}

export function ColourTransition({
  children,
  fromBg = "#F5F3EE",
  toBg = "#16324F",
  className = "",
}: ColourTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7, 0.9],
    [fromBg, toBg, toBg, fromBg]
  );

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ backgroundColor }} className={className}>
      {children}
    </motion.div>
  );
}
