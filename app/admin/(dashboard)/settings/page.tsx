"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  Users,
  Settings as SettingsIcon,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserManagement } from "@/components/admin/user-management";

type Tab = "general" | "users";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "OceanNet Technologies",
    email: "",
    phone: "",
    address: "",
    website: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data) setFormData((s) => ({ ...s, ...data }));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) alert("Failed to save settings");
      else {
        // Success toast simulation
      }
    } catch {
      alert("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          Retrieving config strings...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white italic">
              System <span className="text-primary not-italic">Settings</span>
            </h1>
            <p className="text-gray-400 mt-1 uppercase text-[10px] font-bold tracking-widest italic">
              Global Configuration & Access Control
            </p>
          </div>
        </div>

        {/* Top separator line */}
        <hr className="border-t border-white/5 my-2" />

        {/* ── Navigation ─────────────────────────── */}
        <div className="bg-white/5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-white/10 flex gap-1 sm:gap-2 w-full sm:w-auto sm:self-start">
          <button
            onClick={() => setActiveTab("general")}
            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "general"
                ? "bg-primary text-black"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <SettingsIcon size={13} />
            <span>General</span>
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg sm:rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === "users"
                ? "bg-primary text-black"
                : "text-gray-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShieldCheck size={13} />
            <span>Admins</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "general" ? (
          <motion.div
            key="general"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Phone size={120} className="text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-1">
                      <Phone size={14} /> Contact Details
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                      Public communication channels
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Primary Email
                      </label>
                      <div className="relative group/input">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within/input:text-primary"
                          size={16}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-black/40 border border-white/5 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Phone Support
                      </label>
                      <div className="relative group/input">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within/input:text-primary"
                          size={16}
                        />
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full bg-black/40 border border-white/5 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Headquarters Address
                      </label>
                      <div className="relative group/input">
                        <MapPin
                          className="absolute left-4 top-4 text-gray-600 transition-colors group-focus-within/input:text-primary"
                          size={16}
                        />
                        <textarea
                          rows={4}
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="w-full bg-black/40 border border-white/5 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social & Web */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Globe size={120} className="text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2 mb-1">
                      <Share2 size={14} /> Digital Presence
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest italic">
                      Web identity & social links
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Official Website
                      </label>
                      <div className="relative group/input">
                        <Globe
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                          size={16}
                        />
                        <input
                          type="text"
                          value={formData.website}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              website: e.target.value,
                            })
                          }
                          className="w-full bg-black/40 border border-white/5 pl-12 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Facebook Page
                      </label>
                      <input
                        type="text"
                        value={formData.facebook || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, facebook: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/5 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="https://facebook.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        Instagram Profile
                      </label>
                      <input
                        type="text"
                        value={formData.instagram || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instagram: e.target.value,
                          })
                        }
                        className="w-full bg-black/40 border border-white/5 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                        LinkedIn Profile
                      </label>
                      <input
                        type="text"
                        value={formData.linkedin || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/5 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-all"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-black px-12 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-white transition-all transform active:scale-95 shadow-2xl shadow-primary/20"
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Check size={18} strokeWidth={3} />
                  )}
                  Commit Configuration
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <UserManagement />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
