import { CampusFacility } from "@/types";

export const CAMPUS_FACILITIES: CampusFacility[] = [
  {
    id: "smart-classrooms",
    slug: "smart-classrooms",
    title: "Interactive Smart Classrooms",
    category: "Academic",
    headline: "Digitally empowered interactive lecture studios with 4K touch panels.",
    description: "Every classroom from Primary to Senior Secondary is equipped with high-definition digital smart boards, acoustic paneling, ergonomic modular seating, and high-speed campus intranet.",
    specifications: [
      "75-inch Ultra HD Interactive Flat Panels",
      "Comprehensive digital syllabus 3D simulations & AR animations",
      "Ergonomically designed dual desks with posture support",
      "Energy-efficient climate control and natural daylit ventilation"
    ],
    image: "/images/school-building.png",
    badge: "Next-Gen Learning"
  },
  {
    id: "science-laboratories",
    slug: "science-laboratories",
    title: "Advanced Composite & Science Labs",
    category: "Technology",
    headline: "Separate cutting-edge Physics, Chemistry, and Biology research laboratories.",
    description: "Built to international safety benchmarks, our labs allow students to transition from textbook theory to tactile empirical validation with precision apparatus and digital sensors.",
    specifications: [
      "Over 40 individual experiment workstations per lab",
      "Fume hoods, emergency eye-wash stations and fire-suppression units",
      "High-power binocular optical microscopes and digital sensors",
      "Dedicated botanical herbarium and anatomical models"
    ],
    image: "/images/science-lab.jpg",
    badge: "Empirical Rigor"
  },
  {
    id: "atal-tinkering-lab",
    slug: "atal-tinkering-lab",
    title: "Atal Tinkering Lab & Robotics Hub",
    category: "Technology",
    headline: "NITI Aayog-supported innovation lab with 3D printers, IoT kits & drone workshops.",
    description: "Where future engineers, software architects, and inventors build prototypes. Students program microcontrollers, assemble autonomous robots, and develop AI models.",
    specifications: [
      "Industrial-grade dual-extrusion 3D Printers & Laser Cutters",
      "Arduino, Raspberry Pi, ESP32, and sensor arrays",
      "Drone assembly kits, electronics soldering benches",
      "National Robotics Olympiad mentorship zone"
    ],
    image: "/images/computer-lab.jpg",
    badge: "AI & Innovation"
  },
  {
    id: "knowledge-resource-center",
    slug: "knowledge-resource-center",
    title: "Central Library & Digital Commons",
    category: "Academic",
    headline: "Over 15,000 curated titles, academic journals, and automated digital lending.",
    description: "A sanctuary of quiet study, intellectual reflection, and literary exploration. Features an expansive open-access stack, quiet study carrels, and Kindle e-reader stations.",
    specifications: [
      "15,000+ fiction, non-fiction, encyclopaedias and reference volumes",
      "Subscription to 30+ national research journals, magazines, and newspapers",
      "Automated Koha barcode LMS for swift book reservations",
      "Audiobook listening lounge and digital research stations"
    ],
    image: "/images/library.jpg",
    badge: "15,000+ Volumes"
  },
  {
    id: "sports-complex",
    slug: "sports-complex",
    title: "Sports Pavilion & Athletic Arenas",
    category: "Sports",
    headline: "Multi-sport arenas covering Cricket, Basketball, Volleyball, Badminton & Athletics.",
    description: "Physical conditioning and sportsmanship are foundational to DAV culture. Our campus features a regulation cricket turf pitch, synthetic basketball court, skating rink, and indoor table tennis hall.",
    specifications: [
      "Full-size grass sports oval with turf cricket nets",
      "FIBA-standard all-weather outdoor Basketball Court",
      "Speed skating track and roller hockey practice rink",
      "Certified NIS coaches for Athletics, Taekwondo, and Yoga"
    ],
    image: "/images/sports-ground.jpg",
    badge: "Athletic Excellence"
  },
  {
    id: "performing-arts-auditorium",
    slug: "performing-arts-auditorium",
    title: "Maharshi Dayanand Yajnashala & Hall",
    category: "Cultural",
    headline: "Acoustically treated amphitheatre & sacred Yajnashala for ceremonies.",
    description: "The vibrant heart of school festivals, theatrical productions, classical music recitals, inter-school debates, and morning Vedic Havans.",
    specifications: [
      "800-seat tiered acoustic auditorium with motorized stage drapery",
      "Line-array professional sound system and dynamic theatrical lighting",
      "Green rooms and backstage makeup wings",
      "Vedic Yajnashala pavilion for daily morning Havans and sacred mantras"
    ],
    image: "/images/yajnashala-havan.jpg",
    badge: "Sacred Yajnashala & Hall"
  },
  {
    id: "campus-safety-transport",
    slug: "campus-safety-transport",
    title: "Campus Security & GPS Fleet",
    category: "Safety",
    headline: "24/7 CCTV surveillance, biometric access, infirmary, and GPS-tracked school buses.",
    description: "Parental peace of mind is paramount. Every corner of the campus is under round-the-clock surveillance, with trained medical staff in the school infirmary and GPS tracking on all transit routes.",
    specifications: [
      "120+ high-resolution HD CCTV cameras covering all indoor & outdoor zones",
      "RFID student attendance notifications delivered to parents",
      "Fleet of GPS & CCTV-fitted school buses covering Batala, Qilla Mandi and rural perimeters",
      "Full-time resident medical nurse and on-call paediatrician"
    ],
    image: "/images/independence-day.jpg",
    badge: "Child Safe & Certified"
  }
];
