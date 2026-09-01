import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject is required"),
  category: z.enum(["General Enquiry", "Admissions", "Fee & Accounts", "Transport", "Careers / Faculty", "Principal Office"]).default("General Enquiry"),
  message: z.string().min(10, "Please provide at least 10 characters in your message"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
