import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currentAdmin = await db.admin.findUnique({
      where: { id: session.userId },
    });
    if (!currentAdmin || currentAdmin.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const targetAdmin = await db.admin.findUnique({ where: { id } });
    if (!targetAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const data = await request.json();

    // If updating password, hash it
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    const admin = await db.admin.update({
      where: { id },
      data,
    });

    return NextResponse.json(admin);
  } catch {
    return NextResponse.json(
      { error: "Failed to update admin" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currentAdmin = await db.admin.findUnique({
      where: { id: session.userId },
    });
    if (!currentAdmin || currentAdmin.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const targetAdmin = await db.admin.findUnique({ where: { id } });
    if (!targetAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Prevent deleting the super admin account by any other admin
    if (targetAdmin.role === "super_admin") {
      return NextResponse.json(
        { error: "Super admin cannot be deleted" },
        { status: 403 },
      );
    }

    // Prevent deleting self
    if (session.userId === id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 },
      );
    }

    await db.admin.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 },
    );
  }
}
