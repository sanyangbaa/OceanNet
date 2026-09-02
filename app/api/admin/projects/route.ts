import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    
    // Ensure slug is valid
    const slug = data.title ? data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "") : undefined;
    
    const project = await db.project.create({
      data: {
        title: data.title,
        client: data.client,
        category: data.category,
        shortDescription: data.shortDescription,
        image: data.image,
        industry: data.industry,
        projectType: data.projectType,
        role: data.role,
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
        youtubeUrl: data.youtubeUrl || null,
        slug,
      },
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
