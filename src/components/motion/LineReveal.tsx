"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LineRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
}

export function LineReveal({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: LineRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const lines = children.split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
