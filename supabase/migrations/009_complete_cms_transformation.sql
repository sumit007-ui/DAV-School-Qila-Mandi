-- ==============================================================================
-- 009: COMPREHENSIVE SANITY TO SUPABASE CMS TRANSFORMATION MIGRATION
-- Dr. M.R.S. Bhalla D.A.V. Senior Secondary Public School, Qila Mandi, Batala
-- ==============================================================================

-- 1. EXTENSIONS & UTILITIES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Automated updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 2. LEADERSHIP MESSAGES TABLE (Principal & Director)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.leadership_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT UNIQUE NOT NULL CHECK (role IN ('principal', 'director', 'chairman')),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    qualifications TEXT,
    photo_url TEXT NOT NULL,
    message_excerpt TEXT NOT NULL,
    full_message JSONB NOT NULL DEFAULT '[]',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leadership_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to published leadership_messages" ON public.leadership_messages;
CREATE POLICY "Allow public read access to published leadership_messages"
    ON public.leadership_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to leadership_messages" ON public.leadership_messages;
CREATE POLICY "Allow authenticated admins full access to leadership_messages"
    ON public.leadership_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Principal & Director
INSERT INTO public.leadership_messages (role, name, designation, qualifications, photo_url, message_excerpt, full_message, is_published)
VALUES 
(
    'principal',
    'Mrs. Anjana Gupta',
    'Principal',
    'M.A., B.Ed., 25+ Years in Educational Leadership',
    '/images/school-building.png',
    'At DAV Qila Mandi, we believe true education harmonizes sharp academic acumen with deep-rooted Vedic values and moral courage.',
    '["Welcome to Dr. M.R.S. Bhalla D.A.V. Senior Secondary Public School, Qila Mandi, Batala. Established in 1990 under the venerable DAV College Managing Committee (DAVCMC) New Delhi, our institution has stood as a beacon of values-guided academic excellence for over three decades.", "Our pedagogy goes beyond conventional rote instruction. In an era marked by rapid technological change, we ensure our students are grounded in Arya Samaj ethics, character integrity, and civic responsibility while mastering cutting-edge digital concepts in modern smart classrooms.", "Every child entrusted to our care receives individual teacher attention, structured board exam preparation without commercial tuition dependence, and expansive opportunities in sports, arts, and Vedic rituals like the weekly Hawan. We partner with parents to nurture thoughtful, resilient, and confident leaders of tomorrow."]',
    true
),
(
    'director',
    'Dr. V. K. Sharma',
    'Director of Public Schools',
    'Ph.D., M.Sc., Member DAVCMC New Delhi',
    '/images/school-building.png',
    'Our vision is to empower young minds across Punjab with modern scientific enquiry anchored firmly in timeless Vedic wisdom.',
    '["DAV institutions across India have consistently demonstrated that tradition and modernity are not contradictory but mutually reinforcing. Dr. M.R.S. Bhalla DAV School Qila Mandi exemplifies this golden synthesis in Batala.", "We are committed to providing world-class infrastructure, composite laboratories, qualified and compassionate teachers, and a secure learning environment where every student excels in PSEB board examinations and develops into a responsible citizen."]',
    true
)
ON CONFLICT (role) DO UPDATE SET
    name = EXCLUDED.name,
    designation = EXCLUDED.designation,
    qualifications = EXCLUDED.qualifications,
    message_excerpt = EXCLUDED.message_excerpt,
    full_message = EXCLUDED.full_message,
    updated_at = NOW();

-- ==============================================================================
-- 3. ACADEMIC STAGES TABLE (5 Pedagogical Progression Stages)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.academic_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phase INTEGER UNIQUE NOT NULL,
    title TEXT NOT NULL,
    classes TEXT NOT NULL,
    age TEXT NOT NULL,
    tag TEXT NOT NULL,
    lead TEXT NOT NULL,
    description TEXT NOT NULL,
    milestones JSONB NOT NULL DEFAULT '[]',
    subjects JSONB NOT NULL DEFAULT '[]',
    image_url TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.academic_stages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to academic_stages" ON public.academic_stages;
CREATE POLICY "Allow public read access to academic_stages"
    ON public.academic_stages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to academic_stages" ON public.academic_stages;
CREATE POLICY "Allow authenticated admins full access to academic_stages"
    ON public.academic_stages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Academic Stages
INSERT INTO public.academic_stages (phase, title, classes, age, tag, lead, description, milestones, subjects, image_url, display_order)
VALUES 
(
    1,
    'Foundational Years',
    'Nursery, LKG, UKG',
    'Ages 3 – 5',
    'EARLY CHILDHOOD',
    'Joyful Play, Phonetics & Moral Wonder',
    'A secure, nurturing introduction to structured learning. We foster phonemic awareness, sensory coordination, counting through physical manipulatives, and social empathy in vibrant, safe activity rooms.',
    '["Bilingual phonics foundation (English & Punjabi)", "Sensory numeracy and hands-on motor coordination", "Daily moral stories and gentle routine adaptation", "Activity-based interactive learning without exam pressure"]',
    '["English Alphabet & Phonics", "Punjabi Akhar Bodh", "Basic Numeracy & Shapes", "Art, Rhymes & Motor Play"]',
    '/images/pre-primary.jpg',
    1
),
(
    2,
    'Primary School',
    'Classes 1 to 5',
    'Ages 6 – 10',
    'CORE FOUNDATIONS',
    'Concept Building, Language Fluency & Inquiry',
    'Transition into structured academic disciplines. Students develop reading comprehension in English, Hindi, and Punjabi, conceptual mathematics, and scientific curiosity supported by experiential experiments and weekly Hawan values.',
    '["Three-language competency (English, Hindi, Punjabi)", "Concrete-to-abstract mathematical thinking", "Interactive environmental science projects", "Weekly moral education & public speaking confidence"]',
    '["English Literature & Grammar", "Mathematics & Mental Math", "Environmental Studies (EVS)", "Punjabi & Hindi", "Computer Basics", "Vedic Dharma Shiksha"]',
    '/images/primary-school.jpg',
    2
),
(
    3,
    'Middle School',
    'Classes 6 to 8',
    'Ages 11 – 13',
    'DISCIPLINED INQUIRY',
    'Scientific Method, Analytical Rigor & Character Formation',
    'Deepening subject mastery with dedicated laboratories and practical classes. Students engage in formal physics, chemistry, biology, social sciences, computer coding, and co-curricular pursuits like cricket, karate, and classical arts.',
    '["Dedicated practical lab experiments in science", "Advanced mental math and algebraic problem solving", "Structured debate, essay writing, and elocution", "Leadership in house activities, sports, and community seva"]',
    '["Physics, Chemistry & Biology", "Mathematics & Geometry", "History, Civics & Geography", "English & Punjabi", "Information Technology", "Physical & Health Education"]',
    '/images/middle-school.jpg',
    3
),
(
    4,
    'Secondary School',
    'Classes 9 & 10',
    'Ages 14 – 16',
    'BOARD MASTERY',
    'PSEB Board Preparation & Distinctions Mentorship',
    'Rigorous academic training geared towards the Punjab School Education Board (PSEB) Class 10 matriculation examinations. Continuous assessments, mock tests, individual doubt-clearing sessions, and career counseling ensure 100% board success.',
    '["Intensive chapter-wise board examination preparation", "Regular pre-board simulation tests with personal feedback", "Zero reliance on commercial private tuition", "Proven district merit ranking and 95%+ board scorers"]',
    '["Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science", "English", "Punjabi", "Computer Applications"]',
    '/images/secondary-school.jpg',
    4
)
ON CONFLICT (phase) DO UPDATE SET
    title = EXCLUDED.title,
    classes = EXCLUDED.classes,
    lead = EXCLUDED.lead,
    description = EXCLUDED.description,
    milestones = EXCLUDED.milestones,
    subjects = EXCLUDED.subjects,
    image_url = EXCLUDED.image_url,
    updated_at = NOW();

-- ==============================================================================
-- 4. CAMPUS FACILITIES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.campus_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    headline TEXT,
    description TEXT NOT NULL,
    specifications JSONB DEFAULT '[]',
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.campus_facilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to campus_facilities" ON public.campus_facilities;
CREATE POLICY "Allow public read access to campus_facilities"
    ON public.campus_facilities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to campus_facilities" ON public.campus_facilities;
CREATE POLICY "Allow authenticated admins full access to campus_facilities"
    ON public.campus_facilities FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Campus Facilities
INSERT INTO public.campus_facilities (slug, name, category, headline, description, specifications, image_url, display_order)
VALUES 
(
    'science-laboratories',
    'Composite Science Laboratories',
    'Academic',
    'Hands-on experimental learning for Physics, Chemistry & Biology',
    'Well-equipped science suites designed for experiential learning under faculty supervision. Students conduct experiments matching PSEB practical curricula.',
    '["Precision optical microscopes and chemical safety hoods", "Standard apparatus for physics optics, mechanics and electricity", "Specimen collections and interactive anatomical models", "Fire safety equipment, eyewash stations and first aid kits"]',
    '/images/science-lab.jpg',
    1
),
(
    'computer-laboratory',
    'Computer & Information Technology Lab',
    'Technology',
    'High-speed computing systems with supervised educational broadband',
    'Modern IT workstations with high-speed internet, programming environments, and educational software for students from Class 1 through Class 10.',
    '["40+ Modern desktop workstations with LED monitors", "Dedicated broadband leased-line internet connection", "Coding curricula covering Python, Scratch, and HTML/CSS", "Uninterrupted power backup with central online UPS"]',
    '/images/computer-lab.jpg',
    2
),
(
    'central-library',
    'Knowledge Resource Center & Library',
    'Academic',
    'Over 10,000 volumes encompassing literature, science, history and Vedic philosophy',
    'A tranquil sanctuary promoting reading habits. Features curriculum reference books, periodicals, Punjabi & English daily newspapers, and digital encyclopedias.',
    '["10,000+ Curated books and educational reference volumes", "Dedicated children’s illustrated literature section", "Daily newspapers in English, Punjabi, and Hindi", "Acoustically quiet reading hall with comfortable seating"]',
    '/images/library.jpg',
    3
),
(
    'sports-and-athletics',
    'Sports Grounds & Martial Arts Arena',
    'Athletics',
    'Cricket turf nets, karate dojo, volleyball courts, and certified coaching',
    'Comprehensive physical conditioning facilities. We train district and state level champions in cricket, athletics, and martial arts.',
    '["Cricket training turf nets and pitch", "Karate training dojo with certified black belt instructors", "Badminton and volleyball courts", "Annual sports day athletic track and field"]',
    '/images/sports-champions.jpg',
    4
),
(
    'smart-classrooms',
    'Interactive Digital Smart Classrooms',
    'Technology',
    '75-inch 4K interactive digital touch panels in every division',
    'Classrooms equipped with audiovisual smart boards, multimedia curricula, and interactive diagrams that make complex concepts vivid and understandable.',
    '["75-inch 4K ultra-HD interactive touch panels", "Rich animated curriculum modules for Science and Math", "Ergonomically designed dual student desks", "Ample cross-ventilation and natural daylight"]',
    '/images/smart-classroom.jpg',
    5
),
(
    'safe-transport',
    'GPS-Tracked Van & Bus Fleet',
    'Safety',
    'Secure door-to-door transit covering Batala and surrounding rural areas',
    'A dedicated fleet of school buses and vans equipped with GPS tracking, CCTV cameras, certified drivers, and female attendants ensuring student safety.',
    '["Real-time GPS vehicle tracking accessible to admin", "Speed governors and certified fire extinguishers on all vehicles", "Female bus attendants for pre-primary and primary students", "Comprehensive route network covering all Batala neighborhoods"]',
    '/images/school-bus.jpg',
    6
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    headline = EXCLUDED.headline,
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications,
    image_url = EXCLUDED.image_url,
    updated_at = NOW();

-- ==============================================================================
-- 5. SCHOOL EVENTS & CALENDAR TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Academic',
    description TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    time TEXT DEFAULT '9:00 AM – 1:30 PM',
    venue TEXT DEFAULT 'Main Campus Auditorium & Grounds',
    highlights JSONB DEFAULT '[]',
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_upcoming BOOLEAN DEFAULT TRUE,
    registration_open BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to events" ON public.events;
CREATE POLICY "Allow public read access to events"
    ON public.events FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to events" ON public.events;
CREATE POLICY "Allow authenticated admins full access to events"
    ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Events
INSERT INTO public.events (slug, title, category, description, start_date, venue, highlights, image_url, is_featured, is_upcoming)
VALUES
(
    'annual-hawan-yajna-2025',
    'Shri Anand Bodh Hawan Yajna & New Session Blessing',
    'Heritage',
    'Commencing the academic year with traditional Vedic chants, sacred Hawan ceremony, and blessings for students appearing in upcoming examinations.',
    '2025-04-05',
    'School Yajnashala & Central Grounds',
    '["Vedic Mantra Recitations", "Distribution of Prasad & Sacred Ash", "Blessing ceremony for Nursery and Class 10 students"]',
    '/images/vedic-values.jpg',
    true,
    true
),
(
    'inter-house-science-exhibition-2025',
    'Vigyan Tarang: Inter-House Science & Robotics Exhibition',
    'Academic',
    'Students demonstrate working scientific models, renewable energy prototypes, and computer programming projects before guest evaluators.',
    '2025-05-10',
    'Composite Science Lab & Central Courtyard',
    '["50+ Working Science Exhibits", "Solar and Water Conservation Projects", "Live Robotics & Scratch Coding Demonstrations"]',
    '/images/science-lab.jpg',
    true,
    true
),
(
    'batala-inter-school-cricket-meet',
    'Mahatma Hansraj Memorial Inter-School Cricket Cup',
    'Sports',
    'Annual cricket tournament hosting 12 prominent schools across Gurdaspur and Batala districts in a 3-day competitive championship.',
    '2025-09-18',
    'DAV Sports Ground, Qila Mandi',
    '["12 Competing Schools", "Leather ball T-20 matches", "Awarding Best Batsman & Player of the Tournament"]',
    '/images/sports-champions.jpg',
    true,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 6. ACHIEVEMENTS & AWARDS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    year TEXT NOT NULL DEFAULT '2024',
    date DATE,
    student_name TEXT NOT NULL,
    class TEXT,
    description TEXT NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to achievements" ON public.achievements;
CREATE POLICY "Allow public read access to achievements"
    ON public.achievements FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to achievements" ON public.achievements;
CREATE POLICY "Allow authenticated admins full access to achievements"
    ON public.achievements FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Achievements
INSERT INTO public.achievements (slug, title, category, year, student_name, class, description, image_url, is_featured)
VALUES
(
    'district-gold-karate-championship-2024',
    'Gold Medal in Punjab State Karate Championship',
    'Sports',
    '2024',
    'Gurshaan Singh',
    'Class 8-A',
    'Secured 1st position and Gold Medal in the Under-14 Kumite category at the 32nd Punjab State Karate Championship held in Jalandhar.',
    '/images/sports-champions.jpg',
    true
),
(
    'gurdaspur-pseb-math-olympiad-first-rank',
    'District Rank 1 in State Mathematical Olympiad',
    'Academics',
    '2024',
    'Harmanpreet Singh',
    'Class 10',
    'Scored 100/100 and achieved 1st Rank in Gurdaspur district in the Punjab State Mathematics Aptitude Olympiad.',
    '/images/ethos-learning.jpg',
    true
),
(
    'punjab-folk-dance-giddha-trophy',
    'First Prize in District Cultural Youth Festival (Giddha)',
    'Cultural',
    '2024',
    'Senior Girls Folk Troupe',
    'Classes 9 & 10',
    'Won the prestigious First Place Trophy representing Batala in the Inter-District School Folk Dance Competition.',
    '/images/bhangra-giddha.jpg',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 7. TESTIMONIALS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    relationship TEXT NOT NULL,
    detail TEXT,
    quote TEXT NOT NULL,
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to testimonials" ON public.testimonials;
CREATE POLICY "Allow public read access to testimonials"
    ON public.testimonials FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to testimonials" ON public.testimonials;
CREATE POLICY "Allow authenticated admins full access to testimonials"
    ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Testimonials
INSERT INTO public.testimonials (author_name, relationship, detail, quote, avatar_url, is_featured, display_order)
VALUES
(
    'S. Gurmeet Singh',
    'Parent',
    'Father of Simranjit Kaur (Class 10, 98.4%) · Mandi Road, Batala',
    'What sets DAV Qila Mandi apart is that teachers take ownership of every single student. My daughter never required a single private tuition class in Batala. The pre-board mocks and revision classes were thorough and affectionate.',
    '/images/secondary-school.jpg',
    true,
    1
),
(
    'Dr. Sunita Mahajan',
    'Parent & Medical Professional',
    'Mother of Aryan (Class 6) · Urban Estate, Batala',
    'The balance between modern computer-enabled classrooms and Vedic moral grounding gives us complete peace of mind. Our son is disciplined, respectful, and genuinely enthusiastic about attending school every morning.',
    '/images/pre-primary.jpg',
    true,
    2
),
(
    'Sh. Rajesh Mehra',
    'Alumnus & Business Owner',
    'Class of 2008 · Circular Road, Batala',
    'The values instilled at Dr. M.R.S. Bhalla DAV during my school years remain the foundation of my professional and personal life. Enrolling my own children here was the most natural and rewarding decision.',
    '/images/middle-school.jpg',
    true,
    3
);

-- ==============================================================================
-- 8. FAQS TABLE (Admissions & General)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    display_order INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to faqs" ON public.faqs;
CREATE POLICY "Allow public read access to faqs"
    ON public.faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to faqs" ON public.faqs;
CREATE POLICY "Allow authenticated admins full access to faqs"
    ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed FAQs
INSERT INTO public.faqs (question, answer, category, display_order)
VALUES
(
    'Which board is the school affiliated with?',
    'Dr. M.R.S. Bhalla D.A.V. Senior Secondary Public School is affiliated with the Punjab School Education Board (PSEB), Mohali, and is managed by the DAV College Managing Committee (DAVCMC), New Delhi.',
    'General',
    1
),
(
    'What classes are offered at the Qila Mandi campus?',
    'We provide comprehensive co-educational schooling from Nursery, LKG, UKG (Foundational) through Class 10 (Secondary Board Matriculation).',
    'Admissions',
    2
),
(
    'Does the school provide safe van and bus transport across Batala?',
    'Yes. Our school operates a monitored fleet of GPS-tracked buses and vans with certified drivers and female attendants, covering all areas of Batala city and nearby rural communities.',
    'Transport',
    3
),
(
    'What is the admission procedure for the new academic session?',
    'Parents can submit an admission enquiry online through this portal or visit the school office at Qila Mandi. After submitting basic pupil information and previous marks cards, parents meet the admissions coordinator for orientation.',
    'Admissions',
    4
),
(
    'Are private tuitions needed for Class 10 PSEB board examinations?',
    'No. Our curriculum is structured so that regular classroom teaching, morning doubt-clearing sessions, and pre-board revision simulations fully prepare students for 90%+ scores without needing external private tuitions.',
    'Academics',
    5
);

-- ==============================================================================
-- 9. CENTRAL MEDIA ASSETS REGISTRY TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename TEXT NOT NULL,
    storage_bucket TEXT NOT NULL DEFAULT 'website-photos',
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    title TEXT,
    folder TEXT DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to media_assets" ON public.media_assets;
CREATE POLICY "Allow public read access to media_assets"
    ON public.media_assets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated admins full access to media_assets" ON public.media_assets;
CREATE POLICY "Allow authenticated admins full access to media_assets"
    ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 10. STORAGE BUCKETS INITIALIZATION & POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('website-photos', 'website-photos', true),
    ('news-images', 'news-images', true),
    ('gallery-media', 'gallery-media', true),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Generic storage policy for all 4 public buckets
DROP POLICY IF EXISTS "Public can view website media buckets" ON storage.objects;
CREATE POLICY "Public can view website media buckets"
    ON storage.objects FOR SELECT
    USING (bucket_id IN ('website-photos', 'news-images', 'gallery-media', 'avatars'));

DROP POLICY IF EXISTS "Authenticated admins can manage website media buckets" ON storage.objects;
CREATE POLICY "Authenticated admins can manage website media buckets"
    ON storage.objects FOR ALL
    TO authenticated
    USING (bucket_id IN ('website-photos', 'news-images', 'gallery-media', 'avatars'))
    WITH CHECK (bucket_id IN ('website-photos', 'news-images', 'gallery-media', 'avatars'));
