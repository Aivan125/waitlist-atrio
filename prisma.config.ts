import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env" });
config({ path: ".env.local", override: true });

/**
 * Migraciones: conexión directa (Supabase 5432) vía DIRECT_URL si existe.
 * Sin DIRECT_URL se usa DATABASE_URL (pooler puede fallar en migrate — ver docs del proyecto).
 */
const migrationUrl =
  process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationUrl,
  },
});
