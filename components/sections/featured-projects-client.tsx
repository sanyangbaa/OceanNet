"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ensureStringArray } from "@/lib/utils";
import { fadeIn } from "@/lib/motion";
import { Tilt } from "@/components/shared/tilt";

interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
  status: string;
  slug: string | null;
  shortDescription?: string | null;
  technologies?: unknown;
}

interface FeaturedProjectsClientProps {
  projects: Project[];
}

export function FeaturedProjectsClient({
  projects,
}: FeaturedProjectsClientProps) {
  return (
    <div className="relative group/carousel">
      <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="shrink-0 w-[95%] sm:w-96 md:w-auto snap-center flex flex-col"
          >
            <Tilt
              options={{ max: 45, scale: 1.02, speed: 450 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col border border-gray-100 hover:border-primary/30 h-full"
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
                    <span className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
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
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 max-w-md">{project.shortDescription}</p>
                  )}
                  {ensureStringArray(project.technologies).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-3 justify-center">
                      {ensureStringArray(project.technologies).map((tech) => (
                        <span key={tech} className="text-[10px] uppercase font-black tracking-wide text-primary bg-primary/10 px-2 py-1 rounded-sm">
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

      {/* Mobile indicator */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {projects.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/20" />
        ))}
      </div>
    </div>
  );
}
