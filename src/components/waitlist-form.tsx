"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";

import {
  submitWaitlist,
  type WaitlistActionState,
} from "@/app/actions/waitlist";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  exclusiveListingsBucketValues,
  primaryZoneValues,
  ticketRentBucketValues,
  ticketSaleBucketValues,
  waitlistFormSchema,
  type WaitlistFormValues,
} from "@/lib/validations/waitlist";
import { cn } from "@/lib/utils";

const initialState: WaitlistActionState = {};

const ZONE_LABELS: Record<(typeof primaryZoneValues)[number], string> = {
  san_pedro_valle: "San Pedro Garza García (Valle)",
  zona_sur_nacional_contry: "Zona Sur (Carretera Nacional, Contry)",
  monterrey_centro_obispado: "Monterrey Centro / Obispado",
  san_jeronimo_cumbres: "San Jerónimo / Cumbres",
  san_nicolas_apodaca_escobedo: "San Nicolás/ Apodaca / Escobedo",
  multiples_zonas: "Múltiples zonas",
};

const EXCLUSIVE_LABELS: Record<
  (typeof exclusiveListingsBucketValues)[number],
  string
> = {
  lt_10: "Menos de 10",
  "10_20": "10 a 20",
  gt_20: "Más de 20",
};

const TICKET_SALE_LABELS: Record<
  (typeof ticketSaleBucketValues)[number],
  string
> = {
  solo_rentas: "Solo hago rentas",
  lt_2_5m: "Menor a $2.5M MXN",
  "2_5m_5m": "$2.5M a $5M MXN",
  "5m_15m": "$5M a $15M MXN",
  gt_15m: "Más de $15M MXN",
};

const TICKET_RENT_LABELS: Record<
  (typeof ticketRentBucketValues)[number],
  string
> = {
  solo_ventas: "Solo hago ventas",
  lt_20k: "Menor a $20,000 MXN",
  "20k_40k": "$20,000 a $40,000 MXN",
  "40k_80k": "$40,000 a $80,000 MXN",
  gt_80k: "Más de $80,000 MXN",
};

const triggerClass =
  "w-full min-w-0 border-border bg-background text-foreground hover:bg-[rgb(15_14_12/5%)]";

const recaptchaSiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

function executeRecaptchaV3(siteKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      reject(new Error("recaptcha_unavailable"));
      return;
    }
    window.grecaptcha.ready(() => {
      void window.grecaptcha
        .execute(siteKey, { action: "waitlist" })
        .then(resolve)
        .catch(reject);
    });
  });
}

export function WaitlistForm() {
  const [recaptchaReady, setRecaptchaReady] = useState(!recaptchaSiteKey);
  const [state, formAction, pending] = useActionState(
    submitWaitlist,
    initialState,
  );

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: "",
      website: "",
      whatsapp: "",
      email: "",
      primaryZone: "",
      exclusiveListingsBucket: "",
      ticketSaleBucket: "",
      ticketRentBucket: "",
      privacyAccepted: false,
      accepts_newsletter: true,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!state.fieldErrors) return;
    for (const [key, messages] of Object.entries(state.fieldErrors)) {
      const msg = messages?.[0];
      if (msg) {
        form.setError(key as FieldPath<WaitlistFormValues>, {
          type: "server",
          message: msg,
        });
      }
    }
  }, [state.fieldErrors, form]);

  if (state.ok) {
    return (
      <div
        className={cn(
          "flex min-h-[24rem] flex-col items-center justify-center px-2 py-8 text-center md:min-h-[30rem] md:px-4 md:py-12",
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle
          className="mx-auto mb-6 h-12 w-12 text-emerald-600"
          aria-hidden
        />
        <h2 className="mb-4 max-w-lg text-center text-2xl font-light text-foreground md:text-3xl">
          ¡Gracias por unirte a la lista de espera!
        </h2>
        <p className="max-w-lg text-balance text-center leading-relaxed text-muted-foreground">
          Tu registro está confirmado. Nos pondremos en contacto contigo por
          WhatsApp y correo electrónico para compartirte los próximos avances,
          novedades y fechas de acceso al proyecto.
        </p>
      </div>
    );
  }

  function buildFormData(values: WaitlistFormValues) {
    const fd = new FormData();
    fd.set("name", values.name);
    fd.set("website", String(values.website ?? ""));
    fd.set("whatsapp", values.whatsapp);
    fd.set("email", values.email);
    fd.set("primaryZone", values.primaryZone);
    fd.set("exclusiveListingsBucket", values.exclusiveListingsBucket);
    fd.set("ticketSaleBucket", values.ticketSaleBucket);
    fd.set("ticketRentBucket", values.ticketRentBucket);
    if (values.privacyAccepted) {
      fd.set("privacy", "on");
    }
    if (values.accepts_newsletter) {
      fd.set("accepts_newsletter", "on");
    }
    return fd;
  }

  const submitBlocked =
    pending || !recaptchaSiteKey || !recaptchaReady;

  return (
    <>
      {recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
          onLoad={() => setRecaptchaReady(true)}
        />
      ) : null}
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(async (values) => {
            form.clearErrors();
            if (!recaptchaSiteKey) {
              form.setError("root", {
                type: "manual",
                message:
                  "Falta configurar reCAPTCHA. Añade NEXT_PUBLIC_RECAPTCHA_SITE_KEY.",
              });
              return;
            }
            try {
              const token = await executeRecaptchaV3(recaptchaSiteKey);
              const fd = buildFormData(values);
              fd.set("recaptchaToken", token);
              startTransition(() => {
                formAction(fd);
              });
            } catch {
              form.setError("root", {
                type: "manual",
                message:
                  "No se pudo validar el envío de forma segura. Espera unos segundos y vuelve a intentar.",
              });
            }
          })}
        >
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute left-[-10000px] h-px w-px overflow-hidden opacity-0"
            aria-hidden
            {...form.register("website")}
          />
          {!recaptchaSiteKey ? (
            <p className="text-destructive text-sm" role="alert">
              Falta{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                NEXT_PUBLIC_RECAPTCHA_SITE_KEY
              </code>{" "}
              en el entorno.
            </p>
          ) : null}
          {recaptchaSiteKey && !recaptchaReady ? (
            <p className="text-muted-foreground text-sm">
              Preparando verificación…
            </p>
          ) : null}
          {form.formState.errors.root?.message ? (
            <p className="text-destructive text-sm" role="alert">
              {form.formState.errors.root.message}
            </p>
          ) : null}
          {state.message && !state.fieldErrors ? (
            <p className="text-destructive text-sm" role="alert">
              {state.message}
            </p>
          ) : null}

        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                  disabled={pending}
                  className={cn(
                    "border-border bg-background",
                    fieldState.invalid &&
                      "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Número de WhatsApp</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="81 3456 7890"
                  disabled={pending}
                  className={cn(
                    "border-border bg-background",
                    fieldState.invalid &&
                      "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  disabled={pending}
                  className={cn(
                    "border-border bg-background",
                    fieldState.invalid &&
                      "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryZone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                ¿En qué zonas operas principalmente?
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                disabled={pending}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      triggerClass,
                      fieldState.invalid &&
                        "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                    )}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {primaryZoneValues.map((v) => (
                    <SelectItem key={v} value={v}>
                      {ZONE_LABELS[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exclusiveListingsBucket"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                ¿Cuántas propiedades captadas en exclusiva/directas tienes?
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                disabled={pending}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      triggerClass,
                      fieldState.invalid &&
                        "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                    )}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exclusiveListingsBucketValues.map((v) => (
                    <SelectItem key={v} value={v}>
                      {EXCLUSIVE_LABELS[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ticketSaleBucket"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>¿Cuál es tu ticket promedio en VENTA?</FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                disabled={pending}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      triggerClass,
                      fieldState.invalid &&
                        "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                    )}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ticketSaleBucketValues.map((v) => (
                    <SelectItem key={v} value={v}>
                      {TICKET_SALE_LABELS[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ticketRentBucket"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>¿Cuál es tu ticket promedio en RENTA?</FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
                disabled={pending}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      triggerClass,
                      fieldState.invalid &&
                        "border-destructive ring-destructive/20 aria-invalid:border-destructive",
                    )}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ticketRentBucketValues.map((v) => (
                    <SelectItem key={v} value={v}>
                      {TICKET_RENT_LABELS[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-8 space-y-5">
          <FormField
            control={form.control}
            name="privacyAccepted"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex items-start gap-3 pt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      disabled={pending}
                      className={cn(
                        "mt-1 border-border bg-background",
                        fieldState.invalid &&
                          "border-destructive aria-invalid:border-destructive",
                      )}
                    />
                  </FormControl>
                  <div className="min-w-0 flex-1 space-y-2">
                    <FormLabel className="text-muted-foreground block text-sm font-normal leading-relaxed">
                      Acepto el{" "}
                      <Link
                        href="/privacidad"
                        className="break-words text-foreground underline underline-offset-4 hover:text-primary"
                      >
                        aviso de privacidad
                      </Link>{" "}
                      (LFPDPPP) y el tratamiento de mis datos para evaluar mi
                      solicitud.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accepts_newsletter"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      id="accepts-newsletter"
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      disabled={pending}
                      className="mt-1 border-border bg-background"
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="accepts-newsletter"
                    className="cursor-pointer text-sm text-muted-foreground leading-snug"
                  >
                    Quiero recibir el newsletter con avances exclusivos,
                    invitaciones y novedades de la red.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-[rgb(15_14_12/85%)]"
            disabled={submitBlocked}
          >
            {pending
              ? "Enviando…"
              : !recaptchaSiteKey || !recaptchaReady
                ? "Espera…"
                : "Enviar solicitud de acceso"}
          </Button>
        </form>
      </Form>
    </>
  );
}
