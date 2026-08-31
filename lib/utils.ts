import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureStringArray(val: unknown): string[] {
  if (val === undefined || val === null) return [];
  if (Array.isArray(val)) return val.map((v) => String(v));
  if (typeof val === "string") {
    const s = val.trim();
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map((v) => String(v));
      if (typeof parsed === "string") return [parsed];
      if (parsed && typeof parsed === "object") return Object.values(parsed).map((v) => String(v));
    } catch {
      return s.split(",").map((p) => p.trim()).filter(Boolean);
    }
  }
  if (typeof val === "object") {
    return Object.values(val as Record<string, unknown>).map((v) => String(v));
  }
  return [String(val)];
}
