"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, 
  ArrowLeft, 
  GraduationCap, 
  ShieldCheck, 
  RefreshCw,
  Newspaper,
  Trophy,
  Database
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { NewsCMSView } from "@/components/admin/NewsCMSView";

export default function AdminNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        if (!supabase) {
          router.push("/admin/login");
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push("/admin/login");
          return;
        }

        setUserEmail(session.user.email ?? "admin@davbatala.in");
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.error("Sign out error:", e);
    }
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center text-white space-y-4 font-mono text-xs">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-cream-400 tracking-wider uppercase">Loading News CMS...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0B1A30]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 font-serif font-black text-sm shrink-0 hover:bg-gold-500/20 transition-colors"
            title="Back to Dashboard"
          >
            DAV
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-white leading-tight">
                News & Dispatches CMS
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-mono uppercase tracking-wider border border-gold-500/30">
                Storage: news-images
              </span>
            </div>
            <p className="text-[11px] text-cream-400 font-mono">
              DAV Public School Qila Mandi • Admin: <span className="text-gold-400">{userEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <GraduationCap className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Admissions & Enquiries</span>
          </Link>

          <Link
            href="/admin/toppers"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Roll of Honor</span>
          </Link>

          <Link
            href="/admin/buckets"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Buckets</span>
          </Link>

          <Link
            href="/news"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white text-xs font-mono font-medium transition-colors"
          >
            <Newspaper className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Live News Page ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsCMSView />
      </main>
    </div>
  );
}
