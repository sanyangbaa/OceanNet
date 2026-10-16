import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const project = await db.project.findUnique({
      where: { id },
    });
    
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    
    const updateData = {
      title: data.title,
      client: data.client,
      category: data.category,
      shortDescription: data.shortDescription,
      image: data.image,
      industry: data.industry,
      projectType: data.projectType,
      role: data.role,
      projectRole: data.projectRole !== undefined ? data.projectRole : data.role,
      challenge: data.challenge,
      projectSize: data.projectSize,
      year: data.year !== undefined ? (data.year ? Number(data.year) : null) : undefined,
      duration: data.duration,
      value: data.value,
      rating: data.rating !== undefined ? (data.rating ? Number(data.rating) : null) : undefined,
      reviewText: data.reviewText,
      reviewAuthor: data.reviewAuthor,
      reviewRole: data.reviewRole,
      reviewImage: data.reviewImage,
      featured: data.featured !== undefined ? Boolean(data.featured) : undefined,
      servicesDelivered: data.servicesDelivered,
      outcome: data.outcome,
      clientLogo: data.clientLogo,
      clientWebsite: data.clientWebsite,
      publishStatus: data.publishStatus,
      technologies: data.technologies,
      description: data.description,
      status: data.status,
      location: data.location,
      gallery: data.gallery,
      scope: data.scope,
      keyFeatures: data.keyFeatures,
      youtubeUrl: data.youtubeUrl !== undefined ? (data.youtubeUrl ?? null) : undefined,
      slug: data.title ? data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") : undefined,
    };
    
    // Remove undefined fields
    (Object.keys(updateData) as (keyof typeof updateData)[]).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const project = await db.project.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db.project.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
