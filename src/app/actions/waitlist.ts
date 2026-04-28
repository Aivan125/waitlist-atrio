"use server";

import { headers } from "next/headers";
import { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";
import { verifyRecaptchaV3 } from "@/lib/recaptcha";
import { checkWaitlistRateLimit } from "@/lib/rate-limit";
import { waitlistFormSchema } from "@/lib/validations/waitlist";

export type WaitlistActionState = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return h.get("x-real-ip") ?? "unknown";
}

/** Campo trampa: debe ir vacío; si tiene valor, se asume bot y se responde éxito sin persistir. */
function isHoneypotTripped(formData: FormData): boolean {
  const v = String(formData.get("website") ?? "").trim();
  return v.length > 0;
}

function uniqueViolationMessage(target: string[] | undefined): string {
  const t = target ?? [];
  if (t.includes("email")) {
    return "Este correo ya está registrado en la lista de espera.";
  }
  if (t.includes("whatsapp")) {
    return "Este número de WhatsApp ya está registrado en la lista de espera.";
  }
  return "Ya existe un registro con estos datos.";
}

export async function submitWaitlist(
  _prev: WaitlistActionState,
  formData: FormData,
): Promise<WaitlistActionState> {
  if (isHoneypotTripped(formData)) {
    return { ok: true };
  }

  const recaptchaToken = String(formData.get("recaptchaToken") ?? "").trim();
  if (!recaptchaToken) {
    return {
      message:
        "No se pudo validar el envío. Recarga la página e intenta de nuevo.",
    };
  }

  const ip = await clientIp();
  const captchaOk = await verifyRecaptchaV3(recaptchaToken, ip);
  if (!captchaOk) {
    return {
      message:
        "No pudimos verificar el envío. Recarga la página e intenta de nuevo.",
    };
  }

  const limited = await checkWaitlistRateLimit(ip);
  if (!limited.ok) {
    return {
      message:
        "Demasiados intentos desde esta conexión. Espera un momento o vuelve más tarde.",
    };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    website: String(formData.get("website") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    email: String(formData.get("email") ?? ""),
    primaryZone: String(formData.get("primaryZone") ?? ""),
    exclusiveListingsBucket: String(
      formData.get("exclusiveListingsBucket") ?? "",
    ),
    ticketSaleBucket: String(formData.get("ticketSaleBucket") ?? ""),
    ticketRentBucket: String(formData.get("ticketRentBucket") ?? ""),
    privacyAccepted: formData.get("privacy") === "on",
    accepts_newsletter: formData.get("accepts_newsletter") === "on",
  };

  const parsed = waitlistFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Record<
      string,
      string[]
    >;
    return { fieldErrors };
  }

  const data = parsed.data;
  const prisma = getPrisma();

  const [emailTaken, whatsappTaken] = await Promise.all([
    prisma.waitlistEntry.findUnique({
      where: { email: data.email },
      select: { id: true },
    }),
    prisma.waitlistEntry.findUnique({
      where: { whatsapp: data.whatsapp },
      select: { id: true },
    }),
  ]);

  const fieldErrors: Record<string, string[]> = {};
  if (emailTaken) {
    fieldErrors.email = [
      "Este correo ya está registrado en la lista de espera.",
    ];
  }
  if (whatsappTaken) {
    fieldErrors.whatsapp = [
      "Este número de WhatsApp ya está registrado en la lista de espera.",
    ];
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    await prisma.waitlistEntry.create({
      data: {
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
        primaryZone: data.primaryZone,
        exclusiveListingsBucket: data.exclusiveListingsBucket,
        ticketSaleBucket: data.ticketSaleBucket,
        ticketRentBucket: data.ticketRentBucket,
        acceptsNewsletter: data.accepts_newsletter,
        propertyCount: null,
        yearsInIndustry: null,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const target = e.meta?.target as string[] | undefined;
      return {
        message: uniqueViolationMessage(target),
      };
    }
    console.error(e);
    return {
      message:
        "No pudimos guardar tu registro. Intenta de nuevo en unos minutos.",
    };
  }

  return {
    ok: true,
    message:
      "Gracias por unirte a la lista de espera. Te mantendremos pronto informado sobre nuestros avances por correo y por WhatsApp, con los mismos datos que registraste.",
  };
}
