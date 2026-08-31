import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

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

    const data = await request.json();

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

    return NextResponse.json(testimonial);
  } catch {
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}
