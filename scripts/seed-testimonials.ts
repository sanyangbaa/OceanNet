import { loadEnvConfig } from "@next/env";
import { getPool, generateId } from "../server/db";

loadEnvConfig(process.cwd());

const testimonials = [
  {
    name: "Amadou Jallow",
    role: "Operations Director, Banjul",
    content:
      "OceanNet helped us replace fragmented manual processes with a secure digital platform that our teams can use every day. Their delivery was practical, responsive, and focused on measurable results.",
    rating: 5,
    order: 1,
  },
  {
    name: "Fatoumata Ceesay",
    role: "Programme Director, Kanifing",
    content:
      "OceanNet brought strong technical expertise and clear communication to our digital transformation programme. They delivered a dependable solution and supported our team throughout implementation.",
    rating: 5,
    order: 2,
  },
  {
    name: "Lamin Sanyang",
    role: "Managing Director, Serekunda",
    content:
      "The OceanNet team understood our operational needs quickly and delivered a reliable technology solution that improved collaboration across the business. Their support has been excellent.",
    rating: 5,
    order: 3,
  },
  {
    name: "Isatou Darboe",
    role: "Health Systems Lead, Kanifing",
    content:
      "OceanNet combined local context with strong systems knowledge to help us strengthen our digital health workflows. The result is easier to manage, more transparent, and built for sustainable use.",
    rating: 5,
    order: 4,
  },
  {
    name: "Ousman Bojang",
    role: "Technology Partner, Brikama",
    content:
      "Working with OceanNet has been straightforward and dependable. They bring disciplined project delivery, thoughtful technical advice, and a genuine commitment to helping organisations build lasting digital capability.",
    rating: 5,
    order: 5,
  },
];

async function seedTestimonials() {
  console.log("Seeding testimonials...");
  const p = getPool();
  if (!p) {
    console.error(
      "No database connection. Check your DATABASE_URL environment variable.",
    );
    process.exit(1);
  }

  let inserted = 0;
  for (const t of testimonials) {
    const id = generateId();
    try {
      await p.execute(
        `INSERT INTO "Testimonial" ("id", "name", "role", "content", "rating", "order")
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, t.name, t.role, t.content, t.rating, t.order],
      );
      console.log(`  ✓ Added: ${t.name}`);
      inserted++;
    } catch (e) {
      console.error(`  ✗ Failed to insert ${t.name}:`, e);
    }
  }

  console.log(
    `\nDone! ${inserted}/${testimonials.length} testimonials inserted.`,
  );
  process.exit(0);
}

seedTestimonials();
