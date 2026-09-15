import { SchoolEvent } from "@/types";

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: "parent-orientation-2026",
    slug: "parent-orientation-and-open-house-2026",
    title: "Open House & Parent-Teacher Conclave 2026",
    category: "Parent Conclave",
    startDate: "September 12, 2026",
    time: "9:00 AM – 1:30 PM",
    venue: "Main Campus & Maharshi Dayanand Hall",
    description: "An exclusive opportunity for parents to interact with subject educators, review academic assessments, inspect advanced laboratory upgrades, and explore personalized mentoring roadmaps.",
    highlights: [
      "One-on-one progress consultation with class mentors",
      "Live demonstrations in Atal Tinkering & Robotics Lab",
      "Interactive session with Principal Mrs. Paramjit Kaur",
      "Admissions desk for 2026-27 session queries"
    ],
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: "annual-athletic-meet-2026",
    slug: "annual-inter-house-athletic-meet-2026",
    title: "36th Annual Inter-House Athletic & Sports Championship",
    category: "Sports",
    startDate: "October 18-19, 2026",
    time: "8:30 AM – 4:00 PM",
    venue: "School Sports Complex & Athletic Oval",
    description: "Two action-packed days of track and field spectacles where Bose, Azad, Bhagat, and Patel Houses battle for the prestigious Championship Shield.",
    highlights: [
      "March past and torch lighting ceremony",
      "100m, 200m, 400m, 4x100m relay, long jump and shot put",
      "Yoga and martial arts synchronized display by Primary scholars",
      "Grand award ceremony and rolling trophy handover"
    ],
    isUpcoming: true,
    registrationOpen: false
  },
  {
    id: "pratibha-annual-cultural-day",
    slug: "pratibha-annual-cultural-day-2026",
    title: "‘Pratibha’: Annual Cultural Extravaganza & Theatrical Gala",
    category: "Cultural",
    startDate: "November 21, 2026",
    time: "4:30 PM – 8:30 PM",
    venue: "Maharshi Dayanand Auditorium",
    description: "A breathtaking celebration of Indian classical music, theatrical drama, folk dances of Punjab, and orchestral symphonies presented by over 500 student artists.",
    highlights: [
      "Musical drama on Vedic heritage and modern national pioneers",
      "Classical fusion orchestra by student musicians",
      "Felicitations of academic and sports achievers",
      "Address by eminent DAVCMC dignitaries"
    ],
    isUpcoming: true,
    registrationOpen: true
  },
  {
    id: "inter-school-science-symposium",
    slug: "inter-school-science-and-math-symposium-2026",
    title: "Gurdaspur District Science & Math Olympiad Symposium",
    category: "Academic",
    startDate: "December 05, 2026",
    time: "9:30 AM – 3:30 PM",
    venue: "Science Wing & Conference Suites",
    description: "Hosting 30+ schools across Punjab for competitive mathematical problem-solving, live scientific experiments, and computer algorithms challenge.",
    highlights: [
      "Live speed-math & puzzle rounds",
      "Chemistry and Physics empirical bench tests",
      "Coding hackathon for senior secondary students",
      "Cash scholarships and trophies for top 3 teams"
    ],
    isUpcoming: true,
    registrationOpen: true
  }
];
