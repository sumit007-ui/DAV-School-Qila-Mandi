"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  Database,
  Upload,
  RefreshCw,
  Search,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Eye,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  FolderOpen,
  HardDrive,
  Layers,
  Sparkles,
  Grid,
  List
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface BucketDef {
  id: string;
  name: string;
  description: string;
}

interface StorageFile {
  id: string;
  name: string;
  path: string;
  size: number;
  mimetype: string;
  created_at: string;
  updated_at: string;
  publicUrl: string;
}

const DEFAULT_BUCKETS: BucketDef[] = [
  { id: "website-photos", name: "Website Photos", description: "Banners, hero images, and layout media" },
  { id: "news-images", name: "News & Dispatches", description: "News stories, notices, and press releases" },
  { id: "gallery-media", name: "Gallery & Events", description: "Campus albums, annual day, and sports meet" },
  { id: "avatars", name: "Avatars & Portraits", description: "Leadership, faculty, and student topper photos" }
];

export function StorageBucketCMSView() {
  const [buckets, setBuckets] = useState<BucketDef[]>(DEFAULT_BUCKETS);
  const [activeBucket, setActiveBucket] = useState<string>("website-photos");
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [previewFile, setPreviewFile] = useState<StorageFile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StorageFile | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fetch files for active bucket
  const fetchBucketFiles = async (bucketId = activeBucket) => {
    try {
      setLoading(true);
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const res = await fetch(`/api/admin/storage?bucket=${bucketId}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to load storage files (${res.status})`);
      }

      const data = await res.json();
      if (data.buckets && Array.isArray(data.buckets)) {
        setBuckets(data.buckets);
      }
      if (data.files && Array.isArray(data.files)) {
        setFiles(data.files);
      } else {
        setFiles([]);
      }
    } catch (err: any) {
      console.error("[Storage CMS] Error:", err);
      setNotification({ message: err.message || "Failed to load bucket files", type: "error" });
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBucketFiles(activeBucket);
  }, [activeBucket]);

  // Handle direct file upload into active bucket
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    try {
      setUploading(true);
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("bucket", activeBucket);

      const res = await fetch("/api/admin/storage", {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "File upload failed");
      }

      setNotification({
        message: `Successfully uploaded "${data.filename}" to bucket [${activeBucket}]!`,
        type: "success"
      });

      fetchBucketFiles(activeBucket);
    } catch (err: any) {
      console.error("[Storage Upload Error]:", err);
      setNotification({ message: err.message || "Could not upload file", type: "error" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle file deletion
  const handleDeleteFile = async () => {
    if (!deleteTarget) return;

    try {
      const supabase = getSupabaseBrowserClient();
      const sessionRes = await supabase?.auth.getSession();
      const token = sessionRes?.data.session?.access_token;

      const res = await fetch(
        `/api/admin/storage?bucket=${activeBucket}&filename=${encodeURIComponent(deleteTarget.name)}`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        }
      );

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "File deletion failed");
      }

      setNotification({
        message: `Permanently deleted "${deleteTarget.name}" from [${activeBucket}].`,
        type: "success"
      });

      setDeleteTarget(null);
      fetchBucketFiles(activeBucket);
    } catch (err: any) {
      console.error("[Storage Delete Error]:", err);
      setNotification({ message: err.message || "Could not delete file", type: "error" });
    }
  };

  // Copy URL with visual feedback
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Filtered files
  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    const q = searchQuery.toLowerCase();
    return files.filter((f) => f.name.toLowerCase().includes(q));
  }, [files, searchQuery]);

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  // Calculate total size
  const totalBytes = useMemo(() => {
    return files.reduce((acc, curr) => acc + (curr.size || 0), 0);
  }, [files]);

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 border font-mono text-xs animate-in fade-in slide-in-from-bottom-5 duration-300 ${
            notification.type === "success"
              ? "bg-emerald-950/95 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/95 border-rose-500/50 text-rose-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-gold-400" />
            <h2 className="font-serif text-xl font-bold text-white">
              Supabase Storage Buckets & Media Manager
            </h2>
          </div>
          <p className="text-xs text-cream-400 font-mono mt-1">
            Direct file browser for your Supabase S3 storage buckets. Upload, preview, copy public CDN links, and manage physical media assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchBucketFiles(activeBucket)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cream-200 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Bucket</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? "Uploading..." : `Upload to [${activeBucket}]`}</span>
          </button>
        </div>
      </div>

      {/* Bucket Selector Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {buckets.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBucket(b.id)}
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
              activeBucket === b.id
                ? "bg-[#0B1A30] border-gold-400 shadow-md ring-1 ring-gold-400/40"
                : "bg-navy-950/60 border-white/10 hover:border-white/20 hover:bg-[#0B1A30]/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                {b.name}
              </span>
              <HardDrive className={`w-4 h-4 ${activeBucket === b.id ? "text-gold-400" : "text-cream-400/50"}`} />
            </div>
            <p className="text-[11px] text-cream-400 font-mono mt-1 line-clamp-1">
              {b.description}
            </p>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-cream-400/70">
              <span>Bucket ID: {b.id}</span>
              {activeBucket === b.id && (
                <span className="px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 font-bold">
                  ACTIVE
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Control & Filter Strip */}
      <div className="bg-[#0B1A30] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
          <input
            type="text"
            placeholder={`Search ${files.length} files in [${activeBucket}]...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-navy-950 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
          />
        </div>

        {/* Bucket Stats & Layout Toggle */}
        <div className="flex items-center gap-4 text-xs font-mono text-cream-300">
          <div className="flex items-center gap-3">
            <span>
              <strong>{filteredFiles.length}</strong> items
            </span>
            <span className="text-white/20">|</span>
            <span>
              Total: <strong>{formatSize(totalBytes)}</strong>
            </span>
          </div>

          <div className="flex items-center bg-navy-950 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-white/15 text-white" : "text-cream-400 hover:text-white"}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-white/15 text-white" : "text-cream-400 hover:text-white"}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Content Area */}
      {loading ? (
        <div className="bg-[#0B1A30] p-12 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="w-7 h-7 text-gold-400 animate-spin" />
          <p className="text-xs font-mono text-cream-300 uppercase tracking-wider">
            Fetching files from Supabase bucket [{activeBucket}]...
          </p>
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="bg-[#0B1A30] p-12 rounded-2xl border border-dashed border-white/15 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cream-400">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="font-serif text-base font-bold text-white">
              No files found in bucket [{activeBucket}]
            </p>
            <p className="text-xs text-cream-400 font-mono">
              Upload your first banner, student portrait, or document using the button above.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload File Now</span>
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const isImage = file.mimetype.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);

            return (
              <div
                key={file.id}
                className="bg-[#0B1A30] rounded-xl border border-white/10 overflow-hidden hover:border-gold-400/50 transition-all flex flex-col justify-between group shadow-sm"
              >
                {/* Image Thumbnail */}
                <div
                  onClick={() => setPreviewFile(file)}
                  className="relative aspect-square w-full bg-black/40 overflow-hidden cursor-pointer"
                >
                  {isImage ? (
                    <Image
                      src={file.publicUrl}
                      alt={file.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-cream-400">
                      <FileText className="w-10 h-10 text-gold-400 mb-1" />
                      <span className="text-[10px] font-mono uppercase font-bold">PDF FILE</span>
                    </div>
                  )}

                  {/* Hover Overlay with Preview Icon */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </span>
                  </div>

                  {/* Size Pill */}
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-[9px] font-mono text-cream-300 font-semibold">
                    {formatSize(file.size)}
                  </div>
                </div>

                {/* File Metadata & Actions */}
                <div className="p-3 space-y-2 bg-[#0B1A30]">
                  <p
                    className="text-xs font-mono font-medium text-white truncate"
                    title={file.name}
                  >
                    {file.name}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <button
                      onClick={() => handleCopyUrl(file.publicUrl)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        copiedUrl === file.publicUrl
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white"
                      }`}
                      title="Copy Public CDN URL"
                    >
                      {copiedUrl === file.publicUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gold-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setDeleteTarget(file)}
                      className="p-1 rounded text-cream-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Delete File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-[#0B1A30] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-navy-950 border-b border-white/10 text-cream-400 uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Filename</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div
                      onClick={() => setPreviewFile(file)}
                      className="relative w-10 h-10 rounded overflow-hidden bg-black/40 cursor-pointer shrink-0"
                    >
                      <Image
                        src={file.publicUrl}
                        alt={file.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white font-medium max-w-xs truncate">
                    {file.name}
                  </td>
                  <td className="px-4 py-3 text-cream-400">{formatSize(file.size)}</td>
                  <td className="px-4 py-3 text-cream-400 uppercase text-[10px]">
                    {file.name.split(".").pop() || "IMG"}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => handleCopyUrl(file.publicUrl)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-cream-200 text-[10px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedUrl === file.publicUrl ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gold-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteTarget(file)}
                      className="p-1 rounded text-cream-400 hover:text-rose-400 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Full Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#0B1A30] w-full max-w-2xl rounded-3xl border border-white/20 p-6 space-y-4 shadow-2xl max-h-[calc(100vh-2rem)] flex flex-col my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
              <div>
                <h3 className="font-serif text-lg font-bold text-white truncate max-w-md">
                  {previewFile.name}
                </h3>
                <p className="text-[11px] font-mono text-cream-400">
                  Bucket: <span className="text-gold-400">{activeBucket}</span> • {formatSize(previewFile.size)}
                </p>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* High Res View */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
              <Image
                src={previewFile.publicUrl}
                alt={previewFile.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Public CDN URL Strip */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-cream-300">
                Public Supabase CDN Link:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={previewFile.publicUrl}
                  className="flex-1 px-3 py-2 bg-navy-950 border border-white/15 rounded-xl text-xs font-mono text-cream-200 select-all"
                />
                <button
                  onClick={() => handleCopyUrl(previewFile.publicUrl)}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  {copiedUrl === previewFile.publicUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
              <a
                href={previewFile.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const target = previewFile;
                  setPreviewFile(null);
                  setDeleteTarget(target);
                }}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-[#0B1A30] w-full max-w-md rounded-3xl border border-rose-500/30 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[calc(100vh-2rem)] my-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  Permanently Delete File
                </h3>
                <p className="text-xs text-cream-400 font-mono">
                  Storage Bucket: [{activeBucket}]
                </p>
              </div>
            </div>

            <p className="text-xs text-cream-200">
              Are you sure you want to permanently delete <strong className="text-gold-400">{deleteTarget.name}</strong>? Any pages or articles referencing this image URL will lose access to it.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-cream-200 hover:text-white text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteFile}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
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
