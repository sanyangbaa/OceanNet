"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    titlePrefix: "Accelerating Your",
    titleHighlight: "Digital Future",
    description:
      "OceanNet Technologies designs, integrates and supports digital platforms, enterprise systems and ICT infrastructure that help governments, development organisations and businesses operate more securely, efficiently and intelligently.",
    image: "/images/ont_img.jpg",
    alt: "OceanNet Tech Team & Enterprise Infrastructure",
    link: "/services",
  },
  {
    id: 2,
    titlePrefix: "Transform Ideas",
    titleHighlight: "Into Innovation",
    description:
      "Delivering modern enterprise systems, cloud services, and digital transformation solutions. We combine local expertise with global technology standards.",
    image: "/images/ont_img3.jpg",
    alt: "Modern enterprise systems in action",
    link: "/services",
  },
  {
    id: 3,
    titlePrefix: "Building Smarter",
    titleHighlight: "Digital Solutions",
    description:
      "We prioritize security, reliability, and innovation in every solution we deliver. Our commitment to excellence helps organizations achieve sustainable digital growth.",
    image: "/images/ont_img2.jpg",
    alt: "OceanNet engineers collaborating",
    link: "/services",
  },
];

export function HeroClient() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const handleNext = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  // Auto-play slideshow every 6 seconds unless hovered
  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <div
      className="relative w-full min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[620px] flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Background Slides (Full Bleed) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`hero-bg-${current}`}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].alt}
            fill
            sizes="100vw"
            priority={current === 0}
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Dark Atmospheric Overlay (ensures high text contrast) ── */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/85 via-black/65 to-black/45 pointer-events-none" />

      {/* ── Main Hero Content ── */}
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-20 md:py-20 lg:py-24">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-text-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Bold Condensed Headline with highlighted words in primary color */}
              <h1 className="font-hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.98] sm:leading-[1.0] mb-4 drop-shadow-lg">
                {slides[current].titlePrefix}{" "}
                <br className="hidden sm:inline" />
                <span className="text-primary drop-shadow-[0_2px_16px_rgba(0,119,200,0.4)]">
                  {slides[current].titleHighlight}
                </span>
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-normal drop-shadow-sm">
                {slides[current].description}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-5">
                {/* Relevant primary button with bg-primary and crisp flat rectangular shape */}
                <Link
                  href={slides[current].link}
                  className="bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-none uppercase tracking-wider transition-all duration-200 shadow-xl active:scale-98 inline-flex items-center justify-center cursor-pointer"
                >
                  Explore Our Services
                </Link>

                {/* Normal secondary button */}
                <Link
                  href="/contact"
                  className="border-2 border-white/80 hover:border-white text-white hover:bg-white hover:text-black font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-none uppercase tracking-wider transition-all duration-200 shadow-lg active:scale-98 inline-flex items-center justify-center cursor-pointer"
                >
                  Talk To Our Team
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── 3 Stacked Thumbnails (Mobile: Bottom-Right Corner; Desktop: Vertically Centered on Right) ── */}
      <div className="absolute right-3.5 bottom-3.5 sm:right-5 sm:bottom-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8 lg:right-10 xl:right-12 flex flex-col items-center gap-1.5 md:gap-2 z-20">
        {slides.map((slide, idx) => {
          const isActive = current === idx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrent(idx)}
              className={cn(
                "relative overflow-hidden transition-all duration-300 ease-out cursor-pointer block border-[1.5px] border-black/90",
                isActive
                  ? "w-13 h-9.5 sm:w-16 sm:h-12 md:w-20 md:h-15 shadow-xl opacity-100 brightness-100 z-10"
                  : "w-9.5 h-7 sm:w-12 sm:h-9 md:w-15 md:h-11 shadow-sm opacity-55 brightness-75 hover:opacity-95 hover:brightness-100 hover:scale-105"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="object-cover"
              />
              {/* Subtle dark tint over unactive thumbnails */}
              {!isActive && (
                <div className="absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}