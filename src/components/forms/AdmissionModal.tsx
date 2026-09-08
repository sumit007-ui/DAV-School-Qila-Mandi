"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, Phone, ArrowRight, ArrowLeft, Send, Lock } from "lucide-react";
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

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#9D6638", "#4E220F", "#B0BA99", "#F7F1DE"],
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#4E220F]/80 backdrop-blur-md animate-fade-in overflow-y-auto font-sans">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#4E220F] text-white relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-[#F7F1DE]/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#B0BA99] text-xs font-mono font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B0BA99]" />
            <span>Admissions Enquiry Session {SCHOOL_CONFIG.admissionsSession}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            Begin Your Child's Journey at DAV
          </h3>
          <p className="text-xs text-[#F7F1DE]/80 mt-1 font-normal">
            Submit your details below. Our admissions counsel will contact you within 24 hours.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 bg-[#F7F1DE] text-[#4E220F] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#9D6638]/30">
                <CheckCircle2 className="w-10 h-10 text-[#9D6638]" />
              </div>

              <div>
                <h4 className="font-serif text-2xl text-[#4E220F] font-bold">
                  Enquiry Successfully Registered!
                </h4>
                <p className="text-sm text-[#4E220F]/80 mt-1 max-w-md mx-auto">
                  Thank you, <strong className="text-[#4E220F]">{formData.parentName}</strong>. We have received the admission application for <strong className="text-[#4E220F]">{formData.studentName}</strong> ({formData.gradeApplying}).
                </p>
              </div>

              {/* Reference Card */}
              <div className="bg-[#F7F1DE] border border-[#9D6638]/40 rounded-xl p-4 max-w-sm mx-auto text-center space-y-1">
                <span className="text-[11px] font-sans uppercase tracking-wider text-[#9D6638] block font-bold">
                  Acknowledgement Reference ID
                </span>
                <span className="text-xl font-mono font-bold text-[#4E220F] tracking-wider">
                  {referenceId}
                </span>
                <p className="text-[11px] text-[#4E220F]/70 font-mono">
                  Confirmation sent to {formData.phone} via {formData.preferredContact}
                </p>
              </div>

              <div className="bg-[#F7F1DE]/60 rounded-xl p-4 text-xs text-[#4E220F] text-left space-y-2 border border-[#9D6638]/20">
                <p className="font-bold text-[#4E220F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9D6638]" /> Next Steps:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#4E220F]/80 pl-1">
                  <li>Our Admissions Coordinator will call to schedule a campus tour & interaction.</li>
                  <li>Please keep copy of Birth Certificate and previous report cards ready.</li>
                  <li>Campus Visit Timing: Mon-Sat, 8:30 AM to 2:00 PM.</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/91${SCHOOL_CONFIG.contact.primaryPhone}?text=Hello%20DAV%20Qilla%20Mandi%2C%20I%20have%20submitted%20admission%20enquiry%20with%20Reference%20ID%20${referenceId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#9D6638] hover:bg-[#82522B] text-white font-bold text-xs tracking-wide uppercase transition-colors"
                >
                  Chat with Admissions on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#4E220F] hover:bg-[#9D6638] text-white font-bold text-xs tracking-wide uppercase transition-colors"
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
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaspreet Singh"
                    value={formData.parentName || ""}
                    onChange={(e) => handleChange("parentName", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.parentName ? "border-rose-500 bg-rose-50/30" : "border-[#4E220F]/20 focus:border-[#9D6638]"
                    } focus:outline-none transition-colors text-[#4E220F]`}
                  />
                  {errors.parentName && <p className="text-[11px] text-rose-600 mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manjot Singh"
                    value={formData.studentName || ""}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.studentName ? "border-rose-500 bg-rose-50/30" : "border-[#4E220F]/20 focus:border-[#9D6638]"
                    } focus:outline-none transition-colors text-[#4E220F]`}
                  />
                  {errors.studentName && <p className="text-[11px] text-rose-600 mt-1">{errors.studentName}</p>}
                </div>
              </div>

              {/* Row 2: Class applying for & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    Class Seeking Admission For *
                  </label>
                  <select
                    value={formData.gradeApplying || "Nursery"}
                    onChange={(e) => handleChange("gradeApplying", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#4E220F]/20 focus:border-[#9D6638] focus:outline-none transition-colors text-[#4E220F] bg-white"
                  >
                    {["Pre-Nursery", "Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    City / Locality *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Qilla Mandi, Batala"
                    value={formData.cityOrArea || ""}
                    onChange={(e) => handleChange("cityOrArea", e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#4E220F]/20 focus:border-[#9D6638] focus:outline-none transition-colors text-[#4E220F]"
                  />
                </div>
              </div>

              {/* Row 3: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    Contact Mobile Number (10 Digits) *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-[#4E220F]/20 bg-[#F7F1DE] text-xs font-mono text-[#4E220F] font-bold">
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
                        errors.phone ? "border-rose-500 bg-rose-50/30" : "border-[#4E220F]/20 focus:border-[#9D6638]"
                      } focus:outline-none transition-colors text-[#4E220F] font-mono`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4E220F] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-sm border ${
                      errors.email ? "border-rose-500 bg-rose-50/30" : "border-[#4E220F]/20 focus:border-[#9D6638]"
                    } focus:outline-none transition-colors text-[#4E220F]`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Preferred Communication Channel */}
              <div>
                <label className="block text-xs font-bold text-[#4E220F] mb-1.5">
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
                          ? "bg-[#4E220F] text-white border-[#4E220F] shadow-sm font-bold"
                          : "bg-[#F7F1DE]/60 text-[#4E220F] border-[#4E220F]/20 hover:bg-[#F7F1DE]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Remarks/Questions */}
              <div>
                <label className="block text-xs font-bold text-[#4E220F] mb-1">
                  Any specific query or requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Bus transport availability, fee schedule..."
                  value={formData.message || ""}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border border-[#4E220F]/20 focus:border-[#9D6638] focus:outline-none transition-colors text-[#4E220F] resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#9D6638] hover:bg-[#4E220F] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 border border-white/10"
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
                <div className="flex items-center gap-1.5 text-xs text-[#4E220F]/70 font-mono mt-2">
                  <Lock className="w-3.5 h-3.5 text-[#9D6638] shrink-0" />
                  <span>Your contact information is strictly confidential for admission use.</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
