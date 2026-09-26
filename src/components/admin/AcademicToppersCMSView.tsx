"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Trophy, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Upload, 
  Sparkles, 
  Award, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  AlertCircle,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
import { AcademicTopper, DEFAULT_TOPPERS } from "@/lib/constants/toppers";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AcademicToppersCMSView() {
  const [toppers, setToppers] = useState<AcademicTopper[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AcademicTopper | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [formData, setFormData] = useState<Partial<AcademicTopper>>({
    name: "",
    score: "98.0%",
    exam: "PSEB Class 10 Board",
    year: "2024",
    rank: "District Merit",
    badge_text: "DISTINCTION MERIT",
    distinctions: "",
    testimonial: "",
    parent_info: "",
    image_url: "/images/secondary-school.jpg",
    display_order: 1,
    is_active: true
  });

  // Auto-dismiss toast
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fetch toppers
  const fetchToppers = async () => {
    try {
      setLoading(true);
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const res = await fetch("/api/admin/toppers", {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to load toppers (${res.status})`);
      }

      const data = await res.json();
      if (data.toppers && Array.isArray(data.toppers)) {
        setToppers(data.toppers);
      }
    } catch (err: any) {
      console.error("[Toppers CMS] Error fetching:", err);
      setToppers(DEFAULT_TOPPERS);
      setNotification({ message: "Loaded default toppers roster.", type: "success" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToppers();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      score: "98.0%",
      exam: "PSEB Class 10 Board",
      year: new Date().getFullYear().toString(),
      rank: "District Merit",
      badge_text: "DISTINCTION MERIT",
      distinctions: "",
      testimonial: "",
      parent_info: "",
      image_url: "/images/secondary-school.jpg",
      display_order: (toppers.length + 1),
      is_active: true
    });
  };

  const handleEdit = (topper: AcademicTopper) => {
    setEditingId(topper.id);
    setFormData({ ...topper });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const bodyData = new FormData();
      bodyData.append("file", file);
      bodyData.append("key", `topper_${Date.now()}`);

      const res = await fetch("/api/admin/photos/upload", {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: bodyData
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setFormData((prev) => ({ ...prev, image_url: data.url }));
      setNotification({ message: "Student photo uploaded successfully!", type: "success" });
    } catch (err: any) {
      console.error("Photo upload error:", err);
      setNotification({ message: err.message || "Failed to upload image", type: "error" });
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.score) {
      setNotification({ message: "Please provide both student name and score.", type: "error" });
      return;
    }

    try {
      setSaving(true);
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...formData, id: editingId } : formData;

      const res = await fetch("/api/admin/toppers", {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to save topper record");
      }

      setNotification({
        message: editingId ? "Board topper updated successfully!" : "New board topper added to Roll of Honor!",
        type: "success"
      });

      resetForm();
      fetchToppers();
    } catch (err: any) {
      console.error("Save topper error:", err);
      setNotification({ message: err.message || "Could not save topper", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const res = await fetch(`/api/admin/toppers?id=${deleteTarget.id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to delete record");
      }

      setNotification({ message: `"${deleteTarget.name}" removed from Roll of Honor.`, type: "success" });
      setDeleteTarget(null);
      fetchToppers();
    } catch (err: any) {
      console.error("Delete topper error:", err);
      setNotification({ message: err.message || "Delete failed", type: "error" });
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Toast Alert */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border font-mono text-xs animate-in fade-in slide-in-from-bottom-5 duration-300 ${
          notification.type === "success" 
            ? "bg-emerald-950/95 border-emerald-500/50 text-emerald-200" 
            : "bg-rose-950/95 border-rose-500/50 text-rose-200"
        }`}>
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-400" />
            <h2 className="font-serif text-xl font-bold text-white">
              Class 10 Board Toppers & Roll of Honor CMS
            </h2>
          </div>
          <p className="text-xs text-cream-400 font-mono mt-1">
            Manage verified PSEB board distinctions, student marks, ranks, and parent endorsements shown on the live school portal.
          </p>
        </div>

        <button
          onClick={fetchToppers}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cream-200 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Editor Form */}
      <div className="bg-[#0B1A30] p-6 sm:p-8 rounded-2xl border border-gold-500/30 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <h3 className="font-serif text-lg font-bold text-white">
              {editingId ? "Edit Topper Dossier" : "Enroll New Board Topper / Distinction"}
            </h3>
          </div>
          {editingId && (
            <button
              onClick={resetForm}
              className="text-xs font-mono text-cream-400 hover:text-white flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Edit</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Student Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Simranjit Kaur"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Score Percentage */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Board Score / Percentage *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 98.4%"
                value={formData.score || ""}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500 font-bold text-gold-400"
              />
            </div>

            {/* Academic Year */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Passing Year *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2024"
                value={formData.year || ""}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Exam Board */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Exam / Board Name
              </label>
              <input
                type="text"
                placeholder="PSEB Class 10 Board"
                value={formData.exam || ""}
                onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Rank / Accolade */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Distinction Title / Rank
              </label>
              <input
                type="text"
                placeholder="e.g. District Merit · Batala Topper"
                value={formData.rank || ""}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Badge Ribbon */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Card Badge Ribbon
              </label>
              <input
                type="text"
                placeholder="e.g. TOPPER OF BATALA / GOLD MEDALIST"
                value={formData.badge_text || ""}
                onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Subject Distinctions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-cream-300">
              Subject Distinction Breakdown (Visible to Parents)
            </label>
            <input
              type="text"
              placeholder="e.g. Mathematics 100/100 · Science 99/100 · Punjabi 98/100"
              value={formData.distinctions || ""}
              onChange={(e) => setFormData({ ...formData, distinctions: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          {/* Testimonial & Parent Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Student or Parent Testimonial Quote
              </label>
              <textarea
                rows={3}
                placeholder="e.g. The individual teacher guidance and weekly pre-board mock tests at DAV Qila Mandi helped me build concepts without any private tuition."
                value={formData.testimonial || ""}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase text-cream-300">
                Parent Details & Locality (Local Trust Proof)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. D/o S. Gurmeet Singh & Smt. Baljit Kaur (Mandi Road, Batala)"
                value={formData.parent_info || ""}
                onChange={(e) => setFormData({ ...formData, parent_info: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Image & Display Settings */}
          <div className="p-4 bg-navy-950 rounded-xl border border-white/10 space-y-4">
            <label className="block text-xs font-mono uppercase text-gold-400 font-bold">
              Student Photo & Visibility
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0">
                {formData.image_url ? (
                  <Image
                    src={formData.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <GraduationCap className="w-8 h-8 text-cream-400 m-auto mt-6" />
                )}
              </div>

              {/* Upload Input */}
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  placeholder="Image URL or upload file below"
                  value={formData.image_url || ""}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0B1A30] border border-white/15 rounded-lg text-xs text-white"
                />

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-cream-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
                  </button>
                  <span className="text-[11px] text-cream-400 font-mono">
                    JPEG, PNG, WEBP (Max 10MB)
                  </span>
                </div>
              </div>

              {/* Display Order & Active */}
              <div className="flex sm:flex-col items-center gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-cream-300">Order:</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.display_order ?? 1}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                    className="w-16 px-2 py-1 bg-[#0B1A30] border border-white/15 rounded text-xs text-white text-center"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-cream-200">
                  <input
                    type="checkbox"
                    checked={formData.is_active ?? true}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-gold-500 focus:ring-0"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cream-200 text-xs font-mono transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingId ? "Update Topper" : "Add to Roll of Honor"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Existing Toppers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <span>Enrolled Board Toppers</span>
            <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-mono">
              {toppers.length}
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toppers.map((item) => (
            <div
              key={item.id}
              className={`bg-[#0B1A30] rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                editingId === item.id 
                  ? "border-gold-400 ring-2 ring-gold-400/30" 
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/15 shrink-0">
                  <Image
                    src={item.image_url || "/images/secondary-school.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-gold-300 font-bold">
                    #{item.display_order}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="font-serif text-base font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-lg bg-gold-500/20 border border-gold-500/30 text-gold-300 font-mono text-xs font-extrabold shrink-0">
                      {item.score}
                    </span>
                  </div>

                  <p className="text-xs text-cream-400 font-mono truncate mt-0.5">
                    {item.rank || item.exam} · {item.year}
                  </p>

                  {item.distinctions && (
                    <p className="text-[11px] text-cream-300 truncate mt-1">
                      {item.distinctions}
                    </p>
                  )}
                </div>
              </div>

              {item.testimonial && (
                <p className="text-xs text-cream-300/80 italic line-clamp-2 pl-2 border-l border-gold-500/40">
                  &ldquo;{item.testimonial}&rdquo;
                </p>
              )}

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className={`inline-flex items-center gap-1 ${item.is_active ? "text-emerald-400" : "text-zinc-500"}`}>
                  {item.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{item.is_active ? "Visible" : "Hidden"}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cream-200 hover:text-white transition-colors cursor-pointer"
                    title="Edit Record"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1A30] w-full max-w-md rounded-3xl border border-rose-500/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Remove Topper Record
                </h3>
                <p className="text-xs text-cream-400 font-mono">
                  Permanent removal from Roll of Honor
                </p>
              </div>
            </div>

            <p className="text-xs text-cream-200">
              Are you sure you want to remove <strong className="text-gold-400">{deleteTarget.name}</strong> ({deleteTarget.score}, {deleteTarget.year})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-cream-200 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
