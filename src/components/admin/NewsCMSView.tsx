"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Newspaper,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Upload,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  Tag,
  User,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Copy,
  Check,
  FileCode,
  X,
  Loader2,
  Image as ImageIcon
} from "lucide-react";

export interface NewsItem {
  id: string;
  title: string;
  slug?: string;
  category: string;
  excerpt: string;
  content: string[] | string;
  date: string;
  read_time?: string;
  author_name?: string;
  author_role?: string;
  image?: string;
  featured?: boolean;
  status: "published" | "draft" | "archived";
  created_at?: string;
  updated_at?: string;
}

export function NewsCMSView() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Admissions");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formReadTime, setFormReadTime] = useState("3 min read");
  const [formAuthorName, setFormAuthorName] = useState("DAV Editorial Board");
  const [formAuthorRole, setFormAuthorRole] = useState("Dr. MRS Bhalla DAV School Qila Mandi");
  const [formImage, setFormImage] = useState("/images/school-building.png");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");

  // Image upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch news from API
  const fetchNews = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.success && Array.isArray(data.news)) {
        setNewsList(data.news);
        if (data.message && data.source === "fallback") {
          setErrorMsg(data.message);
        }
      } else {
        setErrorMsg(data.error || "Failed to load news.");
      }
    } catch (err: any) {
      setErrorMsg("Network error loading news articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Filtered news list
  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [newsList, searchQuery, categoryFilter]);

  const categories = ["Admissions", "Academics", "Sports", "Heritage", "Notice & Circular", "Student Life", "General"];

  // Open Create Modal
  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormCategory("Admissions");
    setFormExcerpt("");
    setFormContent("");
    setFormDate(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
    setFormReadTime("3 min read");
    setFormAuthorName("DAV Editorial Board");
    setFormAuthorRole("Dr. MRS Bhalla DAV School Qila Mandi");
    setFormImage("/images/school-building.png");
    setFormFeatured(false);
    setFormStatus("published");
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormTitle(item.title || "");
    setFormCategory(item.category || "General");
    setFormExcerpt(item.excerpt || "");
    setFormContent(
      Array.isArray(item.content)
        ? item.content.join("\n\n")
        : typeof item.content === "string"
        ? item.content
        : ""
    );
    setFormDate(item.date || "");
    setFormReadTime(item.read_time || "3 min read");
    setFormAuthorName(item.author_name || "DAV Editorial Board");
    setFormAuthorRole(item.author_role || "Dr. MRS Bhalla DAV School Qila Mandi");
    setFormImage(item.image || "/images/school-building.png");
    setFormFeatured(Boolean(item.featured));
    setFormStatus(item.status === "draft" ? "draft" : "published");
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Handle Image Upload to Supabase bucket
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/news/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormImage(data.url);
        setSuccessMsg("Image uploaded successfully to Supabase Storage bucket ('news-images')!");
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (err: any) {
      setUploadError("Image upload network error.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Article (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim()) {
      setUploadError("Please provide both title and summary excerpt.");
      return;
    }

    setSubmitting(true);
    setUploadError(null);

    const payload = {
      id: editingItem ? editingItem.id : undefined,
      title: formTitle.trim(),
      category: formCategory,
      excerpt: formExcerpt.trim(),
      content: formContent.trim(),
      date: formDate.trim() || "March 2026",
      read_time: formReadTime.trim(),
      author_name: formAuthorName.trim(),
      author_role: formAuthorRole.trim(),
      image: formImage.trim() || "/images/school-building.png",
      featured: formFeatured,
      status: formStatus,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/news", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(editingItem ? "Article updated successfully!" : "Article published successfully!");
        setIsModalOpen(false);
        fetchNews();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setUploadError(data.error || "Failed to save article.");
      }
    } catch (err: any) {
      setUploadError("Network error saving article.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Article
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/news?id=${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Article deleted successfully.");
        setDeleteTarget(null);
        fetchNews();
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        setErrorMsg(data.error || "Failed to delete article.");
      }
    } catch (err: any) {
      setErrorMsg("Network error deleting article.");
    } finally {
      setSubmitting(false);
    }
  };

  const sqlQueryText = `-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/oeqfpyisvpxltzxdozxv/sql/new

CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    excerpt TEXT NOT NULL,
    content TEXT[] NOT NULL DEFAULT '{}',
    date TEXT NOT NULL DEFAULT to_char(now(), 'Mon DD, YYYY'),
    read_time TEXT DEFAULT '3 min read',
    author_name TEXT DEFAULT 'DAV Editorial Board',
    author_role TEXT DEFAULT 'Dr. MRS Bhalla DAV School Qila Mandi',
    image TEXT DEFAULT '/images/school-building.png',
    featured BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read published news" ON public.news FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE POLICY "Allow service_role full access to news" ON public.news FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated admin full access to news" ON public.news FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket 'news-images'
INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public can view news images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'news-images');
CREATE POLICY "Admins can upload news images" ON storage.objects FOR INSERT TO service_role, authenticated WITH CHECK (bucket_id = 'news-images');
CREATE POLICY "Admins can update news images" ON storage.objects FOR UPDATE TO service_role, authenticated USING (bucket_id = 'news-images');
CREATE POLICY "Admins can delete news images" ON storage.objects FOR DELETE TO service_role, authenticated USING (bucket_id = 'news-images');`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlQueryText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert (if notification exists) */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <div className="flex-1">
            <span>{errorMsg}</span>
          </div>
          <button
            onClick={() => setShowSqlModal(true)}
            className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold transition-colors underline shrink-0"
          >
            View SQL Query
          </button>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2.5">
            <Newspaper className="w-6 h-6 text-gold-400" />
            <span>School News & Announcements CMS</span>
          </h2>
          <p className="text-xs text-cream-300 font-mono mt-1">
            Publish school notices, sports achievements, academic circulars and upload media to Supabase storage.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowSqlModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white text-xs font-mono transition-colors"
            title="View Supabase SQL migration script"
          >
            <FileCode className="w-4 h-4 text-gold-400" />
            <span>SQL Schema</span>
          </button>

          <button
            onClick={fetchNews}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white transition-colors"
            title="Refresh News"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0B1A30] p-4 rounded-xl border border-white/10 shadow-xs">
          <span className="text-[10px] font-mono text-cream-400 uppercase tracking-wider block">Total Articles</span>
          <span className="font-serif text-2xl font-bold text-white">{newsList.length}</span>
        </div>
        <div className="bg-[#0B1A30] p-4 rounded-xl border border-white/10 shadow-xs">
          <span className="text-[10px] font-mono text-cream-400 uppercase tracking-wider block">Published</span>
          <span className="font-serif text-2xl font-bold text-emerald-400">
            {newsList.filter((n) => n.status === "published").length}
          </span>
        </div>
        <div className="bg-[#0B1A30] p-4 rounded-xl border border-white/10 shadow-xs">
          <span className="text-[10px] font-mono text-cream-400 uppercase tracking-wider block">Featured</span>
          <span className="font-serif text-2xl font-bold text-gold-400">
            {newsList.filter((n) => n.featured).length}
          </span>
        </div>
        <div className="bg-[#0B1A30] p-4 rounded-xl border border-white/10 shadow-xs">
          <span className="text-[10px] font-mono text-cream-400 uppercase tracking-wider block">Drafts</span>
          <span className="font-serif text-2xl font-bold text-amber-400">
            {newsList.filter((n) => n.status === "draft").length}
          </span>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-[#0B1A30] p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
          <input
            type="text"
            placeholder="Search news by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-navy-950 border border-white/10 rounded-xl text-xs text-white placeholder:text-cream-400/50 focus:outline-none focus:border-gold-400 transition-colors font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-cream-400 shrink-0 hidden sm:block" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-navy-950 border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-gold-400 transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#0B1A30] rounded-2xl border border-white/10 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-cream-300">
            <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
            <span className="font-mono text-xs">Loading news articles from database...</span>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-16 text-center text-cream-400 space-y-2">
            <Newspaper className="w-8 h-8 mx-auto text-cream-500" />
            <p className="font-serif text-lg text-white">No news articles found</p>
            <p className="text-xs font-mono">Create your first article or modify your search filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans text-cream-200">
              <thead className="bg-navy-950/70 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-cream-400">
                <tr>
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-navy-950 border border-white/10">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-cream-400">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            {item.featured && (
                              <span className="px-1.5 py-0.5 rounded bg-gold-400/20 text-gold-300 font-mono text-[9px] font-bold uppercase tracking-wider border border-gold-400/30">
                                Featured
                              </span>
                            )}
                            <h4 className="font-medium text-white line-clamp-1 text-sm">{item.title}</h4>
                          </div>
                          <p className="text-[11px] text-cream-400/80 line-clamp-1">{item.excerpt}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cream-200 text-[10px] font-mono">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-cream-300">
                      {item.date}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                          item.status === "published"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-cream-200 hover:text-white transition-colors"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT ARTICLE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0B1A30] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-white my-auto">
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0B1A30]">
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-gold-400 shrink-0" />
                <span>{editingItem ? "Edit News Article" : "Create New News Article"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-cream-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-8 overflow-y-auto space-y-5 flex-1">

            {uploadError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Title */}
              <div>
                <label className="block text-cream-300 font-mono text-[11px] mb-1 font-semibold">
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Annual Sports Meet 2026 Concludes with Record Trophies"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white placeholder:text-cream-400/40 focus:outline-none focus:border-gold-400 font-sans"
                />
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cream-300 font-mono text-[11px] mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-gold-400 font-mono"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-cream-300 font-mono text-[11px] mb-1 font-semibold">
                    Publish Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white focus:outline-none focus:border-gold-400 font-mono"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Saved in Admin Only)</option>
                  </select>
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="block text-cream-300 font-mono text-[11px] mb-1 font-semibold">
                  Summary Excerpt (Short preview text) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Brief 1-2 sentence synopsis shown on news card cards and social shares..."
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-white/10 text-white placeholder:text-cream-400/40 focus:outline-none focus:border-gold-400 font-sans"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-cream-300 font-mono text-[11px] mb-1 font-semibold">
                  Full Article Body (Separate paragraphs with double Enter)
                </label>
                <textarea
                  rows={5}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Enter the comprehensive story text here. You can write multiple paragraphs..."
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-950 border border-white/10 text-white placeholder:text-cream-400/40 focus:outline-none focus:border-gold-400 font-sans leading-relaxed"
                />
              </div>

              {/* Image Upload to Bucket */}
              <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-cream-300 font-mono text-[11px] font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                    <span>Featured Image (Supabase Storage Bucket)</span>
                  </label>
                  {uploadingImage && (
                    <span className="text-[10px] font-mono text-gold-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Uploading to bucket...
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Image Preview */}
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0">
                    {formImage ? (
                      <Image
                        src={formImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cream-400/50">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-gold-400" />
                        <span>Upload New Image</span>
                      </button>
                      <span className="text-[10px] text-cream-400 font-mono">JPG, PNG, WebP up to 5MB</span>
                    </div>

                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Or paste external/local image URL (e.g. /images/school-building.png)"
                      className="w-full px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-xs font-mono text-cream-200 placeholder:text-cream-400/30"
                    />
                  </div>
                </div>
              </div>

              {/* Date, Read Time, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-cream-300 font-mono text-[10px] mb-1">
                    Display Date
                  </label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. March 2026"
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-cream-300 font-mono text-[10px] mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 3 min read"
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-cream-300 font-mono text-[10px] mb-1">
                    Author Role / Dept
                  </label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    placeholder="e.g. Sports Directorate"
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formFeatured}
                  onChange={(e) => setFormFeatured(e.target.checked)}
                  className="rounded border-white/20 bg-navy-950 text-gold-400 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featuredToggle" className="text-xs text-cream-200 cursor-pointer select-none">
                  Mark as <strong className="text-gold-400 font-semibold">Featured Story</strong> (Highlighted with prominence on homepage)
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white font-mono text-xs transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? "Update Article" : "Publish Article"}</span>
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0B1A30] border border-white/20 rounded-2xl w-full max-w-md p-6 space-y-4 text-white shadow-2xl max-h-[calc(100vh-2rem)] my-auto">
            <div className="flex items-center gap-3 text-rose-400">
              <Trash2 className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-white">Delete News Article?</h3>
            </div>
            <p className="text-xs text-cream-300 font-sans leading-relaxed">
              Are you sure you want to permanently delete:
              <br />
              <strong className="text-white font-semibold">"{deleteTarget.title}"</strong>?
              <br />
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-300 text-xs font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SQL MIGRATION MODAL */}
      {showSqlModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#0B1A30] border border-white/20 rounded-2xl w-full max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[85vh] flex flex-col p-6 space-y-4 text-white shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <div className="flex items-center gap-2 text-gold-400 font-mono text-xs font-bold uppercase tracking-wider">
                <FileCode className="w-4 h-4" />
                <span>Supabase SQL Migration Script</span>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1.5 text-cream-400 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-cream-300 font-sans leading-relaxed">
              Copy this SQL query and run it once in your{" "}
              <a
                href="https://supabase.com/dashboard/project/oeqfpyisvpxltzxdozxv/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 underline font-mono"
              >
                Supabase SQL Editor <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              to create the <code className="text-gold-400 bg-white/10 px-1 py-0.5 rounded font-mono">news</code> table and the{" "}
              <code className="text-gold-400 bg-white/10 px-1 py-0.5 rounded font-mono">news-images</code> storage bucket:
            </p>

            <div className="flex-1 overflow-y-auto bg-navy-950 p-4 rounded-xl border border-white/10 font-mono text-[11px] text-cream-200 select-all whitespace-pre leading-relaxed">
              {sqlQueryText}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-[10px] text-cream-400 font-mono">
                Project ID: <span className="text-white">oeqfpyisvpxltzxdozxv</span>
              </span>
              <button
                onClick={copySqlToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-navy-950" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL Query</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
