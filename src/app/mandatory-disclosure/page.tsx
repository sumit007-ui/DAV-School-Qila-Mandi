import { Metadata } from "next";
import { generateSchoolMetadata } from "@/lib/seo/metadata";
import { ShieldCheck } from "lucide-react";
import { getSiteSettings, getPrincipalMessage } from "@/sanity/lib/fetch";
import { SCHOOL_CONFIG } from "@/config/school";

export const metadata: Metadata = generateSchoolMetadata({
  title: "Mandatory Public Disclosure & PSEB Compliance",
  description:
    "Official mandatory public disclosure for Dr. MRS Bhalla DAV High School, Qilla Mandi, Batala under Punjab School Education Board (PSEB) regulations.",
  path: "/mandatory-disclosure",
  keywords: [
    "DAV Batala Mandatory Disclosure",
    "PSEB Compliance Batala",
    "DAV School Batala Society",
  ],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MandatoryDisclosurePage() {
  const [siteSettings, principal] = await Promise.all([
    getSiteSettings(),
    getPrincipalMessage(),
  ]);

  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;
  const schoolPhone = siteSettings?.phone || SCHOOL_CONFIG.contact.primaryPhone;
  const schoolEmail = siteSettings?.email || SCHOOL_CONFIG.contact.email;
  const schoolAddress = siteSettings?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`;

  const generalInfo = [
    { label: "Name of the School", value: schoolName },
    { label: "Board Affiliation", value: "Affiliated under Punjab School Education Board (PSEB Mohali)" },
    { label: "Managing Society / Trust", value: "Managed by DAV College Managing Committee (DAVCMC), New Delhi" },
    { label: "School Level", value: "High School (Pre-Nursery to Class 10)" },
    { label: "Complete Campus Address", value: schoolAddress },
    { label: "Principal Name & Qualification", value: `${principal.name} (${principal.designation})` },
    { label: "Official Email ID", value: schoolEmail },
    { label: "Contact Telephone", value: `${SCHOOL_CONFIG.contact.receptionPhone} (Reception) / ${SCHOOL_CONFIG.contact.officePhone} (Office)` },
  ];

  return (
    <div className="w-full pt-28 sm:pt-36 pb-20 bg-cream-50 text-navy-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700 bg-gold-100/60 px-2.5 py-1 rounded-full border border-gold-300/40 inline-block">
            PSEB & Statutory Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-normal">
            Mandatory Public Disclosure
          </h1>
          <p className="text-sm sm:text-base font-medium text-navy-700 max-w-3xl leading-relaxed">
            Affiliated under Punjab School Education Board (PSEB Mohali) · Managed by DAV College Managing Committee (DAVCMC), New Delhi
          </p>
        </div>

        {/* General Information */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-cream-200 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-700" />
            <span>General Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            {generalInfo.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-cream-50 border border-cream-200 space-y-1.5">
                <span className="text-navy-500 font-mono text-[11px] font-semibold uppercase tracking-wider block">
                  {item.label}
                </span>
                <strong className="text-navy-950 font-semibold text-sm sm:text-base block">
                  {item.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
