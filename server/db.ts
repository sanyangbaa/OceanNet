import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { Pool as PostgresPool } from "pg";
import type { Service } from "@/data/services";

export type { Service } from "@/data/services";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export interface Admin {
  id: string;
  username: string;
  password?: string;
  role: "super_admin" | "admin" | "editor";
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

export interface Project {
  id: string;
  slug: string | null;
  title: string;
  client: string;
  category: string;
  image: string;
  description: string;
  status: string;
  year?: number | null;
  duration?: string | null;
  value?: string | null;
  location: string;
  scope?: JsonValue;
  gallery?: JsonValue;
  keyFeatures?: JsonValue;
  shortDescription?: string | null;
  bannerImage?: string | null;
  industry?: string | null;
  projectType?: string | null;
  clientLogo?: string | null;
  clientWebsite?: string | null;
  publishStatus?: string | null;
  technologies?: JsonValue;
  featured?: boolean | null;
  youtubeUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

// New Job interface for Careers
export interface Job {
  id: string;
  title: string;
  jobType: string;
  description?: string | null;
  responsibilities?: JsonValue;
  qualifications?: JsonValue;
  benefits?: JsonValue;
  postedAt: Date;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

// New Application interface
export interface Application {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
  coverLetter?: string | null;
  status?: string | null;
  internalNotes?: string | null;
  submittedAt: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string | null;
  order: number;
  email?: string | null;
  linkedin?: string | null;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

export interface Partner {
  id: string;
  name: string;
  description?: string | null;
  website?: string | null;
  image?: string | null;
  order: number;
  active?: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

export interface CompanyInfo {
  id: string;
  name: string;
  shortName?: string | null;
  tagline?: string | null;
  description?: string | null;
  longDescription?: string | null;
  history?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  socialLinks?: JsonValue;
  mission?: string | null;
  vision?: string | null;
  values?: JsonValue;
  updatedAt: Date;
  [key: string]: unknown;
}

export type AnyPool = {
  query: (
    sql: string,
    params?: (string | number | boolean | null)[],
  ) => Promise<[Record<string, unknown>[], null]>;
  execute: (
    sql: string,
    params?: (string | number | boolean | null)[],
  ) => Promise<[unknown, null]>;
};

// Global singleton for database pool to prevent connection exhaustion in development
const globalForDb = global as unknown as {
  pool: AnyPool | undefined;
};

let pool: AnyPool | null = globalForDb.pool || null;

function mapQuestionToDollar(sql: string) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

function normalizeSql(sql: string, isPostgres: boolean) {
  if (isPostgres) return sql;
  // Replace double quotes with backticks for MySQL/MariaDB
  // Note: This is simple and works for table/column names that don't contain escaped quotes
  return sql.replace(/"([^"]+)"/g, "`$1`");
}

export function getPool(): AnyPool | null {
  if (pool) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  const isPostgres =
    url.startsWith("postgres://") || url.startsWith("postgresql://");
  const isMysql = url.startsWith("mysql://");

  if (!isPostgres && !isMysql) {
    throw new Error(
      "DATABASE_URL must be a Postgres or MySQL connection string",
    );
  }

  const isDev = process.env.NODE_ENV === "development";
  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");
  const sslEnabled =
    process.env.DATABASE_SSL === "true" ||
    (!isDev && process.env.DATABASE_SSL !== "false" && !isLocal);

  try {
    if (isPostgres) {
      const pg = new PostgresPool({
        connectionString: url,
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
      pg.on("error", (err) => {
        console.error("Unexpected error on idle client", err);
      });
      pool = {
        async query(sql, params = []) {
          try {
            const normalized = normalizeSql(sql, true);
            const mapped = mapQuestionToDollar(normalized);
            const cleanParams = params.map((p) =>
              p === undefined ? null : p,
            ) as (string | number | boolean | null)[];
            const res = await pg.query(mapped, cleanParams);
            return [res.rows as unknown as Record<string, unknown>[], null];
          } catch (e) {
            console.error("DB Query Error:", e);
            throw e;
          }
        },
        async execute(sql, params = []) {
          try {
            const normalized = normalizeSql(sql, true);
            const mapped = mapQuestionToDollar(normalized);
            const cleanParams = params.map((p) =>
              p === undefined ? null : p,
            ) as (string | number | boolean | null)[];
            const res = await pg.query(mapped, cleanParams);
            const cmd = String(res.command || "").toUpperCase();
            if (cmd === "SELECT" || /^\s*select/i.test(sql)) {
              return [res.rows as unknown as Record<string, unknown>[], null];
            }
            return [
              {
                insertId: (res.rows && res.rows[0]?.id) ?? null,
                rowCount: res.rowCount,
              },
              null,
            ];
          } catch (e) {
            if (!/^\s*ALTER\s+TABLE/i.test(sql)) {
              console.error(
                "DB Execute Error (Postgres):",
                e instanceof Error ? e.message : e,
              );
            }
            throw new Error("Execute failed");
          }
        },
      };
      // Initialize DB schema in background (create tables if missing)
      // Run asynchronously so getPool stays synchronous for callers.
      initDb().catch((e) => {
        console.error("Background DB init failed:", e);
      });
    } else {
      const my = mysql.createPool({
        uri: url,
        waitForConnections: true,
        connectionLimit: 20, // Increased from 10
        queueLimit: 0,
        connectTimeout: 30000, // 30 seconds
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        ssl: sslEnabled ? { rejectUnauthorized: false } : undefined,
      });
      pool = {
        async query(sql, params = []) {
          try {
            const normalized = normalizeSql(sql, false);
            const cleanParams = params.map((p) =>
              p === undefined ? null : p,
            ) as (string | number | boolean | null)[];
            const [rows] = await my.query(normalized, cleanParams);
            return [rows as Record<string, unknown>[], null];
          } catch {
            console.error("DB Query Error (MySQL):");
            throw new Error("Query failed");
          }
        },
        async execute(sql, params = []) {
          try {
            const normalized = normalizeSql(sql, false);
            const cleanParams = params.map((p) =>
              p === undefined ? null : p,
            ) as (string | number | boolean | null)[];
            const [result] = await my.execute(normalized, cleanParams);
            if (Array.isArray(result)) {
              return [result as Record<string, unknown>[], null];
            }
            return [
              {
                insertId:
                  (result as { insertId?: number | string }).insertId || null,
                rowCount:
                  (result as { affectedRows?: number }).affectedRows || 0,
              },
              null,
            ];
          } catch (e) {
            if (!/^\s*ALTER\s+TABLE/i.test(sql)) {
              console.error("DB Execute Error (MySQL):", e);
            }
            throw new Error("Execute failed");
          }
        },
      };
      // Initialize DB schema in background for MySQL as well
      initDb().catch((e) => {
        console.error("Background DB init failed:", e);
      });
    }
  } catch {
    console.error("Failed to initialize DB pool");
    return null;
  }
  if (process.env.NODE_ENV !== "production") {
    globalForDb.pool = pool;
  }

  return pool;
}

export function generateId() {
  return (
    Math.random().toString(36).substring(2, 12) +
    Math.random().toString(36).substring(2, 12)
  );
}

export function parseJsonField(val: unknown) {
  if (
    typeof val === "string" &&
    (val.trim().startsWith("[") || val.trim().startsWith("{"))
  ) {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown;
}

export function normalizeResult<T>(
  data: unknown,
  type:
    | "Project"
    | "Service"
    | "CompanyInfo"
    | "Job"
    | "Application"
    | "TeamMember"
    | "Admin"
    | "Testimonial"
    | "ContactMessage"
    | "Partner",
): T {
  if (!data) return data as T;
  if (Array.isArray(data)) {
    return data.map((d) => normalizeResult(d, type)) as unknown as T;
  }

  const res = { ...(data as Record<string, unknown>) };
  if (type === "Project") {
    res.scope = parseJsonField(res.scope);
    res.gallery = parseJsonField(res.gallery);
    res.keyFeatures = parseJsonField(res.keyFeatures);
  } else if (type === "Service") {
    res.features = parseJsonField(res.features);
    res.tools = parseJsonField(res.tools);
  } else if (type === "CompanyInfo") {
    res.socialLinks = parseJsonField(res.socialLinks);
    res.values = parseJsonField(res.values);
  } else if (type === "Job") {
    res.responsibilities = parseJsonField(res.responsibilities);
    res.qualifications = parseJsonField(res.qualifications);
    res.benefits = parseJsonField(res.benefits);
    const toDate = (v: unknown) =>
      v === null || v === undefined
        ? v
        : v instanceof Date
          ? v
          : new Date(String(v));
    res.postedAt = toDate(res.postedAt);
    res.createdAt = toDate(res.createdAt);
    res.updatedAt = toDate(res.updatedAt);
    res.expiresAt = res.expiresAt == null ? null : toDate(res.expiresAt);
  } else if (type === "Application") {
    const toDate = (v: unknown) =>
      v === null || v === undefined
        ? v
        : v instanceof Date
          ? v
          : new Date(String(v));
    res.submittedAt = toDate(res.submittedAt);
    res.updatedAt = toDate(res.updatedAt);
  }
  return res as T;
}

export async function findAdminByUsername(
  username: string,
): Promise<Admin | null> {
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.execute(
    `SELECT * FROM "Admin" WHERE username = ? LIMIT 1`,
    [username],
  );
  return (rows as unknown as Admin[])[0] || null;
}

export async function initDb() {
  const p = getPool();
  if (!p) return;

  const url = process.env.DATABASE_URL || "";
  const isPostgres =
    url.startsWith("postgres://") || url.startsWith("postgresql://");

  const TIMESTAMP = isPostgres ? "TIMESTAMPTZ" : "DATETIME";
  const NOW = isPostgres ? "NOW()" : "CURRENT_TIMESTAMP";
  const JSON_TYPE = isPostgres ? "JSONB" : "JSON";
  const TEXT_TYPE = isPostgres ? "TEXT" : "LONGTEXT";

  // Helper for adding columns
  const addColumn = async (
    table: string,
    col: string,
    type: string,
    def: string = "",
  ) => {
    if (isPostgres) {
      await p
        .execute(
          `ALTER TABLE "${table}" ADD COLUMN IF NOT EXISTS "${col}" ${type} ${def}`,
        )
        .catch(() => {});
    } else {
      try {
        const rawCol = col.replace(/`/g, "").replace(/"/g, "");
        const [rows] = await p.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [
          rawCol,
        ]);
        if (Array.isArray(rows) && rows.length === 0) {
          await p.execute(
            `ALTER TABLE ${table} ADD COLUMN ${col} ${type} ${def}`,
          );
        }
      } catch {}
    }
  };

  // Helper for deleting columns
  const dropColumn = async (table: string, col: string) => {
    try {
      if (isPostgres) {
        await p
          .execute(`ALTER TABLE "${table}" DROP COLUMN IF EXISTS "${col}"`)
          .catch(() => {});
      } else {
        try {
          const [result] = await p.query(`SHOW COLUMNS FROM ${table} LIKE ?`, [
            col,
          ]);
          if (Array.isArray(result) && result.length > 0) {
            await p.execute(`ALTER TABLE ${table} DROP COLUMN ${col}`);
          }
        } catch {}
      }
    } catch {}
  };

  try {
    if (isPostgres) {
      // Fix for columns already created in lower-case on existing Postgres DBs
      const renameCol = async (t: string, oldC: string, newC: string) => {
        await p
          .execute(`ALTER TABLE "${t}" RENAME COLUMN ${oldC} TO "${newC}"`)
          .catch(() => {});
      };
      await renameCol("Admin", "createdat", "createdAt");
      await renameCol("Admin", "updatedat", "updatedAt");
      await renameCol("Project", "createdat", "createdAt");
      await renameCol("Project", "updatedat", "updatedAt");
      await renameCol("Project", "keyfeatures", "keyFeatures");
      await renameCol("Service", "createdat", "createdAt");
      await renameCol("Service", "updatedat", "updatedAt");
      await renameCol("Service", "detailtext", "detailText");
      await renameCol("Application", "jobid", "jobId");
      await renameCol("Application", "submittedat", "submittedAt");
      await renameCol("Application", "updatedat", "updatedAt");
      await renameCol("TeamMember", "createdat", "createdAt");
      await renameCol("TeamMember", "updatedat", "updatedAt");
      await renameCol("CompanyInfo", "shortname", "shortName");
      await renameCol("CompanyInfo", "longdescription", "longDescription");
      await renameCol("CompanyInfo", "sociallinks", "socialLinks");
      await renameCol("CompanyInfo", "updatedat", "updatedAt");
    }

    // Admin Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Admin" (
      "id" VARCHAR(255) PRIMARY KEY,
      "username" VARCHAR(255) NOT NULL UNIQUE,
      "password" TEXT NOT NULL,
      "role" VARCHAR(50) DEFAULT 'admin',
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Ensure role column exists (for existing DBs)
    await addColumn("Admin", "role", "VARCHAR(50)", "DEFAULT 'admin'").catch(
      () => {},
    );

    // Project Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Project" (
      "id" VARCHAR(255) PRIMARY KEY,
      "slug" VARCHAR(255) UNIQUE,
      "title" TEXT NOT NULL,
      "client" TEXT NOT NULL,
      "category" TEXT NOT NULL,
      "image" ${TEXT_TYPE} NOT NULL,
      "description" ${TEXT_TYPE} NOT NULL,
      "shortDescription" ${TEXT_TYPE},
      "bannerImage" ${TEXT_TYPE},
      "industry" TEXT,
      "projectType" TEXT,
      "clientLogo" ${TEXT_TYPE},
      "clientWebsite" VARCHAR(255),
      "publishStatus" VARCHAR(50) DEFAULT 'Draft',
      "technologies" ${JSON_TYPE},
      "featured" BOOLEAN DEFAULT false,
      "status" TEXT NOT NULL,
      "year" INTEGER,
      "duration" TEXT,
      "value" TEXT,
      "location" TEXT NOT NULL,
      "scope" ${JSON_TYPE},
      "gallery" ${JSON_TYPE},
      "keyFeatures" ${JSON_TYPE},
      "youtubeUrl" TEXT,
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Ensure columns exist on existing DBs
    await addColumn("Project", "shortDescription", TEXT_TYPE).catch(() => {});
    await addColumn("Project", "bannerImage", TEXT_TYPE).catch(() => {});
    await addColumn("Project", "industry", "VARCHAR(255)").catch(() => {});
    await addColumn("Project", "projectType", "VARCHAR(255)").catch(() => {});
    await addColumn("Project", "clientLogo", TEXT_TYPE).catch(() => {});
    await addColumn("Project", "clientWebsite", "VARCHAR(255)").catch(() => {});
    await addColumn(
      "Project",
      "publishStatus",
      "VARCHAR(50)",
      "DEFAULT 'Draft'",
    ).catch(() => {});
    await addColumn("Project", "technologies", JSON_TYPE).catch(() => {});
    await addColumn("Project", "featured", "BOOLEAN", "DEFAULT false").catch(
      () => {},
    );
    await addColumn("Project", "youtubeUrl", TEXT_TYPE).catch(() => {});

    // Service Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Service" (
      "id" VARCHAR(255) PRIMARY KEY,
      "title" TEXT NOT NULL,
      "description" ${TEXT_TYPE} NOT NULL,
      "category" TEXT NOT NULL,
      "icon" ${TEXT_TYPE} NOT NULL,
      "features" ${JSON_TYPE},
      "order" INTEGER DEFAULT 0,
      "slug" VARCHAR(255) UNIQUE,
      "detailText" ${TEXT_TYPE},
      "tools" ${JSON_TYPE},
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);
    if (!isPostgres) {
      await addColumn("Service", "`order`", "INTEGER", "DEFAULT 0").catch(
        () => {},
      );
    }

    await addColumn("Service", "slug", "VARCHAR(255)").catch(() => {});
    await addColumn("Service", "detailText", TEXT_TYPE).catch(() => {});
    await addColumn("Service", "tools", JSON_TYPE).catch(() => {});

    // Job Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Job" (
      "id" VARCHAR(255) PRIMARY KEY,
      "title" TEXT NOT NULL,
      "jobType" VARCHAR(100) DEFAULT 'Full-time',
      "description" ${TEXT_TYPE},
      "responsibilities" ${JSON_TYPE},
      "qualifications" ${JSON_TYPE},
      "benefits" ${JSON_TYPE},
      "archived" BOOLEAN DEFAULT false,
      "postedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "expiresAt" ${TIMESTAMP},
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Application Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Application" (
      "id" VARCHAR(255) PRIMARY KEY,
      "jobId" VARCHAR(255) NOT NULL,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "resumeUrl" TEXT,
      "coverLetter" ${TEXT_TYPE},
      "status" VARCHAR(50) DEFAULT 'Application Received',
      "internalNotes" ${TEXT_TYPE},
      "updatedAt" ${TIMESTAMP},
      "submittedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Ensure new columns exist on existing DBs
    await addColumn("Job", "archived", "BOOLEAN", "DEFAULT false").catch(
      () => {},
    );
    await addColumn(
      "Job",
      "jobType",
      "VARCHAR(100)",
      "DEFAULT 'Full-time'",
    ).catch(() => {});
    // Drop obsolete columns from existing DBs (safe – ignore errors if columns don't exist)
    await dropColumn("Job", "slug").catch(() => {});
    await dropColumn("Job", "location").catch(() => {});
    await dropColumn("Job", "department").catch(() => {});
    await addColumn(
      "Application",
      "status",
      "VARCHAR(50)",
      "DEFAULT 'Application Received'",
    ).catch(() => {});
    await addColumn("Application", "internalNotes", TEXT_TYPE).catch(() => {});
    await addColumn("Application", "updatedAt", TIMESTAMP).catch(() => {});

    // TeamMember Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "TeamMember" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "image" ${TEXT_TYPE} NOT NULL,
      "bio" ${TEXT_TYPE},
      "order" INTEGER DEFAULT 0,
      "email" TEXT,
      "linkedin" TEXT,
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Partner Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Partner" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "description" ${TEXT_TYPE},
      "website" TEXT,
      "image" ${TEXT_TYPE},
      "order" INTEGER DEFAULT 0,
      "active" BOOLEAN DEFAULT true,
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    await addColumn("Partner", "description", TEXT_TYPE).catch(() => {});
    await addColumn("Partner", "website", "TEXT").catch(() => {});
    await addColumn("Partner", "image", TEXT_TYPE).catch(() => {});
    await addColumn("Partner", "order", "INTEGER", "DEFAULT 0").catch(() => {});
    await addColumn("Partner", "active", "BOOLEAN", "DEFAULT true").catch(
      () => {},
    );

    // Testimonial Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "role" TEXT NOT NULL,
      "content" ${TEXT_TYPE} NOT NULL,
      "rating" INTEGER DEFAULT 5,
      "image" ${TEXT_TYPE},
      "order" INTEGER DEFAULT 0,
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // CompanyInfo Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "CompanyInfo" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "shortName" TEXT,
      "tagline" TEXT,
      "description" ${TEXT_TYPE},
      "longDescription" ${TEXT_TYPE},
      "history" ${TEXT_TYPE},
      "email" TEXT,
      "phone" TEXT,
      "address" TEXT,
      "socialLinks" ${JSON_TYPE},
      "mission" ${TEXT_TYPE},
      "vision" ${TEXT_TYPE},
      "values" ${JSON_TYPE},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Ensure legacy stats column is removed
    await dropColumn("CompanyInfo", "stats").catch(() => {});

    // ContactMessage Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "ContactMessage" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "subject" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "status" VARCHAR(50) DEFAULT 'new',
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW},
      "updatedAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    // Talent Pool Table
    await p.execute(`CREATE TABLE IF NOT EXISTS "Talent" (
      "id" VARCHAR(255) PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "areaOfInterest" TEXT,
      "resumeUrl" TEXT,
      "createdAt" ${TIMESTAMP} NOT NULL DEFAULT ${NOW}
    )`);

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";
    const [rows] = await p.execute(
      `SELECT id FROM ${isPostgres ? '"Admin"' : "Admin"} WHERE username = ?`,
      [adminUser],
    );
    if (Array.isArray(rows) && rows.length === 0) {
      const hash = await bcrypt.hash(adminPass, 10);
      await p.execute(
        `INSERT INTO ${isPostgres ? '"Admin"' : "Admin"} (id, username, password, role) VALUES (?, ?, ?, ?)`,
        [generateId(), adminUser, hash, "super_admin"],
      );
    }

    // Seeding IT/Tech services
    const [serviceRows] = await p.execute(
      `SELECT id FROM ${isPostgres ? '"Service"' : "Service"} LIMIT 1`,
    );
    const [hasConstruction] = await p.execute(
      `SELECT id FROM ${isPostgres ? '"Service"' : "Service"} WHERE id = ? LIMIT 1`,
      ["arch-design"],
    );
    if (
      Array.isArray(serviceRows) &&
      (serviceRows.length === 0 ||
        (Array.isArray(hasConstruction) && hasConstruction.length > 0))
    ) {
      console.log("Seeding IT/Tech services...");
      await p.execute(`DELETE FROM ${isPostgres ? '"Service"' : "Service"}`);
      const itServices = [
        {
          id: "data-collection-surveys",
          slug: "data-collection-surveys",
          title: "Data Collection & Surveys",
          category: "IT Services",
          icon: "ClipboardList",
          description:
            "Large-scale household surveys, impact evaluations, RCTs, and learning assessments using mobile CAPI technology.",
          detailText:
            "OceanNet designs and implements large-scale data collection operations for impact evaluations, randomised controlled trials, household surveys, and standardised learning assessments. We deploy mobile CAPI systems across diverse geographies, manage field teams of up to 50+ enumerators, and ensure rigorous quality assurance through our proprietary platforms.",
          features: JSON.stringify([
            "Large-scale household surveys (3,000-50,000+ respondents)",
            "EGRA/EGMA and other standardised learning assessments",
            "Multi-round panel data collection",
            "Field team recruitment, training, and management",
            "Randomised controlled trials (RCTs) and impact evaluations",
            "Phone-based surveys and hybrid collection modes",
            "Multilingual survey instrument design and translation",
            "Real-time quality assurance with HoneyGuide",
          ]),
          tools: JSON.stringify([
            "SurveyCTO",
            "ODK",
            "Tangerine",
            "HoneyGuide",
            "Stata",
            "CAPI systems",
          ]),
          order: 1,
        },
        {
          id: "data-analytics-visualisation",
          slug: "data-analytics-visualisation",
          title: "Data Analytics & Visualisation",
          category: "IT Services",
          icon: "BarChart3",
          description:
            "Statistical analysis, data governance consulting, and interactive dashboard development for evidence-based decisions.",
          detailText:
            "We transform complex raw data into actionable insights through advanced statistical modeling, econometric analysis, and stunning visual representations. Our customized interactive dashboards allow organizations to monitor key performance indicators in real time, while our data governance frameworks ensure data privacy, security, and integrity across all organizational workflows.",
          features: JSON.stringify([
            "Statistical & Econometric modeling",
            "Interactive BI dashboards (PowerBI, Tableau, Custom)",
            "Data governance and management frameworks",
            "Predictive modeling & machine learning pipelines",
            "Automated report generation systems",
            "Data cleaning, processing, and warehousing",
          ]),
          tools: JSON.stringify([
            "Python (Pandas/NumPy)",
            "R Programming",
            "PowerBI",
            "Tableau",
            "SQL",
            "Excel (Advanced)",
          ]),
          order: 2,
        },
        {
          id: "custom-software-development",
          slug: "custom-software-development",
          title: "Custom Software Development",
          category: "IT Services",
          icon: "Code2",
          description:
            "MIS platforms, workflow systems, mobile applications, and API integrations built on open-source technologies.",
          detailText:
            "Our engineering team designs, builds, and maintains custom enterprise platforms tailored to your specific organizational workflows. We specialize in building secure, high-performance web applications, mobile applications (iOS & Android), Management Information Systems (MIS), and robust API integrations that seamlessly connect your existing systems.",
          features: JSON.stringify([
            "Custom web-based Management Information Systems (MIS)",
            "Enterprise Resource Planning (ERP) integrations",
            "Mobile data collection tools (Android & iOS)",
            "API design and second-party system integrations",
            "Secure cloud infrastructure setup & management",
            "Real-time data synchronization pipelines",
            "User-centric UI/UX design for complex data systems",
          ]),
          tools: JSON.stringify([
            "React.js / Next.js",
            "Node.js (Express)",
            "Mobile (React Native)",
            "PostgreSQL / MySQL",
            "AWS / Azure",
            "Docker / Kubernetes",
          ]),
          order: 3,
        },
        {
          id: "custom-software-development",
          slug: "custom-software-development",
          title: "Custom Software Development",
          category: "IT Services",
          icon: "Code2",
          description:
            "MIS platforms, workflow systems, mobile applications, and API integrations built on open-source technologies.",
          detailText:
            "Our engineering team designs, builds, and maintains custom enterprise platforms tailored to your specific organizational workflows. We specialize in building secure, high-performance web applications, mobile applications (iOS & Android), Management Information Systems (MIS), and robust API integrations that seamlessly connect your existing systems.",
          features: JSON.stringify([
            "Custom web-based Management Information Systems (MIS)",
            "Enterprise Resource Planning (ERP) integrations",
            "Mobile data collection tools (Android & iOS)",
            "API design and second-party system integrations",
            "Secure cloud infrastructure setup & management",
            "Real-time data synchronization pipelines",
            "User-centric UI/UX design for complex data systems",
          ]),
          tools: JSON.stringify([
            "React.js / Next.js",
            "Node.js (Express)",
            "Mobile (React Native)",
            "PostgreSQL / MySQL",
            "AWS / Azure",
            "Docker / Kubernetes",
          ]),
          order: 4,
        },
        {
          id: "custom-software-development",
          slug: "custom-software-development",
          title: "Custom Software Development",
          category: "IT Services",
          icon: "Code2",
          description:
            "MIS platforms, workflow systems, mobile applications, and API integrations built on open-source technologies.",
          detailText:
            "Our engineering team designs, builds, and maintains custom enterprise platforms tailored to your specific organizational workflows. We specialize in building secure, high-performance web applications, mobile applications (iOS & Android), Management Information Systems (MIS), and robust API integrations that seamlessly connect your existing systems.",
          features: JSON.stringify([
            "Custom web-based Management Information Systems (MIS)",
            "Enterprise Resource Planning (ERP) integrations",
            "Mobile data collection tools (Android & iOS)",
            "API design and second-party system integrations",
            "Secure cloud infrastructure setup & management",
            "Real-time data synchronization pipelines",
            "User-centric UI/UX design for complex data systems",
          ]),
          tools: JSON.stringify([
            "React.js / Next.js",
            "Node.js (Express)",
            "Mobile (React Native)",
            "PostgreSQL / MySQL",
            "AWS / Azure",
            "Docker / Kubernetes",
          ]),
          order: 5,
        },
        {
          id: "custom-software-development",
          slug: "custom-software-development",
          title: "Custom Software Development",
          category: "IT Services",
          icon: "Code2",
          description:
            "MIS platforms, workflow systems, mobile applications, and API integrations built on open-source technologies.",
          detailText:
            "Our engineering team designs, builds, and maintains custom enterprise platforms tailored to your specific organizational workflows. We specialize in building secure, high-performance web applications, mobile applications (iOS & Android), Management Information Systems (MIS), and robust API integrations that seamlessly connect your existing systems.",
          features: JSON.stringify([
            "Custom web-based Management Information Systems (MIS)",
            "Enterprise Resource Planning (ERP) integrations",
            "Mobile data collection tools (Android & iOS)",
            "API design and second-party system integrations",
            "Secure cloud infrastructure setup & management",
            "Real-time data synchronization pipelines",
            "User-centric UI/UX design for complex data systems",
          ]),
          tools: JSON.stringify([
            "React.js / Next.js",
            "Node.js (Express)",
            "Mobile (React Native)",
            "PostgreSQL / MySQL",
            "AWS / Azure",
            "Docker / Kubernetes",
          ]),
          order: 6,
        },
      ];
      for (const service of itServices) {
        await p.execute(
          `INSERT INTO ${isPostgres ? '"Service"' : "Service"} (id, slug, title, category, icon, description, "detailText", features, tools, "order") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            service.id,
            service.slug,
            service.title,
            service.category,
            service.icon,
            service.description,
            service.detailText,
            service.features,
            service.tools,
            service.order,
          ],
        );
      }
    }
  } catch (err) {
    if (err instanceof Error && !err.message.includes("already exists")) {
      console.error("DB Initialization Error:", err);
    }
  }
}

// Helper utilities for building SQL fragments and normalizing params
const prepareValue = (val: unknown): string | number | boolean | null =>
  val === undefined
    ? null
    : typeof val === "object" && val !== null
      ? JSON.stringify(val)
      : (val as string | number | boolean | null);

const buildWhereClause = (
  where: Record<string, unknown> | undefined,
  params: (string | number | boolean | null)[],
): string => {
  if (!where || Object.keys(where).length === 0) return "";
  const clauses = Object.keys(where).map((k) => {
    params.push(prepareValue(where[k]));
    return `"${k}" = ?`;
  });
  return ` WHERE ${clauses.join(" AND ")}`;
};

const buildOrderBy = (orderBy?: Record<string, "asc" | "desc">) => {
  if (!orderBy || Object.keys(orderBy).length === 0) return "";
  const [col, dir] = Object.entries(orderBy)[0];
  return ` ORDER BY "${col}" ${String(dir).toUpperCase()}`;
};

// CompanyInfo API (Prisma-like signatures)
const companyInfo = {
  findFirst: async () => {
    const p = getPool();
    if (!p) return null;
    const [rows] = await p.execute(`SELECT * FROM "CompanyInfo" LIMIT 1`);
    const data = (rows as unknown as CompanyInfo[])[0] || null;
    return normalizeResult<CompanyInfo>(data, "CompanyInfo");
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<CompanyInfo>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "CompanyInfo" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    const [rows] = await p.execute(
      `SELECT * FROM "CompanyInfo" WHERE id = ? LIMIT 1`,
      [where.id],
    );
    return normalizeResult<CompanyInfo>(
      (rows as unknown as CompanyInfo[])[0] || null,
      "CompanyInfo",
    );
  },
  create: async ({ data }: { data: Partial<CompanyInfo> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "CompanyInfo" (${fields}) VALUES (${placeholders})`,
      values,
    );
    const [rows] = await p.execute(
      `SELECT * FROM "CompanyInfo" WHERE id = ? LIMIT 1`,
      [prepareValue(payload.id)],
    );
    return normalizeResult<CompanyInfo>(
      (rows as unknown as CompanyInfo[])[0] || null,
      "CompanyInfo",
    );
  },
};

// Projects API
const projects = {
  findMany: async (opts?: {
    featured?: boolean;
    limit?: number;
    take?: number;
    orderBy?: Record<string, "asc" | "desc">;
    where?: Record<string, unknown>;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "Project"`;
    const params: (string | number | boolean | null)[] = [];
    const where: Record<string, unknown> = { ...(opts?.where || {}) };
    if (opts?.featured !== undefined) where.featured = opts.featured;
    sql += buildWhereClause(
      Object.keys(where).length ? where : undefined,
      params,
    );
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY createdAt DESC`;
    const limit = opts?.take || opts?.limit;
    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<Project[]>(rows, "Project");
  },
  findUnique: async ({ where }: { where: { id?: string; slug?: string } }) => {
    const p = getPool();
    if (!p) return null;
    const params: (string | number | boolean | null)[] = [];
    const whereClause = buildWhereClause(where, params);
    const [rows] = await p.execute(
      `SELECT * FROM "Project"${whereClause} LIMIT 1`,
      params,
    );
    return normalizeResult<Project>(
      (rows as unknown as Project[])[0] || null,
      "Project",
    );
  },
  findBySlug: async (slug: string) => {
    const p = getPool();
    if (!p) return null;
    const [rows] = await p.execute(
      `SELECT * FROM "Project" WHERE slug = ? LIMIT 1`,
      [slug],
    );
    const data = (rows as unknown as Project[])[0] || null;
    return normalizeResult<Project>(data, "Project");
  },
  create: async ({ data }: { data: Partial<Project> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "Project" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return projects.findUnique({ where: { id: payload.id as string } });
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<Project>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "Project" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return projects.findUnique({ where: { id: where.id } });
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "Project" WHERE id = ?`, [where.id]);
    return true;
  },
};

// Services API
const services = {
  findMany: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
    limit?: number;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "Service"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(opts?.where, params);
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY "order" ASC`;
    const limit = opts?.take || opts?.limit;
    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<Service[]>(rows, "Service");
  },
  findUnique: async ({ where }: { where: { id?: string; slug?: string } }) => {
    const p = getPool();
    if (!p) return null;
    const params: (string | number | boolean | null)[] = [];
    const whereClause = buildWhereClause(where, params);
    const [rows] = await p.execute(
      `SELECT * FROM "Service"${whereClause} LIMIT 1`,
      params,
    );
    return normalizeResult<Service>(
      (rows as unknown as Service[])[0] || null,
      "Service",
    );
  },
  findFirst: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
  }) => {
    const list = await services.findMany({
      where: opts?.where,
      orderBy: opts?.orderBy,
      take: 1,
    });
    return (list as Service[])[0] || null;
  },
  create: async ({ data }: { data: Partial<Service> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "Service" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return services.findUnique({ where: { id: payload.id as string } });
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<Service>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "Service" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return services.findUnique({ where: { id: where.id } });
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "Service" WHERE id = ?`, [where.id]);
    return true;
  },
};

// Testimonials API
const testimonials = {
  findMany: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
    limit?: number;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "Testimonial"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(opts?.where, params);
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY "order" ASC`;
    const limit = opts?.take || opts?.limit;
    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<Testimonial[]>(rows, "Testimonial");
  },
  findFirst: async (opts?: {
    orderBy?: Record<string, "asc" | "desc">;
    where?: Record<string, unknown>;
  }) => {
    const list = await testimonials.findMany({
      where: opts?.where,
      orderBy: opts?.orderBy,
      take: 1,
    });
    return (list as Testimonial[])[0] || null;
  },
  create: async ({ data }: { data: Partial<Testimonial> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "Testimonial" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return testimonials
      .findMany({ where: { id: payload.id as string }, take: 1 })
      .then((r) => (r as Testimonial[])[0] || null);
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<Testimonial>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "Testimonial" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return testimonials
      .findMany({ where: { id: where.id }, take: 1 })
      .then((r) => (r as Testimonial[])[0] || null);
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "Testimonial" WHERE id = ?`, [where.id]);
    return true;
  },
};

// Admins API
const admins = {
  findMany: async () => {
    const p = getPool();
    if (!p) return [];
    const [rows] = await p.execute(
      `SELECT * FROM "Admin" ORDER BY createdAt DESC`,
    );
    return normalizeResult<Admin[]>(rows, "Admin");
  },
  findUnique: async ({
    where,
  }: {
    where: { id?: string; username?: string };
  }) => {
    const p = getPool();
    if (!p) return null;
    const params: (string | number | boolean | null)[] = [];
    const whereClause = buildWhereClause(where, params);
    const [rows] = await p.execute(
      `SELECT * FROM "Admin"${whereClause} LIMIT 1`,
      params,
    );
    return normalizeResult<Admin>(
      (rows as unknown as Admin[])[0] || null,
      "Admin",
    );
  },
  create: async ({ data }: { data: Partial<Admin> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "Admin" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return admins.findUnique({ where: { id: payload.id as string } });
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<Admin>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "Admin" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return admins.findUnique({ where: { id: where.id } });
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "Admin" WHERE id = ?`, [where.id]);
    return true;
  },
};

// TeamMember API
const teamMembers = {
  findMany: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "TeamMember"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(opts?.where, params);
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY "order" ASC`;
    if (opts?.take) {
      sql += ` LIMIT ?`;
      params.push(opts.take);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<TeamMember[]>(rows, "TeamMember");
  },
  findUnique: async ({ where }: { where: { id?: string } }) => {
    const p = getPool();
    if (!p) return null;
    const params: (string | number | boolean | null)[] = [];
    const whereClause = buildWhereClause(where, params);
    const [rows] = await p.execute(
      `SELECT * FROM "TeamMember"${whereClause} LIMIT 1`,
      params,
    );
    return normalizeResult<TeamMember>(
      (rows as unknown as TeamMember[])[0] || null,
      "TeamMember",
    );
  },
  findFirst: async (opts?: { orderBy?: Record<string, "asc" | "desc"> }) => {
    const list = await teamMembers.findMany({
      orderBy: opts?.orderBy,
      take: 1,
    });
    return (list as TeamMember[])[0] || null;
  },
  create: async ({ data }: { data: Partial<TeamMember> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "TeamMember" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return teamMembers.findUnique({ where: { id: payload.id as string } });
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<TeamMember>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "TeamMember" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return teamMembers.findUnique({ where: { id: where.id } });
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "TeamMember" WHERE id = ?`, [where.id]);
    return true;
  },
};

// Partners API
const partners = {
  findMany: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "Partner"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(opts?.where, params);
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY "order" ASC`;
    if (opts?.take) {
      sql += ` LIMIT ?`;
      params.push(opts.take);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<Partner[]>(rows, "Partner");
  },
  findUnique: async ({ where }: { where: { id?: string } }) => {
    const p = getPool();
    if (!p) return null;
    const params: (string | number | boolean | null)[] = [];
    const whereClause = buildWhereClause(where, params);
    const [rows] = await p.execute(
      `SELECT * FROM "Partner"${whereClause} LIMIT 1`,
      params,
    );
    return normalizeResult<Partner>(
      (rows as unknown as Partner[])[0] || null,
      "Partner",
    );
  },
  create: async ({ data }: { data: Partial<Partner> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "Partner" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return partners.findUnique({ where: { id: payload.id as string } });
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<Partner>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "Partner" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return partners.findUnique({ where: { id: where.id } });
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "Partner" WHERE id = ?`, [where.id]);
    return true;
  },
};

// ContactMessage API
const contactMessages = {
  findMany: async (opts?: {
    where?: Record<string, unknown>;
    orderBy?: Record<string, "asc" | "desc">;
    take?: number;
  }) => {
    const p = getPool();
    if (!p) return [];
    let sql = `SELECT * FROM "ContactMessage"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(opts?.where, params);
    if (opts?.orderBy) sql += buildOrderBy(opts.orderBy);
    else sql += ` ORDER BY createdAt DESC`;
    if (opts?.take) {
      sql += ` LIMIT ?`;
      params.push(opts.take);
    }
    const [rows] = await p.execute(sql, params);
    return normalizeResult<ContactMessage[]>(rows, "ContactMessage");
  },
  create: async ({ data }: { data: Partial<ContactMessage> }) => {
    const p = getPool();
    if (!p) return null;
    const payload = { id: (data as any).id || generateId(), ...data } as Record<
      string,
      unknown
    >;
    const keys = Object.keys(payload);
    const fields = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => prepareValue(payload[k]));
    await p.execute(
      `INSERT INTO "ContactMessage" (${fields}) VALUES (${placeholders})`,
      values,
    );
    return contactMessages
      .findMany({ where: { id: payload.id as string }, take: 1 })
      .then((r) => (r as ContactMessage[])[0] || null);
  },
  update: async ({
    where,
    data,
  }: {
    where: { id: string };
    data: Partial<ContactMessage>;
  }) => {
    const p = getPool();
    if (!p) return null;
    const keys = Object.keys(data).filter((k) => k !== "id");
    if (keys.length === 0) return null;
    const fields = keys.map((k) => `"${k}" = ?`).join(", ");
    const values = keys.map((k) => prepareValue(data[k as keyof typeof data]));
    await p.execute(`UPDATE "ContactMessage" SET ${fields} WHERE id = ?`, [
      ...values,
      where.id,
    ]);
    return contactMessages
      .findMany({ where: { id: where.id }, take: 1 })
      .then((r) => (r as ContactMessage[])[0] || null);
  },
  delete: async ({ where }: { where: { id: string } }) => {
    const p = getPool();
    if (!p) return null;
    await p.execute(`DELETE FROM "ContactMessage" WHERE id = ?`, [where.id]);
    return true;
  },
  count: async (filter?: Record<string, unknown>) => {
    const p = getPool();
    if (!p) return 0;
    let sql = `SELECT COUNT(*) as c FROM "ContactMessage"`;
    const params: (string | number | boolean | null)[] = [];
    sql += buildWhereClause(filter, params);
    const [rows] = await p.execute(sql, params);
    const val = (rows as unknown as { c: number }[])[0];
    return val ? Number((val as any).c || 0) : 0;
  },
};

export const db = {
  companyInfo,
  project: projects,
  service: services,
  testimonial: testimonials,
  admin: admins,
  teamMember: teamMembers,
  partner: partners,
  contactMessage: contactMessages,
};
