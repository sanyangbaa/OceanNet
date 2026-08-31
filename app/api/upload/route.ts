import { NextResponse } from "next/server";
import { uploadBuffer } from "@/lib/storage";

const allowedExt = [
  ".pdf",
  ".doc",
  ".docx",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
];
const maxSize = 50 * 1024 * 1024; // 50MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const folder = String(formData.get("folder") || "");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      const name = file.name || "file";
      const lower = name.toLowerCase();
      const ext = lower.includes(".") ? lower.substring(lower.lastIndexOf(".")) : "";

      if (!allowedExt.includes(ext)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      if (buffer.length > maxSize) {
        return NextResponse.json({ error: "File too large" }, { status: 400 });
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
