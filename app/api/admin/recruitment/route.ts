import { NextResponse } from "next/server";
import { getRecruitmentAnalytics } from "@/lib/careers";

export async function GET(request: Request) {
  try {
    const stats = await getRecruitmentAnalytics();
    return NextResponse.json(stats);
  } catch (e) {
    console.error('Recruitment analytics error', e);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
