"use client";

import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Edit,
  X,
  Check,
  Search,
  Key,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminUser {
  id: string;
  username: string;
  role: "super_admin" | "admin" | "editor";
  createdAt: string;
}

export function UserManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin" as "super_admin" | "admin" | "editor",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/admins");
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (admin?: AdminUser) => {
    if (admin) {
      setEditingAdmin(admin);
      setFormData({
        username: admin.username,
        password: "", // Don't show password
        role: admin.role,
      });
    } else {
      setEditingAdmin(null);
      setFormData({
        username: "",
        password: "",
        role: "admin",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const method = editingAdmin ? "PATCH" : "POST";
    const url = editingAdmin
      ? `/api/admin/admins/${editingAdmin.id}`
      : "/api/admin/admins";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchAdmins();
        setIsModalOpen(false);
      } else {
        const error = await res.json();
        alert(error.error || "Operation failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin account?")) return;

    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      if (res.ok) fetchAdmins();
      else {
        const error = await res.json();
        alert(error.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <ShieldCheck className="text-primary" size={16} />;
      case "admin":
        return <Shield className="text-blue-400" size={16} />;
      default:
        return <ShieldAlert className="text-gray-500" size={16} />;
    }
  };

  const getRoleLabel = (role: string) => {
    return role.replace("_", " ").toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-widest italic">
            System{" "}
            <span className="text-primary font-light not-italic">
              Administrators
            </span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Manage accounts and permissions for the ONT Admin Panel.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-black font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all transform active:scale-95 text-xs uppercase tracking-widest shadow-lg shadow-primary/20 w-full sm:w-auto"
        >
          <UserPlus size={16} />
          Create Account
        </button>
      </div>

      {/* Mobile card list — hidden on md+ */}
      <div className="flex flex-col gap-3 md:hidden">
        {loading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white/5 border border-white/10 rounded-2xl p-4 h-20" />
            ))
          : admins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                    <User size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white uppercase tracking-tight truncate">
                      {admin.username}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {getRoleIcon(admin.role)}
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        admin.role === "super_admin" ? "text-primary" : "text-gray-400"
                      }`}>
                        {getRoleLabel(admin.role)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenModal(admin)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        {!loading && admins.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm">No admins found.</div>
        )}
      </div>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Security Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={3} className="px-6 py-8 bg-white/[0.02]"></td>
                  </tr>
                ))
              : admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors shrink-0">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white uppercase tracking-tighter truncate">
                            {admin.username}
                          </p>
                          <p className="text-[10px] text-gray-600 font-medium tracking-widest uppercase truncate">
                            ID: {admin.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-lg ${
                            admin.role === "super_admin" ? "bg-primary/10" : "bg-white/5"
                          } shrink-0`}
                        >
                          {getRoleIcon(admin.role)}
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest truncate ${
                            admin.role === "super_admin" ? "text-primary" : "text-gray-400"
                          }`}
                        >
                          {getRoleLabel(admin.role)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(admin)}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">
                  {editingAdmin ? "Modify" : "New"}{" "}
                  <span className="text-primary not-italic">Account</span>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-all"
                    placeholder="admin_name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {editingAdmin
                      ? "New Password (leave empty to keep same)"
                      : "Account Password"}
                  </label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 h-4 w-4" />
                    <input
                      type="password"
                      required={!editingAdmin}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Access Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as any })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary transition-all appearance-none text-white"
                  >
                    <option value="super_admin">
                      Super Admin (Full Access)
                    </option>
                    <option value="admin">Administrator (Manager)</option>
                    <option value="editor">Editor (Content Only)</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary text-black font-black py-4 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Check size={18} strokeWidth={3} />
                    )}
                    {editingAdmin ? "Update Account" : "Create Account"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
