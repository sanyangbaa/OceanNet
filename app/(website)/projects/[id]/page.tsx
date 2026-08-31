import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectById,
  getRelatedProjects,
} from "@/lib/data";
import { ProjectDetailClient } from "@/components/projects/project-detail-client";

export const dynamic = "force-dynamic";

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
    <ProjectDetailClient
      project={project}
      relatedProjects={relatedProjects}
    />
  );
}
