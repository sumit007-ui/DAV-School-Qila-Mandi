# DAV Public School — Premium UI/UX Design System & Master Page Specification
**Document Version:** 2.0.0 | **Design Paradigm:** Editorial Heritage & Modern Academic Luxury  
**Target Audience:** UI/UX Designers, Product Designers, Design Technologists, Frontend Engineers  
**Project:** DAV Public School, Qilla Mandi, Batala (Nursery to Class 10 CBSE Institution)

---

## 1. Executive Design Vision & Core Philosophy

### 1.1 Brand Identity & Design Concept: *"Editorial Prestige & Modern Heritage"*
The design aesthetic transcends standard template school websites by fusing **timeless academic prestige (Oxford/Vedic heritage)** with **contemporary digital luxury**. It embraces generous whitespace, refined typography, tactile micro-textures, rich contrast, and purposeful micro-interactions.

* **Emotional Resonance:** Trustworthy, aspirational, disciplined, nurturing, culturally rooted yet future-facing.
* **Target Personas:**
  1. **Prospective Parents (Primary Decision Makers):** Seeking academic excellence, modern safety, holistic character development, and seamless admission guidance.
  2. **Current Students & Parents:** Seeking timely notices, curriculum guides, event schedules, and achievement celebrations.
  3. **Alumni & Community Stakeholders:** Seeking pride of association, heritage recognition, and legacy updates.
  4. **Regulatory / CBSE Auditors:** Seeking instant, transparent access to mandatory disclosures and compliance documentation.

---

## 2. Design System Tokens & Foundation

### 2.1 Color Palette Architecture

```
                    ┌─────────────────────────┐
                    │     PRIMARY COLORS      │
                    ├─────────────────────────┤
                    │ Deep Navy  (#0A192F)    │
                    │ Pure Cream (#FBF9F4)    │
                    │ Burnished Gold (#C99B23)│
                    └─────────────────────────┘
```

#### Primary Palette
| Token Name | Hex Code | RGB | HSL | Usage & Context |
| :--- | :--- | :--- | :--- | :--- |
| `navy-950` | `#050C17` | `5, 12, 23` | `217°, 64%, 5%` | Ultra-dark surfaces, footer backgrounds, hero overlays |
| `navy-900` | `#0A192F` | `10, 25, 47` | `216°, 65%, 11%` | Primary text, header bars, card headers, high-contrast surfaces |
| `navy-800` | `#102236` | `16, 34, 54` | `212°, 54%, 14%` | Card backgrounds in dark sections, dropdown menus |
| `navy-700` | `#1A2E44` | `26, 46, 68` | `211°, 45%, 18%` | Hover states on dark elements, subtle borders |
| `navy-500` | `#334E68` | `51, 78, 104` | `209°, 34%, 30%` | Secondary body text on light backgrounds |
| `navy-100` | `#D9E2EC` | `217, 226, 236`| `212°, 33%, 89%` | Light tint borders, subtle card outlines |
| `navy-50`  | `#F0F4F8` | `240, 244, 248`| `210°, 33%, 96%` | Light section alternations, badge backgrounds |

#### Accent & Metal Palette (Gold & Warmth)
| Token Name | Hex Code | RGB | HSL | Usage & Context |
| :--- | :--- | :--- | :--- | :--- |
| `gold-500` | `#C99B23` | `201, 155, 35` | `43°, 70%, 46%` | Primary CTA accents, badges, key stat highlights, active tabs |
| `gold-600` | `#A87C14` | `168, 124, 20` | `42°, 79%, 37%` | CTA hover states, dark mode accents |
| `gold-400` | `#E2BA48` | `226, 186, 72` | `44°, 74%, 58%` | Sub-headings on dark backgrounds, glowing borders |
| `gold-100` | `#FAF3DB` | `250, 243, 219`| `46°, 74%, 92%` | Pill badges, highlight chip backgrounds |
| `gold-50`  | `#FDFBF4` | `253, 251, 244`| `47°, 69%, 97%` | Warm hero cards, callout containers |

#### Neutral & Background Palette (Cream & Editorial Paper)
| Token Name | Hex Code | RGB | HSL | Usage & Context |
| :--- | :--- | :--- | :--- | :--- |
| `background` | `#FBF9F4` | `251, 249, 244`| `43°, 44%, 97%` | Default light page background (warm editorial ivory) |
| `cream-100`  | `#F8F3EA` | `248, 243, 234`| `39°, 47%, 95%` | Alternate section background, table row stripes |
| `cream-200`  | `#EFE5D3` | `239, 229, 211`| `39°, 48%, 88%` | Card borders, divider rules, subtle separators |
| `cream-300`  | `#E3D3B8` | `227, 211, 184`| `38°, 45%, 81%` | Input borders, elevated box shadows |

#### Accent Crimson (Heritage & Urgency)
| Token Name | Hex Code | Usage & Context |
| :--- | :--- | :--- |
| `crimson-500` | `#8E1B29` | Urgent announcement pill, key deadlines, Vedic heritage badges |
| `crimson-600` | `#75121E` | Alert states, critical CBSE notice flags |

---

### 2.2 Typography Scale & Rules

```
Serif (Headings):      Instrument Serif / Cormorant Garamond  (Editorial, Prestigious)
Sans-Serif (Body/UI):  Plus Jakarta Sans                     (Modern, Crisp, Ultra-Legible)
Monospace / Numbers:   Space Grotesk                          (Affiliation codes, Stats, Badges)
```

| Type Role | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Instrument Serif` | `72px / 44px` | Regular (400) | `1.05` | `-0.03em` |
| **H1 Section Hero** | `Instrument Serif` | `56px / 36px` | Regular (400) | `1.1` | `-0.025em` |
| **H2 Section Title** | `Instrument Serif` | `40px / 28px` | Regular (400) / Italic | `1.15` | `-0.02em` |
| **H3 Card Title** | `Plus Jakarta Sans` | `22px / 18px` | SemiBold (600) | `1.3` | `-0.01em` |
| **H4 Sub-Heading** | `Plus Jakarta Sans` | `18px / 16px` | Medium (500) | `1.4` | `0` |
| **Body Large** | `Plus Jakarta Sans` | `18px / 16px` | Regular (400) | `1.65` | `0` |
| **Body Regular** | `Plus Jakarta Sans` | `15px / 14px` | Regular (400) | `1.6` | `0` |
| **Small / Caption** | `Plus Jakarta Sans` | `13px / 12px` | Medium (500) | `1.5` | `+0.01em` |
| **Overline / Badge** | `Space Grotesk` | `11px / 10px` | Bold (700) | `1.2` | `+0.12em (ALL CAPS)` |
| **Stat Numbers** | `Instrument Serif` | `64px / 42px` | Regular (400) | `1.0` | `-0.02em` |

---

### 2.3 Spatial System & Grid Layout
* **Base Unit:** 4px / 8px scale (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`, `128px`).
* **Container Max Widths:**
  * Standard Content: `1280px` (`max-w-7xl`)
  * Wide Editorial Canvas: `1408px` (`max-w-8xl` / `max-w-9xl`)
  * Reading / Article Width: `768px` to `896px` (`max-w-3xl` to `max-w-4xl`)
* **Responsive Breakpoints:**
  * `sm`: `640px` (Mobile landscape)
  * `md`: `768px` (Tablets portrait)
  * `lg`: `1024px` (Tablets landscape / small laptops)
  * `xl`: `1280px` (Standard desktop)
  * `2xl`: `1536px` (Large displays)
* **Corner Radius (Border-Radius System):**
  * Small Badges/Inputs: `8px` (`rounded-lg`)
  * Interactive Cards/Buttons: `12px` to `16px` (`rounded-xl` to `rounded-2xl`)
  * Feature Hero Modals/Hero Cards: `24px` to `32px` (`rounded-3xl`)
  * Circular Elements/Pills: `9999px` (`rounded-full`)

---

### 2.4 Tactile Details, Textures & Elevation
1. **Editorial Grain:** Subtle radial dot grain `radial-gradient(rgba(10, 25, 47, 0.035) 1px, transparent 0)` across cream surfaces for high-end paper tactile feel.
2. **Gold Foil Shimmer:** Used on primary CTAs (`gold-500` with subtle ambient radial glow).
3. **Glassmorphism / Frosted Backdrop:**
   * Light Glass: `background: rgba(251, 249, 244, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(227, 211, 184, 0.5)`
   * Dark Luxury Glass: `background: rgba(10, 25, 47, 0.88); backdrop-filter: blur(20px); border: 1px solid rgba(201, 155, 35, 0.18)`

---

## 3. Global Navigation & Layout Architecture

### 3.1 Global Header & Announcement Ecosystem
1. **Top Emergency / CBSE Ticker Bar:**
   * Height: `38px`
   * Dark navy (`#050C17`) background with gold text and subtle pulsing admission badge.
   * Content: CBSE Affiliation No. `1630182`, Admissions for 2026–2027 Open, Call Helpline `+91 98765 43210`.
2. **Floating Editorial Navbar:**
   * Sticky with smooth backdrop blur upon scrolling (`scrollY > 30px`).
   * **Left:** DAV Crest & School Typography hierarchy (DAV Public School • Qilla Mandi, Batala).
   * **Center (Desktop Navigation):**
     * *About* (Dropdown: History & Heritage, Leadership Message, Why DAV, Faculty)
     * *Academics* (Dropdown: Nursery–Class 10, Pedagogy, CBSE Curriculum, Assessment)
     * *Admissions* (Direct Link & Highlights)
     * *Campus* (Smart Labs, Sports Pavilion, Library, Safety)
     * *Student Life* (Houses, Clubs, Activities)
     * *Achievements* (Academic & Sports Honours)
     * *Gallery* (Photo & Virtual Glimpse)
     * *Contact* (Visit & Directory)
   * **Right Utility Cluster:**
     * Global Search Trigger (`⌘K` Search Button with badge)
     * Quick WhatsApp Direct Trigger
     * Primary CTA: **"Apply for 2026–27"** (Gold pill button with shine micro-animation)
3. **Mobile Sticky Action Dock:**
   * Fixed at the bottom for mobile devices (`h-16`).
   * Quick Touch Targets: [ Call Now ] [ WhatsApp ] [ Apply Online ] [ Menu Drawer ].

### 3.2 Global Footer Design
* **Header Band:** Gold quote banner: *"Work is Worship • तमसो मा ज्योतिर्गमय"*.
* **Col 1 (School Identity & Legacy):** Crest, establishment year 1989, affiliation summary, DAVCMC management seal.
* **Col 2 (Academic Quick Links):** Nursery to Class 10 programs, Academic Calendar, Book Lists, Transfer Certificate Verification.
* **Col 3 (Public & Statutory Compliance):** CBSE Mandatory Public Disclosure (SARAS format), Fee Structure, Safety Certifications, POSH & POCSO Committee.
* **Col 4 (Visit & Connect):** Live Campus Office Timings (`8:00 AM - 3:30 PM`), interactive address card with direct Google Maps route button, verified phone & email.
* **Bottom Bar:** Copyright, Privacy Policy, Terms of Service, Designed with Editorial Excellence.

---

## 4. Comprehensive Page-by-Page UI/UX Breakdown

---

### Page 1: Home Page (`/`)
* **Goal:** Instantaneous wow-factor, parental conversion, showcasing 35+ years of legacy, CBSE excellence, and modern infrastructure.

#### Visual Wireframe & Layout Anatomy:
```
┌──────────────────────────────────────────────────────────┐
│ Top Announcement Ticker (Affiliation & Admissions 2026)  │
├──────────────────────────────────────────────────────────┤
│ Floating Glass Navbar with Brand Crest & CTA             │
├──────────────────────────────────────────────────────────┤
│ HERO SECTION:                                            │
│ [Badges: Nursery to Class 10 | 35+ Yrs Legacy]           │
│ Headline: "Where Curiosity Begins. Growing Minds,        │
│            Building Futures."                            │
│ CTAs: [Explore Admissions 2026-27] [Book Campus Tour]    │
│ Hero Visual Grid: Multi-layer depth photo montage        │
│ Floating Social Proof Pills: "100% CBSE Pass Rate"       │
├──────────────────────────────────────────────────────────┤
│ LIVE STATS STRIP (Warm Gold & Navy Counters)             │
│ [35+ Years] [2,400+ Students] [100% CBSE] [12+ Acres]   │
├──────────────────────────────────────────────────────────┤
│ EDITORIAL STATEMENT (Typography Masterpiece)             │
│ Large serif statement on character, discipline & science│
├──────────────────────────────────────────────────────────┤
│ 4-PILLAR FOUNDATION (Why DAV Qilla Mandi)                │
│ 1. Vedic Roots & Values  2. Modern STEM & Robotics      │
│ 3. Sports & Holistic     4. Safe & Nurturing Campus      │
├──────────────────────────────────────────────────────────┤
│ INTERACTIVE ACADEMIC EXPLORER (Tabbed View)              │
│ [Foundational Nursery-UKG] [Primary 1-5] [Middle/Sec 6-10│
├──────────────────────────────────────────────────────────┤
│ PRINCIPAL'S DESK (Editorial Portrait + Message Excerpt)  │
├──────────────────────────────────────────────────────────┤
│ CAMPUS IMMERSION SLIDER / 360° GLIMPSE                   │
├──────────────────────────────────────────────────────────┤
│ RECENT ACHIEVEMENTS & OLYMPIAD TOPPERS                   │
├──────────────────────────────────────────────────────────┤
│ LATEST NEWS & EVENTS TICKER / CARDS                      │
├──────────────────────────────────────────────────────────┤
│ PARENT & ALUMNI VOICES (Testimonial Carousel)            │
├──────────────────────────────────────────────────────────┤
│ HIGH-CONVERSION FINAL CTA BANNER (Admissions 2026-27)    │
├──────────────────────────────────────────────────────────┤
│ MASTER FOOTER                                            │
└──────────────────────────────────────────────────────────┘
```

#### Key Micro-Interactions:
* Hero headline text word-by-word reveal (`framer-motion`).
* Interactive Academic Tab switcher with smooth cross-fade container.
* Stat counters that tick up dynamically upon intersection observer trigger.
* Floating badge with parallax depth on mouse movement.

---

### Page 2: About Us (`/about`)
* **Goal:** Establish deep credibility, DAV history since 1989, leadership vision, governance by DAVCMC New Delhi, and educational ethos.

#### Section Breakdown:
1. **Hero Header:** "Our Heritage of Enlightened Education" with archival photo backdrop and gold subtitle.
2. **DAV Movement & Vedic Values:** Story of Swami Dayanand Saraswati & Mahatma Hansraj philosophy combined with modern CBSE education.
3. **Vision, Mission & Core Values Grid:**
   * *Curiosity First* (Interactive Card with icon)
   * *Moral Integrity & Vedic Samskaras*
   * *Scientific Temper & Innovation*
   * *Global Citizenship & Leadership*
4. **Leadership Section:**
   * Principal Mrs. Paramjit Kaur (Full editorial profile, qualifications M.Sc., M.Ed., M.Phil., message)
   * School Manager & DAVCMC Regional Director insights.
5. **Timeline of Milestones (1989 – Present):** Vertical interactive timeline featuring milestone years (Founding, CBSE Affiliation, Campus Expansion, Smart Tech integration).
6. **Faculty & Mentorship Excellence:** Highlight 100+ master educators with 1:22 mentorship ratio.

---

### Page 3: Academics & Curriculum (`/academics`)
* **Goal:** Detailed walkthrough of academic stages from Nursery to Class 10, pedagogical framework, NEP 2020 alignment, and examination structure.

#### Section Breakdown:
1. **Stage 1: Foundational Years (Nursery, LKG, UKG)**
   * Play-way methodology, sensory learning, phonetics, joyful numeracy, motor skills development.
2. **Stage 2: Primary School (Classes 1 to 5)**
   * Conceptual foundation, bilingual competence (English & Hindi/Punjabi), environmental studies, hands-on math labs, art & craft.
3. **Stage 3: Middle & Secondary School (Classes 6 to 10)**
   * Rigorous CBSE alignment, Physics/Chemistry/Biology practical labs, advanced mathematics, Social Sciences, Computer Applications & Coding.
4. **Teaching Methodology & Smart Classrooms:** Interactive 3D smart board integration, experiential STEM workshops, flipped classroom modules.
5. **Co-Curricular Integration:** Value education, Dharam Shiksha, Hawan ceremonies, life skills, robotics.
6. **Evaluation & CBSE Assessment Scheme:** Formative assessments, term exams, periodic test schedules, board examination preparation support.
7. **Downloadable Syllabus & Book Lists:** Direct PDF download triggers for each class.

---

### Page 4: Admissions (`/admissions`)
* **Goal:** Frictionless lead capture, transparent admission criteria, age requirements, fee details, and step-by-step guidance.

#### Section Breakdown:
1. **Admissions 2026–2027 Hero:** Clear status pill: *"Applications Open for Nursery to Class IX & X"*.
2. **Step-by-Step 4-Stage Roadmap:**
   * Step 1: Online Registration / Enquiry
   * Step 2: Campus Visit & Interactive Session
   * Step 3: Document Verification & Readiness Check
   * Step 4: Confirmation & Welcome Kit
3. **Eligibility & Age Criteria Matrix:** Clean table with Class vs Minimum Age cutoff as on March 31.
4. **Mandatory Document Checklist:** Expandable accordion (Birth Certificate, Transfer Certificate, Previous Report Card, Aadhaar, Passport Photos).
5. **Fee Structure & Transparency Notice:** Direct link to verified fee schedules and fee payment policy.
6. **Embedded Interactive Lead Form / CTA Modal Launcher:**
   * Input fields: Student Name, Class Applying For, Parent Name, Mobile Number, Email, City, Query.
7. **Frequently Asked Questions (Accordion):** Transport routes, sibling discounts, student-teacher ratio, admission withdrawal rules.

---

### Page 5: Campus & Infrastructure (`/campus`)
* **Goal:** Visually demonstrate safety, modern facilities, 12+ acre green campus, smart labs, sports arenas, and security.

#### Section Breakdown:
1. **Campus Overview & Aerial Glimpse:** Interactive video/photo hero showing lush green campus in Batala.
2. **Interactive Facilities Filter:**
   * [All Facilities] [Science & Computer Labs] [Library] [Sports Complex] [Classrooms] [Safety & Transport]
3. **Facility Detail Cards (with high-res image carousels):**
   * *Smart Classrooms:* Digital touch boards, ergonomic furniture, natural daylight.
   * *Composite Science Labs:* Dedicated physics, chemistry, biology workstations with strict safety protocols.
   * *AI & Computer Science Lab:* High-speed fiber network, modern PCs, coding environment.
   * *Knowledge Hub / Library:* 8,000+ books, periodicals, encyclopedias, digital reading zone.
   * *Sports Pavilion & Playgrounds:* Cricket pitch, football turf, badminton courts, athletics track, indoor games arena.
   * *Campus Safety & Transport:* 24/7 CCTV surveillance, GPS-enabled buses with female attendants, fire safety compliance, first-aid infirmary.
4. **Campus Map & Location Guide:** Directions from Batala Bus Stand and Railway Station.

---

### Page 6: Student Life & Co-Curriculars (`/student-life`)
* **Goal:** Show that life at DAV is vibrant, balanced, character-building, and filled with joy.

#### Section Breakdown:
1. **House System:** The 4 Houses (e.g., Dayanand House, Hansraj House, Vivekanand House, Tagore House) with their colors, mottos, and leadership badges.
2. **Clubs & Societies Grid:**
   * STEM & Robotics Club
   * Literary & Debating Society
   * Eco & Green Warriors Club
   * Cultural & Performing Arts Troupe
   * Vedic Heritage & Yoga Club
3. **Sports & Physical Well-being:** Daily physical training, yoga, martial arts, annual sports meet.
4. **Celebrations & Annual Traditions:** Hawan Yajna, Independence Day, Republic Day, Annual Day gala, Science Exhibition, Grandparents' Day.
5. **Student Council & Leadership Development:** Head Boy, Head Girl, Prefectorial board roles and responsibilities.

---

### Page 7: Achievements & Accolades (`/achievements` & `[slug]`)
* **Goal:** Social proof of outstanding academic board results, state/national sports medals, and Olympiad toppers.

#### Section Breakdown:
1. **Board Exam Hall of Fame:** High scorers in CBSE Class 10 (95%+ club, 100/100 subject toppers) with student portraits, scores, and parent testimonials.
2. **Category Filter Tabs:** [All Achievements] [CBSE Board Toppers] [Sports Champions] [Olympiad & Science] [Art & Cultural].
3. **Individual Achievement Detail View (`[slug]`):** Full story, certificate photos, quotes from student and mentors.
4. **Alumni Success Stories:** Former students excelling in engineering, medicine, civil services, defense, and entrepreneurship.

---

### Page 8: News & Happenings (`/news` & `[slug]`)
* **Goal:** Keep the community updated with school newsletters, circulars, press coverage, and announcements.

#### Section Breakdown:
1. **Featured News Story:** Large magazine-style hero card for major events (e.g., Annual Exhibition 2026).
2. **News Listing Grid:** Cards with publish date, reading time, category tag, thumbnail, and short excerpt.
3. **Filter by Category:** [All] [Circulars] [Celebrations] [Press Release] [Parent Notices].
4. **Detail Page (`/news/[slug]`):** Clean typography, full article content, image gallery, downloadable circular PDF, related articles.

---

### Page 9: Events & School Calendar (`/events` & `[slug]`)
* **Goal:** Clear visibility of upcoming school events, exam schedules, holidays, and parent-teacher meetings.

#### Section Breakdown:
1. **Upcoming Events Spotlight:** Countdown timer to next big event (e.g., Annual Sports Meet / PTM).
2. **Interactive Calendar / List Switcher:** Filter by Month, Academic Term, or Type of Event.
3. **Event Card Anatomy:** Date badge (Month/Day), Time, Venue, Target Audience (e.g., Classes 6–10), "Add to Google Calendar" button.
4. **Event Detail Page (`/events/[slug]`):** Schedule agenda, chief guest details, registration/permission form download.

---

### Page 10: Media Gallery & Virtual Tour (`/gallery` & `[slug]`)
* **Goal:** High-resolution visual showcase with seamless lightbox zoom, filtering, and video glimpses.

#### Section Breakdown:
1. **Category Pills:** [All Photos] [Campus & Labs] [Sports Day] [Cultural Fest] [Classroom Life] [Celebrations].
2. **Masonry Photo Grid:** Responsive 3-column / 4-column layout with subtle hover zoom and image captions.
3. **Full-Screen Lightbox Modal:** Keyboard arrow navigation, swipe gestures on mobile, high-res zoom, and direct download option.
4. **Album Detail Page (`/gallery/[slug]`):** Dedicated album view for specific events.

---

### Page 11: Contact Us & Campus Visit (`/contact`)
* **Goal:** Effortless reachability, verified phone numbers, instant Google Maps directions, and appointment booking for campus visits.

#### Section Breakdown:
1. **Contact Information Cards (4 Pillars):**
   * *Campus Address:* Qilla Mandi Road, Near Historic Qilla Mandi, Batala, Punjab 143505.
   * *Phone Directory:* General Office (`01871-240567`), Admissions Helpline (`+91 98765 43210`).
   * *Email Inboxes:* General (`davqm_batala@yahoo.co.in`), Admissions (`admissions@davqillamandi.edu.in`).
   * *Visiting Hours:* Monday to Saturday: `8:00 AM – 3:30 PM`.
2. **Interactive Schedule a Campus Visit Form:** Date picker, preferred time slot, student grade of interest.
3. **Interactive Embedded Google Map:** High-contrast map container with "Get Driving Directions" shortcut.
4. **Bus Route & Transport Enquiry:** Quick lookup for school bus routes across Batala and nearby sectors.

---

### Page 12: CBSE Mandatory Public Disclosure (`/mandatory-disclosure`)
* **Goal:** Full statutory compliance with CBSE SARAS norms, transparent access to NOC, recognition, building safety, water test certificates, and fee schedule.

#### Section Breakdown:
1. **CBSE Compliance Header:** Affiliation No. `1630182`, School Code `20176`.
2. **Category 1: General Information Matrix:** Complete institutional credentials table.
3. **Category 2: Documents & Information (Downloadable Verified PDFs):**
   * Affiliation / Upgradation Letter from CBSE
   * Society / Trust Registration Certificate (DAVCMC New Delhi)
   * No Objection Certificate (NOC) from State Govt
   * Recognition Certificate under RTE Act 2009
   * Building Safety Certificate from competent authority
   * Fire Safety Certificate
   * Safe Drinking Water & Sanitary Condition Certificate
4. **Category 3: Results & Academics:** Fee structure for current session, Annual Academic Calendar, School Management Committee (SMC) list, Parents Teachers Association (PTA) list, last 3 years CBSE Class 10 Board exam statistics.
5. **Category 4: Staff (Teaching) Details:** Principal details, Total teachers, PGT/TGT/PRT counts, Teacher-student ratio, Special Educator, Wellness Teacher.
6. **Category 5: School Infrastructure Matrix:** Total campus area, playground area, number of smart classrooms, science labs, computer labs, internet facility, number of girls/boys washrooms.

---

### Page 13: Quick Enquiry & Prospectus Download Modals (`/enquiries` & Overlays)
* **Goal:** High-conversion lead generation without page abandonment.

#### Component Anatomy:
* **Prospectus Download Modal:** Lead capture (Parent Name, Mobile, Email, Grade) -> Instant triggers direct PDF download of 2026 Prospectus.
* **Admission Modal:** Multi-step wizard:
  * Step 1: Child Details (Name, DOB, Class Applying)
  * Step 2: Parent Contact (Name, Phone, Email, Address)
  * Step 3: Verification & Instant SMS/Email confirmation.

---

### Page 14: Legal & Policy Pages (`/privacy`, `/terms`)
* **Goal:** Clear, professional, compliant terms for student data privacy, fee refund guidelines, and website terms.
* **Typography:** Clean editorial long-form article layout with sticky table of contents.

---

### Page 15: Admin Portal & Enquiries Dashboard (`/admin`, `/admin/login`, `/admin/enquiries`)
* **Goal:** Internal administrative dashboard for the school admission office to review enquiries, export leads to Excel/CSV, and update status.

#### Section Breakdown:
1. **Secure Admin Login:** Password/Token authentication.
2. **Admission Leads Dashboard:**
   * Metrics Overview: Total Leads, New Today, Contacted, Enrolled.
   * Search & Filter Table: Filter by Class, Date Range, Status.
   * Quick Actions: Call directly, WhatsApp parent, mark status (Pending / In Review / Contacted / Admitted).
   * Export: "Download CSV / Excel" button for office records.

---

### Page 16: Custom 404 / Error State (`/not-found`)
* **Goal:** Helpful navigation recovery when a URL is mistyped.
* **Aesthetics:** Editorial illustration with "Page Not Found", quick links to Home, Admissions, Academics, Contact, and Search Bar.

---

## 5. Micro-Interactions, Motion & Animation Guidelines

```
Standard Easing Curve: cubic-bezier(0.16, 1, 0.3, 1)  (Expo Out - Snappy & Luxurious)
Duration Scale:
  - Micro feedback (buttons, toggles): 150ms - 200ms
  - Content reveals & Modals:         350ms - 500ms
  - Page transitions:                 400ms - 600ms
```

### Key Interactive Patterns:
1. **Editorial Link Hover:** Underline expands from left to right on hover and retracts to the right on mouse leave.
2. **Card Elevate:** Cards smoothly lift `transform: translateY(-4px)` with a subtle gold ambient shadow `0 12px 32px rgba(201, 155, 35, 0.08)`.
3. **Image Reveal:** Images use an overflow clip with subtle scale zoom (`scale-105` on hover).
4. **Command Palette (`⌘K`):** Smooth scale-in from `scale(0.95)` with instant keyboard focus.

---

## 6. Accessibility & Performance Benchmarks (WCAG 2.1 AA)

* **Contrast Ratios:** All body text on `#FBF9F4` maintains minimum `7:1` contrast ratio (`#0A192F` on cream).
* **Keyboard Navigation:** Full focus ring visibility (`focus-visible:ring-2 focus-visible:ring-gold-500`) across all interactive elements.
* **Screen Reader Accessibility:** Comprehensive `aria-label`, `role="dialog"`, `aria-expanded`, and descriptive semantic headings (`h1` -> `h6`).
* **Performance Target:** Lighthouse Score > 95 in Performance, Accessibility, Best Practices, and SEO.

---

## 7. Designer Hand-off & Figma Asset Checklist

When preparing designs in Figma or Adobe XD, ensure the following structure:

```
📁 DAV Public School Design File
├── 🎨 01. Design Tokens & Styles
│   ├── Color Palette (Light & Dark tokens)
│   ├── Typography Hierarchy (Instrument Serif & Plus Jakarta Sans)
│   ├── Elevation & Shadows
│   └── Grid & Spacing Scales
├── 🧩 02. Master Component Library
│   ├── Navigation (Announcement Bar, Navbar Desktop, Mobile Floating Bar)
│   ├── Buttons & CTAs (Primary Gold, Secondary Navy, Ghost, Icon Buttons)
│   ├── Cards (Academic Stage, Facility, News, Event, Testimonial, Staff)
│   ├── Form Elements (Text input, Select, Datepicker, Step Wizard)
│   └── Modals (Search ⌘K, Admission Modal, Prospectus Modal, Lightbox)
├── 📱 03. Page Layouts (Desktop 1440px & Mobile 390px)
│   ├── 01_Home_Page
│   ├── 02_About_Us
│   ├── 03_Academics_Curriculum
│   ├── 04_Admissions_Fee
│   ├── 05_Campus_Infrastructure
│   ├── 06_Student_Life
│   ├── 07_Achievements_BoardResults
│   ├── 08_News_Circulars
│   ├── 09_Events_Calendar
│   ├── 10_Media_Gallery
│   ├── 11_Contact_Us
│   ├── 12_CBSE_Mandatory_Disclosure
│   ├── 13_Admin_Dashboard
│   └── 14_404_Error_Page
└── 🖼️ 04. Assets & Media
    ├── School Crest (SVG, PNG with transparency)
    ├── Affiliation Badges & Seals
    └── Curated Photography (High-res, 16:9, 4:3, 1:1)
```

---
*Created for DAV Public School, Qilla Mandi, Batala — Empowering young minds from Nursery to Class 10 with Vedic values & modern academic excellence.*
