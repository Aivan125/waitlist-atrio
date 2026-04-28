import { getPrisma } from "@/lib/prisma";

/** Ventana fija en ms (hora UTC alineada al epoch). */
const WINDOW_MS = 60 * 60 * 1000;
/** Máximo de envíos de waitlist por IP y por ventana. */
const MAX_REQUESTS = 10;

function windowStartUtc(now = Date.now()): Date {
  return new Date(Math.floor(now / WINDOW_MS) * WINDOW_MS);
}

/**
 * Rate limit por IP persistido en Postgres (válido con varias instancias serverless).
 * Depende de cabeceras de proxy (p. ej. `x-forwarded-for`) para la IP del cliente.
 */
export async function checkWaitlistRateLimit(
  ip: string,
): Promise<{ ok: true } | { ok: false }> {
  const prisma = getPrisma();
  const windowStart = windowStartUtc();

  const row = await prisma.waitlistSubmitWindow.upsert({
    where: {
      ip_windowStart: { ip, windowStart },
    },
    create: {
      ip,
      windowStart,
      count: 1,
    },
    update: {
      count: { increment: 1 },
    },
  });

  if (row.count > MAX_REQUESTS) {
    return { ok: false };
  }

  return { ok: true };
}
