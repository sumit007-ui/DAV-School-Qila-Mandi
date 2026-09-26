export interface DefaultWebsitePhoto {
  url: string;
  title: string;
  page: string;
  section: string;
}

export const DEFAULT_WEBSITE_PHOTOS: Record<string, DefaultWebsitePhoto> = {
  home_hero: {
    url: "/images/school-building.png",
    title: "Cinematic Hero Background",
    page: "Home Page",
    section: "Hero Section Top",
  },
  home_principal: {
    url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    title: "Principal Perspective Portrait",
    page: "Home Page",
    section: "Principal Message Section",
  },
  about_campus: {
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
    title: "Historic Campus & Grounds",
    page: "About Page",
    section: "Institutional Genesis",
  },
  journey_early_years: {
    url: "/images/pre-primary.jpg",
    title: "Stage 01: Early Years (Kindergarten)",
    page: "Learning Journey",
    section: "Nursery to UKG Wing",
  },
  journey_primary: {
    url: "/images/primary-school.jpg",
    title: "Stage 02: Primary Wing (Classes 1–5)",
    page: "Learning Journey",
    section: "Primary Education Wing",
  },
  journey_middle: {
    url: "/images/middle-school.jpg",
    title: "Stage 03: Middle Wing (Classes 6–8)",
    page: "Learning Journey",
    section: "Middle School Stage",
  },
  journey_secondary: {
    url: "/images/secondary-school.jpg",
    title: "Stage 04: Secondary Transition (Class 9)",
    page: "Learning Journey",
    section: "High School Transition",
  },
  journey_board: {
    url: "/images/ethos-learning.jpg",
    title: "Stage 05: Class 10 PSEB Board Distinction",
    page: "Learning Journey",
    section: "Board Excellence Wing",
  },
  facility_computer_lab: {
    url: "/images/computer-lab.jpg",
    title: "Modern Computer Lab & Smart Lab",
    page: "Facilities",
    section: "Campus Laboratories",
  },
  facility_science_lab: {
    url: "/images/science-lab.jpg",
    title: "Composite Science Laboratory",
    page: "Facilities",
    section: "Campus Laboratories",
  },
  facility_library: {
    url: "/images/library.jpg",
    title: "Central School Library",
    page: "Facilities",
    section: "Academic Sanctuaries",
  },
  facility_sports: {
    url: "/images/sports-ground.jpg",
    title: "Cricket Pitch & Martial Arts Dojo",
    page: "Facilities",
    section: "Sports & Conditioning",
  },
  facility_yajnashala: {
    url: "/images/yajnashala-havan.jpg",
    title: "Sacred Yajnashala & Havan Shala",
    page: "Vedic Heritage",
    section: "Spiritual & Ethical Life",
  },
  facility_cultural: {
    url: "/images/bhangra-giddha.jpg",
    title: "Bhangra, Giddha & Cultural Jubilees",
    page: "Student Life",
    section: "Arts & Performing Wing",
  },
  facility_patriotic: {
    url: "/images/independence-day.jpg",
    title: "Patriotic Celebrations & Flag Hoisting",
    page: "Student Life",
    section: "National Pride",
  },
  facility_vedic: {
    url: "/images/vedic-values.jpg",
    title: "Vedic Values & Moral Education",
    page: "Student Life",
    section: "Dharma Shiksha",
  }
};
