import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const partner = await db.partner.findUnique({ where: { id } });
    if (!partner)
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });

    return NextResponse.json(partner);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch partner" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const updateData = {
      name: data.name,
      description: data.description,
      website: data.website,
      image: data.image,
      order: data.order,
      active: data.active,
    };

    Object.keys(updateData).forEach((key) => {
      if (updateData[key as keyof typeof updateData] === undefined) {
        delete updateData[key as keyof typeof updateData];
      }
    });

    const partner = await db.partner.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(partner);
  } catch {
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db.partner.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500 },
    );
  }
}
