import Link from "next/link";
import Image from "next/image";
import { SCHOOL_CONFIG } from "@/config/school";

export function BrandLogo({
  variant = "light",
  className = "",
  schoolName,
  logoSize = 48,
}: {
  variant?: "light" | "dark" | "gold";
  className?: string;
  schoolName?: string;
  logoSize?: number;
}) {
  const isDark = variant === "dark";
  const name = schoolName || SCHOOL_CONFIG.name;

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 focus:outline-none rounded-lg transition-transform ${className}`}
      aria-label={`${name} Home`}
    >
      {/* Official Circular Crest Logo */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo.png"
          alt={`${name} Official Logo`}
          width={logoSize}
          height={logoSize}
          className="object-contain filter drop-shadow-md"
        />
      </div>

      {/* School Typography */}
      <div className="flex flex-col max-w-[200px] xs:max-w-[260px] sm:max-w-none">
        <div className="flex items-center gap-2">
          <span
            className={`font-editorial font-bold text-sm xs:text-base sm:text-lg md:text-xl tracking-tight leading-snug transition-colors line-clamp-1 ${
              isDark ? "text-white" : "text-[#4E220F] group-hover:text-[#9D6638]"
            }`}
          >
            {name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-medium ${
              isDark ? "text-cream-200/95" : "text-[#9D6638]"
            }`}
          >
            {SCHOOL_CONFIG.subName}
          </span>
          <span
            className={`hidden xs:inline-block text-[9px] px-1.5 py-0.2 rounded font-mono font-medium ${
              isDark
                ? "bg-white/10 text-white/95 border border-white/20"
                : "bg-[#EBE3C8] text-[#4E220F] border border-[#DCD0AE]"
            }`}
          >
            Est. 1975
          </span>
        </div>
      </div>
    </Link>
  );
}
