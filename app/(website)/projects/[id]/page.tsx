import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectById,
  getRelatedProjects,
} from "@/lib/data";
import { ProjectDetailClient } from "@/components/projects/project-detail-client";
import { companyInfo } from "@/data/company";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = (await getProjectBySlug(id)) || (await getProjectById(id));
  if (!project) return { title: `Project | ${companyInfo.name}` };

  return {
    title: `${project.title} | ${companyInfo.name}`,
    description: project.shortDescription || project.description,
    alternates: { canonical: `/projects/${project.slug || project.id}` },
    openGraph: {
      type: "article",
      title: `${project.title} | ${companyInfo.name}`,
      description: project.shortDescription || project.description,
      images: project.image
        ? [{ url: project.image, alt: project.title }]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let project = await getProjectBySlug(id);
  if (!project) {
    project = await getProjectById(id);
  }

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(
    project.id,
    project.category,
    3,
  );

  return (
    <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
  );
}
