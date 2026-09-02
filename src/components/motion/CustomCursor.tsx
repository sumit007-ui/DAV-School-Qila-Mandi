"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia("(pointer: coarse)").matches || shouldReduceMotion) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over element with data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "EXPLORE");
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (!isVisible || shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
    >
      <motion.div
        animate={{
          width: isHovered ? 72 : 12,
          height: isHovered ? 72 : 12,
          backgroundColor: isHovered ? "rgba(22, 50, 79, 0.9)" : "rgba(82, 122, 120, 0.6)",
          backdropFilter: isHovered ? "blur(8px)" : "none",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="rounded-full flex items-center justify-center text-center shadow-lg border border-white/20"
      >
        {isHovered && (
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-white px-2">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
