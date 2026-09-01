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
  ChevronRight
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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
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
      {/* Editorial Floating Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#060F1E]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl text-white"
            : "bg-gradient-to-b from-[#060F1E]/90 via-[#060F1E]/40 to-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Crest / Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/15 border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-sm tracking-wider group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
              DAV
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-white block leading-none">
                {schoolName}
              </span>
              <span className="text-[10px] font-mono tracking-[0.25em] text-gold-400 uppercase block mt-1">
                {SCHOOL_CONFIG.subName} • Nursery – Class 10
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase tracking-[0.18em] font-medium text-cream-200">
            {navLinks.slice(0, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors relative py-1 group ${
                    isActive ? "text-gold-400 font-semibold" : "hover:text-white"
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
              className="p-2.5 text-cream-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Search"
              title="Search website (Cmd+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Editorial Admissions Pill */}
            <button
              onClick={onOpenAdmissionModal}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-lg shadow-gold-500/20 active:scale-95 group"
            >
              <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Admissions {SCHOOL_CONFIG.admissionsSession}</span>
            </button>

            {/* Fullscreen Menu Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs uppercase tracking-widest font-mono transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4 text-gold-400" /> : <Menu className="w-4 h-4 text-gold-400" />}
              <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Menu Overlay (Wesley College Style) */}
      <div
        className={`fixed inset-0 z-40 bg-[#060F1E] text-white transition-all duration-700 ease-out overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Grain & Watermark */}
        <div className="absolute inset-0 editorial-dark-grain opacity-20 pointer-events-none" />
        <div className="absolute right-0 bottom-0 text-[35vw] font-serif text-white/[0.02] pointer-events-none select-none leading-none -mb-16">
          DAV
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-28 pb-16 min-h-screen flex flex-col justify-between">
          {/* Top Info Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 text-xs font-mono text-cream-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Admissions Open For Session {SCHOOL_CONFIG.admissionsSession}</span>
            </div>
            <div className="text-gold-400">
              CBSE Affiliation No. {SCHOOL_CONFIG.affiliationNo} • School Code: {SCHOOL_CONFIG.schoolCode}
            </div>
          </div>

          {/* Main Grid: Left Big Links + Right Institutional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 items-center">
            {/* Big Links Column (Span 7) */}
            <div className="lg:col-span-7 space-y-2">
              {navLinks.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-2 text-3xl sm:text-5xl lg:text-6xl font-serif text-cream-100 hover:text-gold-300 transition-colors duration-300"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <span className="text-xs sm:text-sm font-mono text-gold-500/70 group-hover:text-gold-400">
                      {item.number}
                    </span>
                    <span className={`tracking-tight ${isActive ? "text-gold-400 italic" : ""}`}>
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-6 h-6 text-gold-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 -translate-y-1 transition-all duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Right Information Column (Span 5) */}
            <div className="lg:col-span-5 space-y-8 lg:pl-12 lg:border-l lg:border-white/10">
              {/* Admissions Highlight Card */}
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-gold-500/30 space-y-4 backdrop-blur-md">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-400 block font-bold">
                  Enrolment & Campus Visits
                </span>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Experience DAV Public School Qilla Mandi
                </h3>
                <p className="text-xs text-cream-300 leading-relaxed">
                  Join a community dedicated to moral values, intellectual rigor, and future-ready science for young scholars from Nursery through Class 10.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenAdmissionModal?.();
                    }}
                    className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Start Admission Form
                  </button>
                  <a
                    href={`tel:${schoolPhone}`}
                    className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                  >
                    {schoolPhone}
                  </a>
                </div>
              </div>

              {/* Quick Contacts */}
              <div className="space-y-3 text-xs font-mono text-cream-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>{schoolAddress}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>{schoolPhone} (Office: {schoolHours})</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={SCHOOL_CONFIG.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">
                    WhatsApp Admissions Desk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal / Motto */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs font-mono text-cream-400/80">
            <div>
              © {new Date().getFullYear()} {schoolName}, {SCHOOL_CONFIG.subName}. Managed by DAVCMC, New Delhi.
            </div>
            <div className="text-gold-400 italic font-serif text-sm">
              {SCHOOL_CONFIG.motto}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
