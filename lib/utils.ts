import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Capitalizes the first letter of each word in a string.
 * Preserves standard tech/business acronyms and handles hyphenated words.
 */
export function capitalizeWords(str: string): string {
  if (!str) return "";
  return str
    .split(/\s+/)
    .map((word) => {
      if (!word) return "";
      const lower = word.toLowerCase();
      // Keep known acronyms uppercase
      if (lower === "ceo") return "CEO";
      if (lower === "cto") return "CTO";
      if (lower === "cfo") return "CFO";
      if (lower === "coo") return "COO";
      if (lower === "ict") return "ICT";
      if (lower === "it") return "IT";
      if (lower === "ai") return "AI";
      if (lower === "saas") return "SaaS";
      if (word === "&") return "&";

      return word
        .split("-")
        .map((sub) => {
          if (!sub) return "";
          return sub.charAt(0).toUpperCase() + sub.slice(1).toLowerCase();
        })
        .join("-");
    })
    .join(" ");
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
