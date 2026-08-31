"use client";

import {
  Bell,
  User,
  Search,
  Settings,
  ChevronDown,
  Briefcase,
  Wrench,
  Users,
  MessageSquare,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSidebar } from "@/contexts/sidebar-context";
import Image from "next/image";

function AvatarImage({
  src,
  alt,
  className,
}: {
  src?: any;
  alt?: string;
  className?: string;
}) {
  if (!src) return <div className={className} />;
  const isLocal = typeof src === "string" && src.startsWith("/");
  if (isLocal) {
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={40}
        height={40}
        className={className}
      />
    );
  }

  return (
    // For remote images we keep a simple <img> with lazy loading to avoid
    // runtime config issues for unknown hosts.
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

export function Header() {
  const { toggle, collapsed, toggleCollapse } = useSidebar();
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestMessages, setLatestMessages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    projects: any[];
    services: any[];
    team: any[];
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Do not poll automatically on mount to avoid unnecessary background requests.
    // Messages will be fetched lazily when the user interacts with the notification control.
  }, []);

  const [hasFetchedUnread, setHasFetchedUnread] = useState(false);

  const handleOpenNotifications = () => {
    // Only fetch unread messages when the user is on admin pages.
    if (!pathname || !pathname.startsWith("/admin")) return;
    if (!hasFetchedUnread) {
      fetchUnreadCount();
      setHasFetchedUnread(true);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch("/api/admin/messages/unread-count");
      const data = await res.json();
      setUnreadCount(data.count || 0);
      setLatestMessages(data.latest || []);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        performSearch();
      } else {
        setSearchResults(null);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/admin/search?q=${encodeURIComponent(searchQuery)}`,
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 flex items-center gap-3 px-0 mb-8 relative z-50">
      {/* ── Mobile hamburger ── */}
      <button
        onClick={toggle}
        className="lg:hidden shrink-0 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* ── Desktop collapse/expand toggle ── */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:flex shrink-0 p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
      </button>

      {/* ── Search bar — hidden on mobile ── */}
      <div className="flex-1 max-w-md hidden lg:block" ref={searchRef}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search projects, services, team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
          />

          <AnimatePresence>
            {searchResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] overflow-y-auto z-100"
              >
                {isSearching ? (
                  <div className="p-8 text-center">
                    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                      Searching...
                    </p>
                  </div>
                ) : (
                  <div className="p-2 space-y-4">
                    {searchResults.projects.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Briefcase size={10} /> Projects
                        </div>
                        {searchResults.projects.map((p) => (
                          <Link
                            key={p.id}
                            href={`/admin/projects?id=${p.id}`}
                            onClick={() => setSearchResults(null)}
                            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group"
                          >
                            <div className="h-10 w-10 rounded-lg bg-white/5 overflow-hidden border border-white/10 shrink-0">
                              <AvatarImage
                                src={p.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                                {p.title}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {p.category}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults.services.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Wrench size={10} /> Services
                        </div>
                        {searchResults.services.map((s) => (
                          <Link
                            key={s.id}
                            href={`/admin/services?id=${s.id}`}
                            onClick={() => setSearchResults(null)}
                            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group"
                          >
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                              <Wrench size={16} className="text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                                {s.title}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                Service Offering
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults.team.length > 0 && (
                      <div>
                        <div className="px-3 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Users size={10} /> Team Members
                        </div>
                        {searchResults.team.map((t) => (
                          <Link
                            key={t.id}
                            href={`/admin/users?id=${t.id}`}
                            onClick={() => setSearchResults(null)}
                            className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all group"
                          >
                            <div className="h-10 w-10 rounded-lg bg-white/5 overflow-hidden border border-white/10 shrink-0">
                              <AvatarImage
                                src={t.image}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white group-hover:text-primary transition-colors truncate">
                                {t.name}
                              </p>
                              <p className="text-[10px] text-gray-500">
                                {t.role}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchResults.projects.length === 0 &&
                      searchResults.services.length === 0 &&
                      searchResults.team.length === 0 && (
                        <div className="p-8 text-center">
                          <Search
                            size={24}
                            className="text-gray-700 mx-auto mb-2"
                          />
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                            No results for &ldquo;{searchQuery}&rdquo;
                          </p>
                        </div>
                      )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right-side controls ── */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div
          className="relative group"
          onMouseEnter={handleOpenNotifications}
          onFocus={handleOpenNotifications}
        >
          <button
            onClick={handleOpenNotifications}
            className="relative p-2.5 text-gray-400 hover:text-white transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-primary text-black text-[9px] font-black rounded-full border-2 border-[#0a0a0a] flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <h3 className="font-black text-xs uppercase tracking-widest text-white italic">
                Recent <span className="text-primary not-italic">Messages</span>
              </h3>
              {unreadCount > 0 && (
                <span className="text-[9px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {unreadCount} New
                </span>
              )}
            </div>
            <div className="space-y-2">
              {latestMessages.length > 0 ? (
                latestMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    href={`/admin/contact?id=${msg.id}`}
                    prefetch={false}
                    className="flex gap-3 p-3 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5 group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <MessageSquare size={14} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white font-bold truncate group-hover:text-primary transition-colors">
                        {msg.name}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        {msg.subject}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell size={20} className="text-gray-700 mx-auto mb-2" />
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    No new notifications
                  </p>
                </div>
              )}
            </div>
            <Link
              href="/admin/contact"
              prefetch={false}
              className="block w-full mt-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-center text-primary hover:bg-primary/5 rounded-xl transition-all border-t border-white/5 pt-4"
            >
              View All Messages
            </Link>
          </div>
        </div>

        {/* Settings */}
        <Link
          href="/admin/settings"
          prefetch={false}
          className="p-2.5 text-gray-400 hover:text-white transition-all hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10"
        >
          <Settings size={20} />
        </Link>

        <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>

        {/* User Profile */}
        <div className="relative group">
          <button className="flex items-center gap-2 p-1.5 sm:pr-3 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors overflow-hidden shrink-0">
              <User size={18} className="text-primary" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-white leading-none uppercase tracking-tighter italic">
                Administrator
              </p>
              <p className="text-[10px] text-primary/70 leading-none mt-1 font-medium">
                Super User
              </p>
            </div>
            <ChevronDown
              size={14}
              className="text-gray-500 group-hover:text-white transition-colors hidden sm:block"
            />
          </button>

          <div className="absolute right-0 mt-2 w-52 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <div className="p-4 border-b border-white/5 mb-2">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">
                Signed in as
              </p>
              <p className="text-xs font-bold text-white">admin@ont.com</p>
            </div>
            <Link
              href="/admin/settings"
              prefetch={false}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <User size={14} className="text-primary/50" /> Profile Settings
            </Link>
            <Link
              href="/admin/settings"
              prefetch={false}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <Settings size={14} className="text-primary/50" /> System
              Preferences
            </Link>
            <div className="h-px bg-white/5 my-2"></div>
            <button
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-all font-bold"
            >
              Logout Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
