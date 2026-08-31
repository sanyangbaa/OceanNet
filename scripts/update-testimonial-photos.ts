import { loadEnvConfig } from "@next/env";
import { getPool } from "../server/db";

loadEnvConfig(process.cwd());

// Using randomuser.me portraits — free, realistic profile photos
// Assigning gender-appropriate portraits to each name
const updates = [
  {
    name: "Amadou Jallow",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Fatoumata Ceesay",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Lamin Sanyang",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Isatou Darboe",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Ousman Bojang",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

async function addProfiles() {
  console.log("Updating testimonial profile photos...\n");
  const p = getPool();
  if (!p) {
    console.error("No database connection. Check your DATABASE_URL.");
    process.exit(1);
  }

  let updated = 0;
  for (const entry of updates) {
    try {
      await p.execute(
        `UPDATE "Testimonial" SET "image" = ?, "updatedAt" = CURRENT_TIMESTAMP WHERE "name" = ?`,
        [entry.image, entry.name]
      );
      console.log(`  ✓ Updated: ${entry.name}`);
      updated++;
    } catch (e) {
      console.error(`  ✗ Failed for ${entry.name}:`, e);
    }
  }

  console.log(`\nDone! ${updated}/${updates.length} profiles updated.`);
  process.exit(0);
}

addProfiles();
