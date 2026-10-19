import { NextResponse } from "next/server";
import { db, getPool } from "@/server/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
    // ignore – Postgres handled elsewhere
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const testimonials = await db.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const raw = await request.json();

    // Ensure DB column exists before writing
    await ensureFeaturedColumn();

    // Strip legacy role field
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role: _role, ...data } = raw;

    // Explicitly coerce featured to boolean
    if (data.featured !== undefined) {
      data.featured = Boolean(data.featured);
    }

    // Auto-increment order
    const lastTestimonial = await db.testimonial.findFirst({
      orderBy: { order: "desc" },
    });
    const order = (lastTestimonial?.order || 0) + 1;

    const testimonial = await db.testimonial.create({
      data: {
        ...data,
        rating: data.rating || 5,
        order,
      },
    });

    // Bust homepage cache so new testimonial appears immediately
    revalidatePath("/");
    revalidatePath("/testimonials");

    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}
