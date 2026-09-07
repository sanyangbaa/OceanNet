"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, Target } from "lucide-react";
import { slideIn, textVariant, fadeIn, staggerContainer } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { SectionHeader } from "@/components/shared/section-header";

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
}

function formatName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const HOW_WE_WORK = [
  {
    step: "01",
    title: "Understand First",
    description:
      "We begin with business, operational and user requirements before selecting technology.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Design for the Environment",
    description:
      "Solutions are shaped around local infrastructure, security, skills and support realities.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Deliver End-to-End",
    description:
      "We combine planning, implementation, integration, training and operational support.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Build Sustainable Capability",
    description:
      "Knowledge transfer and maintainability are treated as part of implementation, not afterthoughts.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export function AboutClient({ companyInfo, teamMembers }: AboutClientProps) {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Header */}
      <SectionHeader
        subtitle="Who We Are"
        title={`About ${companyInfo.shortName}`}
        description="OceanNet Technologies is a Gambian technology company delivering digital solutions, enterprise systems, systems integration, ICT infrastructure, cloud, cybersecurity and managed technology services."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        withBackground
        withBubbles
      />

      <section className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer(0.2, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.01 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* ── LEFT COLUMN (sticky) ── */}
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex flex-col gap-8 w-full"
          >
            {/* Headline + body text */}
            <div>
              <h2 className="text-3xl font-black uppercase mb-6 tracking-tight text-secondary">
                Technology Built Around Real-World Needs.
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4 whitespace-pre-wrap">
                {companyInfo.longDescription}
              </p>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg whitespace-pre-wrap">
                {companyInfo.history}
              </p>
            </div>

            {/* Why OceanNet bullet list (Inspirational image styling: no background, clean accent bar, single-line text) */}
            <div className="border-l-4 border-primary pl-4 md:pl-5 py-1">
              <h4 className="text-base md:text-lg font-black uppercase mb-3 text-secondary tracking-tight">
                Why OceanNet?
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-[13px] md:text-sm text-foreground/80 font-medium whitespace-normal xl:whitespace-nowrap leading-snug">
                    Local delivery capability combined with modern technology practices.
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-[13px] md:text-sm text-foreground/80 font-medium whitespace-normal xl:whitespace-nowrap leading-snug">
                    Proven expertise delivering practical, secure and sustainable digital solutions.
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                  <span className="text-xs sm:text-[13px] md:text-sm text-foreground/80 font-medium whitespace-normal xl:whitespace-nowrap leading-snug">
                    Strong partner ecosystem and responsive long-term support.
                  </span>
                </li>
              </ul>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground mr-2">
                Connect:
              </span>
              <a
                href={companyInfo.socials.facebook}
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white text-gray-400 transition-all shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={companyInfo.socials.instagram}
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:text-white text-gray-400 transition-all shadow-sm"
                style={{}}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
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
              <a
                href={companyInfo.socials.tiktok || "#"}
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-black hover:border-black hover:text-white text-gray-400 transition-all shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="flex flex-col gap-8 w-full"
          >
            {/* Large image */}
            <div className="relative w-full min-h-[420px] md:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <Image
                src="/images/about_us.jpeg"
                alt="OceanNet Technologies — Office and team"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Mission & Vision cards below the image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Tilt
                options={{ max: 15, scale: 1.02, speed: 450 }}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl border-t-4 border-primary group transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="h-8 w-8 text-primary group-hover:scale-110 transition-transform shrink-0" />
                  <h4 className="text-lg font-black uppercase tracking-tight text-secondary">
                    Our Vision
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {companyInfo.vision}
                </p>
              </Tilt>

              <Tilt
                options={{ max: 15, scale: 1.02, speed: 450 }}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl border-t-4 border-secondary group transition-all duration-300 h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-8 w-8 text-secondary group-hover:scale-110 transition-transform shrink-0" />
                  <h4 className="text-lg font-black uppercase tracking-tight text-secondary">
                    Our Mission
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {companyInfo.mission}
                </p>
              </Tilt>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-secondary mb-4">
              How We Work
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              A structured, practical approach — from understanding requirements
              to building lasting digital capability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_WE_WORK.map((item, idx) => (
              <motion.div
                key={item.step}
                variants={fadeIn("up", "spring", idx * 0.12, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Tilt
                  options={{ max: 15, scale: 1.02, speed: 450 }}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-5xl font-black text-gray-100 leading-none select-none">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-secondary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TEAM ── */}
      <section className="container mx-auto px-4 md:px-6 py-8 mb-10">
        <SectionHeader
          subtitle="Our Team"
          title="Meet The Team"
          description="Experienced technology professionals dedicated to delivering innovative, secure, and reliable digital solutions that empower organizations to achieve their strategic goals."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              variants={fadeIn("up", "spring", idx * 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col h-full"
            >
              <Tilt
                options={{ max: 15, scale: 1.02, speed: 450 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative h-96 overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h4 className="text-2xl font-black text-white leading-tight">
                      {formatName(member.name)}
                    </h4>
                    <p className="mt-2 text-sm text-accent uppercase tracking-wider font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>

                {member.bio && (
                  <div className="p-6 border-t border-slate-100 bg-white grow">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {member.bio}
                    </p>
                  </div>
                )}
              </Tilt>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
