import { SCHOOL_CONFIG } from "@/config/school";

export default function PrivacyPage() {
  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 bg-cream-50 text-navy-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
            Legal & Data Governance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-navy-950 font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-navy-500 font-mono">
            Last Updated: August 2026 • DAV Public School Qilla Mandi
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-cream-200 shadow-sm space-y-6 text-xs sm:text-sm text-navy-800 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">1. Commitment to Student and Parental Privacy</h2>
            <p>
              DAV Public School Qilla Mandi, Batala is committed to protecting the privacy and confidential personal data of our prospective and enrolled students, parents, alumni, and website visitors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">2. Information Collection</h2>
            <p>
              When you submit an admission enquiry, download a prospectus, or contact the administration, we collect relevant contact information including Parent Name, Student Name, Grade Applying, Phone Number, Email, and Residential Area. This information is utilized solely for academic assessment, admission notifications, and school-parent communication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">3. Non-Disclosure & Security</h2>
            <p>
              We do not sell, lease, or distribute student or parental contact numbers to third-party commercial advertisers or telemarketers. All admission records and academic data are stored securely following institutional data protection protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-navy-950">4. Contact Information</h2>
            <p>
              For questions concerning this privacy policy or your stored biodata, please contact: <strong className="text-navy-950">{SCHOOL_CONFIG.contact.email}</strong> or call <strong className="text-navy-950">{SCHOOL_CONFIG.contact.primaryPhone}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
