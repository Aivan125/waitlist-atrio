# Transcripts para audio (ElevenLabs) — BrokerNetwork Agent Chat

Referencia de timing: [`remotion/timeline.ts`](../remotion/timeline.ts) · `FPS = 30`.

| Acto  | Frames (aprox.)                                         | Segundos (@ 30 fps)            | Notas                           |
| ----- | ------------------------------------------------------- | ------------------------------ | ------------------------------- |
| **A** | 0 → 229 (textos en pantalla); capa hasta ~243 con cruce | ~7,67 s textos + ~0,43 s cruce | Tres secuencias: 90 + 90 + 50 f |
| **B** | 243 → 748 (`FRAMES.actoB`)                              | **506 f ≈ 16,87 s**            | Demo WhatsApp / Agent Chat      |
| **C** | 735 → 1034 (`FRAMES.actoC`)                             | **300 f = 10,00 s**            | CTA final                       |

Duración total del vídeo: **1035 f ≈ 34,5 s** (`DURATION_FRAMES`).

**Idioma:** español (México) · Ajusta pausas y velocidad en ElevenLabs o en tu editor de vídeo para alinear con el timeline.

---

## Acto A — Lectura de los textos en pantalla

Puedes generar **un solo audio** leyendo en orden, o **tres clips** (uno por escena) si quieres sincronía fina con los cortes en f ≈ 90 y 180.

### Escena 1 · f 0–89 (~3,00 s)

**Transcript**

> Somos una red privada de brokers de alto nivel

### Escena 2 · f 90–179 (~3,00 s)

**Transcript**

> Impulsada por Inteligencia Artificial. Busca y cruza propiedades en segundos, directamente en WhatsApp.

### Escena 3 · f 180–229 (~1,67 s)

**Transcript**

> Cierra operaciones más rápido.

### Acto A — versión continua (un solo bloque)

Útil si generas una sola toma de voz para todo el acto:

> Una red privada de brokers de alto nivel. Inventario colaborativo de ticket medio-alto en Monterrey. Impulsada por Inteligencia Artificial. Busca y cruza propiedades en segundos, directamente en WhatsApp. Cierra operaciones más rápido.

---

## Acto B — Narración del demo (WhatsApp / bot BrokerNetwork AI)

**Duración de referencia del acto en vídeo:** ~**16,9 s** (506 frames entre el inicio y el fin del bloque `actoB` en `FRAMES`).

Este guion **no** repite literalmente cada mensaje del chat: describe lo que el espectador ve —asistente en WhatsApp, búsqueda en lenguaje natural, resultados con detalle, enlaces a fichas y un segundo ejemplo con otra zona y tipo de operación— para que la voz acompañe la demo sin competir con el texto en pantalla.

**Transcript sugerido (ElevenLabs)**

> Imagina escribirle a un asistente en WhatsApp como si fuera un broker: le pides casas en renta o en venta, con presupuesto, zona y lo que necesitas, por ejemplo que sea pet friendly. En segundos, la IA cruza inventario, te devuelve opciones con título, ubicación, amenidades y precio, y te deja abrir la ficha con un enlace. En la demo verás cómo encuentra una renta en Monterrey y luego otra búsqueda de compra en San Nicolás, con datos claros y listos para seguir la conversación o pedir más opciones.

_(Si te quedas largo en segundos, recorta la última frase; si corto, añade: “Todo ocurre dentro del chat, sin salir de WhatsApp.”)_

---

## Acto C — Lectura de los textos en pantalla (CTA)

**Duración de referencia:** ~**5 s** (150 frames).

**Transcript**

> Únete a la lista de usuarios de prueba. Sé de los primeros en acceder a la red privada de brokers de Monterrey impulsada por inteligencia artificial.

---

## Checklist rápido en ElevenLabs

1. **Modelo / idioma:** español; voz acorde a tono institucional pero cercano (brokers / proptech).
2. **Acto A y C:** puedes usar el mismo “estilo de lectura” de titulares y subtítulos.
3. **Acto B:** guion más explicativo; prueba velocidad ligeramente menor para que no choque con animaciones de tipeo y burbujas.
4. **Sincronía:** exporta stems por acto o por escena y alinea en tu NLE usando los frames de la tabla superior y los cortes en `FRAMES.crossfadeAB` y `FRAMES.crossfadeBC` si aplicas fundidos.

---

## Referencia de copy en código

- Acto A y textos de usuario genérico: [`remotion/timeline.ts`](../remotion/timeline.ts) (`COPY`).
- Mensajes y respuestas del chat (Acto B visual): [`remotion/agentChatCopy.ts`](../remotion/agentChatCopy.ts).
