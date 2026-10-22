"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Link2 } from "lucide-react";
import { fadeIn } from "@/lib/motion";
import { MobileCarouselControls } from "@/components/shared/mobile-carousel-controls";
import { useMobileCarousel } from "@/components/shared/use-mobile-carousel";

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
  const { activeIndex, handleScroll, scrollContainerRef, scrollTo } =
    useMobileCarousel(projects.length, "start");

  return (
    <div className="relative group/carousel">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 px-4 -mx-4 md:px-0 md:mx-0 touch-auto overscroll-x-contain scroll-pl-4 md:scroll-pl-0"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeIn("", "tween", Math.min(index * 0.02, 0.1), 0.25)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "150px 0px" }}
            className="shrink-0 w-[94%] md:w-full snap-start flex flex-col"
          >
            <Link
              href={`/projects/${project.slug || project.id}`}
              className="group flex flex-col overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  unoptimized={/^https?:\/\//i.test(project.image)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark overlay on hover with two icon buttons */}
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-90 transition-opacity duration-400 flex items-center justify-center gap-4 z-10">
                  <span className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Eye className="w-5 h-5 text-white" />
                  </span>
                  <span className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500 delay-75">
                    <Link2 className="w-5 h-5 text-white" />
                  </span>
                </div>

                {/* Category badge — auto-width, top-left of image */}
                <div className="absolute top-0 left-0 z-20 px-3 py-2 bg-primary">
                  <span className="text-white text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Title area — primary bg */}
              <div className="bg-secondary px-4 py-3">
                <h3 className="text-[0.95rem] font-black uppercase text-white tracking-tight leading-tight line-clamp-1">
                  {project.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <MobileCarouselControls
        activeIndex={activeIndex}
        count={projects.length}
        itemLabel="project"
        onSelect={scrollTo}
      />
    </div>
  );
}
