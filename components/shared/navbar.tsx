"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { companyInfo } from "@/data/company";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#f6fbff] via-white to-[#edf7ff] backdrop-blur-md shadow-[0_2px_12px_rgba(0,119,200,0.08)] py-3 border-b border-primary/10 text-slate-700 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative w-32 h-10 md:w-44 md:h-12 transition-all duration-300">
                <Image
                  src="/logo/official_logo.png"
                  alt="OceanNet Technologies"
                  fill
                  sizes="(max-width: 768px) 128px, 200px"
                  className="object-contain object-left transition-all duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm xl:text-base font-medium transition-colors relative py-1",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-slate-700 hover:text-primary",
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
                className="px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 bg-primary text-white hover:bg-secondary hover:text-white shadow-primary/20"
                suppressHydrationWarning
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors text-slate-700 hover:text-primary hover:bg-primary/5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 border-t bg-gradient-to-b from-white via-[#f6fbff] to-white shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto border-primary/10 text-slate-700"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-semibold py-2 px-3 rounded-lg transition-colors",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-slate-700 hover:text-primary hover:bg-primary/5",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t flex flex-col gap-3 border-border">
                  <Link
                    href="/contact"
                    className="bg-primary text-white text-center py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Get in Touch
                  </Link>

                  <a
                    href={`tel:${companyInfo.contacts.phone}`}
                    className="flex items-center gap-3 text-xs font-medium transition-colors pt-2 text-muted-foreground hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {companyInfo.contacts.phone}
                  </a>
                  <a
                    href={`mailto:${companyInfo.contacts.email}`}
                    className="flex items-center gap-3 text-xs font-medium transition-colors text-muted-foreground hover:text-primary"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    {companyInfo.contacts.email}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
