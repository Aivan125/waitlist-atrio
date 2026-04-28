# Informe: Design System Atrio y aplicación en la landing

**Fecha:** 23 de abril de 2026  
**Alcance:** inventario del DS en `lib/atrio_design_system`, alineación con Next.js/shadcn, brecha frente a la landing previa y criterios de implementación.

---

## 1. Propósito y alcance

El design system documenta la marca **Atrio**: red cerrada de brokers (AMM) con superficie principal en **WhatsApp** y superficies de marketing (landing en `useatrio.com`, pitch, social). Esta carpeta es la fuente de verdad junto al PDF `assets/atrio-brand-guidelines-final.pdf`.

La **landing** debe comportarse como el **UI kit de marketing** (`ui_kits/marketing/`): Cal + Negro Atrio, tipografía Geist con reglas de peso, sin efectos prohibidos, y copy en voz de marca (español mexicano, tú, sin anti-patrones del README).

---

## 2. Inventario de tokens (`colors_and_type.css`)

### Color

| Token | Valor | Uso |
|-------|--------|-----|
| `--atrio-black` | `#0F0E0C` | Texto primario, bloques invertidos, CTA relleno |
| `--atrio-cal` | `#F3EEE5` | Fondo por defecto de cualquier pieza |
| `--fg1` … `--fg4` | Opacidades 100% / 65% / 45% / 12% de Negro sobre Cal | Jerarquía de texto, bordes, divisores |
| `--fg1-inv` … `--fg4-inv` | Rampa de Cal sobre Negro | Superficie oscura (`on-black`) |
| `--surface-raised` / `--surface-hover` / `--surface-pressed` | 3% / 5% / 9% Negro | Estados de superficie sin nuevos matices |
| `--whatsapp-*` | Verdes y fondos de chat | **Solo** al representar UI de WhatsApp literal |

### Tipografía

| Token | Valor | Uso |
|-------|--------|-----|
| `--font-sans` | Geist | Única familia en marca |
| `--w-thin` … `--w-semibold` | 100, 300, 400, 500, 600 | **700 prohibido** en materiales de marca |
| `--fs-display` … `--fs-label` | Escala display → 12px | Display 80px+ con Thin para números protagonistas |
| `--lh-*`, `--tr-label`, `--tr-tight` | Interlineado y tracking | Labels: 600 + mayúsculas + ~0.12em |

### Espaciado, radios, bordes, motion

| Categoría | Tokens | Notas |
|-----------|--------|--------|
| Espacio | `--space-1` … `--space-10` (4px base) | Layout aireado; gutters generosos en desktop |
| Radios | `--radius-md` 6px default; `--radius-lg` 10px tope | Sin UI “pillowy” |
| Bordes | `--border-hair` (1px `--fg4`) | Sin sombras de elevación en superficie de marca |
| Motion | `--dur-fast/base/slow`, `--ease`, `--ease-out` | Micro-interacción; sin bounce/spring |

### Clases semánticas útiles

`.display`, `.kicker`, `.label`, `.meta`, `.lede`, `.on-black`, `.tabular` — referencia directa en prototipos HTML; en la app se replican vía utilidades Tailwind o variables mapeadas en `:root`.

---

## 3. Voz y contenido

### Pilares (resumen)

1. Sofisticado sin pretensión.  
2. Inteligente sin presumirlo (el motor no se anuncia; se demuestra).  
3. Conector por naturaleza.  
4. Decidido y directo.

### Evitar en copy de marca

- *Plataforma*, *app*, *funcionalidades*, *enhorabuena*, *exitosamente*, *nuestra avanzada IA*.  
- Signos de exclamación.  
- Emoji en materiales formales (el kit WhatsApp es excepción acotada).

### Preferir

- **La red**, sinergia, inventario compartido, cierre con comisión compartida.  
- Frases cortas, **tú**, datos concretos (zonas, montos, tiempos).  
- Números grandes en Thin con `tabular-nums` cuando aplique.

### Checklist de revisión (strings)

- [ ] `src/components/landing/landing-page.tsx`  
- [ ] `src/components/landing/founders-section.tsx`  
- [ ] `src/components/landing/hero-demo-video.tsx`  
- [ ] `src/components/waitlist-form.tsx`  
- [ ] `src/app/layout.tsx` (metadata)  
- [ ] `src/app/privacidad/page.tsx` (título y párrafos visibles)

---

## 4. Componentes de referencia (kit marketing → landing)

| Bloque kit | Rol en la app |
|------------|----------------|
| `NavBar` | Header: isotipo + wordmark “atrio”, CTA “Solicitar acceso →” |
| `Hero` | Kicker territorial, titular tagline, subtítulo, CTA primario + secundario |
| `StatStrip` | 50 brokers / 1 inventario / 0 grupos saturados |
| Sección problema (3 columnas en kit implícito) | Tres argumentos sin iconografía decorativa |
| `HowItWorks` | Pasos 01–03 con números Thin grandes |
| Video demo | Marco plano, sin glow; copy sin vender “IA” |
| `FoundersSection` | Requisitos + beneficios en tarjetas planas |
| Waitlist `Card` | Formulario con bordes hairline, botón primario Negro |
| `Footer` | Marca + meta en label uppercase |

---

## 5. Reglas de excepción (verde WhatsApp)

El verde `#25D366` y afines están permitidos **únicamente** cuando el diseño muestra la **interfaz de WhatsApp** (mock de chat, captura, kit `ui_kits/whatsapp`). En la landing de marketing, el CTA principal del kit es **relleno Negro Atrio**, no botón verde con glow.

---

## 6. Gap analysis (landing anterior → Atrio)

| Anti-patrón observado | Contramedida Atrio |
|------------------------|---------------------|
| Tema `dark`, fondo casi negro, orbs y blur | Fondo Cal, sin decoración atmosférica |
| Gradientes, sombras, glass, `backdrop-blur` | Superficies planas; diferenciación por peso y espacio |
| `font-bold` / semibold en titulares | Titulares en **Light 300**; énfasis en 500 donde toque |
| Iconos con halos de color en tarjetas | Eliminar decorativo; máximo iconos funcionales (p. ej. play) |
| CTA y acentos verde WhatsApp con glow | CTA negro; verde solo en demos de chat si aplica |
| Copy “Inteligencia Artificial”, “plataforma”, “algoritmo” | Reformular a comportamiento de la red / búsqueda en lenguaje natural |
| Marca “BrokerNetwork” | **Atrio** en UI y metadata (acordado) |

---

## 7. Estrategia en Next.js y shadcn

1. **Variables globales:** mapear `--background`, `--foreground`, `--primary`, `--border`, `--muted`, `--ring`, etc. a los valores del DS en `src/app/globals.css`, manteniendo `--atrio-black` y `--atrio-cal` como ancla.  
2. **Radio:** acercar `--radius` al entorno **6px** del DS (p. ej. `0.375rem`).  
3. **Fuente:** `next/font/google` Geist ya cargada; no usar peso 700 en componentes de marca; cargar pesos 100–600 si hace falta para Thin/Light.  
4. **Activos:** logos en `public/atrio/` (copiados desde `lib/atrio_design_system/assets/`) para `Image`/`img` estables.  
5. **shadcn:** `Button`, `Card`, `Input` heredan tokens; se evitan overrides locales `border-white/10` pensados para tema oscuro.  
6. **Fuente local opcional:** si se exige paridad pixel-perfect con el PDF, valorar `Geist-VariableFont_wght.ttf` desde `lib/atrio_design_system/fonts/` vía `localFont`.

---

## 8. Riesgos y decisiones abiertas

- Los UI kits son **reconstrucciones** sin Figma ni URL de producto; ajustar cuando exista diseño oficial.  
- **Lucide** es sustituto de set de iconos; reemplazar si llega biblioteca oficial.  
- **Fotografía** austera (luz, sombra, material) no estaba en el repo; placeholders o ausencia hasta tener assets.  
- **Wordmarks SVG** generados en el DS pueden sustituirse por vectores finales del cliente.

---

## 9. Criterio de “hecho” para la landing

- Superficie principal **Cal**, texto **Negro** con rampa `fg2`/`fg3` donde corresponda.  
- Sin gradientes, sombras de marketing ni blur en la superficie de marca.  
- Titulares en peso **300**; números destacados en **100** cuando se usen como protagonistas.  
- CTA principal **negro** con texto claro; copy alineado a voz Atrio y marca **Atrio** visible en header/footer/metadata.
