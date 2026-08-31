import { loadEnvConfig } from "@next/env";
import { getPool, generateId } from "../server/db";

loadEnvConfig(process.cwd());

const testimonials = [
  {
    name: "Amadou Jallow",
    role: "Property Developer, Banjul",
    content:
      "OceanNet built our residential complex from the ground up with exceptional quality. Their team was professional, punctual, and the finish exceeded all our expectations. I would recommend them to anyone looking for a reliable construction company in The Gambia.",
    rating: 5,
    order: 1,
  },
  {
    name: "Fatoumata Ceesay",
    role: "School Director, Kanifing",
    content:
      "We engaged OceanNet for the construction of our new school block and we couldn't be more pleased with the result. The structure is solid, the design is modern, and they delivered on time and within budget. Outstanding work!",
    rating: 5,
    order: 2,
  },
  {
    name: "Lamin Sanyang",
    role: "Business Owner, Serekunda",
    content:
      "I hired OceanNet for the renovation of my commercial building. Their workers were skilled, respectful, and the quality of the aluminum and carpentry work was first class. The project was completed faster than expected. Highly satisfied!",
    rating: 5,
    order: 3,
  },
  {
    name: "Isatou Darboe",
    role: "Homeowner, Kanifing",
    content:
      "OceanNet designed and built our family home exactly as we envisioned. The architectural consultancy was brilliant — they helped us maximize our space beautifully. We are proud of every corner of this house. A truly trusted company.",
    rating: 5,
    order: 4,
  },
  {
    name: "Ousman Bojang",
    role: "Mosque Committee Chairman, Brikama",
    content:
      "We contracted OceanNet for the construction of our community mosque and the result was magnificent. They showed great respect for the project's importance, maintained excellent communication throughout, and delivered a structure we are all proud of.",
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
