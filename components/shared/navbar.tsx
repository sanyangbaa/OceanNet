"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Home,
  Info,
  Briefcase,
  FolderKanban,
  Award,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { companyInfo as staticCompanyInfo } from "@/data/company";
import type { MergedCompanyInfo } from "@/lib/data";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Careers", href: "/careers", icon: Award },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile Side Drawer Menu (matching 5-tcc inspiration)
───────────────────────────────────────────────────────────────────────────── */
function MobileMenuDrawer({
  isOpen,
  pathname,
  onClose,
  companyInfo = staticCompanyInfo,
}: {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
  companyInfo?: MergedCompanyInfo | typeof staticCompanyInfo;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Drawer panel — slides in from the right */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-[320px] flex flex-col overflow-hidden bg-white shadow-2xl"
          >
            {/* ── TOP BRAND STRIP ── */}
            <div className="bg-[#07142f] flex items-center justify-between px-5 py-4 flex-shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center">
                <div className="relative inline-flex items-center justify-center rounded-lg bg-white/95 px-2.5 py-1">
                  <div className="relative w-28 h-8">
                    <Image
                      src="/logo/official_logo.png"
                      alt="OceanNet"
                      fill
                      sizes="112px"
                      className="object-contain object-left"
                      priority
                      loading="eager"
                    />
                  </div>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* ── NAV LINKS (scrollable) ── */}
            <div className="bg-white flex-1 overflow-y-auto">
              <div className="px-4 pt-4 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 px-2 mb-2">
                  Navigation
                </p>
                <nav className="flex flex-col gap-0.5">
                  {navItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.06 + idx * 0.055,
                          duration: 0.22,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3.5 px-3 py-3.5 rounded-xl transition-all duration-200 group relative",
                            isActive
                              ? "bg-primary text-white font-bold"
                              : "text-neutral-600 hover:bg-gray-50 hover:text-black",
                          )}
                        >
                          {/* Active left accent bar */}
                          {isActive && (
                            <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white/40" />
                          )}
                          <span
                            className={cn(
                              "flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-all",
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary",
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-[15px] font-semibold flex-1 tracking-tight uppercase">
                            {item.name}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                              Current
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Divider */}
              <div className="mx-4 my-3 h-px bg-gray-100" />

              {/* Contact quick-links */}
              <div className="px-6 pb-4 flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-1">
                  Reach Us
                </p>
                <a
                  href={`tel:${companyInfo.contacts.phone}`}
                  onClick={onClose}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">
                    {companyInfo.contacts.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${companyInfo.contacts.email}`}
                  onClick={onClose}
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium truncate">
                    {companyInfo.contacts.email}
                  </span>
                </a>
              </div>
            </div>

            {/* ── BOTTOM CTA ── */}
            <div className="bg-white border-t border-gray-100 px-4 py-4 flex-shrink-0">
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-[#07142f] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-black/20 active:scale-95"
              >
                <span>CONTACT US</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar({
  companyInfo,
}: {
  companyInfo?: MergedCompanyInfo;
} = {}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#fafafa] via-white to-[#f5f5f5] backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] py-3 border-b border-primary/20 text-black transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-36 h-11 md:w-48 md:h-14 transition-all duration-300">
                <Image
                  src="/logo/official_logo.png"
                  alt="OceanNet Technologies"
                  fill
                  sizes="(max-width: 768px) 144px, 208px"
                  className="object-contain object-left transition-all duration-300 group-hover:scale-105"
                  priority
                  loading="eager"
                />
              </div>
            </Link>

            {/* Desktop Nav Links (Uppercase with active underline matching 5-tcc) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium uppercase tracking-wider transition-colors relative py-1",
                      isActive
                        ? "text-primary font-bold"
                        : "text-neutral-700 hover:text-black",
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 bg-primary text-white hover:bg-[#07142f] hover:text-white shadow-primary/20 cursor-pointer"
              >
                <span>CONTACT US</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Hamburger (with smooth rotation animation from 5-tcc) */}
            <button
              className="lg:hidden p-2 rounded-lg transition-all duration-200 text-black hover:text-primary hover:bg-primary/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
            >
              <motion.div
                animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-7" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (matching 5-tcc) */}
      <MobileMenuDrawer
        isOpen={isOpen}
        pathname={pathname}
        onClose={() => setIsOpen(false)}
        companyInfo={companyInfo}
      />
    </>
  );
}

