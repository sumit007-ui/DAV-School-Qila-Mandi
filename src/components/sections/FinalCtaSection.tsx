import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle, Download, Phone } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

interface FinalCtaSectionProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
}

export function FinalCtaSection({
  onOpenAdmissionModal,
  onOpenProspectusModal,
}: FinalCtaSectionProps) {
  return (
    <section className="relative py-28 lg:py-36 bg-navy-950 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
          alt="DAV Public School Qilla Mandi Campus Grounds"
          fill
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/75" />
        <div className="absolute inset-0 editorial-dark-grain opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DAV Public School Qilla Mandi • Session {SCHOOL_CONFIG.admissionsSession}</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-white">
          READY TO BEGIN <br />
          <span className="italic text-gold-300 font-light">THE JOURNEY?</span>
        </h2>

        <p className="text-gold-300 font-serif text-lg sm:text-xl font-normal">
          Admissions from Nursery to Class 10.
        </p>

        <p className="text-cream-200 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Give your child the gift of values-driven education, intellectual clarity, and boundless opportunities in Batala's premier educational landmark.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenAdmissionModal}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Admission Enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/contact"
            className="px-6 py-4 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-cream-100 font-semibold text-xs sm:text-sm uppercase tracking-wider border border-navy-700 transition-colors flex items-center gap-2 backdrop-blur-md"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>Contact School</span>
          </Link>

          <button
            onClick={onOpenProspectusModal}
            className="px-6 py-4 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-cream-100 font-semibold text-xs sm:text-sm uppercase tracking-wider border border-navy-700 transition-colors flex items-center gap-2 backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-gold-400" />
            <span>Download Prospectus</span>
          </button>
        </div>

        <div className="pt-8 border-t border-navy-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-cream-300/80 font-mono">
          <span>📍 {SCHOOL_CONFIG.address.street}, {SCHOOL_CONFIG.address.city}, Punjab</span>
          <span>•</span>
          <span>📞 {SCHOOL_CONFIG.contact.primaryPhone}</span>
          <span>•</span>
          <span>✉️ {SCHOOL_CONFIG.contact.email}</span>
        </div>
      </div>
    </section>
  );
}
