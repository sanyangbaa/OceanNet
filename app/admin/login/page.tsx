"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Eye,
  EyeOff,
  Lock,
  Loader2,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-sm">
          <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />

          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center shadow-xl shadow-primary/20">
                  <Building2 className="text-primary h-8 w-8" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#060606] flex items-center justify-center">
                  <ShieldCheck size={10} className="text-black" />
                </div>
              </div>

              <h1 className="text-xl font-black text-white tracking-tight">
                ONT <span className="text-primary">Admin</span>
              </h1>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] mt-1">
                Authorized Access Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all placeholder:text-gray-700 font-medium"
                    placeholder="Enter your username"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={14}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] text-white text-sm pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all placeholder:text-gray-700 font-medium"
                    placeholder="••••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium p-3 rounded-xl text-center"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black py-3 rounded-xl font-black uppercase tracking-widest text-xs mt-2 hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Verifying...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>
          </div>

          <div className="px-8 pb-6 text-center">
            <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} OceanNet Technologies.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-5">
          <ShieldCheck size={12} className="text-gray-700" />
          <p className="text-[10px] text-gray-700 font-medium">
            Secured · Encrypted connection
          </p>
        </div>
      </motion.div>
    </div>
  );
}
