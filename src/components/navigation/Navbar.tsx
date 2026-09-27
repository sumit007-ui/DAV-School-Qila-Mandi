"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Search, 
  ArrowUpRight, 
  Phone, 
  MapPin, 
  Sparkles,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SCHOOL_CONFIG } from "@/config/school";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenAdmissionModal?: () => void;
  siteSettings?: {
    schoolName?: string;
    logoUrl?: string;
    logoAlt?: string;
    phone?: string;
    email?: string;
    address?: string;
    googleMapsUrl?: string;
    whatsappNumber?: string;
    officeHours?: string;
    shortDescription?: string;
  };
}

export function Navbar({ onOpenSearch, onOpenAdmissionModal, siteSettings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;
  const schoolPhone = siteSettings?.phone || SCHOOL_CONFIG.contact.primaryPhone;
  const schoolAddress = siteSettings?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll for both Chrome & iOS Safari, and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "About", href: "/about", number: "01" },
    { label: "Academics", href: "/academics", number: "02" },
    { label: "Student Life", href: "/student-life", number: "03" },
    { label: "Achievements", href: "/achievements", number: "04" },
    { label: "Admissions", href: "/admissions", number: "05" },
    { label: "News & Events", href: "/news", number: "06" },
    { label: "Gallery", href: "/gallery", number: "07" },
    { label: "Contact", href: "/contact", number: "08" },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 bg-[#4E220F] border-b border-white/10 text-white select-none ${
          isScrolled
            ? "py-2.5 shadow-2xl bg-[#4E220F]"
            : "py-3 shadow-lg bg-[#4E220F]"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-3.5 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Official Circular Emblem */}
          <BrandLogo variant="dark" schoolName={schoolName} logoSize={44} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.14em] font-sans font-medium text-white/80">
            {navLinks.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors relative py-1 group ${
                    isActive ? "text-gold-300 font-semibold" : "hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gold-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Search Trigger - 44px touch target on mobile */}
            <button
              onClick={onOpenSearch}
              className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:bg-white/20 active:scale-95 rounded-xl transition-all cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent]"
              aria-label="Search"
              title="Search website (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Editorial Admissions Pill */}
            <button
              onClick={onOpenAdmissionModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded bg-[#9D6638] hover:bg-[#82522B] active:scale-95 text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-md group border border-white/10 cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B0BA99] group-hover:rotate-12 transition-transform" />
              <span>Admissions {SCHOOL_CONFIG.admissionsSession}</span>
            </button>

            {/* Fullscreen Menu Trigger - 44px min height touch target */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-mono font-semibold transition-all cursor-pointer min-h-[44px] min-w-[84px] justify-center active:scale-95 touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                menuOpen
                  ? "bg-[#9D6638] text-white border border-white/30 shadow-md ring-2 ring-white/20"
                  : "bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/15 text-white"
              }`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-[#B0BA99]" />}
              <span className="font-mono text-xs tracking-wider">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile & Desktop Architectural Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#4E220F] text-white transition-all duration-300 ease-out overflow-y-auto transform-gpu will-change-transform ${
          menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        style={{ 
          overscrollBehavior: "contain", 
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Background Watermark */}
        <div className="absolute right-0 bottom-0 text-[30vw] font-editorial text-white/[0.03] pointer-events-none select-none leading-none -mb-16">
          DAV
        </div>

        <div 
          className="relative z-10 max-w-7xl mx-auto min-h-[100dvh] flex flex-col justify-between"
          style={{
            paddingTop: "max(4.75rem, calc(4.25rem + env(safe-area-inset-top)))",
            paddingBottom: "max(6rem, calc(4rem + env(safe-area-inset-bottom)))",
            paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
            paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          }}
        >
          {/* Top Info Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-xs font-mono text-white/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B0BA99] animate-pulse"></span>
              <span className="text-[11px] sm:text-xs">ADMISSIONS OPEN FOR SESSION {SCHOOL_CONFIG.admissionsSession}</span>
            </div>
            <div className="text-[#B0BA99] text-[11px] sm:text-xs">
              Affiliated under PSEB Mohali
            </div>
          </div>

          {/* Main Grid: Left Big Links + Right Institutional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-6 sm:py-10 items-center">
            {/* Big Links Column (Span 7) */}
            <div className="lg:col-span-7 space-y-1 sm:space-y-1.5">
              {navLinks.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 sm:gap-4 py-3 sm:py-2 px-2.5 rounded-xl min-h-[50px] text-2xl sm:text-4xl lg:text-6xl font-editorial text-white hover:text-[#B0BA99] active:text-[#B0BA99] active:bg-white/5 transition-all duration-200 touch-manipulation [-webkit-tap-highlight-color:transparent]"
                    style={{ transitionDelay: `${idx * 20}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-mono font-medium text-[#B0BA99]/80 group-hover:text-[#B0BA99] shrink-0">
                      {item.number}
                    </span>
                    <span className={`tracking-tight ${isActive ? "text-[#B0BA99] italic font-semibold" : ""}`}>
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#B0BA99] opacity-70 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 -translate-y-0.5 transition-all duration-300 ml-auto sm:ml-0" />
                  </Link>
                );
              })}
            </div>

            {/* Right Information Column (Span 5) */}
            <div className="lg:col-span-5 space-y-6 pt-6 border-t border-white/10 lg:pt-0 lg:border-t-0 lg:pl-10 lg:border-l lg:border-white/10">
              {/* Admissions Highlight Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3 backdrop-blur-md">
                <span className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-[#B0BA99] block">
                  Enrolment & Campus Visits
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal leading-snug">
                  Experience {schoolName}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  Join a community dedicated to moral values, intellectual rigor, and future-ready science for young scholars from Nursery through Class 10.
                </p>
                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenAdmissionModal?.();
                    }}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-white/90 active:scale-95 text-[#4E220F] text-xs font-sans font-bold uppercase tracking-wider transition-all min-h-[44px] cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    Start Admission Form
                  </button>
                  <a
                    href={`tel:${schoolPhone}`}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-mono transition-all min-h-[44px] inline-flex items-center justify-center touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    {schoolPhone}
                  </a>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-3 text-xs font-sans text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B0BA99] shrink-0 mt-0.5" />
                  <span>{schoolAddress}</span>
                </div>
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
                    <div>
                      <a href={`tel:${SCHOOL_CONFIG.contact.receptionPhone}`} className="hover:underline active:opacity-80 touch-manipulation [-webkit-tap-highlight-color:transparent] inline-block py-1">{SCHOOL_CONFIG.contact.receptionPhone}</a>
                      <span className="text-white/50 font-sans text-[10px] ml-1">(Reception)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#B0BA99] shrink-0" />
                    <div>
                      <a href={`tel:${SCHOOL_CONFIG.contact.officePhone}`} className="hover:underline active:opacity-80 touch-manipulation [-webkit-tap-highlight-color:transparent] inline-block py-1">{SCHOOL_CONFIG.contact.officePhone}</a>
                      <span className="text-white/50 font-sans text-[10px] ml-1">(Office)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href={SCHOOL_CONFIG.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-[#1877F2] active:scale-95 text-white text-xs font-mono transition-all min-h-[44px] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={SCHOOL_CONFIG.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] active:scale-95 text-white text-xs font-mono transition-all min-h-[44px] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={SCHOOL_CONFIG.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-[#FF0000] active:scale-95 text-white text-xs font-mono transition-all min-h-[44px] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal / Motto */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-sans text-white/60">
            <div>
              © {new Date().getFullYear()} {schoolName.toLowerCase().includes(SCHOOL_CONFIG.subName.toLowerCase()) ? schoolName : `${schoolName}, ${SCHOOL_CONFIG.subName}`}. Managed by DAVCMC, New Delhi.
            </div>
            <div className="text-[#B0BA99] italic font-editorial text-sm sm:text-base">
              {SCHOOL_CONFIG.motto}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
