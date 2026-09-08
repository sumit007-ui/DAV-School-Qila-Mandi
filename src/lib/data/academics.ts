import { AcademicProgram } from "@/types";

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  {
    id: "nursery-early-years",
    slug: "nursery-early-years",
    level: "Nursery & Early Years",
    classes: "Pre-Nursery, Nursery, LKG & UKG",
    tagline: "Early learning, curiosity, confidence and foundational development.",
    description: "Our early childhood program is designed around play-based and multisensory learning. We create a warm, nurturing environment where young children discover the joy of language, numbers, art, and social interaction.",
    keyFeatures: [
      "Joyful play-based sensory zones",
      "Phonics & early literacy circle time",
      "Gross & fine motor development ateliers",
      "Vedic moral stories & morning prayers",
      "Child wellness & safety support"
    ],
    subjects: [
      "Early English & Phonics",
      "Foundational Numeracy & Patterns",
      "Nature & Environmental Wonder",
      "Visual Arts & Craft Work",
      "Music, Rhymes & Movement"
    ],
    image: "/images/pre-primary.jpg",
    accentColor: "#9D6638"
  },
  {
    id: "primary-school",
    slug: "primary-school",
    level: "Primary School",
    classes: "Classes 1 to 5 (Ages 6 to 11)",
    tagline: "Strong fundamentals, exploration and joyful learning.",
    description: "In the primary years, children build rock-solid foundational literacy, mathematical reasoning, and scientific curiosity. We cultivate expressive communication, empathy, and collaborative teamwork.",
    keyFeatures: [
      "Integrated STEM & experimental science",
      "Spoken English & public reading hours",
      "Daily library discovery sessions",
      "Vedic moral education & character values",
      "Introductory computer science & digital literacy"
    ],
    subjects: [
      "English Language & Literature",
      "Mathematics & Mental Math",
      "Environmental Studies (EVS)",
      "Hindi & Punjabi Languages",
      "Computer Science & Logic",
      "Art, Music & Value Education"
    ],
    image: "/images/primary-school.jpg",
    accentColor: "#9D6638"
  },
  {
    id: "middle-school",
    slug: "middle-school",
    level: "Middle School",
    classes: "Classes 6 to 8 (Ages 11 to 14)",
    tagline: "Independent thinking, discovery and broader academic development.",
    description: "Middle schoolers expand their analytical horizons through specialized subject labs, robotics workshops, and competitive team challenges, building self-discipline and intellectual curiosity.",
    keyFeatures: [
      "Hands-on Physics, Chemistry & Biology lab experiments",
      "Robotics, Scratch coding & Atal Tinkering Hub",
      "Inter-house debates & quiz tournaments",
      "Structured sports coaching (Cricket, Badminton, Athletics)",
      "Vocational arts & Sanskrit language introduction"
    ],
    subjects: [
      "English Core & Communication",
      "Mathematics & Practical Geometry",
      "General Science (Physics, Chem, Bio)",
      "Social Sciences (History, Civics, Geography)",
      "Regional Languages (Hindi / Punjabi) & Sanskrit",
      "ICT & Computer Applications"
    ],
    image: "/images/middle-school.jpg",
    accentColor: "#4E220F"
  },
  {
    id: "secondary-school",
    slug: "secondary-school",
    level: "Secondary School (Class 9)",
    classes: "Class 9 (PSEB Preparatory)",
    tagline: "Deeper subject understanding, discipline and personal growth.",
    description: "Class 9 establishes high-level academic mastery in core PSEB disciplines while mentoring students in time management, analytical problem-solving, and emotional resilience.",
    keyFeatures: [
      "Intensive PSEB syllabus alignment",
      "National Science Olympiad & NTSE mentorship",
      "Dedicated laboratory practicals & demonstrations",
      "Personalized academic tutoring & feedback",
      "Leadership roles in school clubs and houses"
    ],
    subjects: [
      "English Language & Literature",
      "Mathematics (Standard & Advanced Problem Solving)",
      "Science (Physics, Chemistry, Biology Practicals)",
      "Social Science (History, DP, Geography, Economics)",
      "Hindi / Punjabi Language",
      "Information Technology"
    ],
    image: "/images/secondary-school.jpg",
    accentColor: "#4E220F"
  },
  {
    id: "class-10",
    slug: "class-10",
    level: "Class 10 (Board Milestone)",
    classes: "Class 10 (PSEB Board Examination)",
    tagline: "Academic preparation, confidence, responsibility and future readiness.",
    description: "The capstone year of our school experience. We provide rigorous board examination preparation, regular mock test series, stress management workshops, and career stream guidance for the next chapter of education.",
    keyFeatures: [
      "Comprehensive PSEB Board mock series & remedial clinics",
      "100% distinction track record and top rank mentorship",
      "Guidance & counselling for higher secondary stream selection",
      "Pre-exam motivation & emotional wellbeing sessions",
      "Graduation ceremony & alumni network induction"
    ],
    subjects: [
      "English Core",
      "Mathematics (Standard / Basic)",
      "Science with Practical Labs",
      "Social Science & Economics",
      "Second Language (Hindi / Punjabi)",
      "Information Technology (Code 402)"
    ],
    image: "/images/secondary-school.jpg",
    accentColor: "#4E220F"
  }
];
