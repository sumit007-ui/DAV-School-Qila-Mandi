import { AdmissionStep, FAQItem } from "@/types";

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: "01",
    title: "Digital Enquiry / Registration",
    description: "Submit the online admission enquiry or visit our campus reception to collect the Registration Prospectus kit.",
    deliverables: [
      "Fill student and parent biodata",
      "Select applying class (Nursery to Class 10)",
      "Receive unique registration acknowledgement ID"
    ]
  },
  {
    stepNumber: "02",
    title: "Campus Visit & Child Interaction",
    description: "An informal, encouraging interaction for prospective scholars and parents to experience our campus, laboratories, and culture.",
    deliverables: [
      "Playful verbal interaction for Pre-Primary applicants",
      "Basic foundational review (Class 1 upwards)",
      "Guided tour of smart classrooms, science labs, and sports grounds"
    ]
  },
  {
    stepNumber: "03",
    title: "Document Verification",
    description: "Verification of foundational certificates to confirm admission eligibility as per CBSE & state guidelines.",
    deliverables: [
      "Original Transfer Certificate (TC) & previous report card",
      "Attested copy of Municipal Birth Certificate",
      "Aadhaar Card copies of student and parents",
      "4 recent passport size photographs"
    ]
  },
  {
    stepNumber: "04",
    title: "Enrollment & Orientation",
    description: "Finalize registration with fee remittance, receive parent portal login, book list, uniform schedule, and bus route.",
    deliverables: [
      "Student ID & Parent App access",
      "School bus route allocation",
      "Academic calendar & welcome kit"
    ]
  }
];

export const ADMISSION_FAQS: FAQItem[] = [
  {
    category: "Admissions",
    question: "What classes are offered at DAV Public School Qilla Mandi?",
    answer: "Our school provides a comprehensive educational journey from Nursery (Early Childhood / Pre-Primary) up to Class 10, affiliated with the Central Board of Secondary Education (CBSE), New Delhi."
  },
  {
    category: "Admissions",
    question: "What is the minimum age criterion for Nursery and Kindergarten admissions for 2026-27?",
    answer: "As per NEP 2020 and CBSE norms, the child must be 3+ years of age as of March 31, 2026 for Nursery. For LKG, 4+ years; for UKG, 5+ years; and for Class 1, 6+ years as of March 31, 2026."
  },
  {
    category: "Academics",
    question: "What is the teacher-to-student ratio and classroom environment?",
    answer: "We maintain a student-to-teacher ratio of approximately 1:22. All classrooms are smart-enabled with digital interactive screens, ergonomic desks, and child-safe ventilation."
  },
  {
    category: "Campus & Safety",
    question: "How is campus safety and transport managed for younger children?",
    answer: "The 12-acre campus is secured with 120+ CCTV cameras, female attendants on all school buses, dedicated junior washroom facilities, and a fully staffed infirmary with on-duty nurse."
  },
  {
    category: "Transport & Fees",
    question: "How is the fee structured and paid?",
    answer: "Fees are structured transparently without hidden charges or capitation levies. Payments can be completed quarterly via our secure online portal, UPI, or at the school counter."
  }
];

export const ELIGIBILITY_CRITERIA = [
  { class: "Pre-Nursery", age: "2.5 to 3.5 Years", criteria: "Informal interaction & social readiness" },
  { class: "Nursery", age: "3+ Years as on 31st March 2026", criteria: "Age verification & cheerful interaction" },
  { class: "LKG & UKG", age: "4+ & 5+ Years as on 31st March 2026", criteria: "Foundational interaction & motor coordination" },
  { class: "Classes 1 to 5", age: "6+ to 10+ Years", criteria: "Previous class progress report & basic interaction" },
  { class: "Classes 6 to 8", age: "11+ to 13+ Years", criteria: "Aptitude check in English & Math, previous report card" },
  { class: "Classes 9 & 10", age: "14+ & 15+ Years", criteria: "CBSE registration transfer & previous academic record" }
];
