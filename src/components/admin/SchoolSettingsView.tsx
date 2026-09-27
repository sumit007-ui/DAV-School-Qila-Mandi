"use client";

import { useState, useEffect } from "react";
import { 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Youtube, 
  Facebook, 
  Instagram, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sliders, 
  Sparkles,
  FileCode,
  Copy,
  Check,
  X,
  Type,
  Eye,
  RotateCcw,
  UserCheck
} from "lucide-react";
import { SCHOOL_CONFIG } from "@/config/school";

interface SettingsState {
  schoolName: string;
  subName: string;
  establishedYear: number;
  yearsOverride: number | "" | null;
  officeHours: string;
  receptionPhone: string;
  officePhone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  heroBadgeText: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  // Principal's Desk
  principalName: string;
  principalDesignation: string;
  principalQualifications: string;
  principalExcerpt: string;
  principalFullMessage: string;
}

export function SchoolSettingsView() {
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const [form, setForm] = useState<SettingsState>({
    schoolName: SCHOOL_CONFIG.name,
    subName: SCHOOL_CONFIG.subName,
    establishedYear: SCHOOL_CONFIG.establishedYear || 1990,
    yearsOverride: null,
    officeHours: "Monday – Saturday: 8:00 AM – 2:30 PM",
    receptionPhone: SCHOOL_CONFIG.contact.receptionPhone,
    officePhone: SCHOOL_CONFIG.contact.officePhone,
    email: SCHOOL_CONFIG.contact.email,
    address: `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
    googleMapsUrl: SCHOOL_CONFIG.address.googleMapsUrl,
    youtubeUrl: SCHOOL_CONFIG.links.youtube,
    facebookUrl: SCHOOL_CONFIG.links.facebook,
    instagramUrl: SCHOOL_CONFIG.links.instagram,
    heroBadgeText: SCHOOL_CONFIG.hero.badgeText,
    heroTitleLine1: SCHOOL_CONFIG.hero.titleLine1,
    heroTitleLine2: SCHOOL_CONFIG.hero.titleLine2,
    heroDescription: SCHOOL_CONFIG.hero.description,
    principalName: SCHOOL_CONFIG.leadership.principal.name,
    principalDesignation: SCHOOL_CONFIG.leadership.principal.designation,
    principalQualifications: SCHOOL_CONFIG.leadership.principal.qualifications,
    principalExcerpt: SCHOOL_CONFIG.leadership.principal.messageExcerpt,
    principalFullMessage: (SCHOOL_CONFIG.leadership.principal.fullMessage || []).join("\n\n"),
  });

  // Calculate current year preview
  const calculatedYears = Math.max(1, currentYear - (form.establishedYear || 1990));
  const effectiveYears = form.yearsOverride && Number(form.yearsOverride) > 0 ? Number(form.yearsOverride) : calculatedYears;

  // Load existing settings
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) {
          setForm({
            schoolName: data.settings.schoolName || SCHOOL_CONFIG.name,
            subName: data.settings.subName || SCHOOL_CONFIG.subName,
            establishedYear: data.settings.establishedYear || 1990,
            yearsOverride: data.settings.yearsOverride ?? null,
            officeHours: data.settings.officeHours || "Monday – Saturday: 8:00 AM – 2:30 PM",
            receptionPhone: data.settings.receptionPhone || SCHOOL_CONFIG.contact.receptionPhone,
            officePhone: data.settings.officePhone || SCHOOL_CONFIG.contact.officePhone,
            email: data.settings.email || SCHOOL_CONFIG.contact.email,
            address: data.settings.address || `${SCHOOL_CONFIG.address.street}, ${SCHOOL_CONFIG.address.city}, Punjab ${SCHOOL_CONFIG.address.pincode}`,
            googleMapsUrl: data.settings.googleMapsUrl || SCHOOL_CONFIG.address.googleMapsUrl,
            youtubeUrl: data.settings.youtubeUrl || SCHOOL_CONFIG.links.youtube,
            facebookUrl: data.settings.facebookUrl || SCHOOL_CONFIG.links.facebook,
            instagramUrl: data.settings.instagramUrl || SCHOOL_CONFIG.links.instagram,
            heroBadgeText: data.settings.heroBadgeText || SCHOOL_CONFIG.hero.badgeText,
            heroTitleLine1: data.settings.heroTitleLine1 || SCHOOL_CONFIG.hero.titleLine1,
            heroTitleLine2: data.settings.heroTitleLine2 || SCHOOL_CONFIG.hero.titleLine2,
            heroDescription: data.settings.heroDescription || SCHOOL_CONFIG.hero.description,
            principalName: data.settings.principalName || SCHOOL_CONFIG.leadership.principal.name,
            principalDesignation: data.settings.principalDesignation || SCHOOL_CONFIG.leadership.principal.designation,
            principalQualifications: data.settings.principalQualifications || SCHOOL_CONFIG.leadership.principal.qualifications,
            principalExcerpt: data.settings.principalExcerpt || SCHOOL_CONFIG.leadership.principal.messageExcerpt,
            principalFullMessage: data.settings.principalFullMessage || (SCHOOL_CONFIG.leadership.principal.fullMessage || []).join("\n\n"),
          });
        }
      }
    } catch (e) {
      console.warn("Could not fetch remote settings, using local defaults.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Save settings
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const resData = await res.json();

      if (!res.ok || resData.error) {
        throw new Error(resData.error || "Failed to update school settings");
      }

      window.dispatchEvent(new CustomEvent("school_settings_updated"));
      setSuccessMsg(resData.warning || "Settings updated successfully! Changes are now live across the website.");
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not save settings. Please check your Supabase connection.");
    } finally {
      setSaving(false);
    }
  };

  const sqlQueryText = `-- SQL to create or update school_settings table in Supabase
CREATE TABLE IF NOT EXISTS public.school_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    school_name TEXT NOT NULL DEFAULT 'Dr. MRS Bhalla DAV School',
    sub_name TEXT NOT NULL DEFAULT 'Qila Mandi, Batala',
    established_year INT NOT NULL DEFAULT 1990,
    years_override INT DEFAULT NULL,
    office_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 8:00 AM – 2:30 PM',
    reception_phone TEXT NOT NULL DEFAULT '01871-501096',
    office_phone TEXT NOT NULL DEFAULT '01871-221285',
    email TEXT NOT NULL DEFAULT 'davqillamandi@gmail.com',
    address TEXT NOT NULL DEFAULT 'Qila Mandi Batala, Near Historic Qila Mandi, Batala, Punjab 143505',
    google_maps_url TEXT NOT NULL DEFAULT 'https://maps.google.com/?q=Dr.+MRS+Bhalla+DAV+School+Qila+Mandi+Batala',
    youtube_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@DrMRSBhalla',
    facebook_url TEXT NOT NULL DEFAULT 'https://www.facebook.com/share/18Fmov8Rc9/?mibextid=wwXIfr',
    instagram_url TEXT NOT NULL DEFAULT 'https://www.instagram.com/drmrsbhalladavschool_batala?stkn=NHJobHg5N3Rzcmtz&utm_source=qr',
    hero_badge_text TEXT DEFAULT 'Welcome to Dr. M.R.S. Bhalla D.A.V. School',
    hero_title_line1 TEXT DEFAULT 'Nurturing Excellence,',
    hero_title_line2 TEXT DEFAULT 'Inspiring Futures.',
    hero_description TEXT DEFAULT 'An acclaimed academic sanctuary cultivating intellectual rigor, Vedic values, and holistic leadership at Qila Mandi, Batala.',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- If table already exists, add new hero columns:
ALTER TABLE public.school_settings
ADD COLUMN IF NOT EXISTS hero_badge_text TEXT DEFAULT 'Welcome to Dr. M.R.S. Bhalla D.A.V. School',
ADD COLUMN IF NOT EXISTS hero_title_line1 TEXT DEFAULT 'Nurturing Excellence,',
ADD COLUMN IF NOT EXISTS hero_title_line2 TEXT DEFAULT 'Inspiring Futures.',
ADD COLUMN IF NOT EXISTS hero_description TEXT DEFAULT 'An acclaimed academic sanctuary cultivating intellectual rigor, Vedic values, and holistic leadership at Qila Mandi, Batala.';

ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to school_settings" ON public.school_settings;
CREATE POLICY "Allow public read access to school_settings" ON public.school_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow authenticated admins to modify school_settings" ON public.school_settings;
CREATE POLICY "Allow authenticated admins to modify school_settings" ON public.school_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role full access to school_settings" ON public.school_settings;
CREATE POLICY "Allow service role full access to school_settings" ON public.school_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.school_settings (id, office_hours, established_year, youtube_url, hero_title_line1, hero_title_line2)
VALUES ('default', 'Monday – Saturday: 8:00 AM – 2:30 PM', 1990, 'https://www.youtube.com/@DrMRSBhalla', 'Nurturing Excellence,', 'Inspiring Futures.')
ON CONFLICT (id) DO NOTHING;`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlQueryText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-cream-300">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
        <p className="tracking-wider uppercase">Loading School Settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner / Actions */}
      <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
              <Sliders className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">Dynamic Site Settings</h2>
          </div>
          <p className="text-xs text-cream-300 font-mono mt-1">
            Configure office timings, years of excellence, contact phones, and YouTube link in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSqlModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cream-200 text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-gold-400" />
            <span>Supabase SQL</span>
          </button>

          <button
            type="button"
            onClick={fetchSettings}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cream-200 hover:text-white transition-colors cursor-pointer"
            title="Refresh from Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 0: Homepage Hero Headline & Subtitle */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <Type className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Homepage Hero Headline & Subtitle</h3>
                <p className="text-xs text-cream-400 font-mono">Main title & introductory statement displayed at the very top of the Home page</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-[10px] font-mono uppercase font-bold self-start sm:self-auto">
              Live Homepage Hero
            </span>
          </div>

          {/* Live Preview Box */}
          <div className="rounded-xl bg-[#4E220F] border border-white/15 p-5 sm:p-6 text-white relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-gold-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Live Preview (Real-time appearance)
              </span>
              <button
                type="button"
                onClick={() => setForm({
                  ...form,
                  heroBadgeText: SCHOOL_CONFIG.hero.badgeText,
                  heroTitleLine1: SCHOOL_CONFIG.hero.titleLine1,
                  heroTitleLine2: SCHOOL_CONFIG.hero.titleLine2,
                  heroDescription: SCHOOL_CONFIG.hero.description,
                })}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-cream-200 text-[10px] font-mono transition-colors cursor-pointer"
                title="Reset to default copy"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default</span>
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 border border-white/20 text-[11px] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="font-sans font-medium uppercase tracking-wider text-[10px]">
                  {form.heroBadgeText || SCHOOL_CONFIG.hero.badgeText}
                </span>
              </div>

              <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl leading-tight">
                <span className="block text-white font-normal drop-shadow-md">
                  {form.heroTitleLine1 || "Nurturing Excellence,"}
                </span>
                <span className="block text-[#F4E4AF] font-normal drop-shadow-md pt-0.5">
                  {form.heroTitleLine2 || "Inspiring Futures."}
                </span>
              </div>

              <p className="text-[#F7F1DE]/90 text-xs sm:text-sm font-light max-w-xl font-sans leading-relaxed">
                {form.heroDescription || SCHOOL_CONFIG.hero.description}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-1">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Top Eyebrow Badge Text
              </label>
              <input
                type="text"
                value={form.heroBadgeText}
                onChange={(e) => setForm({ ...form, heroBadgeText: e.target.value })}
                placeholder="Welcome to Dr. M.R.S. Bhalla D.A.V. School"
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                  Headline — First Line (White)
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine1}
                  onChange={(e) => setForm({ ...form, heroTitleLine1: e.target.value })}
                  placeholder="Nurturing Excellence,"
                  className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40 font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-gold-300">
                  Headline — Second Line (Gold Highlighted)
                </label>
                <input
                  type="text"
                  value={form.heroTitleLine2}
                  onChange={(e) => setForm({ ...form, heroTitleLine2: e.target.value })}
                  placeholder="Inspiring Futures."
                  className="w-full px-4 py-3 bg-navy-950 border border-gold-500/30 rounded-xl text-sm font-sans text-[#F4E4AF] focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-gold-400/40 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Hero Subtitle / Descriptive Paragraph
              </label>
              <textarea
                rows={3}
                value={form.heroDescription}
                onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
                placeholder="An acclaimed academic sanctuary cultivating intellectual rigor, Vedic values, and holistic leadership at Qila Mandi, Batala."
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40 leading-relaxed"
                required
              />
            </div>
          </div>
        </div>

        {/* Card: Principal's Desk & Leadership Message */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Principal&apos;s Desk &amp; Leadership Message</h3>
                <p className="text-xs text-cream-400 font-mono">
                  Principal&apos;s perspective quote on homepage and full letter modal (photo can be changed via &quot;Photos &amp; Banners&quot;)
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-[10px] font-mono uppercase font-bold self-start sm:self-auto">
              Live Leadership Desk
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Principal Name
              </label>
              <input
                type="text"
                value={form.principalName}
                onChange={(e) => setForm({ ...form, principalName: e.target.value })}
                placeholder="Mrs. Anjana Gupta"
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Designation
              </label>
              <input
                type="text"
                value={form.principalDesignation}
                onChange={(e) => setForm({ ...form, principalDesignation: e.target.value })}
                placeholder="Principal"
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Academic Qualifications
              </label>
              <input
                type="text"
                value={form.principalQualifications}
                onChange={(e) => setForm({ ...form, principalQualifications: e.target.value })}
                placeholder="M.A., B.Ed., 25+ Years in Educational Leadership"
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
              Short Homepage Quote / Excerpt (Displayed prominently on home page with signature)
            </label>
            <textarea
              rows={3}
              value={form.principalExcerpt}
              onChange={(e) => setForm({ ...form, principalExcerpt: e.target.value })}
              placeholder="At DAV Qila Mandi, we believe true education harmonizes sharp academic acumen with deep-rooted Vedic values and moral courage."
              className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40 leading-relaxed"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
              Full Address to Parents &amp; Students (Modal Content — separate paragraphs with an empty line)
            </label>
            <textarea
              rows={5}
              value={form.principalFullMessage}
              onChange={(e) => setForm({ ...form, principalFullMessage: e.target.value })}
              placeholder="Full letter text paragraphs..."
              className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-sans text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40 leading-relaxed"
            />
          </div>
        </div>

        {/* Card 1: Office Hours / Timings */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Office Hours & Visiting Timings</h3>
                <p className="text-xs text-cream-400 font-mono">Displayed in website footer and contact page</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-[10px] font-mono uppercase font-bold">
              Dynamic Footer
            </span>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
              Office Hours Text
            </label>
            <input
              type="text"
              value={form.officeHours}
              onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
              placeholder="Monday – Saturday: 8:00 AM – 2:30 PM"
              className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
              required
            />

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-cream-400">Quick presets:</span>
              <button
                type="button"
                onClick={() => setForm({ ...form, officeHours: "Monday – Saturday: 8:00 AM – 2:30 PM" })}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cream-200 transition-colors cursor-pointer"
              >
                8:00 AM – 2:30 PM
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, officeHours: "Monday – Saturday: 8:30 AM – 3:00 PM" })}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cream-200 transition-colors cursor-pointer"
              >
                8:30 AM – 3:00 PM (Winter)
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, officeHours: "Monday – Saturday: 8:00 AM – 3:30 PM" })}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cream-200 transition-colors cursor-pointer"
              >
                8:00 AM – 3:30 PM
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Years of Educational Excellence & Genesis */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Institutional Genesis & Years of Excellence</h3>
                <p className="text-xs text-cream-400 font-mono">Controls the "36 Years of Educational Excellence" title</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono uppercase font-bold">
              Auto-Calculated or Manual
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                School Established Year
              </label>
              <input
                type="number"
                value={form.establishedYear}
                onChange={(e) => setForm({ ...form, establishedYear: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
              <p className="text-[11px] text-cream-400 font-mono">
                Formula: {currentYear} − {form.establishedYear} = <strong className="text-gold-300">{calculatedYears} Years</strong> (updates automatically every New Year)
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Custom Years Override (Optional)
              </label>
              <input
                type="number"
                value={form.yearsOverride ?? ""}
                onChange={(e) => setForm({ ...form, yearsOverride: e.target.value === "" ? null : Number(e.target.value) })}
                placeholder={`Auto-computed: ${calculatedYears}`}
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
              />
              <p className="text-[11px] text-cream-400 font-mono">
                Leave empty to use automatic calculation ({calculatedYears}), or enter a specific number.
              </p>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-4 rounded-xl bg-navy-950 border border-gold-500/30 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-gold-400 tracking-wider font-bold">
              Live Heading Preview on About Page:
            </span>
            <p className="font-serif text-xl sm:text-2xl text-white font-medium">
              "{effectiveYears} Years of Educational Excellence in Batala (Est. {form.establishedYear})"
            </p>
          </div>
        </div>

        {/* Card 3: Contact Telephones & Email */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Phone className="w-5 h-5 text-gold-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Contact Phone Numbers & Email</h3>
                <p className="text-xs text-cream-400 font-mono">Direct reception and office phone lines</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Reception Phone
              </label>
              <input
                type="text"
                value={form.receptionPhone}
                onChange={(e) => setForm({ ...form, receptionPhone: e.target.value })}
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                Office Phone
              </label>
              <input
                type="text"
                value={form.officePhone}
                onChange={(e) => setForm({ ...form, officePhone: e.target.value })}
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300">
                School Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Card 4: Social Media Links */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Youtube className="w-5 h-5 text-red-400" />
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Social Media Channels</h3>
                <p className="text-xs text-cream-400 font-mono">Official YouTube, Facebook, and Instagram links</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-cream-300 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube Channel URL</span>
              </label>
              <input
                type="url"
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/@DrMRSBhalla"
                className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-cream-300 flex items-center gap-2">
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook Page URL</span>
                </label>
                <input
                  type="url"
                  value={form.facebookUrl}
                  onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-cream-300 flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram Profile URL</span>
                </label>
                <input
                  type="url"
                  value={form.instagramUrl}
                  onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-950 border border-white/15 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-mono font-bold uppercase tracking-wider shadow-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* SQL Migration Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-navy-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0B1A30] w-full max-w-3xl rounded-2xl border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-5 h-5 text-gold-400" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Supabase SQL Migration for School Settings</h3>
                  <p className="text-xs text-cream-400 font-mono">Run once in your Supabase SQL Editor</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSqlModalOpen(false)}
                className="p-2 rounded-lg text-cream-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-navy-950 p-4 rounded-xl border border-white/10 font-mono text-xs text-cream-200">
              <pre className="whitespace-pre-wrap">{sqlQueryText}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-xs text-cream-400 font-mono">
                {copiedSql ? "✓ Copied to clipboard!" : "Copy and paste into Supabase SQL editor"}
              </span>
              <button
                type="button"
                onClick={copySql}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? "Copied!" : "Copy SQL Script"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
