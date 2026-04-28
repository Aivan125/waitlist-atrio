/**
 * Timing alineado con lib/docs/video-whatsapp-broker-network.md §6.
 * Mantener `FRAMES` y `DURATION_FRAMES` sincronizados con ese documento.
 */

import { Easing, interpolate } from "remotion";

export const FPS = 30;
/** Incluye Acto C CTA 10 s + fundido final. */
export const DURATION_FRAMES = 1035;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** Composición hero 16:9 (mismo flujo Agent Chat, layout adaptado en escenas). */
export const WIDTH_HERO_LANDSCAPE = 1280;
export const HEIGHT_HERO_LANDSCAPE = 720;

export function isLandscapeHero(width: number, height: number): boolean {
  return width === WIDTH_HERO_LANDSCAPE && height === HEIGHT_HERO_LANDSCAPE;
}

/** Curva hero / crossfades — cubic-bezier(0.22, 1, 0.36, 1) */
export const easeHero = Easing.bezier(0.22, 1, 0.36, 1);

export const COPY = {
  actoAScene1Title: "Una red privada de brokers de alto nivel",
  actoAScene1Subtitle: "Inventario colaborativo de ticket medio-alto en Monterrey",
  actoAScene2Title: "Impulsada por Inteligencia Artificial",
  actoAScene2Subtitle:
    "Busca y cruza propiedades en segundos, directamente en WhatsApp",
  actoAScene3Title: "Cierra operaciones más rápido",
  userMessage:
    "Busco casa en renta con 2 plantas en colonia Tecnológico en Monterrey que sea pet friendly",
  actoCLine1: "Únete a la lista de usuarios de prueba",
  actoCLine2:
    "Sé de los primeros en acceder a la red privada de brokers de Monterrey impulsada por inteligencia artificial",
} as const;

/**
 * Acto A: 90+90+50 = 230 f (0–229). Crossfade A→B 230–242; Acto B desde 243.
 * Tras la respuesta del bot: ~2 s de hold (552–611) antes del fundido a Acto C (se acortó el hueco previo ~7 s).
 */
export const FRAMES = {
  actoA: { start: 0, end: 229 },
  actoB: { start: 243, end: 748 },
  actoC: { start: 735, end: 1034 },
  crossfadeAB: { start: 230, end: 242 },
  crossfadeBC: { start: 735, end: 749 },
  iphoneEnter: { start: 243, end: 257 },
  holdEmpty: { start: 258, end: 272 },
  userType: { start: 273, end: 392 },
  send: { start: 393, end: 407 },
  typing: { start: 408, end: 497 },
  botBubbleIn: { start: 498, end: 512 },
  botStaggerStart: 513,
  botStaggerStep: 4,
  botContentEnd: 551,
  holdPulse: { start: 552, end: 611 },
  preFadeC: { start: 732, end: 746 },
  actoCTextIn: { start: 735, end: 749 },
  actoCHold: { start: 750, end: 1019 },
  fadeOutAll: { start: 1020, end: 1034 },
  pushIn: { start: 498, end: 555 },
} as const;

/**
 * Rangos para `<Sequence>` en `BrokerNetworkPromo` (timeline de Remotion Studio).
 * Acto B/C usan `frameOffset` = `from` porque el contenido interno usa frames globales en `FRAMES`.
 */
export const STUDIO_SEQUENCES = {
  actoA: { from: 0, durationInFrames: FRAMES.crossfadeAB.end + 1 },
  actoB: {
    from: FRAMES.crossfadeAB.start,
    durationInFrames: FRAMES.crossfadeBC.end - FRAMES.crossfadeAB.start + 1,
  },
  actoC: {
    from: FRAMES.crossfadeBC.start,
    durationInFrames: FRAMES.fadeOutAll.end - FRAMES.crossfadeBC.start + 1,
  },
} as const;

/** Capa Acto A: opaca hasta el crossfade final con Acto B. */
export function opacityActA(frame: number): number {
  if (frame < 0) return 0;
  if (frame < FRAMES.crossfadeAB.start) return 1;
  if (frame <= FRAMES.crossfadeAB.end) {
    return interpolate(frame, [FRAMES.crossfadeAB.start, FRAMES.crossfadeAB.end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeHero,
    });
  }
  return 0;
}

/** Opacidad de la capa completa Acto B (crossfade entrada y salida). */
export function opacityLayerB(frame: number): number {
  if (frame < FRAMES.crossfadeAB.start) return 0;
  if (frame <= FRAMES.crossfadeAB.end) {
    return interpolate(frame, [FRAMES.crossfadeAB.start, FRAMES.crossfadeAB.end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  if (frame < FRAMES.crossfadeBC.start) return 1;
  if (frame <= FRAMES.crossfadeBC.end) {
    return interpolate(frame, [FRAMES.crossfadeBC.start, FRAMES.crossfadeBC.end], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  return 0;
}

/** Opacidad capa Acto C (incluye fundido final). */
export function opacityLayerC(frame: number): number {
  if (frame < FRAMES.crossfadeBC.start) return 0;
  let o = 1;
  if (frame <= FRAMES.crossfadeBC.end) {
    o = interpolate(frame, [FRAMES.crossfadeBC.start, FRAMES.crossfadeBC.end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  if (frame >= FRAMES.fadeOutAll.start) {
    const fade = interpolate(
      frame,
      [FRAMES.fadeOutAll.start, FRAMES.fadeOutAll.end],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    o *= fade;
  }
  return o;
}

/** Opacidad UI chat dentro de Acto B (0,85 hacia Acto C). */
export function opacityChatUI(frame: number): number {
  if (frame < FRAMES.preFadeC.start) return 1;
  if (frame <= FRAMES.preFadeC.end) {
    return interpolate(frame, [FRAMES.preFadeC.start, FRAMES.preFadeC.end], [1, 0.85], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  return 0.85;
}

/** Escala entrada iPhone */
export function scaleIphoneEnter(frame: number): number {
  if (frame < FRAMES.iphoneEnter.start) return 0.96;
  if (frame <= FRAMES.iphoneEnter.end) {
    return interpolate(frame, [FRAMES.iphoneEnter.start, FRAMES.iphoneEnter.end], [0.96, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeHero,
    });
  }
  return 1;
}

export function opacityIphoneEnter(frame: number): number {
  if (frame < FRAMES.iphoneEnter.start) return 0;
  if (frame <= FRAMES.iphoneEnter.end) {
    return interpolate(frame, [FRAMES.iphoneEnter.start, FRAMES.iphoneEnter.end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeHero,
    });
  }
  return 1;
}

export function scalePushIn(frame: number): number {
  if (frame < FRAMES.pushIn.start) return 1;
  if (frame <= FRAMES.pushIn.end) {
    return interpolate(frame, [FRAMES.pushIn.start, FRAMES.pushIn.end], [1, 1.025], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }
  return 1.025;
}

/** Líneas §7.3 para stagger (+4 f desde botStaggerStart). */
export const BOT_STAGGER_LINES: { text: string; whatsapp?: boolean }[] = [
  { text: "He encontrado 1 opción alineada a tu búsqueda:" },
  { text: "" },
  { text: "• Ubicación: Col. Tecnológico, Monterrey, N.L." },
  { text: "• Casa · 2 plantas · 3 recámaras · pet friendly" },
  { text: "• Renta: $24,000 MXN / mes" },
  { text: "• Contacto WhatsApp: ", whatsapp: true },
  { text: "" },
  { text: "¿Te preparo la visita o busco más opciones?" },
];

export const WHATSAPP_NUMBER = "528112868001";

export function progressUserReveal(frame: number): number {
  return interpolate(
    frame,
    [FRAMES.userType.start, FRAMES.userType.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

export function scaleWhatsAppNumber(frame: number): number {
  if (frame < FRAMES.holdPulse.start) return 1;
  if (frame > FRAMES.holdPulse.end) return 1;
  const mid = (FRAMES.holdPulse.start + FRAMES.holdPulse.end) / 2;
  if (frame <= mid) {
    return interpolate(frame, [FRAMES.holdPulse.start, mid], [1, 1.04], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    });
  }
  return interpolate(frame, [mid, FRAMES.holdPulse.end], [1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });
}
