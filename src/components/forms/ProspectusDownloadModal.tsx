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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#16324F]/80 backdrop-blur-md animate-fade-in font-sans">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 bg-[#16324F] text-white relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-ivory-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sage-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <FileDown className="w-3.5 h-3.5 text-teal-300" />
            <span>Digital Information Kit</span>
          </div>
          <h3 className="font-serif text-xl font-normal text-white">
            Download Prospectus {SCHOOL_CONFIG.admissionsSession}
          </h3>
          <p className="text-xs text-ivory-300 mt-1 font-normal">
            Includes curriculum guidelines, fee breakdown, bus routes & scholarship schemes.
          </p>
        </div>

        <div className="p-6">
          {downloaded ? (
            <div className="text-center py-6 space-y-4 animate-fade-in">
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto border border-teal-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-xl font-bold text-[#16324F]">
                Prospectus Ready!
              </h4>
              <p className="text-xs text-[#1C2730]">
                Thank you, <strong>{name}</strong>. Your copy has been generated. A backup link has also been sent to your WhatsApp number.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="#download-prospectus"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Prospectus downloaded successfully!");
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#16324F] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow hover:bg-[#0E2135] transition-colors"
                >
                  <Download className="w-4 h-4 text-sage-300" /> Save PDF (4.8 MB)
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs text-[#6B7478] hover:bg-ivory-100 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#16324F] mb-1">
                  Parent / Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jaspreet Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#16324F]/15 focus:border-teal-500 focus:outline-none transition-colors text-[#1C2730]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16324F] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#16324F]/15 focus:border-teal-500 focus:outline-none transition-colors text-[#1C2730] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#16324F] mb-1">
                  Email ID (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#16324F]/15 focus:border-teal-500 focus:outline-none transition-colors text-[#1C2730]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#16324F] hover:bg-[#0E2135] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-sage-300" /> Download Official Prospectus
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
