"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const eightyVh = window.innerHeight * 0.8;
      if (window.scrollY > eightyVh) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-all hover:-translate-y-1 hover:bg-primary hover:text-white focus:outline-none ring-2 ring-white/20"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
