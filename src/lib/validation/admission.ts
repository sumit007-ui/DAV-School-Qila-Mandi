import { z } from "zod";

export const admissionEnquirySchema = z.object({
  parentName: z.string().min(2, "Parent/Guardian name must be at least 2 characters"),
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  gradeApplying: z.string().min(1, "Please select the class seeking admission for"),
  streamApplying: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Please enter a valid email address"),
  cityOrArea: z.string().min(2, "Please enter your city/locality"),
  preferredContact: z.enum(["Phone", "WhatsApp", "Email"]).default("Phone"),
  message: z.string().optional(),
});

export type AdmissionEnquiryFormData = z.infer<typeof admissionEnquirySchema>;
