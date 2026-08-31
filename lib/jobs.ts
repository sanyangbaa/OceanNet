import { getPool, normalizeResult, type Job, type Application } from "@/server/db";

/**
 * Fetch all jobs with optional filtering.
 * Filters may include location and department.
 */
export async function getJobs(filters?: { location?: string; department?: string }) {
  const p = getPool();
  if (!p) return [];
  let sql = `SELECT * FROM "Job"`;
  const params: (string | null)[] = [];
  const conditions: string[] = [];
  if (filters?.location) {
    conditions.push(`"location" = ?`);
    params.push(filters.location);
  }
  if (filters?.department) {
    conditions.push(`"department" = ?`);
    params.push(filters.department);
  }
  if (conditions.length) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }
  sql += ` ORDER BY "postedAt" DESC`;
  const [rows] = await p.query(sql, params);
  return normalizeResult<Job[]>(rows, "Job");
}

/** Fetch a single job by its slug */
export async function getJobBySlug(slug: string) {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(`SELECT * FROM "Job" WHERE "slug" = ? LIMIT 1`, [slug]);
  const results = normalizeResult<Job[]>(rows, "Job");
  return results[0] || null;
}

/** Create a new job record */
export async function createJob(job: Partial<Job> & { title: string; slug: string }) {
  const p = getPool();
  if (!p) throw new Error("No DB pool");
  const id = job.id ?? crypto.randomUUID?.() ?? Date.now().toString();
  const now = new Date();
  const cols = ["id", "title", "slug", "location", "department", "description", "responsibilities", "qualifications", "benefits", "postedAt", "expiresAt", "createdAt", "updatedAt"];
  const vals: (string | number | boolean | null)[] = [
    id,
    job.title,
    job.slug,
    (job.location as string) ?? null,
    (job.department as string) ?? null,
    (job.description as string) ?? null,
    JSON.stringify(job.responsibilities ?? []),
    JSON.stringify(job.qualifications ?? []),
    JSON.stringify(job.benefits ?? []),
    job.postedAt ? (job.postedAt instanceof Date ? job.postedAt.toISOString() : String(job.postedAt)) : now.toISOString(),
    job.expiresAt ? (job.expiresAt instanceof Date ? job.expiresAt.toISOString() : String(job.expiresAt)) : null,
    now.toISOString(),
    now.toISOString(),
  ];
  const placeholders = cols.map(() => "?").join(", ");
  const sql = `INSERT INTO "Job" (${cols.map(c => `"${c}"`).join(", ")}) VALUES (${placeholders})`;
  await p.execute(sql, vals);
  return { id, ...job, postedAt: (job.postedAt ? (job.postedAt instanceof Date ? job.postedAt : new Date(String(job.postedAt))) : now), createdAt: now, updatedAt: now } as Job;
}

/** Update an existing job */
export async function updateJob(id: string, data: Partial<Job>) {
  const p = getPool();
  if (!p) throw new Error("No DB pool");
  const now = new Date().toISOString();
  const setParts: string[] = [];
  const params: (string | null)[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    setParts.push(`"${key}" = ?`);
    if (value instanceof Date) {
      params.push(value.toISOString());
    } else if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      params.push(JSON.stringify(value));
    } else {
      params.push(value as any);
    }
  }
  setParts.push(`"updatedAt" = ?`);
  params.push(now);
  const sql = `UPDATE "Job" SET ${setParts.join(", ")} WHERE "id" = ?`;
  params.push(id);
  await p.execute(sql, params);
  return true;
}

/** Delete a job */
export async function deleteJob(id: string) {
  const p = getPool();
  if (!p) throw new Error("No DB pool");
  await p.execute(`DELETE FROM "Job" WHERE "id" = ?`, [id]);
  // Cascade delete applicants if foreign key constraints are not set to cascade
  await p.execute(`DELETE FROM "Application" WHERE "jobId" = ?`, [id]);
  return true;
}

/** Create an applicant record (store resumeUrl if provided) */
export async function createApplicant(app: Partial<Application> & { jobId: string; name: string; email: string }) {
  const p = getPool();
  if (!p) throw new Error("No DB pool");
  const id = app.id ?? crypto.randomUUID?.() ?? Date.now().toString();
  const now = new Date();
  const cols = ["id", "jobId", "name", "email", "phone", "resumeUrl", "coverLetter", "submittedAt"];
  const vals = [
    id,
    app.jobId,
    app.name,
    app.email,
    app.phone ?? null,
    app.resumeUrl ?? null,
    app.coverLetter ?? null,
    now.toISOString(),
  ];
  const placeholders = cols.map(() => "?").join(", ");
  const sql = `INSERT INTO "Application" (${cols.map(c => `"${c}"`).join(", ")}) VALUES (${placeholders})`;
  await p.execute(sql, vals);
  return { id, ...app, submittedAt: now } as Application;
}

/** Retrieve applicants for a specific job (admin view) */
export async function getApplicantsByJob(jobId: string) {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.execute(`SELECT * FROM "Application" WHERE "jobId" = ? ORDER BY "submittedAt" DESC`, [jobId]);
  return normalizeResult<Application[]>(rows, "Application");
}
