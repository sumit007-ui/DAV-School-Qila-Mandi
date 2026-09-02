import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle, Download, Phone, MapPin, Mail } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal } from "@/components/motion";

interface FinalCtaSectionProps {
  onOpenAdmissionModal?: () => void;
  onOpenProspectusModal?: () => void;
}

export function FinalCtaSection({
  onOpenAdmissionModal,
  onOpenProspectusModal,
}: FinalCtaSectionProps) {
  return (
    <section className="relative py-20 lg:py-28 bg-[#0B1F33] text-white overflow-hidden font-sans border-t border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1920"
          alt="DAV Public School Qilla Mandi Campus Grounds"
          fill
          className="object-cover object-center scale-105 opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/85 to-[#0B1F33]/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#2F5D62]/40 border border-[#2F5D62] text-[#A8C3BC] text-[11px] font-mono font-medium uppercase tracking-[0.16em] backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A8C3BC]" />
            <span>DAV PUBLIC SCHOOL · BATALA · SESSION {SCHOOL_CONFIG.admissionsSession}</span>
          </div>
        </Reveal>

        <LineReveal as="h2" className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.0] tracking-tight text-white">
          {"Where Curiosity Begins,\nFutures Take Shape."}
        </LineReveal>

        <Reveal direction="up" delay={0.25}>
          <p className="text-white/80 text-sm sm:text-base font-normal leading-relaxed max-w-2xl mx-auto">
            Give your child the gift of values-driven education, intellectual clarity, and boundless opportunities in Batala's premier educational landmark.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.35}>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAdmissionModal}
              className="px-6 py-3.5 rounded bg-white hover:bg-white/90 text-[#0B1F33] font-bold text-xs uppercase tracking-[0.14em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans"
            >
              <span>Admission Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#0B1F33]" />
            </button>

            <Link
              href="/contact"
              className="px-5 py-3.5 rounded bg-[#163A5F] hover:bg-[#2F5D62] text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span>Contact School</span>
            </Link>

            <button
              onClick={onOpenProspectusModal}
              className="px-5 py-3.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span>Download Prospectus</span>
            </button>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.45}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-mono pt-4 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span>{SCHOOL_CONFIG.address.street}, {SCHOOL_CONFIG.address.city}, Punjab</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span>{SCHOOL_CONFIG.contact.primaryPhone}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#A8C3BC]" />
              <span>{SCHOOL_CONFIG.contact.email}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
