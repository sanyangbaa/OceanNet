import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { getProjects } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
    })),
    ...services
      .filter((service) => service.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: now,
      })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug || project.id}`,
      lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
    })),
  ];
}
