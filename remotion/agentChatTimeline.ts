import { FRAMES } from "./timeline";

/**
 * Frames locales respecto a `FRAMES.actoB.start` (243).
 * `local = frameGlobal - actoB.start` (puede ser negativo durante el crossfade A→B).
 */
export const AGENT_LOCAL = {
  cardEnterStart: 0,
  cardEnterEnd: 15,
  userBubble: 30,
  typingStart: 60,
  typingEnd: 110,
  aiBubble: 115,
  staggerStart: 120,
  staggerEnd: 150,
} as const;

/**
 * Dos conversaciones en el mismo Acto B:
 * - Conv.1: local 0 → (conversation1End-1)
 * - Hueco / cruce: [conversation1End, conversation2Start)
 * - Conv.2: mismo patrón animado con `t = local - conversation2Start`
 *
 * Tras el stagger de la conv.2 queda hold hasta el crossfade B→C (`FRAMES.actoB.end - actoB.start`, p. ej. +120 f extra).
 */
export const AGENT_DUAL = {
  /** Último fotograma donde sigue visible la primera conversación (excl.: empieza hueco). */
  conversation1End: 220,
  /** Primer fotograma de la segunda conversación (sub-tiempo reinicia en 0). */
  conversation2Start: 235,
} as const;

export function localFrameFromGlobal(frameGlobal: number): number {
  return frameGlobal - FRAMES.actoB.start;
}

/** Sub-tiempo del turno 1 o 2, o null en el hueco entre ambos. */
export function agentConversationTurnLocal(local: number): { turn: 1 | 2; t: number } | null {
  if (local < AGENT_DUAL.conversation1End) return { turn: 1, t: local };
  if (local < AGENT_DUAL.conversation2Start) return null;
  return { turn: 2, t: local - AGENT_DUAL.conversation2Start };
}
