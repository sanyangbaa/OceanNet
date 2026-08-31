import { NextResponse } from "next/server";
import { getPool } from "@/server/db";
import { getSession } from "@/lib/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const p = getPool();
    if (!p) return NextResponse.json({ error: "No DB" }, { status: 500 });

    await p.execute(`DELETE FROM "Talent" WHERE id = ?`, [id]);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Delete talent error", e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
