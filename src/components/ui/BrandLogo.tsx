import Link from "next/link";
import { SCHOOL_CONFIG } from "@/config/school";

export function BrandLogo({
  variant = "light",
  className = "",
  schoolName,
}: {
  variant?: "light" | "dark" | "gold";
  className?: string;
  schoolName?: string;
}) {
  const isDark = variant === "dark";
  const name = schoolName || SCHOOL_CONFIG.name;

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg transition-transform ${className}`}
      aria-label="DAV Public School Qilla Mandi Home"
    >
      {/* Emblem Graphic */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 via-teal-600 to-navy-800 shadow-md p-0.5 transition-transform duration-300 group-hover:scale-105">
        <div className="w-full h-full rounded-full bg-[#16324F] flex items-center justify-center border border-sage-300/40">
          <span className="font-serif font-bold text-sage-200 text-base tracking-tighter">
            DAV
          </span>
        </div>
      </div>

      {/* School Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-serif font-bold text-lg sm:text-xl tracking-tight leading-none transition-colors ${
              isDark ? "text-white" : "text-[#16324F] group-hover:text-teal-600"
            }`}
          >
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-[10px] sm:text-xs font-semibold tracking-widest uppercase ${
              isDark ? "text-sage-300" : "text-teal-600"
            }`}
          >
            {SCHOOL_CONFIG.subName}
          </span>
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-medium ${
              isDark
                ? "bg-navy-800 text-cream-200 border border-navy-700"
                : "bg-ivory-300 text-navy-800 border border-ivory-400"
            }`}
          >
            Est. 1989
          </span>
        </div>
      </div>
    </Link>
  );
}
