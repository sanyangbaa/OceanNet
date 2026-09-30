import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim().toLowerCase() || "";

    if (!query)
      return NextResponse.json({ projects: [], services: [], team: [] });

    // In a real production app with many records, you'd use SQL LIKE or full-text search.
    // For now, we'll fetch and filter since the dataset is small.

    const [projects, services, team] = await Promise.all([
      db.project.findMany(),
      db.service.findMany(),
      db.teamMember.findMany(),
    ]);

    const matches = (...values: unknown[]) =>
      values.some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(query),
      );

    const filteredProjects = projects
      .filter((project) =>
        matches(project.title, project.client, project.category),
      )
      .slice(0, 5);

    const filteredServices = services
      .filter((service) => matches(service.title, service.description))
      .slice(0, 5);

    const filteredTeam = team
      .filter((member) => matches(member.name, member.role))
      .slice(0, 5);

    return NextResponse.json({
      projects: filteredProjects,
      services: filteredServices,
      team: filteredTeam,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
