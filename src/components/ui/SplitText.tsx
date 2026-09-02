"use client";

import React from "react";

export function SplitText({
  children,
  className = "",
  as: Component = "span",
  delay = 0,
}: {
  children: string;
  className?: string;
  as?: React.ElementType;
  delay?: number;
}) {
  const words = children.split(" ");

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0"
        >
          <span
            className="inline-block transition-transform duration-700 ease-out"
            style={{
              transitionDelay: `${delay + index * 40}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}

export function EditorialEyebrow({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase ${
        light ? "text-sage-300" : "text-teal-700"
      } ${className}`}
    >
      <span className={`w-6 h-[1px] ${light ? "bg-sage-300/60" : "bg-teal-600/60"}`} />
      <span>{children}</span>
    </div>
  );
}
