import { getPool, generateId } from "@/server/db";
import { sendMail } from "@/lib/mail";
import type { Job, Application } from "@/server/db";

/** Fetch all jobs with optional filters */
export async function getAllJobs(filters?: {
  jobType?: string;
  q?: string;
  activeOnly?: boolean;
}): Promise<Job[]> {
  const p = getPool();
  if (!p) return [];
  let sql = `SELECT * FROM "Job"`;
  const params: (string | number | boolean | null)[] = [];
  const conditions: string[] = [];
  if (filters?.jobType) {
    conditions.push(`"jobType" = ?`);
    params.push(filters.jobType);
  }
  if (filters?.q) {
    conditions.push(`("title" LIKE ? OR "description" LIKE ?)`);
    params.push(`%${filters.q}%`);
    params.push(`%${filters.q}%`);
  }
  if (filters?.activeOnly) {
    conditions.push(
      `("archived" = false OR "archived" IS NULL) AND ("expiresAt" IS NULL OR "expiresAt" > CURRENT_TIMESTAMP)`,
    );
  }
  if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
  sql += ` ORDER BY "postedAt" DESC`;
  const [rows] = await p.query(sql, params);
  // @ts-ignore
  return rows as Job[];
}

/** Get a single job by id */
export async function getJobById(id: string): Promise<Job | null> {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.query(`SELECT * FROM "Job" WHERE id = ? LIMIT 1`, [
    id,
  ]);
  // @ts-ignore
  return (rows as Job[])[0] || null;
}

/** Create a new job posting */
export async function createJob(data: {
  title: string;
  jobType?: string | null;
  description?: string | null;
  responsibilities?: any;
  qualifications?: any;
  benefits?: any;
  expiresAt?: Date | null;
}): Promise<Job | null> {
  const p = getPool();
  if (!p) return null;
  const id = generateId();
  const sql = `INSERT INTO "Job" (id, title, jobType, description, responsibilities, qualifications, benefits, expiresAt, postedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())`;
  await p.execute(sql, [
    id,
    data.title,
    data.jobType ?? "Full-time",
    data.description ?? null,
    JSON.stringify(data.responsibilities ?? null),
    JSON.stringify(data.qualifications ?? null),
    JSON.stringify(data.benefits ?? null),
    data.expiresAt ? data.expiresAt.toISOString() : null,
  ]);
  return await getJobById(id);
}

/** Create a new application */
export async function createApplication(data: {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetter?: string;
}): Promise<Application | null> {
  const p = getPool();
  if (!p) return null;
  const id = generateId();
  const sql = `INSERT INTO "Application" (id, "jobId", name, email, phone, resumeUrl, coverLetter, status, internalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await p.execute(sql, [
    id,
    data.jobId,
    data.name,
    data.email,
    data.phone ?? null,
    data.resumeUrl ?? null,
    data.coverLetter ?? null,
    "Application Received",
    null,
  ]);

  // Notify admin of new application
  const adminEmail = process.env.RECRUITMENT_EMAIL || "recruitment@ont.com";
  const job = await getJobById(data.jobId);
  const subject = `New application for ${job?.title || data.jobId}`;
  const html = `<p>Candidate <strong>${data.name}</strong> applied for <strong>${job?.title || data.jobId}</strong>.</p>`;
  try {
    await sendMail(adminEmail, subject, html);
  } catch (e) {
    console.error("Failed to send application email", e);
  }

  // Send confirmation to applicant
  try {
    const applicantHtml = `<p>Hi ${data.name},</p><p>Thank you for applying. We have received your application and our recruitment team will review it shortly.</p>`;
    await sendMail(
      data.email,
      `Application received — ${job?.title || data.jobId}`,
      applicantHtml,
    );
  } catch (e) {
    console.error("Failed to send confirmation to applicant", e);
  }

  const [rows] = await p.query(`SELECT * FROM "Application" WHERE id = ?`, [
    id,
  ]);
  // @ts-ignore
  return (rows as Application[])[0] || null;
}

/** Get applications for a job */
export async function getApplicationsByJob(
  jobId: string,
): Promise<Application[]> {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Application" WHERE "jobId" = ? ORDER BY "submittedAt" DESC`,
    [jobId],
  );
  // @ts-ignore
  return rows as Application[];
}

/** Get a single application by id */
export async function getApplicationById(
  id: string,
): Promise<Application | null> {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.query(
    `SELECT * FROM "Application" WHERE id = ? LIMIT 1`,
    [id],
  );
  // @ts-ignore
  return (rows as Application[])[0] || null;
}

/** Get all applications */
export async function getAllApplications(): Promise<Application[]> {
  const p = getPool();
  if (!p) return [];
  const [rows] = await p.query(
    `SELECT * FROM "Application" ORDER BY "submittedAt" DESC`,
  );
  // @ts-ignore
  return rows as Application[];
}

/** Update application status and internal notes */
export async function updateApplication(
  id: string,
  data: { status?: string | null; internalNotes?: string | null },
): Promise<Application | null> {
  const p = getPool();
  if (!p) return null;
  await p.execute(
    `UPDATE "Application" SET status = ?, internalNotes = ?, updatedAt = NOW() WHERE id = ?`,
    [data.status ?? null, data.internalNotes ?? null, id],
  );
  const updated = await getApplicationById(id);
  if (updated) {
    try {
      const job = await getJobById(updated.jobId as string);
      const applicantHtml = `<p>Hi ${updated.name},</p><p>Your application for <strong>${job?.title || updated.jobId}</strong> has been updated to <strong>${updated.status}</strong>.</p>`;
      await sendMail(
        updated.email as string,
        `Application status update — ${job?.title || ""}`,
        applicantHtml,
      );
    } catch (e) {
      console.error("Failed to send status update to applicant", e);
    }
  }
  return updated;
}

/** Update job */
export async function updateJob(
  id: string,
  data: Partial<{
    title: string;
    jobType?: string | null;
    description?: string | null;
    responsibilities?: any;
    qualifications?: any;
    benefits?: any;
    expiresAt?: Date | null;
    archived?: boolean;
  }>,
): Promise<Job | null> {
  const p = getPool();
  if (!p) return null;
  const sql = `UPDATE "Job" SET title = ?, jobType = ?, description = ?, responsibilities = ?, qualifications = ?, benefits = ?, expiresAt = ?, archived = ?, updatedAt = NOW() WHERE id = ?`;
  await p.execute(sql, [
    data.title ?? null,
    data.jobType ?? "Full-time",
    data.description ?? null,
    JSON.stringify(data.responsibilities ?? null),
    JSON.stringify(data.qualifications ?? null),
    JSON.stringify(data.benefits ?? null),
    data.expiresAt ? data.expiresAt.toISOString() : null,
    data.archived ?? false,
    id,
  ]);
  return await getJobById(id);
}

/** Delete job */
export async function deleteJob(id: string): Promise<boolean> {
  const p = getPool();
  if (!p) return false;
  await p.execute(`DELETE FROM "Job" WHERE id = ?`, [id]);
  return true;
}

/** Recruitment analytics */
export async function getRecruitmentAnalytics() {
  const p = getPool();
  if (!p) return { totalApplicants: 0, applicantsPerPosition: [], openJobs: 0 };

  const [totalRows] = await p.query(
    `SELECT COUNT(*) as count FROM "Application"`,
  );
  // @ts-ignore
  const totalApplicants = Number((totalRows as any[])[0]?.count || 0);

  const [perPosRows] = await p.query(
    `SELECT j.id, j.title, COUNT(a.id) as count FROM "Job" j LEFT JOIN "Application" a ON a."jobId" = j.id GROUP BY j.id, j.title ORDER BY count DESC`,
  );
  // @ts-ignore
  const applicantsPerPosition = (perPosRows as any[]).map((r) => ({
    jobId: r.id,
    title: r.title,
    count: Number(r.count || 0),
  }));

  const [openJobsRows] = await p.query(
    `SELECT COUNT(*) as count FROM "Job" WHERE ("expiresAt" IS NULL OR "expiresAt" > CURRENT_TIMESTAMP) AND ("archived" IS NULL OR "archived" = false)`,
  );
  // @ts-ignore
  const openJobs = Number((openJobsRows as any[])[0]?.count || 0);

  return { totalApplicants, applicantsPerPosition, openJobs };
}

/** Add candidate to talent pool */
export async function createTalent(data: {
  name: string;
  email: string;
  areaOfInterest?: string;
  resumeUrl?: string;
}) {
  const p = getPool();
  if (!p) return null;
  const id = generateId();
  await p.execute(
    `INSERT INTO "Talent" (id, name, email, areaOfInterest, resumeUrl) VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      data.name,
      data.email,
      data.areaOfInterest ?? null,
      data.resumeUrl ?? null,
    ],
  );
  try {
    const adminEmail = process.env.RECRUITMENT_EMAIL || "recruitment@ont.com";
    const html = `<p>New talent pool submission: <strong>${data.name}</strong> (${data.email})</p><p>Area: ${data.areaOfInterest || "—"}</p>`;
    await sendMail(adminEmail, `Talent pool submission: ${data.name}`, html);
  } catch (e) {
    console.error("Failed to notify admin of talent submission", e);
  }
  const [rows] = await p.query(`SELECT * FROM "Talent" WHERE id = ?`, [id]);
  // @ts-ignore
  return (rows as any[])[0] || null;
}
