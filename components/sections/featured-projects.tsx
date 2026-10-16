import Link from "next/link";
import { db } from "@/lib/db";
import { SectionHeader } from "@/components/shared/section-header";
import { FeaturedProjectsClient } from "./featured-projects-client";

export async function FeaturedProjects() {
  const projects = await db.project.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="py-8 sm:py-12 md:py-14 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          subtitle="Our Work"
          title="Featured Projects"
          description="Explore some of our innovative technology projects delivering digital transformation across diverse industries."
        />

        <FeaturedProjectsClient projects={projects} />

        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
          <Link
            href="/projects"
            className="inline-flex py-3.5 px-8 sm:py-4 sm:px-10 rounded-sm border-2 border-secondary text-secondary font-black text-xs sm:text-sm uppercase tracking-widest transition-all hover:bg-secondary hover:text-white"
          >
            VIEW ALL PROJECTS
          </Link>
        </div>
      </div>
    </section>
  );
}
