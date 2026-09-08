import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle, Download, Phone, MapPin, Mail } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { LineReveal, Reveal } from "@/components/motion";

interface FinalCtaSectionProps {
  onOpenAdmissionModal?: () => void;
}

export function FinalCtaSection({
  onOpenAdmissionModal,
}: FinalCtaSectionProps) {
  return (
    <section className="relative py-20 lg:py-28 bg-[#4E220F] text-white overflow-hidden font-sans border-t border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/school-building.png"
          alt="Dr. MRS Bhalla DAV High School Campus Building"
          fill
          className="object-cover object-center scale-105 opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4E220F] via-[#4E220F]/85 to-[#4E220F]/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9D6638] text-[#F7F1DE] text-[11px] font-mono font-bold uppercase tracking-[0.16em] shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F7F1DE]" />
            <span>DR. MRS BHALLA DAV HIGH SCHOOL · SESSION {SCHOOL_CONFIG.admissionsSession}</span>
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
              className="px-6 py-3.5 rounded bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs uppercase tracking-[0.14em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans border border-white/10"
            >
              <span>Admission Enquiry</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <Link
              href="/contact"
              className="px-5 py-3.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#B0BA99]" />
              <span>Contact School</span>
            </Link>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.45}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70 font-mono pt-4 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B0BA99]" />
              <span>{SCHOOL_CONFIG.address.street}, {SCHOOL_CONFIG.address.city}, Punjab</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#B0BA99]" />
              <span>{SCHOOL_CONFIG.contact.primaryPhone}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#B0BA99]" />
              <span>{SCHOOL_CONFIG.contact.email}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
