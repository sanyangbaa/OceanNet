import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadBuffer } from "@/lib/storage";

const allowedMediaExt = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const allowedResumeExt = [".pdf", ".doc", ".docx"];
const maxResumeSize = 10 * 1024 * 1024;
const maxMediaSize = 5 * 1024 * 1024;

function isCareerUpload(folder: string) {
  return folder === "careers/apply" || folder === "careers/talent";
}

function hasExpectedSignature(buffer: Buffer, ext: string) {
  if (ext === ".pdf") return buffer.subarray(0, 5).toString() === "%PDF-";
  if (ext === ".docx") return buffer.subarray(0, 2).toString("hex") === "504b";
  if (ext === ".doc")
    return buffer.subarray(0, 8).toString("hex") === "d0cf11e0a1b11ae1";
  return true;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const folder = String(formData.get("folder") || "");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    if (!isCareerUpload(folder)) {
      const session = await getSession();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (isCareerUpload(folder) && files.length > 1) {
      return NextResponse.json(
        { error: "Only one resume may be uploaded" },
        { status: 400 },
      );
    }

    const urls: string[] = [];

    for (const file of files) {
      const name = file.name || "file";
      const lower = name.toLowerCase();
      const ext = lower.includes(".")
        ? lower.substring(lower.lastIndexOf("."))
        : "";

      const isResume = isCareerUpload(folder);
      const allowedExt = isResume ? allowedResumeExt : allowedMediaExt;
      const maxSize = isResume ? maxResumeSize : maxMediaSize;
      if (!allowedExt.includes(ext)) {
        return NextResponse.json(
          { error: "Invalid file type" },
          { status: 400 },
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (buffer.length > maxSize) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
      }
      if (isResume && !hasExpectedSignature(buffer, ext)) {
        return NextResponse.json(
          { error: "File content does not match its type" },
          { status: 400 },
        );
      }

      const upload = await uploadBuffer(buffer, name, {
        folder,
        contentType: file.type || undefined,
      });
      urls.push(upload.url);
    }

    return NextResponse.json({ urls, success: true });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
