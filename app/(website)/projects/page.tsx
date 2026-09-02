import { getProjects, getCompanyInfo } from "@/lib/data";
import { Project } from "@/server/db";
import { SectionHeader } from "@/components/shared/section-header";
import { ProjectsClient } from "@/components/sections/projects-client";
import { companyInfo as staticCompanyInfo } from "@/data/company";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return {
    title: `Projects | ${staticCompanyInfo.projectsMetaTitle || "ONT"}`,
    description:
      staticCompanyInfo.projectsMetaDescription || "OceanNet Technologies.",
  };
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let companyInfo: { name?: string } | null = null;

  try {
    projects = await getProjects();
    companyInfo = await getCompanyInfo();
  } catch (error) {
    console.error("Failed to fetch data for ProjectsPage:", error);
  }

  const shortName = companyInfo?.name?.split(" ")[0] || "ONT";

  return (
    <div className="pt-14 pb-12 min-h-screen bg-gray-50">
      {/* Hero Header */}
      <SectionHeader
        subtitle="Our Portfolio"
        title="Projects"
        description="Explore our portfolio of innovative technology projects delivering digital transformation across government, enterprises, and development organizations."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
        withBackground
      />

      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
