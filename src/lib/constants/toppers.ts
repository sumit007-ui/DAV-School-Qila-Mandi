export interface AcademicTopper {
  id: string;
  name: string;
  score: string;
  exam: string;
  year: string;
  rank?: string;
  badge_text?: string;
  distinctions?: string;
  testimonial?: string;
  parent_info?: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_TOPPERS: AcademicTopper[] = [
  {
    id: "top-1",
    name: "Simranjit Kaur",
    score: "98.4%",
    exam: "PSEB Class 10 Board",
    year: "2024",
    rank: "District Merit · Batala Topper",
    badge_text: "TOPPER OF BATALA",
    distinctions: "Mathematics 100/100 · Science 99/100 · Punjabi 98/100",
    testimonial: "The individual teacher guidance and weekly pre-board mock tests at DAV Qila Mandi helped me build concepts without any private tuition.",
    parent_info: "D/o S. Gurmeet Singh & Smt. Baljit Kaur (Mandi Road, Batala)",
    image_url: "/images/secondary-school.jpg",
    display_order: 1,
    is_active: true,
  },
  {
    id: "top-2",
    name: "Harmanpreet Singh",
    score: "97.6%",
    exam: "PSEB Class 10 Board",
    year: "2024",
    rank: "District Rank 3 · Mathematics Distinction",
    badge_text: "DISTINCTION MERIT",
    distinctions: "Mathematics 100/100 · English 98/100 · Social Science 97/100",
    testimonial: "Teachers were always approachable after class for doubt clearance. The school environment gives equal weightage to character and marks.",
    parent_info: "S/o S. Manmohan Singh & Smt. Kamaljit Kaur (Urban Estate, Batala)",
    image_url: "/images/ethos-learning.jpg",
    display_order: 2,
    is_active: true,
  },
  {
    id: "top-3",
    name: "Bhavya Sharma",
    score: "96.8%",
    exam: "PSEB Class 10 Board",
    year: "2024",
    rank: "Academic Excellence Award",
    badge_text: "DISTINCTION MERIT",
    distinctions: "Science 99/100 · Hindi 98/100 · Mathematics 97/100",
    testimonial: "Practical science lab experiments and regular revision sessions helped me stay completely stress-free during the PSEB board exams.",
    parent_info: "D/o Sh. Ramesh Sharma & Smt. Sunita Sharma (Qila Mandi, Batala)",
    image_url: "/images/pre-primary.jpg",
    display_order: 3,
    is_active: true,
  },
  {
    id: "top-4",
    name: "Navjot Singh Bajwa",
    score: "95.8%",
    exam: "PSEB Class 10 Board",
    year: "2024",
    rank: "All-Rounder Distinction Award",
    badge_text: "MERIT HOLDER",
    distinctions: "Social Science 98/100 · Punjabi 98/100 · IT 96/100",
    testimonial: "Balancing district sports tournaments with Class 10 board preparation was possible only because the teachers gave extra time and care.",
    parent_info: "S/o S. Hardeep Singh Bajwa (Kahnuwan Road, Batala)",
    image_url: "/images/middle-school.jpg",
    display_order: 4,
    is_active: true,
  }
];
