/**
 * Timeline — AtrioMvpFlowPromoWeb (1920×1080; duración total v. `durationInFrames` @ 30 fps).
 * Independiente de remotion/timeline.ts (promo vertical).
 */

import { Easing, interpolate } from "remotion";

export const ATRIO_MVP_WEB = {
  width: 1920,
  height: 1080,
  fps: 30,
  /** `webDone` (WhatsApp broker) → `webCitasHero` (titular) + CTA; ver `GLOBAL`. */
  durationInFrames: 2500,
} as const;

/** Mismo guion y duración que el landscape; composición 9:16 para redes. */
export const ATRIO_MVP_WEB_VERTICAL = {
  width: 1080,
  height: 1920,
  fps: ATRIO_MVP_WEB.fps,
  durationInFrames: ATRIO_MVP_WEB.durationInFrames,
} as const;

/**
 * Fondo cálido común (intro, CTA, lienzo alrededor de móviles/chats).
 * Igual que `--atrio-cal` en `src/app/globals.css` (#f3eee5) para empatar con la landing.
 */
export const ATRIO_FRAME_BG = "#f3eee5";

/** Copy guion — lib/docs/video-remotion-atrio-mvp-flow.md */
export const COPY_ATRIO_MVP = {
  userMessage:
    "Busco departamento en venta en zona Valle Oriente de hasta 8 millones de pesos, con minimo de 3 recámaras y que tenga alberca",
  /** Burbuja 1 (IA) — asistente ejecutivo, sin explicar “cómo funciona” la IA. */
  bot1Message:
    "✨ Encontré 12 propiedades en la red que hacen match exacto con tu búsqueda.",
  /** Burbuja 2: cuerpo; el enlace se renderiza aparte (estilo WhatsApp). */
  bot2Intro:
    "Abre este enlace para revisarlas y seleccionar cuáles compartir con tu cliente:",
  linkUrl: "useatrio.com/r/v9w4k2lx",
  notification: `Tu cliente ya agendó visita.

Interés: Valle Vista 4-B · $7.8M; Torre Koi 1202 · $7.2M.

Visitas: vie 18 abr, 10:30 y 12:00.

Sesión cerrada.`,
  /** Intro 16:9 — tres beats + fundidos (frames relativos a GLOBAL.act0.start). */
  act0Intro1: "Una red de brokers",
  act0Intro2: "Impulsada por inteligencia artificial",
  act0Intro3:
    "Encuentra propiedades de alto valor de otros brokers",
} as const;

/** Global frames @ 30 fps — bloques tras intro de 290 f (~9.7 s). */
export const GLOBAL = {
  act0: { start: 0, end: 289 },
  /** Fundido act0 → chat panorámico (−2 s vs. versión previa: menos hold tras burbujas). */
  phone1: { start: 290, end: 1069 },
  /** 400 f locales (0–399); última salida de tarjeta C3 + 100 f de cola. */
  webBroker: { start: 1070, end: 1469 },
  /** 330 f locales (+30 f hold en “¡Selección enviada!”). */
  clientExperience: { start: 1470, end: 1799 },
  /** Mock WhatsApp broker (−3 s vs. antes: menos hold tras burbujas). */
  webDone: { start: 1800, end: 1979 },
  /** “El cliente elige. Tú cierras.” (+2 s hold). */
  webCitasHero: { start: 1980, end: 2139 },
  cta: { start: 2140, end: 2499 },
} as const;

/**
 * Fundidos del intro (frame global dentro de act0).
 * Solapes entre partes para crossfade continuo.
 */
const ACT0_SEG = {
  1: {
    fadeIn: [0, 22] as const,
    fadeOut: [72, 96] as const,
  },
  2: {
    fadeIn: [88, 112] as const,
    fadeOut: [158, 182] as const,
  },
  3: {
    fadeIn: [172, 198] as const,
    fadeOut: [258, 282] as const,
  },
} as const;

export function act0IntroPartOpacity(
  globalFrame: number,
  part: 1 | 2 | 3,
): number {
  if (globalFrame < GLOBAL.act0.start || globalFrame > GLOBAL.act0.end) {
    return 0;
  }
  const f = globalFrame;
  const seg = ACT0_SEG[part];
  if (f < seg.fadeIn[0]) return 0;
  if (f < seg.fadeIn[1]) {
    return interpolate(f, seg.fadeIn, [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }
  if (f < seg.fadeOut[0]) return 1;
  if (f < seg.fadeOut[1]) {
    return interpolate(f, seg.fadeOut, [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }
  return 0;
}

export function act0IntroPartTranslateY(
  globalFrame: number,
  part: 1 | 2 | 3,
): number {
  if (globalFrame < GLOBAL.act0.start || globalFrame > GLOBAL.act0.end) {
    return 0;
  }
  const f = globalFrame;
  const seg = ACT0_SEG[part];
  if (f < seg.fadeIn[0]) return 14;
  if (f < seg.fadeIn[1]) {
    return interpolate(f, seg.fadeIn, [14, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
  }
  if (f < seg.fadeOut[0]) return 0;
  if (f < seg.fadeOut[1]) {
    return interpolate(f, seg.fadeOut, [0, -12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    });
  }
  return 0;
}

/** Local frame dentro de Sequence phone1: global - GLOBAL.phone1.start (0…779) */
export const WA_PHASE1 = {
  duration: GLOBAL.phone1.end - GLOBAL.phone1.start + 1,
  /** Entrada del dispositivo */
  entrance: { start: 0, end: 59 },
  /** Lectura breve del mensaje (~3,5 s tras la entrada) antes de “enviado”. */
  userType: { start: 60, end: 168 },
  send: { start: 169, end: 183 },
  typing1: { start: 184, end: 243 },
  bot1In: { start: 244, end: 258 },
  bot1StaggerStart: 259,
  bot1StaggerStep: 5,
  typing2: { start: 309, end: 358 },
  bot2In: { start: 359, end: 373 },
  bot2StaggerStart: 374,
  bot2StaggerStep: 5,
} as const;

export const BOT1_LINE_COUNT = 1;

/** Líneas burbuja 2: intro + URL en misma línea visual (stagger índices 0 y 1) */
export function bot1LineOpacity(localFrame: number, lineIndex: number): number {
  const start =
    WA_PHASE1.bot1StaggerStart + lineIndex * WA_PHASE1.bot1StaggerStep;
  return interpolate(localFrame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function bot2LineOpacity(localFrame: number, lineIndex: number): number {
  const start =
    WA_PHASE1.bot2StaggerStart + lineIndex * WA_PHASE1.bot2StaggerStep;
  return interpolate(localFrame, [start, start + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function progressUserRevealAtrio(localFrame: number): number {
  return interpolate(
    localFrame,
    [WA_PHASE1.userType.start, WA_PHASE1.userType.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

export function opacityChatUIAtrio(localFrame: number): number {
  if (localFrame < WA_PHASE1.entrance.end - 10) {
    return interpolate(
      localFrame,
      [WA_PHASE1.entrance.start, WA_PHASE1.entrance.end - 10],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  }
  return 1;
}

export function scalePhoneEnterAtrio(localFrame: number): number {
  return interpolate(
    localFrame,
    [WA_PHASE1.entrance.start, WA_PHASE1.entrance.end],
    [0.94, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
}

export function opacityPhoneGroupAtrio(localFrame: number): number {
  return interpolate(
    localFrame,
    [WA_PHASE1.entrance.start, WA_PHASE1.entrance.start + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

export function crossfadeOpacity(
  frame: number,
  range: { start: number; end: number },
  fadeLen: number,
): number {
  if (frame < range.start) return 0;
  if (frame > range.end) return 0;
  const inEnd = range.start + fadeLen;
  const outStart = range.end - fadeLen;
  if (frame < inEnd) {
    return interpolate(frame, [range.start, inEnd], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }
  if (frame > outStart) {
    return interpolate(frame, [outStart, range.end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }
  return 1;
}

export function easeCrossfade(
  frame: number,
  start: number,
  end: number,
): number {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
}
