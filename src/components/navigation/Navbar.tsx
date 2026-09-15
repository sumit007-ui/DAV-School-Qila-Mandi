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
  MessageCircle, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Facebook,
  Instagram
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
  const schoolHours = siteSettings?.officeHours || SCHOOL_CONFIG.contact.officeHours;

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

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "About", href: "/about", number: "01" },
    { label: "Academics", href: "/academics", number: "02" },
    { label: "Campus", href: "/campus", number: "03" },
    { label: "Student Life", href: "/student-life", number: "04" },
    { label: "Achievements", href: "/achievements", number: "05" },
    { label: "Admissions", href: "/admissions", number: "06" },
    { label: "Stories & News", href: "/news", number: "07" },
    { label: "Gallery", href: "/gallery", number: "08" },
    { label: "Contact", href: "/contact", number: "09" },
  ];

  return (
    <>
      {/* 
        Editorial Floating Navbar:
        - Made the navbar background consistently solid (bg-[#4E220F] border-b border-white/10 text-white) across all pages and scroll positions.
        - Eliminated semi-transparent gradients to ensure white navigation text and brand elements maintain high contrast and readability over light sections (such as #F7F1DE).
        - Added immediate execution of handleScroll() on component mount so the scroll state is accurate on page loads and deep-linked sections.
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#4E220F] border-b border-white/10 text-white ${
          isScrolled
            ? "py-2.5 shadow-2xl bg-[#4E220F]"
            : "py-3.5 shadow-lg bg-[#4E220F]"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
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
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              aria-label="Search"
              title="Search website (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Editorial Admissions Pill */}
            <button
              onClick={onOpenAdmissionModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded bg-[#9D6638] hover:bg-[#82522B] text-white text-xs font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 shadow-md active:scale-95 group border border-white/10 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B0BA99] group-hover:rotate-12 transition-transform" />
              <span>Admissions {SCHOOL_CONFIG.admissionsSession}</span>
            </button>

            {/* Fullscreen Menu Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs uppercase tracking-widest font-mono font-medium transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-[#B0BA99]" /> : <Menu className="w-4 h-4 text-[#B0BA99]" />}
              <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#4E220F] text-white transition-all duration-700 ease-out overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Watermark */}
        <div className="absolute right-0 bottom-0 text-[30vw] font-editorial text-white/[0.03] pointer-events-none select-none leading-none -mb-16">
          DAV
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-16 min-h-screen flex flex-col justify-between">
          {/* Top Info Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono text-white/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B0BA99] animate-pulse"></span>
              <span>ADMISSIONS OPEN FOR SESSION {SCHOOL_CONFIG.admissionsSession}</span>
            </div>
            <div className="text-[#B0BA99]">
              PSEB #{SCHOOL_CONFIG.affiliationNo} • CODE: {SCHOOL_CONFIG.schoolCode}
            </div>
          </div>

          {/* Main Grid: Left Big Links + Right Institutional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-10 items-center">
            {/* Big Links Column (Span 7) */}
            <div className="lg:col-span-7 space-y-1">
              {navLinks.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-1.5 text-3xl sm:text-5xl lg:text-6xl font-editorial text-white hover:text-[#B0BA99] transition-colors duration-300"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-mono font-medium text-[#B0BA99]/70 group-hover:text-[#B0BA99]">
                      {item.number}
                    </span>
                    <span className={`tracking-tight ${isActive ? "text-[#B0BA99] italic" : ""}`}>
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[#B0BA99] opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 -translate-y-1 transition-all duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Right Information Column (Span 5) */}
            <div className="lg:col-span-5 space-y-6 lg:pl-10 lg:border-l lg:border-white/10">
              {/* Admissions Highlight Card */}
              <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 backdrop-blur-md">
                <span className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-[#B0BA99] block">
                  Enrolment & Campus Visits
                </span>
                <h3 className="font-editorial text-2xl text-white font-normal leading-snug">
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
                    className="px-4 py-2 rounded bg-white hover:bg-white/90 text-[#4E220F] text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Start Admission Form
                  </button>
                  <a
                    href={`tel:${schoolPhone}`}
                    className="px-3.5 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  >
                    {schoolPhone}
                  </a>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-2.5 text-xs font-sans text-white/80">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B0BA99] shrink-0 mt-0.5" />
                  <span>{schoolAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#B0BA99] shrink-0" />
                  <span>{schoolPhone} (Office: {schoolHours})</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#B0BA99] shrink-0" />
                  <a href={SCHOOL_CONFIG.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#B0BA99] hover:underline font-mono">
                    WhatsApp Admissions Desk
                  </a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={SCHOOL_CONFIG.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#1877F2] text-white text-xs font-mono transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={SCHOOL_CONFIG.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white text-xs font-mono transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal / Motto */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-sans text-white/60">
            <div>
              © {new Date().getFullYear()} {schoolName}, {SCHOOL_CONFIG.subName}. Managed by DAVCMC, New Delhi.
            </div>
            <div className="text-[#B0BA99] italic font-editorial text-base">
              {SCHOOL_CONFIG.motto}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
