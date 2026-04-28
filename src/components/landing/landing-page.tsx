import Image from "next/image";
import Link from "next/link";
import { CommitmentSection } from "@/components/landing/commitment-section";
import { FoundersSection } from "@/components/landing/founders-section";
import { HeroPromoVideo } from "@/components/landing/hero-promo-video";
import { WaitlistForm } from "@/components/waitlist-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PROBLEM_CARDS = [
  {
    title: "El caos de los grupos",
    body:
      "Información que se pierde, sin filtros, sin historial claro. Dependes de la suerte para encontrar lo que tu cliente busca.",
  },
  {
    title: "La red en tu WhatsApp",
    body:
      "Subes tu inventario, preguntas al bot en lenguaje natural y la red cruza con lo que tienen los otros brokers en segundos.",
  },
  {
    title: "Sinergia real",
    body:
      "Conectas con colegas que ya colaboran y comparten comisión. Menos fricción para cerrar.",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Inventario gestionado por nosotros.",
    body:
      "Olvídate de capturar datos. Nosotros estructuramos tu información y, con una llamada de 5 minutos a la semana, validamos qué sigue activo. Cero inventario fantasma, cero carga administrativa.",
  },
  {
    n: "02",
    title: "Pídele a la IA por WhatsApp.",
    body:
      "Escribe lo que tu cliente necesita: 'Tres recámaras en Valle, abajo de 8 millones'. Al instante, el asistente cruza la red y te genera un enlace con las propiedades que hacen match.",
  },
  {
    n: "03",
    title: "El cliente elige, tú agendas.",
    body:
      "Revisa las opciones desde tu celular y desliza para filtrar. Envíale la selección a tu cliente; cuando él marque sus favoritas, recibirás una alerta para coordinar los recorridos.",
  },
] as const;

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-1 text-foreground transition-opacity duration-[220ms] hover:opacity-80"
          >
            <Image
              src="/atrio/atrio-isotipo-negro.png"
              alt="Atrio"
              width={44}
              height={44}
              className="size-11 shrink-0 object-contain"
            />
            <span className="text-[1.375rem] font-normal tracking-[-0.02em]">
              atrio
            </span>
          </Link>
          <a
            href="#waitlist-form"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-atrio-black px-3 py-2 text-xs font-medium text-atrio-cal transition-colors duration-[220ms] hover:bg-[rgb(15_14_12/85%)] sm:px-4 sm:py-2.5 sm:text-[13px]"
          >
            Solicitar acceso →
          </a>
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-heading">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-24">
            <div className="min-w-0">
              <p className="mb-6 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span
                  className="mr-2 inline-block size-2 animate-pulse rounded-full bg-red-600"
                  aria-hidden
                />
                FASE SEED: SOLO 50 CUPOS · MONTERREY (AMM)
              </p>
              <h1
                id="hero-heading"
                className="mb-6 text-balance text-5xl font-light leading-[1.05] tracking-tight text-foreground lg:text-[72px]"
              >
                Tu red de propiedades de alto nivel, a un mensaje de{" "}
                <span className="text-emerald-700">WhatsApp.</span>
              </h1>
              <p className="mb-10 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground lg:text-xl">
                Únete al club privado de los mejores brokers de Monterrey. La
                Inteligencia Artificial cruza el inventario de la red al instante
                para que encuentres la propiedad ideal y cierres más rápido.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist-form"
                  className="flex items-center justify-center rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                >
                  Aplicar a los 50 cupos →
                </a>
                <a
                  href="#como-funciona"
                  className="flex items-center justify-center rounded-full border border-border bg-transparent px-8 py-4 font-medium text-foreground transition-colors hover:bg-[var(--atrio-surface-hover)]"
                >
                  Cómo funciona
                </a>
              </div>
            </div>
            <div className="relative mx-auto flex aspect-[9/16] w-full max-w-[340px] items-center justify-center bg-transparent lg:ml-auto lg:max-w-[400px]">
              <HeroPromoVideo src="/atrio/promo-video.mp4" />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section
          className="grid grid-cols-1 gap-8 border-y border-border py-12 md:grid-cols-3 md:gap-8 md:py-12"
          aria-label="Números de la red"
        >
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(15_14_12/45%)]">
              Brokers
            </p>
            <p className="tabular-nums text-[5rem] font-thin leading-[0.9] tracking-[-0.04em] md:text-[6rem]">
              50
            </p>
            <p className="mt-2.5 max-w-[260px] text-sm leading-snug text-[rgb(15_14_12/65%)]">
              Serios. Invitados uno a uno. Ticket alto.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(15_14_12/45%)]">
              Inventario
            </p>
            <p className="tabular-nums text-[5rem] font-thin leading-[0.9] tracking-[-0.04em] md:text-[6rem]">
              1
            </p>
            <p className="mt-2.5 max-w-[260px] text-sm leading-snug text-[rgb(15_14_12/65%)]">
              Un solo pool. Todos suben, todos buscan.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(15_14_12/45%)]">
              Grupos saturados
            </p>
            <p className="tabular-nums text-[5rem] font-thin leading-[0.9] tracking-[-0.04em] md:text-[6rem]">
              0
            </p>
            <p className="mt-2.5 max-w-[260px] text-sm leading-snug text-[rgb(15_14_12/65%)]">
              Nunca más un PDF perdido entre 300 mensajes.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-16 md:py-20" aria-labelledby="evolucion-heading">
          <h2
            id="evolucion-heading"
            className="mb-12 max-w-3xl text-2xl font-light tracking-tight md:text-3xl"
          >
            El broker de ticket alto necesita un inventario que se respete, no
            otro hilo que se pierde.
          </h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {PROBLEM_CARDS.map(({ title, body }) => (
              <Card
                key={title}
                className="rounded-md border border-border bg-background shadow-none ring-1 ring-[rgb(15_14_12/12%)]"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-light text-foreground">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        </div>

        <section
          className="dark bg-background text-foreground py-24"
          aria-label="Cómo funciona y fundadores"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div
              id="como-funciona"
              className="scroll-mt-24 border-b border-border pb-16 md:pb-20"
              aria-labelledby="como-heading"
            >
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Cómo funciona
              </p>
              <h2
                id="como-heading"
                className="mb-8 max-w-[820px] text-3xl font-light leading-[1.05] tracking-[-0.025em] text-foreground md:text-[3.5rem]"
              >
                Sin apps nuevas. Sin tableros. Solo WhatsApp.
              </h2>
              <p className="max-w-[620px] text-xl font-light leading-relaxed text-muted-foreground">
                La red es invisible por diseño. Nosotros gestionamos los datos, tú
                te dedicas a cerrar operaciones.
              </p>
              <div className="grid gap-12 pt-14 md:grid-cols-3 md:gap-12">
                {STEPS.map(({ n, title, body }) => (
                  <div key={n}>
                    <p className="tabular-nums text-[5rem] font-thin leading-[0.9] tracking-[-0.04em] text-primary md:text-[5.5rem]">
                      {n}
                    </p>
                    <h3 className="mt-5 text-[1.625rem] font-light leading-tight tracking-[-0.01em] text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <FoundersSection />
          </div>
        </section>

        <CommitmentSection />
      </main>

      <section
        id="waitlist-form"
        className="scroll-mt-24 border-t border-border bg-background px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      >
        <div className="mx-auto max-w-xl">
          <Card className="rounded-md border border-border bg-background shadow-none ring-1 ring-[rgb(15_14_12/12%)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-light text-foreground">
                Únete a los primeros 50 fundadores.
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Estamos seleccionando brokers con inventario en Monterrey.
                
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WaitlistForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex items-center gap-1">
            <Image
              src="/atrio/atrio-isotipo-negro.png"
              alt="Atrio"
              width={36}
              height={36}
              className="size-9 object-contain"
            />
            <span className="text-base tracking-[-0.02em]">atrio</span>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-sm text-muted-foreground">
              © 2026 Atrio. Exclusivo para profesionales inmobiliarios.
            </p>
            <Link
              href="/privacidad"
              className="text-sm text-foreground underline underline-offset-4 transition-opacity duration-[220ms] hover:opacity-80"
            >
              Aviso de privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
