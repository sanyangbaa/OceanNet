import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const info = await db.companyInfo.findFirst();
    return NextResponse.json(info);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();
    const info = await db.companyInfo.findFirst();

    // Allowed CompanyInfo fields (match DB schema)
    const allowed = [
      "name",
      "shortName",
      "tagline",
      "description",
      "longDescription",
      "history",
      "email",
      "phone",
      "address",
      "socialLinks",
      "mission",
      "vision",
      "values",
    ];

    const payload: Record<string, any> = {};
    for (const key of allowed) {
      if (data[key] !== undefined) payload[key] = data[key];
    }

    if (info) {
      await db.companyInfo.update({
        where: { id: info.id },
        data: payload,
      });
    } else {
      await db.companyInfo.create({
        data: { name: data.name || "Default Company", ...payload },
      });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
