const REQUIREMENTS = [
  "Mínimo 2 años de experiencia en el sector inmobiliario.",
  "Propiedades en renta con ticket desde $30,000 MXN mensuales.",
  "Propiedades en venta con ticket desde $4,000,000 MXN.",
  "Al menos 10 propiedades activas entre renta y venta, sumadas, que cumplan los valores mínimos anteriores.",
  "Inventario vigente y activo, con información suficiente para consultarlo correctamente dentro de la red.",
] as const;

const BENEFIT_CARDS = [
  {
    title: "Tarifa de fundador congelada",
    body:
      "Precio preferencial de fundador para siempre. No pagarás la tarifa pública cuando la red escale.",
  },
  {
    title: "Prioridad cuando la red cruza una búsqueda",
    body:
      "Tu inventario entra primero en los cruces. Menos ruido, más match con lo que ya está en la red.",
  },
  {
    title: "Voz en lo que sigue",
    body:
      "Línea directa con quien construye la red. Priorizamos lo que te frena en campo.",
  },
  {
    title: "Estatus fundador",
    body:
      "Insignia visible para quienes ya colaboran contigo. Autoridad clara al cerrar sinergias.",
  },
] as const;

export function FoundersSection() {
  return (
    <div
      id="fundadores"
      className="scroll-mt-24 pt-16 md:pt-24"
      aria-labelledby="fundadores-heading"
    >
      <div className="w-full">
        <div className="mb-12 max-w-3xl">
          <div className="text-[120px] font-light leading-none tracking-tighter text-primary md:text-[200px] mb-4 tabular-nums">
            50
          </div>
          <h2
            id="fundadores-heading"
            className="mb-6 text-balance text-3xl font-light tracking-tight text-foreground md:text-5xl"
          >
            Lugares de fundador. Cupo limitado.
          </h2>
          <p className="max-w-2xl text-balance text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
            No es un registro abierto: es una red curada para brokers con
            experiencia e inventario alineado al mercado que estamos construyendo.
          </p>
        </div>

        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Criterios de admisión a la red
        </h3>
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          La red está dirigida a brokers con experiencia e inventario alineado al
          perfil que buscamos. Para ser admitido, deberás cumplir con lo siguiente:
        </p>
        <ul className="mb-16 max-w-4xl divide-y divide-border rounded-md border border-border">
          {REQUIREMENTS.map((text) => (
            <li
              key={text}
              className="px-6 py-5 text-sm leading-relaxed text-foreground md:px-8 md:py-6"
            >
              {text}
            </li>
          ))}
        </ul>

        <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Beneficios para fundadores
        </h3>
        <div className="grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {BENEFIT_CARDS.map(({ title, body }) => (
            <article
              key={title}
              className="rounded-md border border-border bg-card p-8 ring-1 ring-border md:p-10"
            >
              <h3 className="mb-3 text-xl font-light text-card-foreground md:text-2xl">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
