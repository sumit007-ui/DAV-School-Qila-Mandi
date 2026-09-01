import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-cream-50 text-navy-950 px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-cream-200 shadow-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Error 404
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-navy-950">
          Page not found.
        </h1>

        <p className="text-xs sm:text-sm text-navy-600 leading-relaxed">
          The educational resource or page you requested could not be located. It may have moved or been updated for the current academic session.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider hover:bg-navy-950 transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/admissions"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cream-100 text-navy-800 font-semibold text-xs uppercase tracking-wider hover:bg-cream-200 transition-colors"
          >
            Admissions 2026-27
          </Link>
        </div>
      </div>
    </div>
  );
}
