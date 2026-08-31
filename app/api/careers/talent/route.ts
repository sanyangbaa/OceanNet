import { NextResponse } from "next/server";
import { createTalent } from "@/lib/careers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.name || !body?.email) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const entry = await createTalent({ name: body.name, email: body.email, areaOfInterest: body.areaOfInterest, resumeUrl: body.resumeUrl });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (e) {
    console.error('Talent submission error', e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
