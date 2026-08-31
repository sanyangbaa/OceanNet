"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ApplyFormClient from "@/components/careers/apply-form-client";
import { ArrowLeft, Calendar, Clock, MessageSquare } from "lucide-react";
import { textVariant, fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { AnimatedBubbles } from "@/components/shared/animated-bubbles";

interface JobDetailClientProps {
  job: any;
  shareUrl: string;
  shareTitle: string;
}

export function JobDetailClient({
  job,
  shareUrl,
  shareTitle,
}: JobDetailClientProps) {
  const renderSection = (title: string, content: any) => {
    if (!content) return null;
    const items = Array.isArray(content)
      ? content
      : typeof content === "string" && content.startsWith("[")
        ? JSON.parse(content)
        : [];

    return (
      <section className="border-t border-white/10 pt-8 mt-8">
        <motion.h2
          variants={textVariant(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-xl font-bold text-white mb-4 flex items-center gap-2"
        >
          <span className="w-1.5 h-6 bg-accent rounded-full"></span>
          {title}
        </motion.h2>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item: string, i: number) => (
              <motion.div
                key={i}
                variants={fadeIn("up", "spring", i * 0.05, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Tilt
                  options={{ max: 20, scale: 1.02, speed: 450 }}
                  className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-sm h-full"
                >
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span className="text-white/90 text-sm leading-relaxed">
                    {item}
                  </span>
                </Tilt>
              </motion.div>
            ))}
          </div>
        ) : (
          <p
            className="text-white/80 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: String(content) }}
          />
        )}
      </section>
    );
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-secondary text-gray-100">
      {/* Background Decorative Glows and Animated Bubbles */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <AnimatedBubbles count={18} variant="mixed" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Back Link */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>
        </div>

        {/* Main Card */}
        <article className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 md:p-12 shadow-2xl">
          {/* Header */}
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {job.title}
              <span className="text-accent">.</span>
            </h1>

            {/* Meta Badges */}
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <span className="flex items-center gap-1.5 bg-accent/15 border border-accent/30 px-3 py-1.5 rounded-full text-accent font-semibold uppercase tracking-wider text-xs">
                {String(job.jobType || "Full-time")}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-white/80 text-xs">
                OceanNet Technologies
              </span>
            </div>

            {/* Posting Date & Deadline */}
            <div className="flex flex-wrap gap-4 text-xs text-white/60 border-t border-b border-white/10 py-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-white/50" />
                Posted:{" "}
                {job.postedAt
                  ? new Date(job.postedAt).toLocaleDateString()
                  : "-"}
              </span>
              {job.expiresAt && (
                <span className="flex items-center gap-1.5 text-accent">
                  <Clock className="h-4 w-4" />
                  Apply before:{" "}
                  {new Date(job.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </motion.div>

          {/* Description */}
          {job.description && (
            <section className="mt-8">
              <motion.h2
                variants={textVariant(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-xl font-bold text-white mb-4 flex items-center gap-2"
              >
                <span className="w-1.5 h-6 bg-accent rounded-full"></span>
                Role Overview
              </motion.h2>
              <div
                className="text-white/80 text-sm leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: job.description as string }}
              />
            </section>
          )}

          {/* Dynamic Sections */}
          {job.responsibilities &&
            renderSection("Responsibilities", job.responsibilities)}
          {job.qualifications &&
            renderSection("Qualifications", job.qualifications)}
          {job.benefits && renderSection("Benefits & Perks", job.benefits)}

          {/* Hiring Process */}
          <section className="border-t border-white/10 pt-8 mt-8">
            <motion.h2
              variants={textVariant(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-xl font-bold text-white mb-4 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-accent rounded-full"></span>
              Our Hiring Process
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { step: "01", label: "Apply" },
                { step: "02", label: "Screening" },
                { step: "03", label: "Assessment" },
                { step: "04", label: "Interview" },
                { step: "05", label: "Offer" },
              ].map((x, i) => (
                <motion.div
                  key={x.step}
                  variants={fadeIn("up", "spring", i * 0.08, 0.75)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <Tilt
                    options={{ max: 25, scale: 1.05, speed: 450 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl h-full shadow-sm hover:border-accent/40 transition-all"
                  >
                    <div className="text-accent font-black text-lg">
                      {x.step}
                    </div>
                    <div className="text-white/80 text-xs mt-1 font-semibold">
                      {x.label}
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Social Share */}
          <section className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Share this role
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Know someone who would be a great fit?
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-primary hover:text-white border border-white/15 hover:border-primary rounded-xl text-white transition-all shadow-sm flex items-center justify-center hover:scale-110 duration-200"
                  title="Share on LinkedIn"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-primary hover:text-white border border-white/15 hover:border-primary rounded-xl text-white transition-all shadow-sm flex items-center justify-center hover:scale-110 duration-200"
                  title="Share on Facebook"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-primary hover:text-white border border-white/15 hover:border-primary rounded-xl text-white transition-all shadow-sm flex items-center justify-center hover:scale-110 duration-200"
                  title="Share on WhatsApp"
                >
                  <MessageSquare className="h-4 w-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/10 hover:bg-primary hover:text-white border border-white/15 hover:border-primary rounded-xl text-white transition-all shadow-sm flex items-center justify-center hover:scale-110 duration-200"
                  title="Share on X"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Apply Form */}
          <section id="apply" className="border-t border-white/10 pt-10 mt-10">
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Apply for this position
              </h2>
              <p className="text-sm text-white/60 mb-6">
                Complete the form below and upload your resume. Our talent
                acquisition team will review it shortly.
              </p>
              <ApplyFormClient jobId={job.id} />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
