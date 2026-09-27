"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Phone, ArrowRight } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { trackWhatsAppClick, trackPhoneClick, trackCTAClick } from "@/lib/firebase/analytics";

const WHATSAPP_NUMBER = "919876543210"; // Replace with real number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Dr. MRS Bhalla DAV School, Qila Mandi! I would like to enquire about admissions."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button after 2 seconds scroll delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-6 z-[9999] flex flex-col items-end gap-3">
      {/* Expandable Card */}
      <div
        className={`transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[calc(100vw-2.5rem)] max-w-xs sm:w-72 overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.552 4.103 1.52 5.824L0 24l6.335-1.502A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.618-.502-5.12-1.38l-.367-.218-3.782.897.942-3.69-.24-.384A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold font-sans">DAV School, Qila Mandi</p>
                <p className="text-white/80 text-[10px] font-mono">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Chat Bubble */}
          <div className="p-4 bg-[#ECE5DD]">
            <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[90%]">
              <p className="text-xs text-[#303030] font-sans leading-relaxed">
                👋 Hello! Welcome to <strong>Dr. MRS Bhalla DAV School</strong>.
              </p>
              <p className="text-xs text-[#303030] font-sans leading-relaxed mt-1">
                How can we help you with <strong>Admissions</strong> today?
              </p>
              <p className="text-[10px] text-[#999] font-mono mt-1.5">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="p-3 bg-white space-y-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs font-bold transition-colors group"
              onClick={() => {
                setIsOpen(false);
                trackWhatsAppClick("floating_button");
                trackCTAClick("whatsapp_chat", "floating_button");
              }}
            >
              <span className="font-sans">💬 Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href={`tel:${SCHOOL_CONFIG.contact.receptionPhone}`}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[#F7F1DE] hover:bg-[#EFE4C8] text-[#4E220F] text-xs font-bold transition-colors border border-[#9D6638]/20 group"
              onClick={() => {
                setIsOpen(false);
                trackPhoneClick("floating_button");
              }}
            >
              <span className="font-sans">📞 Call Reception</span>
              <span className="font-mono text-[10px] text-[#9D6638]">{SCHOOL_CONFIG.contact.receptionPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Chat on WhatsApp"
        className={`relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE57] shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 ${
          isOpen ? "rotate-0" : "hover:scale-110"
        }`}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
        )}
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.552 4.103 1.52 5.824L0 24l6.335-1.502A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.618-.502-5.12-1.38l-.367-.218-3.782.897.942-3.69-.24-.384A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        )}
      </button>
    </div>
  );
}
