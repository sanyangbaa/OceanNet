"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { slideIn, fadeIn, staggerContainer } from "@/lib/motion";
import { SectionHeader } from "@/components/shared/section-header";
import { MobileCarouselControls } from "@/components/shared/mobile-carousel-controls";
import { useMobileCarousel } from "@/components/shared/use-mobile-carousel";
import type { Testimonial } from "@/server/db";

interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string | null;
}

interface AboutClientProps {
  companyInfo: any;
  teamMembers: Member[];
  testimonials?: Testimonial[];
}

function formatName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Fallback placeholder avatars if no testimonials or testimonials lack photos
const placeholderAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
];

export function AboutClient({
  companyInfo,
  teamMembers,
  testimonials = [],
}: AboutClientProps) {
  const teamCarousel = useMobileCarousel(teamMembers.length, "start");

  // Derive client avatars from real database testimonials, falling back to placeholders
  const testimonialImages = testimonials
    .map((t) => t.image)
    .filter((img): img is string => Boolean(img && img.trim() && img.startsWith("http")));

  const clientAvatars = [
    ...testimonialImages,
    ...placeholderAvatars,
  ].slice(0, 4);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero Header */}
      <SectionHeader
        subtitle="Who We Are"
        title={`About ${companyInfo.shortName || "OceanNet"}`}
        description="Gambian technology partner delivering secure digital solutions, enterprise systems, cloud and ICT infrastructure."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070"
        withBackground
        className="mb-2 md:mb-3 mt-3"
      />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1: "About Us — Where Ideas Become Impact"
          Exact inspiration match:
          - Pure white background (bg-white)
          - Left & Right columns have EQUAL HEIGHT (items-stretch, justify-between)
          - Client avatars taken from Testimonials (with placeholders fallback)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 md:px-6 py-6 sm:py-8 lg:py-10">
          <motion.div
            variants={staggerContainer(0.02, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch"
          >
            {/* ── LEFT COLUMN (Equal Height to Right Image) ── */}
            <motion.div
              variants={slideIn("left", "tween", 0, 0.25)}
              className="lg:col-span-6 flex flex-col justify-between py-1"
            >
              <div>
                <span className="text-sm sm:text-base font-semibold text-[#0077c8] block mb-2 tracking-wide">
                  About Us
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-[#07142f] tracking-tight leading-tight mb-3 sm:whitespace-nowrap">
                  Where Technology Becomes Impact
                </h2>

                {/* first Para */}
                <p className="text-base sm:text-lg text-[#0077c8] font-normal leading-relaxed mb-4">
                  We transform bold ideas into practical solutions that create lasting
                  value and measurable business growth.
                </p>

                {/* second Para */}
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6 max-w-xl">
                  OceanNet Technologies delivers enterprise-grade software, robust cloud
                  infrastructure, and mission-critical systems integration across West Africa.
                  We build resilient digital platforms engineered to streamline operations,
                  enhance security, and scale your organization.
                </p>

                {/* third Para */}
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-4 max-w-xl">
                  From government institutions to development agencies and private
                  enterprises, we bring deep domain knowledge and proven delivery
                  experience to every engagement.
                </p>
              </div>

              {/* Social Links Row */}
              {companyInfo.socials && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-foreground mr-1">
                    Connect:
                  </span>
                  {companyInfo.socials.facebook && (
                    <a
                      href={companyInfo.socials.facebook}
                      aria-label="Facebook"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-gray-400 transition-all shadow-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  )}
                  {/* {companyInfo.socials.instagram && (
                    <a
                      href={companyInfo.socials.instagram}
                      aria-label="Instagram"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#E4405F] hover:border-[#E4405F] hover:text-white text-gray-400 transition-all shadow-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </a>
                  )} */}
                  {companyInfo.socials.linkedin && (
                    <a
                      href={companyInfo.socials.linkedin}
                      aria-label="LinkedIn"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white text-gray-400 transition-all shadow-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.346V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.604 0 4.269 2.372 4.269 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  )}
                  {(companyInfo.socials.twitter || companyInfo.socials.x) && (
                    <a
                      href={companyInfo.socials.twitter || companyInfo.socials.x || "#"}
                      aria-label="X / Twitter"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:border-black hover:text-white text-gray-400 transition-all shadow-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                      </svg>
                    </a>
                  )}
                  {companyInfo.socials.tiktok && (
                    <a
                      href={companyInfo.socials.tiktok}
                      aria-label="TikTok"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:border-black hover:text-white text-gray-400 transition-all shadow-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>

            {/* ── RIGHT COLUMN: Image with 10K+ Happy Clients notch card (Equal Height) ── */}
            <motion.div
              variants={slideIn("right", "tween", 0, 0.25)}
              className="lg:col-span-6 flex flex-col h-full w-full"
            >
              <div className="relative w-full h-full min-h-[340px] sm:min-h-[380px] lg:min-h-[410px] rounded-[28px] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                <Image
                  src="/images/about_team_celebrate.jpg"
                  alt="OceanNet Technologies team celebration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />

                {/* Inverted white notch cutout at bottom-left */}
                <div className="absolute bottom-0 left-0 bg-white pt-3 pr-3 rounded-tr-[28px] z-10">
                  <div className="bg-[#0077c8] text-white px-5 sm:px-6 py-4 rounded-[20px] shadow-lg flex flex-col gap-2.5">
                    <span className="font-bold text-sm sm:text-base tracking-tight">
                      15+ Happy Clients
                    </span>
                    <div className="flex items-center -space-x-2">
                      {clientAvatars.map((avatar, idx) => (
                        <div
                          key={idx}
                          className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-2 ring-white"
                        >
                          <Image
                            src={avatar}
                            alt="Client avatar"
                            fill
                            unoptimized={avatar.startsWith("http")}
                            className="object-cover"
                          />
                        </div>
                      ))}
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0077c8] flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm ring-2 ring-white">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2: "Our Approach — Built Around Your Vision"
          Exact inspiration match:
          - Pure white background (bg-white)
          - Centered header
          - Left executive image with bottom-left 25 Years Experience badge
          - Right Mission & Vision cards with checkmarks
      ══════════════════════════════════════════════════════════════════ */}
      <section id="our-approach" className="bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 py-12 sm:py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col gap-10 md:gap-14"
          >
            {/* Centered Section Header */}
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-sm sm:text-base font-semibold text-[#0077c8] block mb-1.5 tracking-wide">
                Our Approach
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07142f] tracking-tight">
                Built Around Your Vision
              </h2>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {/* Left: Executive Photo with 25 Years Experience Notch Badge */}
              <motion.div
                variants={slideIn("left", "tween", 0, 0.25)}
                className="relative w-full h-full min-h-[380px] sm:min-h-[460px]"
              >
                <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-[28px] overflow-hidden shadow-xl border border-slate-100 bg-slate-50">
                  <Image
                    src="/images/about_vision_man.jpg"
                    alt="OceanNet executive leadership"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top"
                  />

                  {/* Bottom-Left 6 Years Experience Badge inside white notch */}
                  <div className="absolute bottom-0 left-0 bg-white pt-3 pr-3 rounded-tr-[28px] z-10">
                    <div className="bg-[#0077c8] text-white px-6 sm:px-7 py-5 sm:py-6 rounded-[20px] shadow-lg flex flex-col items-center justify-center text-center min-w-[120px] sm:min-w-[130px]">
                      <span className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                        6
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold tracking-normal mt-2 leading-tight">
                        Years Experience
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Stacked Our Mission & Our Vision Cards */}
              <motion.div
                variants={slideIn("right", "tween", 0, 0.25)}
                className="flex flex-col gap-6 justify-between h-full"
              >
                {/* Card 1: Our Mission */}
                <div className="bg-white rounded-[24px] p-6 sm:p-7 md:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border-2 border-[#0077c8] flex items-center justify-center text-[#0077c8] shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0077c8]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#07142f] tracking-tight">
                      Our Mission
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {companyInfo.mission ||
                      "To help organisations use technology effectively to improve services, strengthen operations, enhance digital security and create sustainable technology capability."}
                  </p>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Secure & Reliable
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Data-Driven Growth
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Long-Term Solutions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Our Vision */}
                <div className="bg-white rounded-[24px] p-6 sm:p-7 md:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full border-2 border-[#0077c8] flex items-center justify-center text-[#0077c8] shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0077c8]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#07142f] tracking-tight">
                      Our Vision
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {companyInfo.vision ||
                      "To become a trusted West African technology partner recognised for dependable delivery, technical excellence and practical digital transformation."}
                  </p>

                  <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Secure & Reliable
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Data-Driven Growth
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#0077c8] stroke-[2.5] shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-[#07142f]">
                        Long-Term Solutions
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3: "Meet The Team"
      ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-6 py-12 sm:py-16 mb-10">
          <SectionHeader
            subtitle="Our Team"
            title="Meet The Team"
            description="Experienced technology professionals dedicated to delivering innovative, secure, and reliable digital solutions that empower organizations to achieve their strategic goals."
          />

          <div
            ref={teamCarousel.scrollContainerRef}
            onScroll={teamCarousel.handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-6 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0 mt-6 md:mt-8"
          >
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                variants={fadeIn("", "tween", idx * 0.02, 0.25)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.01 }}
                className="flex-shrink-0 w-[85%] sm:w-[320px] md:w-auto snap-center flex flex-col"
              >
                {/* Card Container with dark navy base border and inner padding */}
                <div className="group relative flex flex-col bg-white p-2 sm:p-2.5 border border-secondary/70 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* L-shaped primary accent — Top-Left */}
                  <span className="pointer-events-none absolute -top-[1px] -left-[1px] w-1/2 h-1/2 border-t-[3px] border-l-[3px] border-b-0 border-r-0 border-primary z-20" />

                  {/* L-shaped primary accent — Bottom-Right */}
                  <span className="pointer-events-none absolute -bottom-[1px] -right-[1px] w-1/2 h-1/2 border-b-[3px] border-r-[3px] border-t-0 border-l-0 border-primary z-20" />

                  {/* Portrait image with subtle hover zoom */}
                  <div
                    className="relative overflow-hidden w-full bg-slate-100"
                    style={{ aspectRatio: "4/5" }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      unoptimized={/^https?:\/\//i.test(member.image)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Centered Name & Role */}
                  <div className="pt-3.5 pb-2.5 px-2 text-center bg-white">
                    <h4 className="text-[1.125rem] md:text-[1.2rem] font-serif font-bold text-secondary leading-snug tracking-tight">
                      {formatName(member.name)}
                    </h4>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground font-normal line-clamp-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <MobileCarouselControls
            activeIndex={teamCarousel.activeIndex}
            count={teamMembers.length}
            itemLabel="team member"
            onSelect={teamCarousel.scrollTo}
          />
        </div>
      </section>
    </div>
  );
}
