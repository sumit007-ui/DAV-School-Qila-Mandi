"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Facebook, Instagram } from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";
import { contactFormSchema, ContactFormData } from "@/lib/validation/contact";

interface ContactClientViewProps {
  siteSettings?: any;
  faqs?: any[];
}

export function ContactClientView({ siteSettings, faqs = [] }: ContactClientViewProps) {
  const schoolName = siteSettings?.schoolName || SCHOOL_CONFIG.name;
  const schoolPhone = siteSettings?.phone || SCHOOL_CONFIG.contact.primaryPhone;
  const schoolEmail = siteSettings?.email || SCHOOL_CONFIG.contact.email;
  const schoolAddress = siteSettings?.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`;
  const schoolHours = siteSettings?.officeHours || SCHOOL_CONFIG.contact.officeHours;
  const schoolWhatsApp = siteSettings?.whatsappNumber || SCHOOL_CONFIG.contact.whatsapp;

  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    category: "General Enquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          subject: "",
          category: "General Enquiry",
          message: "",
        });
      } else {
        setErrors({ form: data.error || "Submission failed. Please try again." });
      }
    } catch (err) {
      setErrors({ form: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="relative py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920"
            alt={`${schoolName} Campus Contact`}
            fill
            className="object-cover object-center scale-105"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect & Visit</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight">
            We are here for you.
          </h1>

          <p className="text-cream-200 text-base sm:text-xl font-light max-w-2xl">
            Whether you seek admission counsel, academic clarifications, or campus tour arrangements, our admissions and administrative desk is at your service.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-cream-50 text-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Direct Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-2xl border border-cream-200 shadow-sm space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
                  Campus Address & Contacts
                </span>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-navy-950">Campus Location</p>
                      <p className="text-xs text-navy-600 leading-relaxed">
                        {schoolAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-navy-950">Telephone Helpdesk</p>
                      <div className="text-xs font-mono text-navy-700 space-y-1">
                        <div>
                          <span className="text-navy-500 font-sans font-medium">Reception: </span>
                          <a href={`tel:${SCHOOL_CONFIG.contact.receptionPhone}`} className="hover:text-gold-700 font-semibold">{SCHOOL_CONFIG.contact.receptionPhone}</a>
                        </div>
                        <div>
                          <span className="text-navy-500 font-sans font-medium">Office: </span>
                          <a href={`tel:${SCHOOL_CONFIG.contact.officePhone}`} className="hover:text-gold-700 font-semibold">{SCHOOL_CONFIG.contact.officePhone}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-navy-950">Electronic Mail</p>
                      <p className="text-xs font-mono text-navy-600">
                        <a href={`mailto:${schoolEmail}`} className="hover:text-gold-700">{schoolEmail}</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-navy-950">Office Visiting Hours</p>
                      <p className="text-xs text-navy-600">
                        {schoolHours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-cream-200 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={SCHOOL_CONFIG.links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#1877F2] hover:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </a>
                    <a
                      href={SCHOOL_CONFIG.links.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition-opacity shadow-xs"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-2xl border border-cream-200 shadow-sm space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold-700">
                    Send Direct Message
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-navy-950 font-normal">
                    Inquire Online with Administrative Desk
                  </h2>
                </div>

                {isSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl text-emerald-950 font-bold">Message Dispatched!</h3>
                      <p className="text-xs sm:text-sm text-emerald-800">
                        Thank you for reaching out. Our administrative office will review your inquiry and contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                    {errors.form && (
                      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                        {errors.form}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-navy-700 uppercase font-bold text-[10px]">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-navy-950 font-sans"
                        />
                        {errors.fullName && <p className="text-rose-600 text-[10px]">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-navy-700 uppercase font-bold text-[10px]">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="10-Digit Mobile Number"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-navy-950 font-sans"
                        />
                        {errors.phone && <p className="text-rose-600 text-[10px]">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-navy-700 uppercase font-bold text-[10px]">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-navy-950 font-sans"
                        />
                        {errors.email && <p className="text-rose-600 text-[10px]">{errors.email}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-navy-700 uppercase font-bold text-[10px]">Subject *</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => handleChange("subject", e.target.value)}
                          placeholder="Admission / Fee / Transport"
                          className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-navy-950 font-sans"
                        />
                        {errors.subject && <p className="text-rose-600 text-[10px]">{errors.subject}</p>}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-navy-700 uppercase font-bold text-[10px]">Message Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Please write your detailed query or message here..."
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-xl text-navy-950 text-xs focus:outline-none focus:ring-2 focus:ring-navy-950 font-sans"
                      />
                      {errors.message && <p className="text-rose-600 text-[10px]">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-navy-950 hover:bg-navy-900 text-white hover:text-cream-100 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Dispatch...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>Transmit Message to School</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
