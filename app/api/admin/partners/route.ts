import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const partners = await db.partner.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(partners);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const partner = await db.partner.create({
      data: {
        name: data.name,
        description: data.description,
        website: data.website,
        image: data.image,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });

    return NextResponse.json(partner);
  } catch (error) {
    console.error("Partner creation error:", error);
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 },
    );
  }
}
