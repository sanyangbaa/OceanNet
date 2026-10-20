import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getPool, findAdminByUsername } from "@/server/db";

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

export async function getAdminRole(userId: string): Promise<string> {
  const p = getPool();
  if (!p) return "admin";
  const [rows] = await p.query(`SELECT * FROM "Admin" WHERE id = ? LIMIT 1`, [userId]);
  const admin = (rows as any[])[0];
  return admin?.role || "admin";
}

export async function getCurrentAdmin() {
  const session = await getSession();
  if (!session) return null;
  const p = getPool();
  if (!p) return null;
  const [rows] = await p.query(`SELECT * FROM "Admin" WHERE id = ? LIMIT 1`, [session.userId]);
  return (rows as any[])[0] || null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}
