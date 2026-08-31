import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const admins = await db.admin.findMany();
    return NextResponse.json(admins);
  } catch {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { username, password, role } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const existing = await db.admin.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    const admin = await db.admin.create({
      data: {
        username,
        password: hash,
        role: role || "admin"
      }
    });

    return NextResponse.json(admin);
  } catch (error) {
    console.error("Failed to create admin:", error);
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
