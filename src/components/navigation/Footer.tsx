"use client";

import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  Heart,
  Sparkles,
  Download
} from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { useAppModals } from "@/components/layout/ClientAppWrapper";

interface FooterProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
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

export function Footer({ 
  onOpenAdmissionModal, 
  onOpenProspectusModal,
  siteSettings,
}: FooterProps = {}) {
  const modalContext = useAppModals();
  const handleAdmission = onOpenAdmissionModal || (() => modalContext.openAdmissionModal("Nursery"));
  const handleProspectus = onOpenProspectusModal || modalContext.openProspectusModal;
  const currentYear = new Date().getFullYear();

  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;
  const schoolPhone = siteSettings?.phone || SCHOOL_CONFIG.contact.primaryPhone;
  const schoolEmail = siteSettings?.email || SCHOOL_CONFIG.contact.email;
  const schoolAddress = siteSettings?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.area}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`;
  const schoolHours = siteSettings?.officeHours || SCHOOL_CONFIG.contact.officeHours;
  const schoolDesc = siteSettings?.shortDescription || "Managed by the DAV College Managing Committee (DAVCMC), New Delhi. Dedicated to fusing timeless Vedic ethics with modern scientific rigor and sports excellence for children from Nursery to Class 10.";

  return (
    <footer className="bg-[#060F1E] text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Watermark */}
      <div className="absolute right-0 bottom-0 text-[35vw] font-serif text-white/[0.015] pointer-events-none select-none leading-none -mb-16">
        DAV
      </div>
      <div className="absolute inset-0 editorial-dark-grain opacity-20 pointer-events-none" />

      {/* Top Admissions & Action Strip */}
      <div className="border-b border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nursery to Class 10 • Session {SCHOOL_CONFIG.admissionsSession}</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Join our vibrant educational family.
              </h3>
              <p className="text-cream-300 text-xs sm:text-sm font-light leading-relaxed">
                Connect with our admissions desk to schedule a personalized campus walkthrough and discover our comprehensive developmental roadmap.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleAdmission}
                className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-[0.18em] transition-all shadow-xl shadow-gold-500/20 active:scale-95 flex items-center gap-2"
              >
                <span>Admission Enquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleProspectus}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-[0.18em] border border-white/20 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-gold-400" />
                <span>Download Prospectus</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: School Identity & Governance (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-base">
                DAV
              </div>
              <div>
                <h4 className="font-serif text-xl font-medium text-white">
                  {schoolName}
                </h4>
                <p className="text-[11px] font-mono text-gold-400 tracking-wider uppercase">
                  {SCHOOL_CONFIG.subName}
                </p>
              </div>
            </div>

            <p className="text-xs text-cream-300 leading-relaxed font-light">
              {schoolDesc}
            </p>

            <div className="space-y-2 text-xs font-mono text-cream-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>CBSE Affiliation No. {SCHOOL_CONFIG.affiliationNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gold-400 shrink-0" />
                <span>School Code: {SCHOOL_CONFIG.schoolCode}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Academics (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">
              Learning Stages
            </h5>
            <ul className="space-y-2.5 text-xs text-cream-200">
              <li>
                <Link href="/academics#nursery-early-years" className="hover:text-gold-300 transition-colors">
                  Nursery & Early Years
                </Link>
              </li>
              <li>
                <Link href="/academics#primary-school" className="hover:text-gold-300 transition-colors">
                  Primary (Classes 1–5)
                </Link>
              </li>
              <li>
                <Link href="/academics#middle-school" className="hover:text-gold-300 transition-colors">
                  Middle (Classes 6–8)
                </Link>
              </li>
              <li>
                <Link href="/academics#secondary-school" className="hover:text-gold-300 transition-colors">
                  Secondary (Class 9)
                </Link>
              </li>
              <li>
                <Link href="/academics#class-10" className="hover:text-gold-300 transition-colors">
                  Class 10 (Board Milestone)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Links (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">
              Institutional
            </h5>
            <ul className="space-y-2.5 text-xs text-cream-200">
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  Heritage, Vision & Leadership
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-gold-300 transition-colors">
                  12-Acre Campus & Labs
                </Link>
              </li>
              <li>
                <Link href="/student-life" className="hover:text-gold-300 transition-colors">
                  House System & Robotics
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-gold-300 transition-colors">
                  Board Honors & Olympiads
                </Link>
              </li>
              <li>
                <Link href="/mandatory-disclosure" className="hover:text-gold-300 transition-colors">
                  CBSE Mandatory Disclosure (SARAS)
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gold-300 transition-colors">
                  Circulars & Event Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-400 font-bold">
              Campus & Office
            </h5>
            <div className="space-y-3 text-xs text-cream-300 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  {schoolAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${schoolPhone}`} className="hover:text-white transition-colors">
                  {schoolPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${schoolEmail}`} className="hover:text-white transition-colors">
                  {schoolEmail}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{schoolHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-white/10 py-6 relative z-10 text-xs text-cream-400/80 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p>© {currentYear} {schoolName}, {SCHOOL_CONFIG.subName}. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/mandatory-disclosure" className="hover:text-gold-400 transition-colors">
              CBSE Appendix IX
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
