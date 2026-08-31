import {
  getPool,
  normalizeResult,
  type Partner,
  type Project,
  type TeamMember,
  type CompanyInfo,
  type Testimonial,
} from "@/server/db";
import type { Service } from "@/data/services";
import { cache } from "react";

// --- Public Data Fetching ---

export const getProjects = cache(async () => {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Project" ORDER BY "updatedAt" DESC`,
  );
  return normalizeResult<Project[]>(rows, "Project");
});

export const getProjectBySlug = cache(async (slug: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Project" WHERE "slug" = ? LIMIT 1`,
    [slug],
  );
  const results = normalizeResult<Project[]>(rows, "Project");
  return results[0] || null;
});

export const getProjectById = cache(async (id: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Project" WHERE "id" = ? LIMIT 1`,
    [id],
  );
  const results = normalizeResult<Project[]>(rows, "Project");
  return results[0] || null;
});

export const getServices = cache(async () => {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(`SELECT * FROM "Service" ORDER BY "order" ASC`);
  return normalizeResult<Service[]>(rows, "Service");
});

export const getServiceById = cache(async (id: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Service" WHERE "id" = ? LIMIT 1`,
    [id],
  );
  const results = normalizeResult<Service[]>(rows, "Service");
  return results[0] || null;
});

export const getServiceBySlug = cache(async (slug: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Service" WHERE "slug" = ? LIMIT 1`,
    [slug],
  );
  const results = normalizeResult<Service[]>(rows, "Service");
  return results[0] || null;
});

export const getTeamMembers = cache(async () => {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "TeamMember" ORDER BY "order" ASC`,
  );
  return normalizeResult<TeamMember[]>(rows, "TeamMember");
});

export const getTeamMemberById = cache(async (id: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "TeamMember" WHERE "id" = ? LIMIT 1`,
    [id],
  );
  const results = normalizeResult<TeamMember[]>(rows, "TeamMember");
  return results[0] || null;
});

export const getCompanyInfo = cache(async () => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(`SELECT * FROM "CompanyInfo" LIMIT 1`);
  const results = normalizeResult<CompanyInfo[]>(rows, "CompanyInfo");
  return results[0] || null;
});

export const getTestimonials = cache(async () => {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Testimonial" ORDER BY "order" ASC`,
  );
  return normalizeResult<Testimonial[]>(rows, "Testimonial");
});

export const getPartners = cache(async () => {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Partner" WHERE "active" IS NOT FALSE ORDER BY "order" ASC`,
  );
  return normalizeResult<Partner[]>(rows, "Partner");
});

export async function getAdminPartners() {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(`SELECT * FROM "Partner" ORDER BY "order" ASC`);
  return normalizeResult<Partner[]>(rows, "Partner");
}

export const getTestimonialById = cache(async (id: string) => {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Testimonial" WHERE "id" = ? LIMIT 1`,
    [id],
  );
  const results = normalizeResult<Testimonial[]>(rows, "Testimonial");
  return results[0] || null;
});

// --- Admin Data Fetching ---

export async function getAdminCounts() {
  const p = getPool();
  if (!p) return { projects: 0, services: 0, team: 0, testimonials: 0 };

  const [[projectRes], [serviceRes], [teamRes], [testimonialRes]] =
    await Promise.all([
      p.execute(`SELECT COUNT(*) as count FROM "Project"`),
      p.execute(`SELECT COUNT(*) as count FROM "Service"`),
      p.execute(`SELECT COUNT(*) as count FROM "TeamMember"`),
      p.execute(`SELECT COUNT(*) as count FROM "Testimonial"`),
    ]);

  return {
    projects: Number(
      (projectRes as unknown as Record<string, unknown>[])[0]?.count || 0,
    ),
    services: Number(
      (serviceRes as unknown as Record<string, unknown>[])[0]?.count || 0,
    ),
    team: Number(
      (teamRes as unknown as Record<string, unknown>[])[0]?.count || 0,
    ),
    testimonials: Number(
      (testimonialRes as unknown as Record<string, unknown>[])[0]?.count || 0,
    ),
  };
}

export async function getAdminProjects() {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Project" ORDER BY "createdAt" DESC`,
  );
  return normalizeResult<Project[]>(rows, "Project");
}

export async function getAdminTeamMembers() {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "TeamMember" ORDER BY "order" ASC`,
  );
  return normalizeResult<TeamMember[]>(rows, "TeamMember");
}

export async function getAdminTestimonials() {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Testimonial" ORDER BY "createdAt" DESC`,
  );
  return normalizeResult<Testimonial[]>(rows, "Testimonial");
}

export const getRelatedProjects = cache(
  async (id: string, category: string, take: number = 3) => {
    const p = getPool();
    if (!p) return [];
    // Use raw SQL to handle the exclusion and limit efficiently
    const [rows] = await p.query(
      `SELECT * FROM "Project" WHERE "id" != ? AND "category" = ? LIMIT ?`,
      [id, category, take],
    );
    return normalizeResult<Project[]>(rows, "Project");
  },
);
