import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env" });
config({ path: ".env.local", override: true });

/**
 * Migraciones: en Supabase usa DIRECT_URL al host directo `db.<ref>.supabase.co:5432`
 * (ver .env.example). Si solo existe DATABASE_URL apuntando al pooler, `migrate dev`
 * puede fallar (P1001 u otros) aunque el config sea correcto.
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
