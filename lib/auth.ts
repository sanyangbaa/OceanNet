import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-change-me";

export async function createSession(userId: string) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
  const cookieStore = await cookies();
  
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    // We could fetch the user from DB here, but to keep it fast, we'll just return the ID
    // and handle role checks in the specific routes or components.
    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminRole(userId: string) {
    const { db } = await import("@/server/db");
    const admin = await db.admin.findUnique({ where: { id: userId } });
    return admin?.role || "admin";
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}
