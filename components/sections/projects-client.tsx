"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const mobileFilterRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    ...Array.from(new Set(initialProjects.map((p) => p.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(event.target as Node)
      ) {
        setIsMobileFilterOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMobileFilterOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Filter Section */}
      <section className="container mx-auto px-4 md:px-6 mb-6">
        {/* Mobile Category Filter */}
        <div className="md:hidden mb-8">
          <div ref={mobileFilterRef} className="relative">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Browse by category
            </p>
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen((open) => !open)}
              aria-expanded={isMobileFilterOpen}
              aria-haspopup="listbox"
              className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-4 py-3.5 text-left shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Selected category
                </span>
                <span className="mt-1 block text-sm font-black uppercase tracking-wider text-secondary">
                  {activeFilter}
                </span>
              </span>
              <ChevronDown
                size={18}
                className={`text-primary transition-transform ${
                  isMobileFilterOpen ? "rotate-180" : ""
                }`}
              >
              </ChevronDown>
            </button>

            {isMobileFilterOpen && (
              <div
                role="listbox"
                aria-label="Filter projects by category"
                className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-lg border border-border bg-white p-2 shadow-[0_16px_40px_rgba(3,4,94,0.16)]"
              >
                {categories.map((category) => {
                  const isSelected = activeFilter === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setActiveFilter(category);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? "bg-primary text-white"
                          : "text-secondary hover:bg-muted"
                      }`}
                    >
                      {category}
                      {isSelected && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
            )}
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
                options={{ max: 15, scale: 1.02, speed: 450 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-border hover:border-primary/30 h-full"
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
