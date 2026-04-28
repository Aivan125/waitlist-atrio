import * as z from "zod";

function enumFrom<const T extends readonly [string, ...string[]]>(
  values: T,
  emptyMessage: string,
) {
  return z
    .string()
    .min(1, emptyMessage)
    .refine(
      (v): v is T[number] => (values as readonly string[]).includes(v),
      emptyMessage,
    );
}

const whatsappDigits = z
  .string()
  .transform((s) => s.replace(/\D/g, ""))
  .pipe(
    z.string().length(10, "Ingresa 10 dígitos de tu número de WhatsApp"),
  );

export const primaryZoneValues = [
  "san_pedro_valle",
  "zona_sur_nacional_contry",
  "monterrey_centro_obispado",
  "san_jeronimo_cumbres",
  "san_nicolas_apodaca_escobedo",
  "multiples_zonas",
] as const;

export const exclusiveListingsBucketValues = ["lt_10", "10_20", "gt_20"] as const;

export const ticketSaleBucketValues = [
  "solo_rentas",
  "lt_2_5m",
  "2_5m_5m",
  "5m_15m",
  "gt_15m",
] as const;

export const ticketRentBucketValues = [
  "solo_ventas",
  "lt_20k",
  "20k_40k",
  "40k_80k",
  "gt_80k",
] as const;

export const waitlistFormSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio").max(200),
  /** Honeypot (anti-bots): debe permanecer vacío; el input está oculto en la UI. */
  website: z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z.string().max(0),
  ),
  whatsapp: whatsappDigits,
  email: z.string().trim().email("Correo no válido").max(320),
  primaryZone: enumFrom(primaryZoneValues, "Selecciona una zona"),
  exclusiveListingsBucket: enumFrom(
    exclusiveListingsBucketValues,
    "Selecciona un rango de propiedades",
  ),
  ticketSaleBucket: enumFrom(
    ticketSaleBucketValues,
    "Selecciona tu ticket promedio en venta",
  ),
  ticketRentBucket: enumFrom(
    ticketRentBucketValues,
    "Selecciona tu ticket promedio en renta",
  ),
  privacyAccepted: z
    .boolean()
    .refine((v) => v === true, "Debes aceptar el aviso de privacidad"),
  /** Marketing / newsletter — opcional; UI con casilla marcada por defecto. */
  accepts_newsletter: z.boolean().default(true),
});

/** Salida validada (p. ej. server action, Prisma). */
export type WaitlistFormInput = z.output<typeof waitlistFormSchema>;
/** Valores del formulario (coinciden con react-hook-form + zodResolver). */
export type WaitlistFormValues = z.input<typeof waitlistFormSchema>;
