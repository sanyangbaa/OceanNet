import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Public endpoint for contact form (no session check needed)
    const data = await request.json();
    const message = await db.contactMessage.create({
      data: {
        ...data,
        status: "new"
      }
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
