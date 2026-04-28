-- Normalizar WhatsApp a solo dígitos (alineado con validación Zod).
UPDATE "waitlist_entries"
SET "whatsapp" = regexp_replace(COALESCE("whatsapp", ''), '\D', '', 'g')
WHERE "whatsapp" IS NOT NULL;

-- Eliminar filas duplicadas por WhatsApp; conservar el registro más antiguo.
DELETE FROM "waitlist_entries" AS a
USING "waitlist_entries" AS b
WHERE a."whatsapp" = b."whatsapp"
  AND (
    a."createdAt" > b."createdAt"
    OR (a."createdAt" = b."createdAt" AND a.id > b.id)
  );

-- Un registro por número de WhatsApp.
CREATE UNIQUE INDEX "waitlist_entries_whatsapp_key" ON "waitlist_entries"("whatsapp");

-- Rate limiting por IP y ventana horaria (UTC).
CREATE TABLE "waitlist_submit_windows" (
    "ip" TEXT NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "waitlist_submit_windows_pkey" PRIMARY KEY ("ip","windowStart")
);
