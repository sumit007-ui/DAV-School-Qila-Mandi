export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export interface AcademicProgram {
  id: string;
  slug: string;
  level: string; // "Early Years", "Primary", "Middle School", "Secondary", "Senior Secondary"
  classes: string; // e.g. "Nursery - UKG", "Class I - V", "Class VI - VIII", "Class IX - X", "Class XI - XII"
  tagline: string;
  description: string;
  keyFeatures: string[];
  subjects: string[];
  streams?: string[]; // For Senior Secondary
  image: string;
  accentColor?: string;
}

export interface CampusFacility {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Sports" | "Technology" | "Cultural" | "Safety" | "Wellness";
  headline: string;
  description: string;
  specifications: string[];
  image: string;
  badge?: string;
}

export interface AcademicTopper {
  name: string;
  score: string;
  streamOrGrade: string;
  year: string;
  testimonial: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: "Academics" | "Sports" | "Co-Curricular" | "Olympiad" | "Faculty";
  year: string;
  studentOrTeam: string;
  classOrGrade?: string;
  description: string;
  badge?: string;
  image?: string;
}

export interface NewsStory {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Campus Life" | "Celebration" | "Achievements" | "Announcement";
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
  image: string;
  featured?: boolean;
}

export interface SchoolEvent {
  id: string;
  slug: string;
  title: string;
  category: "Academic" | "Sports" | "Cultural" | "Parent Conclave" | "Admissions";
  startDate: string;
  time: string;
  venue: string;
  description: string;
  highlights: string[];
  isUpcoming: boolean;
  registrationOpen?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus & Architecture" | "Academic Life" | "Sports & Athletics" | "Cultural & Arts" | "Science & Robotics";
  imageUrl: string;
  alt: string;
  year?: string;
  caption?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  relationship: "Parent" | "Alumnus" | "Student" | "Educator";
  detail: string; // e.g. "Parent of Aarav (Class VIII)", "Alumnus (Batch 2021, IIT Delhi)"
  avatar?: string;
  highlight?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "Admissions" | "Academics" | "Campus & Safety" | "Transport & Fees";
}

export interface AdmissionStep {
  stepNumber: string;
  title: string;
  description: string;
  deliverables: string[];
}
