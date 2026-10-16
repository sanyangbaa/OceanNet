import { NextResponse } from "next/server";
import { db, getPool } from "@/server/db";
import { getSession } from "@/lib/auth";

/** Ensure the featured column exists (idempotent – safe to call every request) */
async function ensureFeaturedColumn() {
  const p = getPool();
  if (!p) return;
  try {
    const [rows] = await p.query(
      `SHOW COLUMNS FROM \`Testimonial\` LIKE 'featured'`,
    );
    if (Array.isArray(rows) && rows.length === 0) {
      await p.execute(
        `ALTER TABLE \`Testimonial\` ADD COLUMN \`featured\` BOOLEAN DEFAULT false`,
      );
    }
  } catch {
    // ignore – e.g. Postgres which uses IF NOT EXISTS syntax handled elsewhere
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const raw = await request.json();

    // Ensure DB column exists before writing
    await ensureFeaturedColumn();

    // Strip legacy role field – it has been removed from the form
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role: _role, ...data } = raw;

    const testimonial = await db.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    await db.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
