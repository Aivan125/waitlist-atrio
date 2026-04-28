const COMMITMENTS = [
  {
    eyebrow: "Feedback quincenal",
    stat: "30 min",
    body:
      "Una llamada 1:1 cada 15 días. Nos dirás qué falla, qué funciona y qué debemos programar después para facilitarte la vida.",
  },
  {
    eyebrow: "Auditoría semanal",
    stat: "5 min",
    body:
      "Un check-in ultra rápido (por chat o llamada) para confirmar que tus propiedades siguen activas. Cero inventario fantasma.",
  },
  {
    eyebrow: "Uso prioritario",
    stat: "Semanal",
    body:
      "Compromiso de usar a la IA como tu primera opción de búsqueda para clientes reales antes de ir a los grupos públicos.",
  },
] as const;

export function CommitmentSection() {
  return (
    <section
      aria-labelledby="compromiso-heading"
      className="bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <h2
          id="compromiso-heading"
          className="mb-4 text-3xl font-light tracking-tight text-foreground md:text-5xl"
        >
          Nuestra inversión. Tu compromiso.
        </h2>
        <p className="mb-20 max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground">
          El programa piloto no tiene costo. A cambio de la tecnología y los
          beneficios vitalicios, requerimos tu participación activa como socio
          fundador.
        </p>

        <div className="grid grid-cols-1 gap-8 border-t border-border pt-12 md:grid-cols-3 md:gap-12">
          {COMMITMENTS.map(({ eyebrow, stat, body }) => (
            <div key={eyebrow}>
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground md:text-xs">
                {eyebrow}
              </p>
              <div className="mb-6 text-5xl font-light tracking-tighter text-foreground md:text-6xl">
                {stat}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
