---
name: atrio-design
description: Use this skill to generate well-branded interfaces and assets for Atrio, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Core of the brand in one line: **two colors (Negro Atrio `#0F0E0C` + Cal `#F3EEE5`), one typeface (Geist, weights 100/300/400/500/600 only — no Bold 700), no gradients, no shadows, no exclamation marks, no emoji in formal materials.** Hierarchy is expressed by opacity of Negro on Cal (100/65/45/12). Big numbers are protagonists in Geist Thin 100 at 80px+.

Always write in Mexican Spanish unless the user is writing in English. Voice is "broker, not startup": short, direct, confident. Never say "plataforma", "app", "funcionalidades", or "nuestra avanzada IA" — Atrio is always "la red".

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Start from `colors_and_type.css` and pull components from `ui_kits/whatsapp/` (the product surface) or `ui_kits/marketing/` (brand / landing / pitch). Copy logos from `assets/`.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
