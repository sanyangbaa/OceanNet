"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn, ensureStringArray } from "@/lib/utils";
import { ProjectMediaGallery } from "@/components/projects/project-media-gallery";
import { textVariant, fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";
import { SectionHeader } from "@/components/shared/section-header";
import { AnimatedBubbles } from "@/components/shared/animated-bubbles";

interface ProjectDetailClientProps {
  project: any;
  relatedProjects: any[];
}

export function ProjectDetailClient({
  project,
  relatedProjects,
}: ProjectDetailClientProps) {
  return (
    <div className="pt-14 pb-12 min-h-screen bg-white overflow-hidden">
      {/* Dynamic Hero Section with Animated Bubbles */}
      <section className="relative h-[48vh] min-h-80 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#03045E]/80" />
        <AnimatedBubbles count={16} variant="mixed" />
        <div className="absolute inset-0 flex items-end z-10">
          <div className="container mx-auto px-4 md:px-6 pb-6 md:pb-8">
            <motion.div
              variants={textVariant(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="max-w-3xl">
                <span className="bg-primary text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest inline-block rounded-sm shadow-md">
                  {project.category}
                </span>
                <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                  {project.title}
                </h1>
                <div className="mt-3 text-sm text-white/80">
                  <Link
                    href="/projects"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    Projects
                  </Link>
                  <span className="mx-2">/</span>
                  <span className="hidden md:inline font-semibold uppercase tracking-[0.2em] text-white">
                    {project.title}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Description & Gallery */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              <div>
                <motion.h2
                  variants={textVariant(0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-3xl font-black uppercase mb-6 flex items-center gap-4 text-secondary"
                >
                  Project Overview
                  <div className="h-1 grow bg-gray-100" />
                </motion.h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Media Gallery */}
              <ProjectMediaGallery
                mainImage={project.image}
                gallery={
                  Array.isArray(project.gallery)
                    ? (project.gallery as string[])
                    : []
                }
                youtubeUrl={project.youtubeUrl}
                title={project.title}
              />
            </div>

            {/* Right Column: Project Info Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <Tilt
                options={{ max: 20, scale: 1.01, speed: 450 }}
                className="bg-secondary text-white p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group border border-white/10"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

                <h3 className="text-2xl font-black uppercase mb-8 border-b border-white/20 pb-4 text-white">
                  Project Stats
                </h3>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <User className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                        Client
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white">
                          {project.client}
                        </span>
                        {project.clientLogo && (
                          <div className="w-10 h-10 relative rounded-sm overflow-hidden bg-white/10 p-1">
                            <Image
                              src={project.clientLogo}
                              alt={`${project.client} logo`}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                      </div>
                      {project.clientWebsite && (
                        <a
                          href={project.clientWebsite}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-accent hover:text-white transition-colors block mt-1"
                        >
                          Visit client site →
                        </a>
                      )}
                    </div>
                  </div>

                  {project.year && (
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-accent shrink-0" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                          Completion Year
                        </span>
                        <span className="text-lg font-bold text-white">
                          {project.year}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <Tag className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                        Sector
                      </span>
                      <span className="text-lg font-bold text-white">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {ensureStringArray(project.technologies).length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="w-6" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                          Technologies
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {ensureStringArray(project.technologies).map((t) => (
                            <span
                              key={t}
                              className="text-xs font-black uppercase tracking-wide text-accent bg-accent/15 px-2 py-1 rounded-sm ring-1 ring-accent/30"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                        Location
                      </span>
                      <span className="text-lg font-bold text-white">
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-white/60 tracking-widest block mb-1">
                        Work Status
                      </span>
                      <span className="text-lg font-bold text-white">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="mt-10 w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-secondary transition-all shadow-lg text-sm hover:scale-105 active:scale-95 duration-300"
                >
                  Inquire For Similar Work
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader
            subtitle="Explore More"
            title="Related Work"
            description="Our commitment to excellence shines through in every digital solution we deliver."
            align="center"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((rp, idx) => (
              <motion.div
                key={rp.id}
                variants={fadeIn("up", "spring", idx * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col h-full"
              >
                <Tilt
                  options={{ max: 35, scale: 1.02, speed: 450 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all p-4 border border-border flex flex-col h-full"
                >
                  <Link
                    href={`/projects/${rp.slug || rp.id}`}
                    className="group flex flex-col gap-4 h-full"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">
                        {rp.category}
                      </span>
                      <h4 className="text-lg font-black uppercase text-secondary group-hover:text-primary transition-colors">
                        {rp.title}
                      </h4>
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
