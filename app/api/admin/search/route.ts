import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    if (!query) return NextResponse.json({ projects: [], services: [], team: [] });

    // In a real production app with many records, you'd use SQL LIKE or full-text search.
    // For now, we'll fetch and filter since the dataset is small.
    
    const [projects, services, team] = await Promise.all([
      db.project.findMany(),
      db.service.findMany(),
      db.teamMember.findMany()
    ]);

    const filteredProjects = projects.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.client.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    const filteredServices = services.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query)
    ).slice(0, 5);

    const filteredTeam = team.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.role.toLowerCase().includes(query)
    ).slice(0, 5);

    return NextResponse.json({
      projects: filteredProjects,
      services: filteredServices,
      team: filteredTeam
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
