import { initDb } from "../server/db";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.log(
      "No DATABASE_URL configured. Skipping database initialization for this build.",
    );
    process.exit(0);
  }

  console.log("Initializing database...");
  try {
    await initDb();
    console.log("Database initialization complete.");
    process.exit(0);
  } catch (error) {
    console.warn(
      "Database initialization skipped because the database is unavailable in this environment:",
      error,
    );
    process.exit(0);
  }
}

main();
