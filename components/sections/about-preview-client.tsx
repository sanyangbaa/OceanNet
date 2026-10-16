"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/lib/motion";

export function AboutPreviewClient() {
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
          <div className="bg-white pr-3.5 pb-3.5 sm:pr-4 sm:pb-4 rounded-br-2xl sm:rounded-br-3xl inline-block">
            <div className="bg-primary text-white w-[130px] h-[140px] sm:w-[155px] sm:h-[165px] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center px-4 py-5 select-none">
              <span className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white leading-none tracking-tight block">
                25
              </span>
              <span className="text-lg sm:text-xl font-bold text-white mt-1.5 leading-tight block">
                Years
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white/95 tracking-wide mt-1 block">
                Experience
              </span>
            </div>
          </div>
        </div>

        {/* User's Own Image Container — Only bottom-right corner is rounded */}
        <div className="relative w-full h-[280px] sm:h-[340px] md:h-[390px] lg:h-[420px] rounded-none rounded-br-2xl sm:rounded-br-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/ont_img.jpg"
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
            We&apos;re Here To Assist You With Exploring Protection
          </h2>
        </motion.div>

        {/* Lead Subtitle (in Primary Blue) */}
        <motion.p
          variants={textVariant(0)}
          className="text-primary text-base sm:text-lg font-medium leading-relaxed"
        >
          Aliqu diam amet diam et eos. Clita erat ipsum et lorem sed stet lorem sit
          clita duo justo erat amet
        </motion.p>

        {/* 2-Column Plans Grid */}
        <motion.div
          variants={textVariant(0)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-2"
        >
          {/* Plan 1: Flexible Insurance Plans */}
          <div className="flex items-center gap-4">
            <div className="text-primary shrink-0">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-13 h-13 sm:w-14 sm:h-14 text-primary"
              >
                {/* Clipboard Header Clip */}
                <rect
                  x="24"
                  y="6"
                  width="16"
                  height="6"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                {/* Board Frame */}
                <rect
                  x="13"
                  y="10"
                  width="38"
                  height="46"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                {/* Checklist Document Lines */}
                <line
                  x1="20"
                  y1="20"
                  x2="36"
                  y2="20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="26"
                  x2="32"
                  y2="26"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="32"
                  x2="28"
                  y2="32"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="38"
                  x2="26"
                  y2="38"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Shield Badge on bottom-right */}
                <path
                  d="M37 31L48 27V38C48 43.5 43 47.5 37 49.5C31 47.5 26 43.5 26 38V27L37 31Z"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M33 38L36 41L42 34"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="font-extrabold text-secondary text-base sm:text-lg leading-snug">
              Flexible
              <br />
              Insurance Plans
            </h4>
          </div>

          {/* Plan 2: Money Back Guarantee */}
          <div className="flex items-center gap-4">
            <div className="text-primary shrink-0">
              <svg
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-13 h-13 sm:w-14 sm:h-14 text-primary"
              >
                {/* Certificate Frame */}
                <rect
                  x="14"
                  y="8"
                  width="34"
                  height="46"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                {/* Ribbon Tag on top-left */}
                <path
                  d="M19 8V17L23 14L27 17V8"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                {/* Content Lines */}
                <line
                  x1="29"
                  y1="18"
                  x2="42"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="25"
                  x2="42"
                  y2="25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="32"
                  x2="34"
                  y2="32"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="39"
                  x2="28"
                  y2="39"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Guarantee Seal / Coin on bottom-right */}
                <circle
                  cx="44"
                  cy="44"
                  r="10"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                {/* Symbol inside seal */}
                <path
                  d="M44 38.5V49.5M46.5 41C46.5 39.8 45.4 39.2 44 39.2C42.6 39.2 41.5 39.9 41.5 41.2C41.5 43.5 46.5 43 46.5 45.2C46.5 46.7 45.3 47.3 44 47.3C42.4 47.3 41.5 46.4 41.5 45.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h4 className="font-extrabold text-secondary text-base sm:text-lg leading-snug">
              Money Back
              <br />
              Guarantee
            </h4>
          </div>
        </motion.div>

        {/* Body Description Text */}
        <motion.p
          variants={textVariant(0)}
          className="text-slate-600 text-sm sm:text-base leading-relaxed"
        >
          Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam
          amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit
          clita duo justo magna dolore erat amet
        </motion.p>

        {/* Horizontal Divider Line & Contact / Call Row */}
        <motion.div
          variants={textVariant(0)}
          className="border-t border-gray-200 pt-5 sm:pt-6 mt-2"
        >
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white shadow-sm ring-1 ring-gray-200">
              <Image
                src="/images/consultant_avatar.png"
                alt="Consultant"
                fill
                className="object-cover"
              />
            </div>
            <a
              href="tel:+0123456789"
              className="text-lg sm:text-xl font-bold text-secondary hover:text-primary transition-colors tracking-tight"
            >
              Call Us: +012 345 6789
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
