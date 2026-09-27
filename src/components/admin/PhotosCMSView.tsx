"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  RotateCcw, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ExternalLink, 
  FileCode, 
  Copy, 
  Check, 
  X, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";

export interface PhotoSlot {
  key: string;
  page: string;
  title: string;
  section: string;
  url: string;
  default_url?: string;
  defaultUrl?: string;
  alt?: string;
  updated_at?: string;
}

export function PhotosCMSView() {
  const [photos, setPhotos] = useState<PhotoSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [editingUrlKey, setEditingUrlKey] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState("");
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/photos");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.items)) {
          setPhotos(data.items);
        }
      }
    } catch (e) {
      console.warn("Could not load photos, falling back.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  // Filter photos
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchesPage = activeTab === "All" || p.page.toLowerCase().includes(activeTab.toLowerCase());
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.key.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPage && matchesSearch;
    });
  }, [photos, activeTab, searchQuery]);

  const pages = ["All", "Home Page", "About Page", "Learning Journey", "Facilities", "Student Life"];

  // Handle file upload
  const handleFileUpload = async (slotKey: string, file: File) => {
    setUploadingKey(slotKey);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", slotKey);

      const res = await fetch("/api/admin/photos/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Upload failed");
      }

      setPhotos((prev) =>
        prev.map((item) => (item.key === slotKey ? { ...item, url: data.url } : item))
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("website_photos_updated"));
      }

      setSuccessMsg(`Photo updated successfully and saved in Supabase bucket!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload photo");
    } finally {
      setUploadingKey(null);
    }
  };

  // Handle direct URL edit
  const handleSaveUrl = async (slotKey: string) => {
    if (!tempUrl.trim()) return;
    setUploadingKey(slotKey);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: slotKey, url: tempUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Save failed");
      }

      setPhotos((prev) =>
        prev.map((item) => (item.key === slotKey ? { ...item, url: tempUrl.trim() } : item))
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("website_photos_updated"));
      }

      setEditingUrlKey(null);
      setTempUrl("");
      setSuccessMsg("Photo URL saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update photo URL");
    } finally {
      setUploadingKey(null);
    }
  };

  // Reset to default
  const handleResetToDefault = async (slotKey: string) => {
    setUploadingKey(slotKey);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/photos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: slotKey, reset: true }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Reset failed");
      }

      const defaultUrl = photos.find((p) => p.key === slotKey)?.default_url || photos.find((p) => p.key === slotKey)?.defaultUrl || data.item?.url;

      setPhotos((prev) =>
        prev.map((item) => (item.key === slotKey ? { ...item, url: defaultUrl } : item))
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("website_photos_updated"));
      }

      setSuccessMsg("Restored original default photo!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reset photo");
    } finally {
      setUploadingKey(null);
    }
  };

  const sqlQueryText = `-- SQL to create website_photos table and storage bucket in Supabase
CREATE TABLE IF NOT EXISTS public.website_photos (
    key TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    title TEXT NOT NULL,
    section TEXT NOT NULL,
    url TEXT NOT NULL,
    default_url TEXT NOT NULL,
    alt TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO storage.buckets (id, name, public)
VALUES ('website-photos', 'website-photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

ALTER TABLE public.website_photos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read for website_photos" ON public.website_photos;
CREATE POLICY "Allow public read for website_photos" ON public.website_photos FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow authenticated admins full access to website_photos" ON public.website_photos;
CREATE POLICY "Allow authenticated admins full access to website_photos" ON public.website_photos FOR ALL TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role full access to website_photos" ON public.website_photos;
CREATE POLICY "Allow service role full access to website_photos" ON public.website_photos FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access to website photos" ON storage.objects;
CREATE POLICY "Allow public read access to website photos" ON storage.objects FOR SELECT USING (bucket_id = 'website-photos');
DROP POLICY IF EXISTS "Allow authorized users to upload website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to upload website photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'website-photos');
DROP POLICY IF EXISTS "Allow authorized users to update website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to update website photos" ON storage.objects FOR UPDATE USING (bucket_id = 'website-photos');
DROP POLICY IF EXISTS "Allow authorized users to delete website photos" ON storage.objects;
CREATE POLICY "Allow authorized users to delete website photos" ON storage.objects FOR DELETE USING (bucket_id = 'website-photos');`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlQueryText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center space-y-3 font-mono text-xs text-cream-300">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
        <p className="tracking-wider uppercase">Loading Website Photos Manager...</p>
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
              <Camera className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">Website Photos & Media CMS</h2>
          </div>
          <p className="text-xs text-cream-300 font-mono mt-1">
            Change any photo on any page directly. Images upload to Supabase Storage bucket <strong className="text-gold-300">`website-photos`</strong>.
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
            onClick={fetchPhotos}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cream-200 hover:text-white transition-colors cursor-pointer"
            title="Refresh Photos"
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

      {/* Filters and Search Bar */}
      <div className="bg-[#0B1A30] p-4 sm:p-6 rounded-2xl border border-white/10 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Page Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setActiveTab(page)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === page
                    ? "bg-gold-500 text-navy-950 shadow-md font-extrabold"
                    : "bg-navy-950 text-cream-300 hover:text-white border border-white/10"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:w-64 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
            <input
              type="text"
              placeholder="Search photo, page, section..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
            />
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => {
          const defaultImage = photo.default_url || photo.defaultUrl || "";
          const isCustom = defaultImage && photo.url !== defaultImage;
          const isUploading = uploadingKey === photo.key;

          return (
            <div
              key={photo.key}
              className="bg-[#0B1A30] rounded-2xl border border-white/10 overflow-hidden shadow-sm flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
            >
              {/* Photo Image Card */}
              <div>
                <div className="relative aspect-[16/10] bg-navy-950 overflow-hidden border-b border-white/10">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-gold-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-white/10">
                      {photo.page}
                    </span>
                    {isCustom && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[9px] font-mono uppercase font-bold">
                        Custom
                      </span>
                    )}
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-gold-300 space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-xs font-mono uppercase tracking-wider">Uploading to Bucket...</span>
                    </div>
                  )}
                </div>

                {/* Card Meta */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-cream-400 uppercase tracking-wider block">
                    {photo.section}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white leading-tight">
                    {photo.title}
                  </h4>
                  <p className="text-[11px] font-mono text-cream-400 truncate" title={photo.url}>
                    URL: {photo.url}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-3">
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  ref={(el) => {
                    fileInputRefs.current[photo.key] = el;
                  }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(photo.key, file);
                  }}
                  className="hidden"
                />

                {/* Direct URL input if editing */}
                {editingUrlKey === photo.key ? (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-navy-950 border border-white/20 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveUrl(photo.key)}
                        disabled={isUploading}
                        className="flex-1 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                      >
                        Save URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingUrlKey(null);
                          setTempUrl("");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cream-300 text-xs font-mono transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRefs.current[photo.key]?.click()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingUrlKey(photo.key);
                        setTempUrl(photo.url);
                      }}
                      title="Paste Direct Web Link"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-cream-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                    </button>

                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleResetToDefault(photo.key)}
                        disabled={isUploading}
                        title="Reset to Original Default Photo"
                        className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="p-12 text-center bg-[#0B1A30] rounded-2xl border border-white/10 text-cream-400 font-mono text-xs">
          No photos found matching your search criteria.
        </div>
      )}

      {/* SQL Migration Modal */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-navy-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#0B1A30] w-full max-w-3xl rounded-2xl border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-5 h-5 text-gold-400" />
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Supabase SQL Migration for Website Photos</h3>
                  <p className="text-xs text-cream-400 font-mono">Creates website_photos table and storage bucket</p>
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
