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
  const schoolDesc = siteSettings?.shortDescription || "Under DAV College Managing Committee (DAVCMC), New Delhi. Dedicated to fusing timeless Vedic ethics with modern scientific rigor and sports excellence for children from Nursery to Class 10.";

  return (
    <footer className="bg-[#0B1F33] text-white relative overflow-hidden border-t border-white/10 font-sans">
      {/* Top Admissions & Action Strip */}
      <div className="border-b border-white/10 relative z-10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-[#2F5D62]/40 border border-[#2F5D62] text-[#A8C3BC] text-[10px] font-mono uppercase tracking-[0.16em]">
                <Sparkles className="w-3 h-3 text-[#A8C3BC]" />
                <span>NURSERY TO CLASS 10 · SESSION {SCHOOL_CONFIG.admissionsSession}</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                Join our vibrant academic family.
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                Connect with our admissions desk to schedule a personalized campus tour and discover our developmental roadmap.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleAdmission}
                className="px-6 py-3 rounded bg-white hover:bg-white/90 text-[#0B1F33] font-bold text-xs uppercase tracking-[0.14em] transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer font-sans"
              >
                <span>Admission Enquiry</span>
                <ArrowUpRight className="w-4 h-4 text-[#0B1F33]" />
              </button>

              <button
                onClick={handleProspectus}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#A8C3BC]" />
                <span>Prospectus PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Sitemap */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: School Identity & Governance (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#2F5D62] text-white flex items-center justify-center font-editorial font-bold text-lg">
                DAV
              </div>
              <div>
                <h4 className="font-editorial text-xl font-normal text-white">
                  {schoolName}
                </h4>
                <p className="text-[10px] font-mono text-[#A8C3BC] tracking-[0.16em] uppercase">
                  {SCHOOL_CONFIG.subName}
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-normal">
              {schoolDesc}
            </p>

            <div className="space-y-1.5 text-xs text-white/70 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <span>CBSE AFFILIATION NO. {SCHOOL_CONFIG.affiliationNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <span>SCHOOL CODE: {SCHOOL_CONFIG.schoolCode}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Academics (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#A8C3BC]">
              Curriculum
            </h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/academics#nursery-early-years" className="hover:text-white transition-colors">
                  Nursery & Pre-Primary
                </Link>
              </li>
              <li>
                <Link href="/academics#primary-school" className="hover:text-white transition-colors">
                  Primary (Classes 1–5)
                </Link>
              </li>
              <li>
                <Link href="/academics#middle-school" className="hover:text-white transition-colors">
                  Middle (Classes 6–8)
                </Link>
              </li>
              <li>
                <Link href="/academics#secondary-school" className="hover:text-white transition-colors">
                  Secondary (Class 9)
                </Link>
              </li>
              <li>
                <Link href="/academics#class-10" className="hover:text-white transition-colors">
                  Class 10 CBSE Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional Links (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#A8C3BC]">
              Institution
            </h5>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Heritage, Vision & Leadership
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-white transition-colors">
                  12-Acre Campus & Labs
                </Link>
              </li>
              <li>
                <Link href="/student-life" className="hover:text-white transition-colors">
                  House System & Robotics
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white transition-colors">
                  Board Honors & Olympiads
                </Link>
              </li>
              <li>
                <Link href="/mandatory-disclosure" className="hover:text-white transition-colors">
                  CBSE Mandatory Disclosure (SARAS)
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  Circulars & Event Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#A8C3BC]">
              Campus Office
            </h5>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0 mt-0.5" />
                <span>{schoolAddress}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <a href={`tel:${schoolPhone}`} className="hover:text-white transition-colors font-mono">
                  {schoolPhone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <a href={`mailto:${schoolEmail}`} className="hover:text-white transition-colors font-mono">
                  {schoolEmail}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#A8C3BC] shrink-0" />
                <span className="font-mono">{schoolHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-white/10 py-5 relative z-10 text-xs text-white/50 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {currentYear} {schoolName}, {SCHOOL_CONFIG.subName}. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/mandatory-disclosure" className="hover:text-white transition-colors">
              CBSE Appendix IX
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
