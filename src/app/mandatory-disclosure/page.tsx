import Link from "next/link";
import { FileCheck, ShieldCheck, Download, ExternalLink } from "lucide-react";
import { getSiteSettings, getPrincipalMessage } from "@/sanity/lib/fetch";
import { SCHOOL_CONFIG } from "@/config/school";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MandatoryDisclosurePage() {
  const [siteSettings, principal] = await Promise.all([
    getSiteSettings(),
    getPrincipalMessage(),
  ]);

  const schoolName = siteSettings?.schoolName || "Dr. M.R.S Bhalla D.A.V High School";
  const schoolPhone = siteSettings?.phone || SCHOOL_CONFIG.contact.primaryPhone;
  const schoolEmail = siteSettings?.email || SCHOOL_CONFIG.contact.email;
  const schoolAddress = siteSettings?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`;

  const generalInfo = [
    { label: "Name of the School", value: schoolName },
    { label: "Board Affiliation", value: "Punjab School Education Board (PSEB Mohali)" },
    { label: "School Level", value: "High School (Pre-Nursery to Class 10)" },
    { label: "Complete Campus Address", value: schoolAddress },
    { label: "Principal Name & Qualification", value: `${principal.name} (${principal.designation})` },
    { label: "Official Email ID", value: schoolEmail },
    { label: "Contact Telephone", value: schoolPhone },
    { label: "Managing Society / Trust", value: "DAV College Managing Committee (DAVCMC), New Delhi" },
  ];

  const documents = [
    { title: "Copy of PSEB Recognition / Affiliation & Recent Renewal Certificate", docUrl: "#" },
    { title: "Copies of Society / Trust Registration / Renewal Certificate", docUrl: "#" },
    { title: "Copy of No Objection Certificate (NOC) Issued by State Govt.", docUrl: "#" },
    { title: "Copy of Valid Building Safety Certificate as per National Building Code", docUrl: "#" },
    { title: "Copy of Valid Fire Safety Certificate Issued by Competent Authority", docUrl: "#" },
    { title: "Copy of Valid Water, Health & Sanitation Certificates", docUrl: "#" },
    { title: "Copy of Fee Structure of the School (Session 2026-27)", docUrl: "/admissions#fee-structure" },
    { title: "Annual Academic Calendar & Examination Schedule", docUrl: "/news" },
    { title: "List of School Managing Committee (SMC)", docUrl: "#" },
    { title: "List of Parents Teachers Association (PTA) Members", docUrl: "#" },
    { title: "Last 3-Year PSEB Board Result Summary", docUrl: "/achievements" },
  ];

  return (
    <div className="w-full py-16 bg-cream-50 text-navy-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
            PSEB & Statutory Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal">
            Mandatory Public Disclosure
          </h1>
          <p className="text-xs sm:text-sm text-navy-600">
            In compliance with Punjab School Education Board regulations and Department of School Education directives, the following official institutional credentials and compliance documents are published for public inspection.
          </p>
        </div>

        {/* Section A: General Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-cream-200 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-700" />
            <span>A. General Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            {generalInfo.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 space-y-1">
                <span className="text-navy-500 font-mono text-[11px] block">{item.label}</span>
                <strong className="text-navy-950 font-semibold">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Documents & Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-200 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-cream-200 pb-3 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-gold-700" />
            <span>B. Documents and Information</span>
          </h2>

          <div className="divide-y divide-cream-200">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-gold-700 shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <p className="text-xs sm:text-sm text-navy-900 font-medium group-hover:text-gold-700 transition-colors">
                    {doc.title}
                  </p>
                </div>

                <Link
                  href={doc.docUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-100 hover:bg-navy-950 text-navy-800 hover:text-gold-400 font-mono text-xs font-bold uppercase transition-all shrink-0 border border-cream-300"
                >
                  <span>View / Download</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
