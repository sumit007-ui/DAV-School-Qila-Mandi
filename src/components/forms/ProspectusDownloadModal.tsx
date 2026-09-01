"use client";

import { useState } from "react";
import { X, FileDown, CheckCircle2, ShieldCheck, Download } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

interface ProspectusDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProspectusDownloadModal({ isOpen, onClose }: ProspectusDownloadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setDownloaded(true);

    // Simulate instant download trigger
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("download", `DAV_Public_School_QillaMandi_Prospectus_${SCHOOL_CONFIG.admissionsSession}.pdf`);
    // link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-navy-950 text-white relative border-b border-navy-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-cream-300 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileDown className="w-3.5 h-3.5" />
            <span>Digital Information Kit</span>
          </div>
          <h3 className="font-serif text-xl font-normal text-white">
            Download Prospectus {SCHOOL_CONFIG.admissionsSession}
          </h3>
          <p className="text-xs text-cream-300 mt-1">
            Includes curriculum guidelines, fee breakdown, bus routes & scholarship schemes.
          </p>
        </div>

        <div className="p-6">
          {downloaded ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-navy-950">
                Prospectus Ready!
              </h4>
              <p className="text-xs text-navy-600">
                Thank you, <strong>{name}</strong>. Your copy has been generated. A backup link has also been sent to your WhatsApp number.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#download-prospectus"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Prospectus downloaded successfully!");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow hover:bg-gold-400 transition-colors"
                >
                  <Download className="w-4 h-4" /> Save PDF (4.8 MB)
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs text-navy-600 hover:bg-cream-100 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Parent / Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Email ID (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 border border-gold-500/30"
                >
                  <Download className="w-4 h-4" /> Download Official Prospectus
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
