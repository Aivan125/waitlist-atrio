# Atrio Design System

> *"Tu red de propiedades de alto nivel, a un mensaje de WhatsApp."*

This folder is the single source of truth for designing anything branded Atrio — product screens, decks, social, pitch material, or throwaway prototypes. Read this file first; every other file here is referenced below.

---

## 1 · What Atrio is

**Atrio** is an AI-powered, closed **network** of mid- and high-ticket real-estate brokers in the Área Metropolitana de Monterrey (AMM). Members upload their property inventory; other members search that inventory by **WhatsApp**, in natural language, as if chatting with a colleague. When there's a match with a client, the two brokers close with a shared commission.

- **No app, no dashboard.** The product surface is WhatsApp.
- **AI is the invisible engine.** Never shouted — always demonstrated by how it behaves.
- **Network, not platform.** Always referred to as "la red" / "a network".
- **Invite-only.** 50 serious brokers, one shared inventory, zero saturated WhatsApp groups.

The name comes from the Latin *atrium* — the central open space of a Roman house, where deals were made. Wordmark is always lowercase: **atrio**. In copy it's **Atrio** (title case). Never "the Atrio", "Atrio App", or "the Atrio platform".

### Products / surfaces represented here
Atrio's only live surface is **the WhatsApp bot**, plus marketing surfaces (pitch material, social posts, landing page at `useatrio.com`). There is no dashboard or native app.

- `ui_kits/whatsapp/` — WhatsApp-bot conversation UI kit.
- `ui_kits/marketing/` — marketing / brand-surface UI kit (landing, pitch cards, social).

---

## 2 · Sources

All source material provided by the user is archived here so a future reader can re-derive everything:

| Source | Path | Notes |
|---|---|---|
| Brand guidelines PDF v1.2 (Abril 2026) | `assets/atrio-brand-guidelines-final.pdf` | 12 pages. Authoritative. |
| Logo — black on cal | `assets/atrio-logo-black.png` | Symbol only, PNG. |
| Logo — cal on black | `assets/atrio-logo-cal.png` | Symbol only, PNG. |
| Geist font family | `fonts/Geist-*.ttf` | Thin → Black variable + statics. |

No codebase, Figma, or live product URL was provided. **All UI-kit recreations are reconstructed from the brand guidelines + the description of the WhatsApp-bot surface**, so they are plausible best-efforts rather than pixel matches. See "Caveats" at the bottom of this file.

---

## 3 · Index of files

```
README.md                 ← you are here
SKILL.md                  ← agent-skill manifest (cross-compatible with Claude Code)
colors_and_type.css       ← all color & type tokens + semantic classes
fonts/                    ← Geist .ttf files (Thin → Black)
assets/                   ← logos, brand guidelines PDF, static imagery
preview/                  ← Design-System-tab preview cards (one card per concept)
ui_kits/
  whatsapp/               ← WhatsApp-bot conversation UI kit (primary surface)
  marketing/              ← brand / landing / pitch-card UI kit
```

No `slides/` folder — the user did not provide a deck template, and per the brand-guidelines philosophy any deck should be built ad-hoc from the visual foundations below.

---

## 4 · Content fundamentals

Atrio's copy is **Spanish-first** (Mexican Spanish, AMM context). English is used only when a user is writing explicitly in English; otherwise default to Spanish. All principles below apply in either language.

### Voice pillars (from the brand guidelines)

1. **Sofisticado sin pretensión** — Sophistication from precision and craft, never from flowery language or ostentatious aesthetics.
2. **Inteligente sin presumirlo** — AI is the invisible engine. Never announce "we are AI"; demonstrate it in how the thing works.
3. **Conector por naturaleza** — Every word reinforces connection: unir, abrir puertas, encontrar, cerrar.
4. **Decidido y directo** — Short sentences that close. Authority shows in economy of words.

### Four voice principles (verbatim — keep these in mind while writing)

- **01 · Habla como broker, no como startup.**
  - ✓ "Tu inventario ya está visible para otros 49 brokers."
  - ✗ "¡Felicidades! Tu perfil está listo. Ahora puedes explorar todas las funcionalidades."
- **02 · Directo, pero no frío.**
  - ✓ "Tres recámaras en Valle, abajo de ocho millones."
  - ✗ "Nuestra avanzada IA procesará tu búsqueda en tiempo real."
- **03 · La red exige, no suplica.**
  - ✓ "Tu inventario lleva 8 días sin actualizarse. La red funciona porque todos ponemos."
  - ✗ "¡Recordatorio amistoso! 😊 No olvides mantener tu inventario al día."
- **04 · Poco texto, mucho peso.**
  - ✓ "Cerraste tu primera sinergia. Eso es Atrio."
  - ✗ "¡Enhorabuena! Has completado exitosamente tu primera operación colaborativa."

### Specific rules

- **Address:** always **tú** (never **usted**). Internally, speak as a collective ("todos ponemos", "nuestra red"). Externally, sound institutional.
- **Casing:** sentence case in copy. `Atrio` in prose (title-cased). `atrio` only in the wordmark. Uppercase-with-tracking reserved for labels (e.g. `VERSIÓN 1.2 · MONTERREY · ABRIL 2026`).
- **Punctuation:** **no exclamation marks, ever**, in any brand copy. Prefer a period that closes a sentence hard.
- **Emoji:** **no emojis** in formal materials. The green check (✓) and cross (✗) are typographic markers, not emojis, and are fine. If a WhatsApp-flavored product message genuinely needs one, use 🏠 sparingly — never 😊 or smileys.
- **Numbers:** large numerals are protagonists — 80px+ Geist Thin. Currency in MXN uses `$` with tabular-nums. Prices often said as millones: "$8M", "abajo de ocho millones".
- **Never say:** "plataforma", "app", "funcionalidades", "enhorabuena", "exitosamente", "nuestra avanzada IA". These are all banned anti-patterns from the guidelines.

### Canonical examples

| Context | Copy |
|---|---|
| Tagline | "Tu red de propiedades de alto nivel, a un mensaje de WhatsApp." |
| Community-facing | "Los brokers que entendieron que el futuro ya llegó." |
| Social | "Inventario compartido. Sinergias reales. Solo por invitación." |
| In-person pitch | "Lo que los grupos de WhatsApp prometían pero no podían cumplir." |
| Masa crítica | "50 brokers. Un inventario. Cero grupos saturados." |
| Bot — welcome | "Bienvenido a Atrio. Ya eres parte de la red." |
| Bot — first upload | "Listo. Tus propiedades ya están visibles para los otros brokers." |
| Bot — 7-day nudge | "La red funciona porque todos mantenemos la información vigente." |
| Bot — first close | "Cerraste tu primera sinergia. Eso es Atrio." |

---

## 5 · Visual foundations

The whole aesthetic is summarizable in one sentence: **two colors, one typeface, a lot of empty space, and one spiral mark.** Restraint is the brand.

### Color

- **Negro Atrio** `#0F0E0C` — almost-black with a warm bias. Never pure `#000`.
- **Cal** `#F3EEE5` — warm near-white, named after lime plaster. The default background for *any* Atrio piece.
- Hierarchy is produced by **opacity of Negro on Cal** — `100 / 65 / 45 / 12` (primary / secondary / labels / lines).
- **No other colors are allowed** in brand materials. WhatsApp green only appears when the design literally depicts the WhatsApp interface.

### Type

- One family: **Geist**. No secondary family. No serif. No fallbacks on brand.
- Six weights in use: **100 Thin · 300 Light · 400 Regular · 500 Medium · 600 SemiBold**.
- **Bold 700 is explicitly off-brand.** Do not use.
- Titles & headings: **always 300 Light**.
- Body, UI, messages: **400 Regular**.
- Emphasis / sub-heads: **500 Medium**.
- Labels & metadata: **600 SemiBold**, UPPERCASE, letter-spacing `0.12em`.
- Big numbers (80px+) are protagonists and use **100 Thin** with tight tracking.

### Spacing, rhythm, layout

- Base unit **4px**. Commonly used: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- **Airy, not dense.** "Claridad sobre densidad" is a guideline rule. Prefer more whitespace than feels necessary.
- Copy wraps short. Paragraphs are two or three lines, never five.
- Layouts are mostly **left-aligned**, occasionally centered for titling moments. Rarely right-aligned.
- Fixed elements (nav, bot header) are rare; let content breathe and scroll.

### Backgrounds

- Default is a full-bleed flat **Cal** (`#F3EEE5`). Secondary option is full-bleed Negro for high-contrast moments (title cards, social cover).
- **No gradients, no glow, no drop shadows, no glass/blur.** Explicitly forbidden by the guidelines.
- **No decorative patterns or textures.** The spiral logo is the only graphic device.
- Photography when used: austere — light, shadow, material. Never staged interior-decoration or real-estate-stock imagery.

### Borders, dividers, cards

- Dividers: 1px at 12% Negro (`--fg4`).
- Cards: flat. No shadow, no border radius larger than **10px**, typically **6px** or square. A card is usually just a block of Cal with a hairline divider or a thin border (`--border-hair`) — occasionally with a subtle 3% Negro tint for separation (`--surface-raised`).
- No colored left-border accent cards, ever.

### Corner radii

- Default: **6px** for UI controls. 4px for tight chips/tags. 0px for anything that should feel architectural (print-like).
- **10px is the ceiling.** Soft, pillowy UI is off-brand.
- Pill radius (999px) only for avatars and a handful of status chips.

### Elevation / shadows

- **No shadows on brand surfaces.** Differentiate by color, weight, and whitespace.
- Shadows only appear where the design *depicts* another surface — e.g. WhatsApp chrome, a phone frame — for realism.

### Animation & motion

- Micro only. Atrio does not feel animated; it feels considered.
- Easings: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` (standard) and `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) for content entering.
- Durations: **120 / 220 / 420ms**. Rarely longer.
- **No bounces. No springs. No parallax.** A message-typing dots indicator, a subtle fade on hover — that's the scope.

### Hover / press states

- **Hover:** either raise to `--surface-hover` (5% Negro tint) or drop opacity of the element to 0.8. No color shifts beyond the Negro ramp.
- **Press:** `--surface-pressed` (9% Negro tint) or a 2% scale-down on buttons (`transform: scale(0.98)`). No glow.
- **Focus:** 1px outline at 45% Negro, 2px offset. Keyboard users matter; decoration doesn't.

### Transparency & blur

- Transparency appears only via the Negro-opacity ramp on Cal. Never translucent panels over photography.
- **No backdrop-blur.** The brand is not iOS-glass.

### Imagery tone (if used)

- Warm, neutral, low-saturation. Think architectural editorial photography: material, light, shadow.
- Never: saturated sunsets, staged families, generic "real estate listing" photography, drone shots.

### Layout rules summary

- Always start with Cal as the page.
- Content aligns on a 4px grid; text aligns to optical baselines.
- Margins generous — on desktop, never less than 64px gutters on title moments.
- Big number protagonist + a short `300 Light` title + a tight `400 Regular` paragraph is the canonical layout.

---

## 6 · Iconography

The brand guidelines explicitly call out:
> "Iconos decorativos, emojis en materiales formales" → ✗ **not Atrio.**

### Rules

- **No decorative icons.** Atrio does not use icon-heavy UI.
- **No emoji** in formal brand materials. (WhatsApp messages, which live inside an emoji-rich surface, are a narrow exception — one 🏠 for a property, ✓ for a confirmation. Never 😊 / 🎉 / 🚀.)
- When a functional icon is genuinely needed (e.g. a send arrow, a close X, a WhatsApp-surface back-chevron), use a **thin 1.25–1.5px stroke, rounded caps**, in Negro at the appropriate opacity.
- For the handful of product-UI icons we do need, we link **Lucide** from CDN. Lucide matches the brand's precise, unornamented line-icon register. **⚠ Substitution flag:** Atrio does not ship its own icon set; Lucide is our substitute. If you get access to a real Atrio icon library, replace CDN references in the UI kits.

### Lucide via CDN

```html
<script src="https://unpkg.com/lucide@0.451.0/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

Usage: `<i data-lucide="search"></i>`. Use sparingly — a menu is just text until it absolutely needs a glyph.

### Unicode-as-icon

A handful of unicode marks are brand-appropriate typographic devices and can appear without feeling like icons:

- `·` middle-dot (labels/separators): `VERSIÓN 1.2 · MONTERREY · ABRIL 2026`
- `—` em-dash (phrasing, never `--`)
- `✓` / `✗` (do/don't lists, never for generic success toasts)
- `→` (CTAs: "Solicitar acceso →")

### Logo assets

| File | Use |
|---|---|
| `assets/atrio-logo-black.png` | Spiral on Cal/light backgrounds. |
| `assets/atrio-logo-cal.png` | Spiral on Negro/dark backgrounds. |
| `assets/atrio-wordmark.svg` | "atrio" wordmark (Geist 400 Regular), positive. |
| `assets/atrio-wordmark-inv.svg` | "atrio" wordmark, negative. |
| `assets/atrio-lockup.svg` | Spiral + wordmark horizontal lockup. |

Minimum clear space around the logo = the radius of the center dot. No effects, no frames, no background shapes. Never alter colors or rotate the spiral.

---

## 7 · UI kits

Each kit is a self-contained folder with a `README.md`, an `index.html` click-thru prototype, and small JSX components.

- **`ui_kits/whatsapp/`** — the primary product surface. Reconstructs an iOS WhatsApp chat with the Atrio bot: welcome flow, uploading an inventory, natural-language search, match notification, and the "cerraste tu primera sinergia" moment.
- **`ui_kits/marketing/`** — brand surfaces: landing page (`useatrio.com`-style), pitch card, social post template, invitation card.

See each kit's own `README.md` for component inventories.

---

## 8 · Caveats & open questions

- **No codebase or Figma** was provided. UI kits are reconstructions from the brand guidelines + the WhatsApp-surface description. They match the stated rules but are not pixel-matches of anything that exists in production.
- **Icon set:** Atrio ships no branded icons. The Lucide CDN is a stand-in; please confirm or replace.
- **Wordmark SVGs** (`atrio-wordmark.svg`, `atrio-wordmark-inv.svg`, `atrio-lockup.svg`) were generated here using Geist 400 Regular in SVG text — they match the wordmark rule but are not the official vector files. If you have the real `.svg` / `.ai` wordmark files, drop them into `assets/` over these.
- **No brand imagery** (austere photography) was provided. Where UI kits would call for photography, we leave labeled placeholders with the direction "light · shadow · material". Please supply real photography when available.
- **Language:** copy examples are in Mexican Spanish per the guidelines. English is only shown when a principle explicitly calls for both.
