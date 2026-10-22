"use client";

import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/lib/motion";

const whyChooseItems = [
  {
    id: "proven-results",
    title: "Proven Results",
    description:
      "We design and implement dependable digital systems that streamline operations, improve institutional efficiency, and deliver measurable return on technology investments.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chart Base / Axis */}
        <path d="M12 14V50C12 51.1 12.9 52 14 52H52V46H18V14H12Z" />
        {/* Trend Line & Arrow */}
        <path d="M22 38L32 26L40 32L48 20V26H54V12H40V18H46.5L39.5 27.5L32 21.5L20 34.5L22 38Z" />
      </svg>
    ),
  },
  {
    id: "expert-team",
    title: "Expert Team",
    description:
      "Our multidisciplinary team combines local Gambian operational expertise with international engineering standards across software, cloud, and infrastructure.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle cx="32" cy="18" r="9" />
        {/* Torso & Suit */}
        <path d="M20 33C15.6 33 12 36.6 12 41V50H52V41C52 36.6 48.4 33 44 33H40L36 41H28L24 33H20Z" />
        {/* Tie */}
        <path d="M30 33H34L35 44L32 48L29 44L30 33Z" />
      </svg>
    ),
  },
  {
    id: "transparent-pricing",
    title: "Transparent Pricing",
    description:
      "Clear milestone-based agreements, honest project scope management, and predictable pricing structures ensure complete financial clarity from day one.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dollar Symbol */}
        <path d="M32 10V14C27.5 14 24 16.5 24 20C24 25.5 33 24 33 28C33 29.5 31.5 30.5 29 30.5C26 30.5 23.5 29 22.5 27.5L18 31C19.5 33.5 23 35.5 28 35.8V40H34V36C38.5 35.5 42 33 42 29C42 23.5 33 24.5 33 21C33 19.5 34.5 18.5 37 18.5C39.5 18.5 41.5 19.8 42.5 21.2L47 17.5C45.2 15 42 14.2 38 14V10H32Z" />
        {/* Open Hand */}
        <path d="M14 44H26L38 42C41 41.5 44 42.5 46 44.5L52 50.5L48 54L42 49H34L26 53L14 53V44Z" />
      </svg>
    ),
  },
  {
    id: "fast-support",
    title: "Fast Support",
    description:
      "Prompt on-the-ground technical assistance, dedicated SLA support, and proactive systems maintenance keep your critical operations running without disruption.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Headphone Arch */}
        <path d="M32 10C19.8 10 10 19.8 10 32V38C10 41.3 12.7 44 16 44H20V32H16V32C16 23.2 23.2 16 32 16C40.8 16 48 23.2 48 32V32H44V44H48C51.3 44 54 41.3 54 38V32C54 19.8 44.2 10 32 10Z" />
        {/* Mic Boom */}
        <path d="M46 42V48C46 51.3 43.3 54 40 54H34V48H40V44H46V42Z" />
      </svg>
    ),
  },
  {
    id: "data-driven",
    title: "Data Driven",
    description:
      "We build modern health information systems, enterprise databases, and intelligent analytics that turn raw data into actionable decision-making power.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Big Slice */}
        <path d="M30 10C17.8 10 8 19.8 8 32C8 44.2 17.8 54 30 54C42.2 54 52 44.2 52 32H30V10Z" />
        {/* Top Right Slice */}
        <path d="M36 8V26H54C54 16 46 8 36 8Z" />
        {/* Bottom Right Sliced Wedge */}
        <path d="M36 34V52C44 50.5 50.5 44 52 36L36 34Z" />
      </svg>
    ),
  },
  {
    id: "trusted-clients",
    title: "Trusted Clients",
    description:
      "A proven track record serving Gambian government ministries, international development partners, healthcare bodies, and leading regional enterprises.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="currentColor"
        className="w-13 h-13 sm:w-14 sm:h-14"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Sleeve */}
        <rect x="8" y="26" width="6" height="16" rx="2" />
        {/* Right Sleeve */}
        <rect x="50" y="26" width="6" height="16" rx="2" />
        {/* Handshake Clasp */}
        <path d="M16 29L26 21C27.5 19.8 29.8 19.8 31.3 21L36 25L42 20C43.5 18.8 45.8 18.8 47.3 20L49 22L42 30L36 36L28 44L16 35V29Z" />
        <path d="M48 29L38 39L32 45L22 41L28 35L34 29L40 23L48 29Z" />
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative pt-10 sm:pt-14 md:pt-16 pb-36 sm:pb-28 md:pb-32 bg-[#07142f] text-white overflow-hidden">
      {/* Subtle background ambient mesh matching the footer styling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,.3) 1px, transparent 1.2px), radial-gradient(ellipse at 50% 50%, rgba(0,119,200,.15), transparent 70%)",
          backgroundSize: "12px 12px, 100% 100%",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header (matching Testimonial style) */}
        <motion.div
          variants={textVariant(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "150px 0px" }}
          className="mb-8 text-center sm:mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-primary" />
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              Why Choose Us
            </span>
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Why Organisations Choose OceanNet
          </h2>
        </motion.div>

        {/* 6-Items Grid (Matching the Inspiration Image: 3 Columns x 2 Rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-center">
          {whyChooseItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeIn("up", "tween", Math.min(index * 0.02, 0.1), 0.25)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "150px 0px" }}
              className="flex flex-col items-center justify-start group"
            >
              {/* Icon */}
              <div className="text-primary mb-3.5 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {/* Description developed for OceanNet's goals */}
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
