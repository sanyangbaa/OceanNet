"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/lib/motion";


export function AboutPreviewClient({
  phone = "+220 87 278 5585",
}: {
  phone?: string;
} = {}) {
  return (
    <motion.div
      variants={staggerContainer(0.03, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center w-full"
    >
      {/* ── LEFT COLUMN: User's Own Image with Inspiration-Matched Top-Left Badge ── */}
      <motion.div
        variants={slideIn("left", "tween", 0, 0.3)}
        className="relative w-full pt-8 pl-8 sm:pt-10 sm:pl-10"
      >
        {/* Floating Experience Badge with seamless white cutout frame on right and bottom */}
        <div className="absolute top-0 left-0 z-20 transition-transform duration-300 hover:scale-105">
          {/* White cutout background perfectly matching the section's white background */}
          <div className="bg-white pr-3.5 pb-3 sm:pr-4 sm:pb-4 rounded-br-2xl sm:rounded-br-3xl inline-block">
            <div className="bg-primary text-white w-[135px] h-[110px] sm:w-[160px] sm:h-[130px] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center px-4 py-4 select-none">
              <span className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white leading-none tracking-tight block">
                6
              </span>
              <span className="text-lg sm:text-xl font-bold text-white mt-1.5 leading-tight block">
                Years
              </span>
              <span className="text-lg sm:text-xl font-semibold text-white/95 tracking-wide mt-1 block">
                Experience
              </span>
            </div>
          </div>
        </div>

        {/* User's Own Image Container — Only bottom-right corner is rounded */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] lg:h-[420px] rounded-none rounded-br-2xl sm:rounded-br-3xl overflow-hidden shadow-xl">
          <Image
            src="/about_preview/Below Hero section.png"
            alt="OceanNet Technologies"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      {/* ── RIGHT COLUMN: Content matching inspiration 100% (Design, Plan, Text, Spacing) ── */}
      <motion.div
        variants={slideIn("right", "tween", 0, 0.3)}
        className="flex flex-col justify-center space-y-5 sm:space-y-6 w-full"
      >
        {/* Main Headline */}
        <motion.div variants={textVariant(0)}>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-secondary tracking-tight leading-[1.18]">
            Local Expertise. Global Technology. Lasting Impact.
          </h2>
        </motion.div>

        {/* Lead Subtitle (in Primary Blue) */}
        <motion.p
          variants={textVariant(0)}
          className="text-primary text-base sm:text-lg font-medium leading-relaxed"
        >
          We combine local expertise, modern technologies and strategic partnerships to deliver reliable digital solutions for governments, development organisations and businesses.
        </motion.p>

        {/* 2-Column Plans Grid */}
        <motion.div
          variants={textVariant(0)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-2"
        >
          {/* Plan 1: Tailored Digital Solutions */}
          <div className="flex items-center gap-4">
            <div className="text-primary shrink-0">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-13 h-13 sm:w-14 sm:h-14 text-primary"
              >
                {/* Modern Display Monitor */}
                <rect
                  x="10"
                  y="10"
                  width="44"
                  height="32"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <line
                  x1="10"
                  y1="34"
                  x2="54"
                  y2="34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                {/* Monitor Stand */}
                <path
                  d="M26 42L22 52H42L38 42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Code Prompt Glyph */}
                <path
                  d="M20 22L25 26L20 30"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="29"
                  y1="30"
                  x2="38"
                  y2="30"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Signal indicator on top right */}
                <circle
                  cx="46"
                  cy="17"
                  r="2.5"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h4 className="font-extrabold text-secondary text-base sm:text-lg leading-snug">
              Tailored
              <br />
              Digital Solutions
            </h4>
          </div>

          {/* Plan 2: Dedicated Technical Support */}
          <div className="flex items-center gap-4">
            <div className="text-primary shrink-0">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-13 h-13 sm:w-14 sm:h-14 text-primary"
              >
                {/* Shield Protection Frame */}
                <path
                  d="M32 8L49 14.5V29C49 40.5 41.5 48.5 32 52C22.5 48.5 15 40.5 15 29V14.5L32 8Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Headset arc */}
                <path
                  d="M24 28C24 23.58 27.58 20 32 20C36.42 20 40 23.58 40 28V34C40 35.1 39.1 36 38 36H36V28H40"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M28 36H26C24.9 36 24 35.1 24 34V28H28V36Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Mic stem */}
                <path
                  d="M36 36V39C36 40.1 35.1 41 34 41H31"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4 className="font-extrabold text-secondary text-base sm:text-lg leading-snug">
              Dedicated
              <br />
              Technical Support
            </h4>
          </div>
        </motion.div>

        {/* Body Description Text */}
        <motion.p
          variants={textVariant(0)}
          className="text-slate-600 text-sm sm:text-base leading-relaxed"
        >
          Empowering organizations with secure, scalable, and future-ready technology solutions.
        </motion.p>

        {/* Horizontal Divider Line & Action Row */}
        <motion.div
          variants={textVariant(0)}
          className="border-t border-gray-200 pt-5 sm:pt-6 mt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
        >
          {/* Link Button to About Page */}
          <Link
            href="/about"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider hover:bg-secondary hover:text-white transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-xl hover:shadow-secondary/20 hover:-translate-y-0.5 active:scale-95 shrink-0"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Contact / Call Row */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white shadow-sm ring-1 ring-gray-200">
              <Image
                src="/images/paali.jpg"
                alt="Paali"
                fill
                className="object-cover"
              />
            </div>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="text-base sm:text-lg lg:text-xl font-bold text-secondary hover:text-primary transition-colors tracking-tight whitespace-nowrap"
            >
              Call Us: {phone}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

