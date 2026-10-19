import { NextResponse } from "next/server";
import { db, ensureTestimonialSchema } from "@/server/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const raw = await request.json();

    // Ensure DB columns exist before writing
    await ensureTestimonialSchema();

    const data: Record<string, unknown> = { ...raw };

    if (data.name !== undefined) {
      data.name = String(data.name).trim();
    }
    if (data.content !== undefined) {
      data.content = String(data.content).trim();
    }
    if (data.role !== undefined) {
      data.role = String(data.role || "").trim();
    }
    if (data.featured !== undefined) {
      data.featured = Boolean(data.featured);
    }
    if (data.rating !== undefined) {
      data.rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
    }
    if (data.order !== undefined) {
      data.order = Number(data.order) || 0;
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data,
    });

    // Bust the cache so changes appear immediately
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/testimonials");

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Testimonial update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update testimonial",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    await db.testimonial.delete({
      where: { id },
    });

    // Bust the cache on deletion too
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/testimonials");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}

