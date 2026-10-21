import { NextResponse } from "next/server";
import { db, ensureTestimonialSchema } from "@/server/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const testimonials = await db.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Testimonial GET error:", error);
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

    // Ensure DB columns exist before writing
    await ensureTestimonialSchema();

    const name = String(raw.name || "").trim();
    const content = String(raw.content || "").trim();

    if (!name || !content) {
      return NextResponse.json(
        { error: "Client name and testimonial content are required." },
        { status: 400 },
      );
    }

    // Optional role: leave empty if not provided
    const role = String(raw.role || "").trim();
    const featured = Boolean(raw.featured);
    const rating = Math.min(5, Math.max(1, Number(raw.rating) || 5));

    // Auto-increment order
    const lastTestimonial = await db.testimonial.findFirst({
      orderBy: { order: "desc" },
    });
    const order =
      raw.order !== undefined && !isNaN(Number(raw.order))
        ? Number(raw.order)
        : (lastTestimonial?.order || 0) + 1;

    const testimonial = await db.testimonial.create({
      data: {
        ...raw,
        name,
        role,
        content,
        rating,
        featured,
        image: raw.image || "",
        order,
      },
    });

    // Bust cache across all relevant routes
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/testimonials");

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create testimonial",
      },
      { status: 500 },
    );
  }
}

