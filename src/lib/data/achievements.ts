import { AcademicTopper, Achievement } from "@/types";

export const ACADEMIC_TOPPERS: AcademicTopper[] = [
  {
    name: "Gurleen Kaur",
    score: "98.6%",
    streamOrGrade: "Class X PSEB Board • District Rank 1",
    year: "2024–25",
    testimonial: "The rigorous concept clarity sessions and continuous mock series by our teachers at DAV Qilla Mandi gave me total confidence for the board examinations."
  },
  {
    name: "Arjan Singh Bedi",
    score: "98.2%",
    streamOrGrade: "Class X PSEB Board • 100/100 Mathematics",
    year: "2024–25",
    testimonial: "Science and computer laboratory practicals with hands-on problem-solving sharpened my analytical thinking beyond traditional textbook learning."
  },
  {
    name: "Navjot Kaur",
    score: "97.8%",
    streamOrGrade: "Class X PSEB Board • 100/100 Science",
    year: "2024–25",
    testimonial: "The balance of morning Vedic prayers, daily sports discipline, and faculty mentorship created the perfect environment to excel."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "pseb-board-class10-2025",
    title: "100% Pass Percentage in PSEB Class X with 38 Students Scoring 95%+",
    category: "Academics",
    year: "2025",
    studentOrTeam: "Class X PSEB Batch 2024-25",
    classOrGrade: "Class X",
    description: "Dr. MRS Bhalla DAV High School Qilla Mandi set a district benchmark with 100% first divisions and district top positions in PSEB Class 10 Board Examinations.",
    badge: "District Rank 1",
    image: "/images/ethos-learning.jpg"
  },
  {
    id: "nso-gold-2025",
    title: "International Gold Medalist at National Science Olympiad (SOF)",
    category: "Olympiad",
    year: "2025",
    studentOrTeam: "Master Tanmay Sharma",
    classOrGrade: "Class X",
    description: "Tanmay clinched International Rank 3 and a Gold Medal of Excellence in the SOF National Science Olympiad among participating students across 14 countries.",
    badge: "International Rank 3",
    image: "/images/science-lab.jpg"
  },
  {
    id: "dav-national-sports-2024",
    title: "Overall Champions at Inter-DAV National Athletic Meet",
    category: "Sports",
    year: "2024",
    studentOrTeam: "DAV Qilla Mandi Athletic Contingent",
    classOrGrade: "Under-17 Team",
    description: "Our athletics team bagged 8 Gold, 5 Silver, and 4 Bronze medals at the National Inter-DAV Games, clinching the overall rolling trophy.",
    badge: "National Champions",
    image: "/images/sports-champions.jpg"
  },
  {
    id: "atal-innovation-marathon",
    title: "Top 50 Innovator at Atal Marathon National Robotics Showcase",
    category: "Co-Curricular",
    year: "2024",
    studentOrTeam: "Robo-Innovators Club (Gurleen & Harjot)",
    classOrGrade: "Class 10",
    description: "Designed a solar-powered smart irrigation sensor system for rural Punjab farmers, selected by NITI Aayog among India's top 50 student prototypes.",
    badge: "NITI Aayog Top 50",
    image: "/images/stem-robotics.jpg"
  },
  {
    id: "inter-school-debate",
    title: "Best Delegation Award at Punjab State Youth Parliament & Debate",
    category: "Co-Curricular",
    year: "2024",
    studentOrTeam: "DAV Orators Forum",
    classOrGrade: "Class IX - X",
    description: "Our student debaters swept the Best Speaker and Best Delegation awards across three rounds debating sustainable economic policies and AI ethics.",
    badge: "Best Delegation",
    image: "/images/independence-day.jpg"
  },
  {
    id: "state-taekwondo",
    title: "State Gold Medal in Punjab Sub-Junior Taekwondo Championship",
    category: "Sports",
    year: "2025",
    studentOrTeam: "Kumari Simranpreet Kaur",
    classOrGrade: "Class VII",
    description: "Simranpreet won gold in the U-14 category and has been selected to represent Punjab in the National School Games.",
    badge: "State Gold",
    image: "/images/sports-ground.jpg"
  }
];
