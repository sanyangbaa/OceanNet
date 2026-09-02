"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    tag: "Accelerate. Transform. Scale. With OceanNet.",
    titlePrefix: "Accelerating Your.",
    titleHighlight: "Digital Future.",
    description:
      "OceanNet Technologies designs, integrates and supports digital platforms, enterprise systems and ICT infrastructure that help governments, development organisations and businesses operate more securely, efficiently and intelligently.",
    image: "/images/ont_img.jpg",
    alt: "OceanNet Tech Team",
    badge: "Enterprise IT & Cloud Solutions",
  },
  {
    id: 2,
    tag: "Next-Generation Technology & Innovation.",
    titlePrefix: "Transform Ideas",
    titleHighlight: "Into Innovation.",
    description:
      "Delivering modern enterprise systems, cloud services, and digital transformation solutions. We combine local expertise with global technology standards.",
    image: "/images/ont_img3.jpg",
    alt: "Modern enterprise systems in action",
    badge: "Digital Transformation & Systems",
  },
  // {
  //   id: 3,
  //   tag: "Security, Reliability & Performance.",
  //   titlePrefix: "Building Smarter",
  //   titleHighlight: "Digital Solutions.",
  //   description:
  //     "We prioritize security, reliability, and innovation in every solution we deliver. Our commitment to excellence helps organizations achieve sustainable digital growth.",
  //   image: "/images/ont_img2.jpg",
  //   alt: "OceanNet engineers collaborating",
  //   badge: "Cybersecurity & Infrastructure",
  // },
];

const clientAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
];

const stats = [
  {
    value: "100+",
    label: "Solutions Delivered",
    subtext: "Across industries",
  },
  {
    value: "99.9%",
    label: "Uptime & Reliability",
    subtext: "Enterprise standard",
  },
  {
    value: "50+",
    label: "Corporate Clients",
    subtext: "National & Regional",
  },
  {
    value: "6+",
    label: "Years of Impact",
    subtext: "Proven excellence",
  },
];

export function HeroClient() {
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const handleNext = React.useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <div
      className="container mx-auto px-4 md:px-6 relative z-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 2-Column Hero Grid matching reference layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-center">
        {/* Left Column: Content & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-text-${current}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.08] mb-5">
                {slides[current].titlePrefix}{" "}
                <br className="hidden sm:inline" />
                <span className="text-accent">
                  {slides[current].titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-8">
                {slides[current].description}
              </p>

              {/* CTA Button Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
                <Link
                  href="/services"
                  className="bg-primary hover:bg-white hover:text-secondary text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
                >
                  <Terminal className="h-4 w-4 text-accent group-hover:text-primary transition-colors" />
                  <span>Explore Our Services</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white/85 hover:text-accent font-semibold text-sm transition-colors py-2 group"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Featured Image Card with Slide Control */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-secondary/60 aspect-4/3 sm:aspect-5/4 lg:aspect-auto lg:h-[460px] group">
            {/* Image Slider */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`hero-img-${current}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={slides[current].image}
                  alt={slides[current].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={current === 0}
                />
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/90 via-[#03045E]/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Top-Right Slide Counter / Indicator */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-secondary/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === idx
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/40 hover:bg-white",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Floating Bottom Badge */}
            {/* <div className="absolute bottom-4 left-4 right-4 z-20 bg-secondary/90 backdrop-blur-md border border-white/15 p-4 rounded-2xl flex items-center justify-between"> */}
            {/* <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">
                  Featured Specialization
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {slides[current].badge}
                </h4>
              </div> */}

            {/* Prev / Next Arrows */}
            {/* <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white/10 hover:bg-primary text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white/10 hover:bg-primary text-white transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Metrics / Stats Bar Row */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center border-l-2 border-accent/40 pl-4 py-1"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white/90 mt-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] text-white/60">{stat.subtext}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
