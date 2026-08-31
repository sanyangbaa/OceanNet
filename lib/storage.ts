import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export type StorageProvider = "local" | "supabase" | "r2";

const isProduction = process.env.NODE_ENV === "production";

export function getStorageProvider(): StorageProvider {
  if (!isProduction) {
    return "local";
  }

  const provider = process.env.STORAGE_PROVIDER?.toLowerCase();
  if (provider === "supabase") return "supabase";
  if (
    provider === "r2" ||
    provider === "cloudflare-r2" ||
    provider === "cloudflare"
  )
    return "r2";

  throw new Error(
    "Invalid STORAGE_PROVIDER. In production set STORAGE_PROVIDER=supabase or STORAGE_PROVIDER=r2.",
  );
}

function normalizeFolder(folder?: string) {
  if (!folder) return "";

  const segments = folder
    .replace(/\\/g, "/")
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment && segment !== "." && segment !== "..");

  return segments.join("/");
}

function sanitizeFilename(name: string) {
  const cleaned = name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.\-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || "file";
}

function buildStorageKey(filename: string, folder?: string) {
  const cleanFolder = normalizeFolder(folder);
  const safeFilename = sanitizeFilename(filename);
  const parts = ["media", "uploads"];
  if (cleanFolder) {
    parts.push(cleanFolder);
  }
  parts.push(safeFilename);
  return parts.join("/");
}

async function uploadLocal(buffer: Buffer, storageKey: string) {
  const pathSegments = storageKey.split("/");
  const directory = join(process.cwd(), "public", ...pathSegments.slice(0, -1));
  await mkdir(directory, { recursive: true });
  const filePath = join(process.cwd(), "public", storageKey);
  await writeFile(filePath, buffer);
  return {
    url: `/${storageKey}`,
    key: storageKey,
    provider: "local" as const,
  };
}

async function uploadSupabase(
  buffer: Buffer,
  storageKey: string,
  contentType?: string,
) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!bucket || !url || !serviceRoleKey) {
    throw new Error(
      "Supabase storage is not configured. Set SUPABASE_STORAGE_BUCKET, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const supabase = createClient(url, serviceRoleKey, {
    global: { fetch },
  });

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storageKey, buffer, {
      contentType,
      cacheControl: "public, max-age=31536000, immutable",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const publicData = await supabase.storage
    .from(bucket)
    .getPublicUrl(storageKey);

  if (!publicData?.data?.publicUrl) {
    throw new Error("Failed to create Supabase public URL.");
  }

  return {
    url: publicData.data.publicUrl,
    key: storageKey,
    provider: "supabase" as const,
  };
}

async function uploadR2(
  buffer: Buffer,
  storageKey: string,
  contentType?: string,
) {
  const endpoint = process.env.R2_ENDPOINT;
  const bucket = process.env.R2_BUCKET;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const region = process.env.R2_REGION || "auto";

  if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 storage is not configured. Set R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY.",
    );
  }

  const client = new S3Client({
    region,
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: storageKey,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    }),
  );

  const publicUrlBase = process.env.R2_PUBLIC_URL
    ? process.env.R2_PUBLIC_URL.replace(/\/$/, "")
    : `${endpoint.replace(/\/$/, "")}/${bucket}`;
  const encodedKey = storageKey.split("/").map(encodeURIComponent).join("/");

  return {
    url: `${publicUrlBase}/${encodedKey}`,
    key: storageKey,
    provider: "r2" as const,
  };
}

export async function uploadBuffer(
  buffer: Buffer,
  filename: string,
  options?: { folder?: string; contentType?: string },
) {
  const storageKey = buildStorageKey(filename, options?.folder);
  const provider = getStorageProvider();

  if (provider === "local") {
    return uploadLocal(buffer, storageKey);
  }

  if (provider === "supabase") {
    return uploadSupabase(buffer, storageKey, options?.contentType);
  }

  if (provider === "r2") {
    return uploadR2(buffer, storageKey, options?.contentType);
  }

  throw new Error("Unsupported storage provider.");
}
