import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const count = await db.contactMessage.count({ status: "new" });
    const latest = await db.contactMessage.findMany({
        where: { status: "new" },
        orderBy: { createdAt: "desc" },
        take: 5
    });

    return NextResponse.json({ count, latest });
  } catch {
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
  }
}
