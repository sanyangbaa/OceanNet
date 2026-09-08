"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Clock,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Compass,
} from "lucide-react";
import { fadeIn, textVariant } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { SectionHeader } from "@/components/shared/section-header";
import FAQAccordion from "@/components/careers/faq-accordion";
import TalentFormClient from "@/components/careers/talent-form-client";

const JOB_TYPE_COLORS: Record<string, string> = {
  "Full-time": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Part-time": "bg-blue-500/10 text-primary border-blue-500/20",
  Contract: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Internship: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Remote: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  Hybrid: "bg-teal-500/10 text-teal-600 border-teal-500/20",
  Volunteer: "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

interface CareersClientProps {
  activeJobs: any[];
  jobTypes?: string[];
  companyInfo?: any;
}

export function CareersClient({ activeJobs = [] }: CareersClientProps) {
  const cultureItems = [
    {
      title: "Innovation",
      icon: Lightbulb,
      description:
        "We continuously explore new technologies and practical approaches to solve complex challenges and create sustainable value.",
    },
    {
      title: "Integrity",
      icon: Shield,
      description:
        "We conduct our business and technical delivery with honesty, transparency, accountability, and professional discipline.",
    },
    {
      title: "Collaboration",
      icon: Users,
      description:
        "We believe dependable outcomes are achieved through multidisciplinary teamwork and respectful client partnerships.",
    },
    {
      title: "Customer Success",
      icon: Award,
      description:
        "Our work is measured by the tangible improvements, stability, and operational impact experienced by our clients.",
    },
    {
      title: "Continuous Learning",
      icon: BookOpen,
      description:
        "We invest in ongoing skill building, mentorship, and modern engineering practices to keep capabilities sharp.",
    },
  ];

  const whyOceanNet = [
    {
      icon: Layers,
      title: "Real-World Operational Impact",
      description:
        "Contribute to nationally significant digital initiatives — including land information systems, public health surveillance platforms, and enterprise cloud networks that touch lives across the country.",
    },
    {
      icon: Cpu,
      title: "Multidisciplinary Engineering",
      description:
        "Collaborate across custom software development, systems integration, enterprise databases, cloud infrastructure, and cybersecurity in modern, secure technical environments.",
    },
    {
      icon: Compass,
      title: "Sustainable Capability Building",
      description:
        "We prioritize knowledge transfer, clean maintainable architectures, and local technical empowerment over fragile short-term fixes.",
    },
  ];

  const hiringSteps = [
    {
      step: "01",
      title: "Application & Alignment",
      description:
        "Submit your CV for an active opening or the talent community. We assess practical technical capability and project alignment.",
    },
    {
      step: "02",
      title: "Technical Conversation",
      description:
        "A structured, practical dialogue with our engineering team focused on real operational problem-solving and architecture.",
    },
    {
      step: "03",
      title: "Clear Decisions & Feedback",
      description:
        "Honest, direct communication regarding project staffing requirements and mutual fit, with transparent onboarding.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-14 pb-12 overflow-x-hidden">
      {/* Hero Header matching other site page headers */}
      <SectionHeader
        subtitle="Join Our Team"
        title="Careers"
        description="We are building a multidisciplinary team that works across software, systems integration, cloud, infrastructure and digital transformation."
        withBackground
        withBubbles
        backgroundImage="/images/ont_about.jpg"
      />

      <div className="container mx-auto px-4 md:px-6 space-y-24">
        {/* Why Build Your Career at OceanNet */}
        <section className="space-y-8">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block">
              Why Join Us
            </span>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
              Build Meaningful Technology With Us
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Our projects provide opportunities to solve real operational problems and contribute to technology initiatives serving businesses, public institutions and development programmes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyOceanNet.map((item, idx) => (
              <motion.div
                key={item.title}
                variants={fadeIn("up", "spring", idx * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col h-full"
              >
                <Tilt
                  options={{ max: 15, scale: 1.02, speed: 450 }}
                  className="bg-white p-7 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start h-full group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-secondary transition-all">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-secondary mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Company Core Values */}
        <section className="space-y-8">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block">
              Our Culture
            </span>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
              Values That Guide Our Delivery
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Our culture emphasizes quality, ownership, and practical engineering over shortcuts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cultureItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn("up", "spring", index * 0.08, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col h-full"
              >
                <Tilt
                  options={{ max: 15, scale: 1.02, speed: 450 }}
                  className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary group-hover:bg-primary group-hover:text-secondary transition-all duration-300 shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-secondary text-base group-hover:text-primary transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions Section */}
        <section id="positions" className="space-y-8 scroll-mt-24">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block">
              Opportunities
            </span>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
              Open Positions
            </h2>
            <p className="text-muted-foreground text-sm">
              Current openings across our engineering, consulting, and operational teams.
            </p>
          </motion.div>

          {/* Job listings or Section 9 Empty State */}
          {activeJobs.length === 0 ? (
            <motion.div
              variants={fadeIn("up", "spring", 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-border p-8 md:p-14 text-center shadow-sm max-w-2xl mx-auto space-y-5"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-secondary uppercase tracking-tight">
                No Vacancies Currently Open
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                There are currently no open positions. You can still join our
                talent community and we will keep your profile for suitable future
                opportunities, subject to our Privacy Policy.
              </p>
              <div className="pt-2">
                <a
                  href="#talent-community"
                  className="inline-flex items-center gap-2 bg-primary text-secondary px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 shadow-md transition-all"
                >
                  Join Our Talent Community
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeJobs.map((job, index) => {
                const typeColor =
                  JOB_TYPE_COLORS[job.jobType as string] ||
                  "bg-primary/10 text-primary border-primary/20";
                return (
                  <motion.div
                    key={job.id}
                    variants={fadeIn("up", "spring", index * 0.08, 0.75)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="flex flex-col h-full"
                  >
                    <Tilt
                      options={{ max: 15, scale: 1.02, speed: 450 }}
                      className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden group h-full justify-between"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      <div className="p-7 flex flex-col h-full gap-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${typeColor}`}
                            >
                              <Sparkles className="h-2.5 w-2.5" />
                              {String(job.jobType || "Full-time")}
                            </span>
                            <h3 className="text-lg md:text-xl font-black text-secondary leading-tight group-hover:text-primary transition-colors duration-300">
                              {job.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">
                              OceanNet Technologies
                            </p>
                          </div>
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                            <Briefcase className="h-5 w-5 text-primary group-hover:text-secondary transition-colors duration-300" />
                          </div>
                        </div>

                        {job.description && (
                          <div
                            className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-1"
                            dangerouslySetInnerHTML={{
                              __html: String(job.description),
                            }}
                          />
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-border gap-3 mt-auto">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                            {job.postedAt
                              ? new Date(job.postedAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "—"}
                          </span>
                          {job.expiresAt && (
                            <span className="text-xs text-orange-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Closes{" "}
                              {new Date(job.expiresAt).toLocaleDateString(
                                "en-GB",
                                { day: "2-digit", month: "short" },
                              )}
                            </span>
                          )}
                          <Link
                            href={`/careers/${job.id}#apply`}
                            className="bg-primary text-secondary hover:bg-secondary hover:text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 ml-auto group/btn shadow-sm hover:shadow-md"
                          >
                            Apply Now
                            <ChevronRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </Tilt>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Talent & Hiring Philosophy */}
        <section className="space-y-8">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block">
              Our Process
            </span>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
              How We Evaluate &amp; Hire
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We look for genuine problem-solving capability, technical diligence, and positive collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hiringSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                variants={fadeIn("up", "spring", idx * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="bg-white p-7 rounded-3xl border border-border shadow-sm h-full flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-4xl font-black text-primary/30 block mb-2 font-mono">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-black uppercase text-secondary tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary block">
              Got Questions?
            </span>
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Answers regarding our work, recruitment practices, and talent community.
            </p>
          </motion.div>
          <FAQAccordion />
        </section>

        {/* Talent Community Callout Banner */}
        <section id="talent-community" className="max-w-7xl mx-auto scroll-mt-24">
          <div
            className="rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-8 justify-between items-center"
            style={{
              background: "linear-gradient(135deg, #0A192F 0%, #0077C8 100%)",
            }}
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 max-w-xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                Join The Talent Pool
              </span>
              <h2 className="text-3xl md:text-5xl text-white uppercase tracking-tight leading-tight font-black">
                Join Our Talent Community
                <span className="text-accent">.</span>
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Submit your profile and CV to our general talent pool. We
                regularly review our community database when new positions or
                project engagements open up and will reach out if there is a
                suitable match.
              </p>

              <ul className="space-y-3 text-sm text-white/90">
                {[
                  "Direct review for upcoming engineering and project openings",
                  "Opportunities across digital solutions, cloud, health, and enterprise systems",
                  "Secure, confidential CV retention in line with our Privacy Policy",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-2xl w-full lg:w-[420px] relative z-10 shrink-0">
              <TalentFormClient variant="dark" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
