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
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On homepage before scrolling, navbar is completely transparent so it shares
  // the exact same background and glow as the hero canvas.
  // On all other pages (or when scrolled down on homepage), navbar is clean white.
  const isHome = pathname === "/";
  const isDark = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isDark
            ? "bg-transparent py-4 md:py-6 border-b border-transparent text-white"
            : "bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-border text-secondary",
        )}
      >
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
                  className={cn(
                    "object-contain object-left transition-all duration-300 group-hover:scale-105",
                    isDark ? "brightness-0 invert" : "",
                  )}
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
                      isDark
                        ? isActive
                          ? "text-accent font-semibold"
                          : "text-white/85 hover:text-accent"
                        : isActive
                          ? "text-primary font-semibold"
                          : "text-secondary hover:text-primary",
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                          isDark ? "bg-accent" : "bg-primary",
                        )}
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
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95",
                  isDark
                    ? "bg-primary text-white hover:bg-white hover:text-secondary shadow-primary/25"
                    : "bg-primary text-white hover:bg-secondary hover:text-white shadow-primary/20",
                )}
                suppressHydrationWarning
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isDark
                  ? "text-white hover:text-accent hover:bg-white/10"
                  : "text-secondary hover:text-primary hover:bg-gray-100",
              )}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
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
              className={cn(
                "lg:hidden absolute top-full left-0 right-0 border-t shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto",
                isDark
                  ? "bg-[#03045E] border-white/10 text-white"
                  : "bg-white border-border text-secondary",
              )}
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
                        isDark
                          ? isActive
                            ? "text-accent bg-white/10"
                            : "text-white/90 hover:text-accent hover:bg-white/5"
                          : isActive
                            ? "text-primary bg-primary/10"
                            : "text-secondary hover:text-primary hover:bg-gray-50",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div
                  className={cn(
                    "pt-4 border-t flex flex-col gap-3",
                    isDark ? "border-white/10" : "border-border",
                  )}
                >
                  <Link
                    href="/contact"
                    className="bg-primary text-white text-center py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Get in Touch
                  </Link>

                  <a
                    href={`tel:${companyInfo.contacts.phone}`}
                    className={cn(
                      "flex items-center gap-3 text-xs font-medium transition-colors pt-2",
                      isDark
                        ? "text-white/80 hover:text-accent"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    {companyInfo.contacts.phone}
                  </a>
                  <a
                    href={`mailto:${companyInfo.contacts.email}`}
                    className={cn(
                      "flex items-center gap-3 text-xs font-medium transition-colors",
                      isDark
                        ? "text-white/80 hover:text-accent"
                        : "text-muted-foreground hover:text-primary",
                    )}
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
