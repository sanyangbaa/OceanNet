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
    if (!info) return NextResponse.json(null);

    const socials =
      info.socialLinks && typeof info.socialLinks === "object"
        ? (info.socialLinks as Record<string, any>)
        : {};

    return NextResponse.json({
      ...info,
      facebook: socials.facebook || "",
      instagram: socials.instagram || "",
      twitter: socials.twitter || socials.x || "",
      linkedin: socials.linkedin || "",
      tiktok: socials.tiktok || "",
      website: socials.website || "",
    });
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

    // Process and merge social links & digital presence
    const existingSocials =
      info?.socialLinks && typeof info.socialLinks === "object"
        ? (info.socialLinks as Record<string, any>)
        : {};

    const incomingSocials =
      data.socialLinks && typeof data.socialLinks === "object"
        ? data.socialLinks
        : {};

    const mergedSocials = {
      ...existingSocials,
      ...incomingSocials,
    };

    if (data.facebook !== undefined) mergedSocials.facebook = data.facebook;
    if (data.instagram !== undefined) mergedSocials.instagram = data.instagram;
    if (data.twitter !== undefined) mergedSocials.twitter = data.twitter;
    if (data.linkedin !== undefined) mergedSocials.linkedin = data.linkedin;
    if (data.tiktok !== undefined) mergedSocials.tiktok = data.tiktok;
    if (data.website !== undefined) mergedSocials.website = data.website;

    payload.socialLinks = mergedSocials;

    if (info) {
      await db.companyInfo.update({
        where: { id: info.id },
        data: payload,
      });
    } else {
      await db.companyInfo.create({
        data: { id: "singleton", name: data.name || "OceanNet Technologies", ...payload },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/(website)", "layout");
    revalidatePath("/contact");
    revalidatePath("/about");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}

