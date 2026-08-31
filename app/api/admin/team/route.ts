import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const team = await db.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    
    const lastMember = await db.teamMember.findFirst({
        orderBy: { order: "desc" }
    });
    const order = (lastMember?.order || 0) + 1;

    const member = await db.teamMember.create({
      data: {
        ...data,
        order,
      },
    });
    
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
