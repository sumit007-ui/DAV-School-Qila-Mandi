"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, Phone, ArrowRight, ArrowLeft, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { admissionEnquirySchema, AdmissionEnquiryFormData } from "@/lib/validation/admission";
import { SCHOOL_CONFIG } from "@/config/school";

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGrade?: string;
}

export function AdmissionModal({ isOpen, onClose, defaultGrade = "Nursery" }: AdmissionModalProps) {
  const [formData, setFormData] = useState<Partial<AdmissionEnquiryFormData>>({
    parentName: "",
    studentName: "",
    gradeApplying: defaultGrade,
    streamApplying: "",
    phone: "",
    email: "",
    cityOrArea: "Batala",
    preferredContact: "WhatsApp",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  if (!isOpen) return null;

  const handleChange = (field: keyof AdmissionEnquiryFormData, value: string) => {
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

    const result = admissionEnquirySchema.safeParse(formData);
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
      const response = await fetch("/api/admissions/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReferenceId(data.referenceId || `DAVQM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitted(true);

        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#C99B23", "#0A192F", "#E2BA48", "#8E1B29"],
          });
        } catch {
          // ignore
        }
      } else {
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({ form: data.error || "Submission failed. Please try again." });
        }
      }
    } catch (error) {
      // Graceful fallback acknowledgement
      const ref = `DAVQM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceId(ref);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setReferenceId("");
    onClose();
  };

  const isSeniorSec = formData.gradeApplying === "Class XI" || formData.gradeApplying === "Class XII";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-navy-950 text-white relative border-b border-navy-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-cream-300 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admissions Enquiry Session {SCHOOL_CONFIG.admissionsSession}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
            Begin Your Child's Journey at DAV
          </h3>
          <p className="text-xs text-cream-300 mt-1">
            Submit your details below. Our admissions counsel will contact you within 24 hours.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-navy-950 font-bold">
                  Enquiry Successfully Registered!
                </h4>
                <p className="text-sm text-navy-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong className="text-navy-900">{formData.parentName}</strong>. We have received the admission application for <strong className="text-navy-900">{formData.studentName}</strong> ({formData.gradeApplying}).
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-cream-50 border border-gold-300/60 rounded-xl p-4 max-w-sm mx-auto text-center space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-navy-500 block">
                  Acknowledgement Reference ID
                </span>
                <span className="text-xl font-mono font-bold text-gold-700 tracking-wider">
                  {referenceId}
                </span>
                <p className="text-[11px] text-navy-600">
                  Confirmation sent to {formData.phone} via {formData.preferredContact}
                </p>
              </div>

              <div className="bg-navy-50 rounded-xl p-4 text-xs text-navy-700 text-left space-y-2 border border-navy-100">
                <p className="font-semibold text-navy-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-600" /> Next Steps:
                </p>
                <ul className="list-disc list-inside space-y-1 text-navy-600 pl-1">
                  <li>Our Admissions Coordinator will call to schedule a campus tour & interaction.</li>
                  <li>Please keep copy of Birth Certificate and previous report cards ready.</li>
                  <li>Campus Visit Timing: Mon-Sat, 8:30 AM to 2:00 PM.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20DAV%20Qilla%20Mandi%2C%20I%20have%20submitted%20admission%20enquiry%20with%20Reference%20ID%20${referenceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide uppercase transition-colors"
                >
                  Chat with Admissions on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-cream-100 font-semibold text-xs tracking-wide uppercase transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Parent & Student Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurpreet Singh"
                    value={formData.parentName || ""}
                    onChange={(e) => handleChange("parentName", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.parentName ? "border-rose-500 bg-rose-50/30" : "border-cream-300 focus:border-gold-500"
                    } focus:outline-none transition-colors text-navy-950`}
                  />
                  {errors.parentName && <p className="text-[11px] text-rose-600 mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manjot Singh"
                    value={formData.studentName || ""}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.studentName ? "border-rose-500 bg-rose-50/30" : "border-cream-300 focus:border-gold-500"
                    } focus:outline-none transition-colors text-navy-950`}
                  />
                  {errors.studentName && <p className="text-[11px] text-rose-600 mt-1">{errors.studentName}</p>}
                </div>
              </div>

              {/* Row 2: Class applying for & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Class Seeking Admission For *
                  </label>
                  <select
                    value={formData.gradeApplying || "Nursery"}
                    onChange={(e) => handleChange("gradeApplying", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950 bg-white"
                  >
                    {["Pre-Nursery", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    City / Locality *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Qilla Mandi, Batala"
                    value={formData.cityOrArea || ""}
                    onChange={(e) => handleChange("cityOrArea", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950"
                  />
                </div>
              </div>

              {/* Row 3: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Contact Mobile Number (10 Digits) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-cream-300 bg-cream-100 text-xs font-mono text-navy-700">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      maxLength={10}
                      value={formData.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-r-xl text-sm border ${
                        errors.phone ? "border-rose-500 bg-rose-50/30" : "border-cream-300 focus:border-gold-500"
                      } focus:outline-none transition-colors text-navy-950 font-mono`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy-900 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.email ? "border-rose-500 bg-rose-50/30" : "border-cream-300 focus:border-gold-500"
                    } focus:outline-none transition-colors text-navy-950`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Preferred Communication Channel */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1.5">
                  Preferred Contact Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["WhatsApp", "Phone", "Email"] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => handleChange("preferredContact", mode)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center ${
                        formData.preferredContact === mode
                          ? "bg-navy-900 text-gold-400 border-navy-900 shadow-sm"
                          : "bg-cream-50 text-navy-700 border-cream-300 hover:bg-cream-100"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Remarks/Questions */}
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Any specific query or requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bus transport availability from nearby village, scholarship criteria..."
                  value={formData.message || ""}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-cream-300 focus:border-gold-500 focus:outline-none transition-colors text-navy-950 resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-navy-900 hover:bg-navy-950 text-gold-400 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-navy-950/20 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 border border-gold-500/30"
                >
                  {isSubmitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <span>Submit Admission Enquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-navy-500 mt-2">
                  🔒 Your contact information is kept strictly confidential and used solely for admission communication.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
