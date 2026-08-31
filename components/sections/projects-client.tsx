"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ensureStringArray } from "@/lib/utils";
import type { Project } from "@/server/db";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

export function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(initialProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Filter Section */}
      <section className="container mx-auto px-4 md:px-6 mb-6">
        {/* Mobile Select Filter */}
        <div className="md:hidden mb-8">
          <label htmlFor="category-filter" className="sr-only">
            Filter projects by category
          </label>
          <div className="relative">
            <select
              id="category-filter"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none w-full bg-white border-2 border-border text-secondary py-4 px-6 rounded-sm font-bold uppercase tracking-widest text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm pr-12"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-muted-foreground">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Desktop Button Filters */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest transition-all ${
                activeFilter === category
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "bg-white text-secondary/70 border-2 border-border hover:border-secondary hover:text-secondary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", "spring", index * 0.08, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col h-full"
            >
              <Tilt
                options={{ max: 45, scale: 1.02, speed: 450 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-border hover:border-primary/30 h-full"
              >
                <Link
                  href={`/projects/${project.slug || project.id}`}
                  className="group flex flex-col h-full"
                >
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm border border-border">
                        {project.status}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-primary text-white p-3 rounded-sm scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col items-center text-center grow">
                    <div className="flex flex-col items-center gap-2 mb-2">
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                        {project.category}
                      </span>
                      <div className="h-1 w-8 bg-primary/30 group-hover:w-16 transition-all duration-500" />
                    </div>
                    <h3 className="text-xl font-black uppercase text-secondary tracking-tighter leading-[1.1] transition-colors group-hover:text-primary line-clamp-1">
                      {project.title}
                    </h3>
                    {project.shortDescription && (
                      <p className="text-base text-muted-foreground mt-2 line-clamp-2 max-w-md">
                        {project.shortDescription}
                      </p>
                    )}
                    {ensureStringArray(project.technologies).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-3 justify-center">
                        {ensureStringArray(project.technologies).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] uppercase font-black tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-2xl font-bold text-muted-foreground">
              No projects found in this category.
            </h3>
          </div>
        )}
      </section>
    </>
  );
}
