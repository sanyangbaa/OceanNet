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
  Search,
  CheckCircle2,
  Sparkles,
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
  jobTypes: string[];
  sp: any;
  hasFilter: boolean;
  companyInfo: any;
}

export function CareersClient({
  activeJobs,
  jobTypes,
  sp,
  hasFilter,
  companyInfo,
}: CareersClientProps) {
  const cultureItems = [
    {
      title: "Innovation",
      icon: Lightbulb,
      description:
        "We continuously explore new technologies and approaches to solve complex challenges and create value for our clients.",
    },
    {
      title: "Integrity",
      icon: Shield,
      description:
        "We conduct our business with honesty, transparency, accountability, and professionalism.",
    },
    {
      title: "Collaboration",
      icon: Users,
      description:
        "We believe the best outcomes are achieved through strong partnerships and teamwork.",
    },
    {
      title: "Customer Success",
      icon: Award,
      description:
        "Our success is measured by the success and impact achieved by our clients.",
    },
    {
      title: "Continuous Learning",
      icon: BookOpen,
      description:
        "We invest in knowledge, skills, and innovation to remain at the forefront of technological advancement.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-14 pb-12 overflow-hidden">
      {/* Hero Header with Animated Bubbles & textVariant */}
      <SectionHeader
        subtitle="Join Our Team"
        title="Careers"
        description={companyInfo.tagline || companyInfo.description}
        withBackground
        withBubbles
        backgroundImage="/images/ont_about.jpg"
      />

      <div className="container mx-auto px-4 md:px-6 space-y-24 mt-12">
        {/* Company Culture */}
        <section className="space-y-8">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We value collaborative minds, curiosity, and a commitment to high
              standards. Here are the values that define our workplace
              environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cultureItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-col h-full"
              >
                <Tilt
                  options={{ max: 35, scale: 1.03, speed: 450 }}
                  className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2.5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-secondary text-lg group-hover:text-primary transition-colors leading-tight">
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

        {/* Open Positions */}
        <section id="positions" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <motion.div
              variants={textVariant(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
                Open Positions
              </h2>
              <p className="text-muted-foreground text-sm">
                Explore our current opportunities and find your fit at OceanNet.
              </p>
            </motion.div>
            {hasFilter && (
              <Link
                href="/careers#positions"
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1 shrink-0"
              >
                Clear Filters
              </Link>
            )}
          </div>

          {/* Filter Bar */}
          <form
            method="get"
            action="#positions"
            className="bg-white rounded-2xl border border-border p-5 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-end"
          >
            {/* Search */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  name="q"
                  placeholder="Job title or keyword..."
                  defaultValue={sp?.q ?? ""}
                  className="p-3 pl-10 rounded-xl bg-background text-secondary placeholder-muted-foreground border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full text-sm"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="w-full md:w-56 space-y-1.5">
              <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Job Type
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  name="jobType"
                  defaultValue={sp?.jobType ?? ""}
                  className="p-3 pl-10 rounded-xl bg-background text-secondary border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-full appearance-none text-sm cursor-pointer"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-8 py-3.5 rounded-xl font-bold hover:bg-secondary hover:shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>

          {/* Job listings */}
          {activeJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-border p-12 text-center shadow-sm max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-secondary font-semibold text-lg">
                No positions found
              </p>
              <p className="text-muted-foreground text-sm">
                {hasFilter
                  ? "No open positions match your current filters."
                  : "There are no open positions right now. Check back soon!"}
              </p>
              {hasFilter && (
                <Link
                  href="/careers#positions"
                  className="inline-block bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-secondary transition-all text-sm"
                >
                  Reset Filters
                </Link>
              )}
            </div>
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
                      options={{ max: 25, scale: 1.02, speed: 450 }}
                      className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden group h-full justify-between"
                    >
                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      <div className="p-7 flex flex-col h-full gap-5">
                        {/* Header */}
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
                            <Briefcase className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Description */}
                        {job.description && (
                          <div
                            className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-1"
                            dangerouslySetInnerHTML={{
                              __html: String(job.description),
                            }}
                          />
                        )}

                        {/* Footer */}
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
                            className="bg-primary text-white hover:bg-secondary px-6 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 ml-auto group/btn shadow-md shadow-primary/20 hover:scale-105 active:scale-95"
                          >
                            Apply Now
                            <ChevronRight className="h-3 w-3 transform group-hover/btn:translate-x-0.5 transition-transform" />
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

        {/* FAQ */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Everything you need to know about our application and hiring
              process.
            </p>
          </motion.div>
          <FAQAccordion />
        </section>

        {/* Talent Community Callout Banner */}
        <section className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-8 justify-between items-center"
            style={{
              background:
                "linear-gradient(135deg, #03045E 0%, #0077C8 100%)",
            }}
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 max-w-xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Not finding the right role?
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                Join Our Talent Community
                <span className="text-accent">.</span>
              </h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Submit your profile and resume to our general talent pool. We
                regularly scan our community database when new positions open up
                and will reach out if there is a match.
              </p>

              <ul className="space-y-3 text-sm text-white/90">
                {[
                  "First priority for newly opened roles",
                  "Invitations to company networking events",
                  "Updates on technology tracks at OceanNet",
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
