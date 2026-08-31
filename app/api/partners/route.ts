import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET() {
  try {
    const partners = await db.partner.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(partners);
  } catch {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}
