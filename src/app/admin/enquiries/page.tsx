"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Search, 
  Filter, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Download, 
  RefreshCw,
  Eye,
  X,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Trash2,
  AlertTriangle,
  Loader2,
  AlertCircle
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface AdmissionEnquiry {
  id: string;
  reference_id: string;
  student_name: string;
  grade_applying: string;
  parent_name: string;
  phone: string;
  email: string;
  city_or_area?: string;
  academic_year?: string;
  message?: string;
  status: "pending" | "contacted" | "admitted" | "rejected" | "archived";
  created_at: string;
}

interface ContactEnquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  status: "pending" | "responded" | "archived";
  created_at: string;
}

interface DeleteTarget {
  id: string;
  type: "admissions" | "contacts";
  title: string;
  subtitle: string;
  referenceId?: string;
}

export default function AdminEnquiriesDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"admissions" | "contacts">("admissions");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Data states
  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionEnquiry | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactEnquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-dismiss toast notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Check auth session and load data
  const fetchData = async () => {
    setLoading(true);
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

      setUserEmail(session.user.email || "Admin");

      // Fetch Admissions
      const { data: admissionData, error: admissionError } = await supabase
        .from("admission_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!admissionError && admissionData) {
        setAdmissions(admissionData as AdmissionEnquiry[]);
      }

      // Fetch Contacts
      const { data: contactData, error: contactError } = await supabase
        .from("contact_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!contactError && contactData) {
        setContacts(contactData as ContactEnquiry[]);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  // Handle Logout
  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    document.cookie = "sb-admin-session=; path=/; max-age=0; SameSite=Lax; Secure";
    router.push("/admin/login");
  };

  // Update Status
  const handleUpdateAdmissionStatus = async (id: string, newStatus: AdmissionEnquiry["status"]) => {
    setUpdatingId(id);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      const { error } = await (supabase
        .from("admission_enquiries") as any)
        .update({ status: newStatus })
        .eq("id", id);

      if (!error) {
        setAdmissions((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedAdmission?.id === id) {
          setSelectedAdmission((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setNotification({ message: "Status updated successfully", type: "success" });
      }
    } catch (err) {
      console.error("Status update error:", err);
      setNotification({ message: "Failed to update status", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: ContactEnquiry["status"]) => {
    setUpdatingId(id);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      const { error } = await (supabase
        .from("contact_enquiries") as any)
        .update({ status: newStatus })
        .eq("id", id);

      if (!error) {
        setContacts((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedContact?.id === id) {
          setSelectedContact((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setNotification({ message: "Status updated successfully", type: "success" });
      }
    } catch (err) {
      console.error("Status update error:", err);
      setNotification({ message: "Failed to update status", type: "error" });
    } finally {
      setUpdatingId(null);
    }
  };

  // Execute Confirmed Deletion
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    const { id, type, title } = deleteTarget;

    try {
      // 1. Try Supabase Client Direct Delete
      const supabase = getSupabaseBrowserClient();
      let deleteSuccess = false;

      if (supabase) {
        const table = type === "admissions" ? "admission_enquiries" : "contact_enquiries";
        const { error: directErr } = await (supabase.from(table) as any)
          .delete()
          .eq("id", id);

        if (!directErr) {
          deleteSuccess = true;
        }
      }

      // 2. Fallback to API route with Service Role if direct RLS blocks
      if (!deleteSuccess) {
        const sessionRes = await supabase?.auth.getSession();
        const accessToken = sessionRes?.data.session?.access_token;
        const res = await fetch("/api/admin/enquiries/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify({ id, type }),
        });
        const resData = await res.json();
        if (resData.success) {
          deleteSuccess = true;
        } else {
          throw new Error(resData.error || "Delete failed");
        }
      }

      if (deleteSuccess) {
        if (type === "admissions") {
          setAdmissions((prev) => prev.filter((item) => item.id !== id));
          if (selectedAdmission?.id === id) setSelectedAdmission(null);
        } else {
          setContacts((prev) => prev.filter((item) => item.id !== id));
          if (selectedContact?.id === id) setSelectedContact(null);
        }
        setNotification({ message: `"${title}" was permanently deleted.`, type: "success" });
        setDeleteTarget(null);
      }
    } catch (err: any) {
      console.error("Delete record error:", err);
      setNotification({ message: err.message || "Failed to delete record.", type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered Admissions
  const filteredAdmissions = useMemo(() => {
    return admissions.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        (item.reference_id && item.reference_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.grade_applying.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [admissions, searchQuery, statusFilter]);

  // Filtered Contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const matchSearch =
        searchQuery === "" ||
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subject && item.subject.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [contacts, searchQuery, statusFilter]);

  // Export to CSV
  const exportToCSV = () => {
    if (activeTab === "admissions") {
      const headers = ["Reference ID,Student Name,Grade Applying,Parent Name,Phone,Email,City/Area,Session,Status,Date\n"];
      const rows = filteredAdmissions.map((a) =>
        `"${a.reference_id}","${a.student_name}","${a.grade_applying}","${a.parent_name}","${a.phone}","${a.email}","${a.city_or_area || ''}","${a.academic_year || ''}","${a.status}","${new Date(a.created_at).toLocaleDateString()}"\n`
      );
      const blob = new Blob([...headers, ...rows], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `admission_enquiries_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } else {
      const headers = ["Full Name,Phone,Email,Subject,Message,Status,Date\n"];
      const rows = filteredContacts.map((c) =>
        `"${c.full_name}","${c.phone}","${c.email}","${c.subject || ''}","${c.message.replace(/"/g, '""')}","${c.status}","${new Date(c.created_at).toLocaleDateString()}"\n`
      );
      const blob = new Blob([...headers, ...rows], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contact_messages_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060F1E] text-white flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-gold-400 animate-spin" />
        <p className="text-xs font-mono tracking-widest text-cream-300 uppercase">
          Verifying Admin Access & Synchronizing Supabase Data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060F1E] text-white flex flex-col relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-mono backdrop-blur-xl ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200"
              : "bg-rose-950/90 border-rose-500/50 text-rose-200"
          }`}>
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-70 p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Admin Navigation Bar */}
      <header className="border-b border-white/10 bg-[#0B1A30]/90 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <Link
            href="/"
            className="flex items-center justify-center p-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-gold-400/50 shadow-sm hover:scale-105 transition-all group"
            title="Return to School Website"
          >
            <Image
              src="/images/logo.png"
              alt="DAV School Logo"
              width={36}
              height={36}
              className="w-8 h-8 object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
              priority
            />
          </Link>
          <div>
            <h1 className="font-serif text-lg font-bold text-white leading-tight">
              Enquiries & Applications Dashboard
            </h1>
            <p className="text-[11px] text-cream-400 font-mono">
              DAV Public School Qilla Mandi • Admin: <span className="text-gold-400">{userEmail}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            title="Refresh Data"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-cream-400 text-xs font-mono uppercase tracking-wider">
              <span>Total Admissions</span>
              <GraduationCap className="w-4 h-4 text-gold-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">{admissions.length}</p>
            <p className="text-[11px] text-cream-400 font-mono">Session 2026-2027</p>
          </div>

          <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-cream-400 text-xs font-mono uppercase tracking-wider">
              <span>Pending Reviews</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-amber-300">
              {admissions.filter((a) => a.status === "pending").length + contacts.filter((c) => c.status === "pending").length}
            </p>
            <p className="text-[11px] text-cream-400 font-mono">Requires Counselor Call</p>
          </div>

          <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-cream-400 text-xs font-mono uppercase tracking-wider">
              <span>Contact Inquiries</span>
              <MessageSquare className="w-4 h-4 text-sky-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-white">{contacts.length}</p>
            <p className="text-[11px] text-cream-400 font-mono">Direct Messages</p>
          </div>

          <div className="bg-[#0B1A30] p-6 rounded-2xl border border-white/10 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-cream-400 text-xs font-mono uppercase tracking-wider">
              <span>Admitted / Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-serif text-3xl font-bold text-emerald-300">
              {admissions.filter((a) => a.status === "admitted").length}
            </p>
            <p className="text-[11px] text-cream-400 font-mono">Enrolments Completed</p>
          </div>
        </div>

        {/* Control & Tab Bar */}
        <div className="bg-[#0B1A30] p-4 sm:p-6 rounded-2xl border border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-navy-950 p-1.5 rounded-xl border border-white/10">
              <button
                onClick={() => {
                  setActiveTab("admissions");
                  setStatusFilter("all");
                }}
                className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  activeTab === "admissions"
                    ? "bg-gold-500 text-navy-950 shadow-md font-extrabold"
                    : "text-cream-300 hover:text-white"
                }`}
              >
                Admission Enquiries ({admissions.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab("contacts");
                  setStatusFilter("all");
                }}
                className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  activeTab === "contacts"
                    ? "bg-gold-500 text-navy-950 shadow-md font-extrabold"
                    : "text-cream-300 hover:text-white"
                }`}
              >
                Contact Inquiries ({contacts.length})
              </button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder:text-cream-400/40"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-navy-950 border border-white/15 rounded-xl text-xs font-mono font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="admitted">Admitted</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#0B1A30] rounded-2xl border border-white/10 overflow-hidden shadow-sm">
          {activeTab === "admissions" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-navy-950 border-b border-white/10 text-cream-400 uppercase font-mono tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Ref ID</th>
                    <th className="px-6 py-4">Student & Grade</th>
                    <th className="px-6 py-4">Parent Details</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAdmissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-cream-400 font-mono text-xs">
                        No admission enquiries found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAdmissions.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-gold-400">
                          {item.reference_id || `ID-${item.id.slice(0, 6)}`}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-white text-sm">{item.student_name}</p>
                          <span className="inline-block px-2 py-0.5 mt-1 rounded bg-cream-100/10 text-cream-200 font-mono text-[10px]">
                            Grade: {item.grade_applying}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <p className="text-white font-medium">{item.parent_name}</p>
                          <p className="text-cream-400 font-mono text-[11px] flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-gold-400" />
                            <a href={`tel:${item.phone}`} className="hover:text-white">{item.phone}</a>
                          </p>
                        </td>
                        <td className="px-6 py-4 text-cream-300">
                          {item.city_or_area || "Batala"}
                        </td>
                        <td className="px-6 py-4 font-mono text-cream-400">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            disabled={updatingId === item.id}
                            value={item.status}
                            onChange={(e) => handleUpdateAdmissionStatus(item.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold border ${
                              item.status === "admitted"
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                                : item.status === "contacted"
                                ? "bg-sky-500/15 border-sky-500/40 text-sky-300"
                                : item.status === "archived"
                                ? "bg-zinc-500/15 border-zinc-500/40 text-zinc-300"
                                : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="admitted">Admitted</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedAdmission(item)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({
                                id: item.id,
                                type: "admissions",
                                title: item.student_name,
                                subtitle: `Grade: ${item.grade_applying} • Parent: ${item.parent_name}`,
                                referenceId: item.reference_id
                              })}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors border border-rose-500/20"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Contact Messages Table */
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-navy-950 border-b border-white/10 text-cream-400 uppercase font-mono tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Contact Details</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-cream-400 font-mono text-xs">
                        No contact inquiries found matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-white text-sm">{item.full_name}</p>
                        </td>
                        <td className="px-6 py-4 space-y-1 font-mono text-[11px]">
                          <p className="text-cream-300">{item.phone}</p>
                          <p className="text-cream-400">{item.email}</p>
                        </td>
                        <td className="px-6 py-4 text-cream-300 max-w-xs truncate">
                          {item.subject || "General Inquiry"}
                        </td>
                        <td className="px-6 py-4 font-mono text-cream-400">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            disabled={updatingId === item.id}
                            value={item.status}
                            onChange={(e) => handleUpdateContactStatus(item.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase font-bold border ${
                              item.status === "responded"
                                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                                : item.status === "archived"
                                ? "bg-zinc-500/15 border-zinc-500/40 text-zinc-300"
                                : "bg-amber-500/15 border-amber-500/40 text-amber-300"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="responded">Responded</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedContact(item)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white transition-colors"
                              title="View Full Message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteTarget({
                                id: item.id,
                                type: "contacts",
                                title: item.full_name,
                                subtitle: `Email: ${item.email} • Phone: ${item.phone}`,
                                referenceId: `MSG-${item.id.slice(0, 6)}`
                              })}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors border border-rose-500/20"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Professional Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1A30] w-full max-w-md rounded-3xl border border-rose-500/30 p-6 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(244,63,94,0.18)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Delete {deleteTarget.type === "admissions" ? "Admission Enquiry" : "Contact Message"}
                </h3>
                <p className="text-xs text-cream-400 font-mono">
                  Permanent Database Removal
                </p>
              </div>
            </div>

            {/* Target Item Dossier Card */}
            <div className="bg-navy-950 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-cream-400">Record:</span>
                <span className="text-gold-400 font-bold">{deleteTarget.referenceId || "ID Ref"}</span>
              </div>
              <p className="font-bold text-white text-sm">{deleteTarget.title}</p>
              <p className="text-xs text-cream-300 font-mono">{deleteTarget.subtitle}</p>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-rose-300/90 bg-rose-500/10 p-3.5 rounded-xl border border-rose-500/20 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>
                Warning: This record will be permanently deleted from the database. This action cannot be undone.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cream-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-rose-900/40 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admission Enquiry Detail Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1A30] w-full max-w-xl rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400 block">
                  Admission Enquiry Dossier
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {selectedAdmission.student_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAdmission(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Reference ID</span>
                <p className="font-bold text-gold-400">{selectedAdmission.reference_id}</p>
              </div>
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Grade Applying</span>
                <p className="font-bold text-white">{selectedAdmission.grade_applying}</p>
              </div>
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Parent / Guardian</span>
                <p className="font-bold text-white">{selectedAdmission.parent_name}</p>
              </div>
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Contact Phone</span>
                <p className="font-bold text-white">
                  <a href={`tel:${selectedAdmission.phone}`} className="hover:underline">{selectedAdmission.phone}</a>
                </p>
              </div>
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1 col-span-2">
                <span className="text-cream-400 text-[10px] uppercase">Parent Email</span>
                <p className="font-bold text-white">{selectedAdmission.email || "Not provided"}</p>
              </div>
              {selectedAdmission.city_or_area && (
                <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1 col-span-2">
                  <span className="text-cream-400 text-[10px] uppercase">Location / Area</span>
                  <p className="font-bold text-white">{selectedAdmission.city_or_area}</p>
                </div>
              )}
            </div>

            {selectedAdmission.message && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream-400">
                  Notes / Questions from Parent:
                </span>
                <p className="p-4 bg-navy-950 rounded-2xl border border-white/10 text-xs text-cream-200 leading-relaxed font-light">
                  {selectedAdmission.message}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setDeleteTarget({
                    id: selectedAdmission.id,
                    type: "admissions",
                    title: selectedAdmission.student_name,
                    subtitle: `Grade: ${selectedAdmission.grade_applying} • Parent: ${selectedAdmission.parent_name}`,
                    referenceId: selectedAdmission.reference_id
                  });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedAdmission(null)}
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase font-mono tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Inquiry Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B1A30] w-full max-w-xl rounded-3xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-400 block">
                  Contact Inquiry Message
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  {selectedContact.full_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-cream-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Phone</span>
                <p className="font-bold text-white">
                  <a href={`tel:${selectedContact.phone}`} className="hover:underline">{selectedContact.phone || "Not provided"}</a>
                </p>
              </div>
              <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-cream-400 text-[10px] uppercase">Email</span>
                <p className="font-bold text-white">{selectedContact.email || "Not provided"}</p>
              </div>
              {selectedContact.subject && (
                <div className="bg-navy-950 p-3.5 rounded-2xl border border-white/10 space-y-1 col-span-2">
                  <span className="text-cream-400 text-[10px] uppercase">Subject</span>
                  <p className="font-bold text-gold-300">{selectedContact.subject}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cream-400">
                Message Content:
              </span>
              <p className="p-4 bg-navy-950 rounded-2xl border border-white/10 text-xs text-cream-200 leading-relaxed font-light whitespace-pre-wrap">
                {selectedContact.message}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  setDeleteTarget({
                    id: selectedContact.id,
                    type: "contacts",
                    title: selectedContact.full_name,
                    subtitle: `Email: ${selectedContact.email} • Phone: ${selectedContact.phone}`,
                    referenceId: `MSG-${selectedContact.id.slice(0, 6)}`
                  });
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase font-mono tracking-wider transition-colors shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedContact(null)}
                className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase font-mono tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
