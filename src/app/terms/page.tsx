import Link from "next/link";
import { SCHOOL_CONFIG } from "@/config/school";

export default function TermsPage() {
  return (
    <div className="w-full py-16 bg-cream-50 text-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
            Institutional Code of Conduct
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
            Terms of Use
          </h1>
          <p className="text-xs text-navy-500 font-mono">
            DAV Public School Qilla Mandi • DAVCMC New Delhi
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-cream-200 shadow-sm space-y-6 text-xs sm:text-sm text-navy-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">1. Acceptance of Terms</h2>
            <p>
              By accessing and navigating the official digital portal of DAV Public School Qilla Mandi, you agree to comply with these terms, school administrative rules, and applicable CBSE/State guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">2. Intellectual Property & Brand Assets</h2>
            <p>
              All photographs, logos, emblems, curriculum summaries, and institutional text published on this website are the intellectual property of DAV Public School Qilla Mandi and DAVCMC. Unauthorized duplication or commercial reproduction without written consent is prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">3. Admission Inquiries & Representation</h2>
            <p>
              Submission of an online admission enquiry or receipt of a registration acknowledgement does not constitute a guaranteed seat until formal document verification, interaction, and fee remittance are completed.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
