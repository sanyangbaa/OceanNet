import { NextResponse } from "next/server";

// Services are now managed as static data in data/services.ts
// This endpoint is no longer available

export async function GET() {
  return NextResponse.json(
    { error: "Services are now managed as static data in data/services.ts" },
    { status: 410 },
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Services are now managed as static data in data/services.ts" },
    { status: 410 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Services are now managed as static data in data/services.ts" },
    { status: 410 },
  );
}
