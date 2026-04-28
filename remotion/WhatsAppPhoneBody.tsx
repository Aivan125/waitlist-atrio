import { Easing, interpolate } from "remotion";
import {
  BOT_STAGGER_LINES,
  COPY,
  FRAMES,
  WHATSAPP_NUMBER,
  opacityChatUI,
  opacityIphoneEnter,
  progressUserReveal,
  scaleIphoneEnter,
  scalePushIn,
  scaleWhatsAppNumber,
} from "./timeline";
import { inter } from "./fonts";

export const COLORS = {
  canvas: "#000000",
  chatBg: "#0B141A",
  header: "#202C33",
  bubbleUser: "#005C4B",
  bubbleBot: "#202C33",
  text: "#E9EDEF",
  muted: "#8696A0",
  accent: "#25D366",
} as const;

export const PHONE_W = 780;
export const PHONE_H = 1640;
export const R_GLASS = 48;
export const ISLAND_W = 120;
export const ISLAND_H = 34;
export const INSET = 12;

const USER_MESSAGE_WORDS = COPY.userMessage.split(/\s+/).filter(Boolean);

function computeGapWeights(words: string[]): number[] {
  const n = words.length;
  const gaps = new Array<number>(n);
  gaps[0] = 0;
  for (let i = 1; i < n; i++) {
    let w = 1;
    const prev = words[i - 1];
    const cur = words[i];
    if (prev.endsWith(",")) w *= 1.55;
    if (prev.endsWith(".")) w *= 1.35;
    if (/^\d+$/.test(cur)) w *= 1.22;
    if (cur === "Monterrey" || cur === "Tecnológico") w *= 1.38;
    if (i === n - 1) w *= 1.12;
    gaps[i] = w;
  }
  return gaps;
}

function buildWordStartCumulative(gaps: number[]): number[] {
  const n = gaps.length;
  const cum = new Array<number>(n);
  cum[0] = 0;
  for (let i = 1; i < n; i++) {
    cum[i] = cum[i - 1] + gaps[i];
  }
  return cum;
}

const USER_GAP_WEIGHTS = computeGapWeights(USER_MESSAGE_WORDS);
const USER_WORD_START = buildWordStartCumulative(USER_GAP_WEIGHTS);
const USER_AVG_GAP =
  USER_MESSAGE_WORDS.length > 1
    ? USER_WORD_START[USER_MESSAGE_WORDS.length - 1] /
      Math.max(USER_MESSAGE_WORDS.length - 1, 1)
    : 1;
const USER_TOTAL_UNITS =
  USER_MESSAGE_WORDS.length > 0
    ? USER_WORD_START[USER_MESSAGE_WORDS.length - 1] + USER_AVG_GAP * 0.55
    : 0;

function visibleWordCountWeighted(timeUnits: number, cum: number[], n: number): number {
  let count = 0;
  for (let k = 0; k < n; k++) {
    if (timeUnits + 1e-9 >= cum[k]) count = k + 1;
  }
  return count;
}

function wordEntranceStyle(
  wordIndex: number,
  timeUnits: number,
  cum: number[],
  n: number,
): { opacity: number; translateY: number } {
  const avgGap = n > 1 ? cum[n - 1] / Math.max(n - 1, 1) : 1;
  const nextStart = wordIndex < n - 1 ? cum[wordIndex + 1] : cum[wordIndex] + avgGap * 0.55;
  const slotLen = Math.max(nextStart - cum[wordIndex], 1e-6);
  if (timeUnits < cum[wordIndex]) return { opacity: 0, translateY: 3 };
  if (timeUnits >= nextStart) return { opacity: 1, translateY: 0 };
  const t = (timeUnits - cum[wordIndex]) / slotLen;
  const fadeWindow = 0.38;
  const raw = Math.min(1, t / fadeWindow);
  const opacity = interpolate(raw, [0, 1], [0.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const translateY = interpolate(raw, [0, 1], [3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, translateY };
}

export type WhatsAppPhoneLayoutProps = {
  frame: number;
  /** Escala extra del grupo teléfono (encuadre close-up). */
  extraGroupScale: number;
  /** Multiplicador de tamaños de texto y UI fina. */
  fontScale: number;
  /** Suma a translateY base (24) del grupo animado. */
  groupTranslateExtraY: number;
  transformOrigin: string;
  /** Recorta el lienzo si el teléfono escalado sobresale. */
  rootOverflowHidden: boolean;
};

const fs = (px: number, fontScale: number) => Math.round(px * fontScale * 100) / 100;

export function WhatsAppPhoneBody({
  frame,
  extraGroupScale,
  fontScale,
  groupTranslateExtraY,
  transformOrigin,
  rootOverflowHidden,
}: WhatsAppPhoneLayoutProps) {
  const chatOpacity = opacityChatUI(frame);
  const scaleEnter = scaleIphoneEnter(frame);
  const scalePush = scalePushIn(frame);
  const combinedScale = scaleEnter * scalePush * extraGroupScale;
  const phoneGroupOpacity = opacityIphoneEnter(frame);

  const userProgress = progressUserReveal(frame);
  const userTimeUnits =
    USER_TOTAL_UNITS > 0 ? userProgress * USER_TOTAL_UNITS : 0;
  const userWordsVisible = visibleWordCountWeighted(
    userTimeUnits,
    USER_WORD_START,
    USER_MESSAGE_WORDS.length,
  );
  const showSend = frame >= FRAMES.send.start;
  const typing = frame >= FRAMES.typing.start && frame <= FRAMES.typing.end;
  const showBotShell = frame >= FRAMES.botBubbleIn.start;

  const bubbleEnter = interpolate(
    frame,
    [FRAMES.botBubbleIn.start, FRAMES.botBubbleIn.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const bubbleY = interpolate(
    frame,
    [FRAMES.botBubbleIn.start, FRAMES.botBubbleIn.end],
    [10, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const sendPop = interpolate(
    frame,
    [FRAMES.send.start, FRAMES.send.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cursorOpacitySmooth =
    frame >= FRAMES.userType.start && frame <= FRAMES.userType.end
      ? interpolate(
          Math.sin(frame * 0.11 + 1.2),
          [-1, 1],
          [0.52, 0.96],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      : 0;

  const typingPhase = Math.floor((frame - FRAMES.typing.start) / 12) % 3;

  const groupTranslateY = 24 + groupTranslateExtraY;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.canvas,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        overflow: rootOverflowHidden ? "hidden" : "visible",
      }}
    >
      <div
        style={{
          transform: `translateY(${groupTranslateY}px) scale(${combinedScale})`,
          transformOrigin,
          filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.45))",
          opacity: phoneGroupOpacity,
        }}
      >
        <div
          style={{
            width: PHONE_W,
            height: PHONE_H,
            borderRadius: R_GLASS,
            overflow: "hidden",
            backgroundColor: "#000",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: INSET,
              left: "50%",
              width: ISLAND_W,
              height: ISLAND_H,
              marginLeft: -ISLAND_W / 2,
              borderRadius: ISLAND_H / 2,
              backgroundColor: "#111",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: INSET,
              paddingTop: INSET + ISLAND_H + 8,
              display: "flex",
              flexDirection: "column",
              opacity: chatOpacity,
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: COLORS.chatBg,
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  height: 56,
                  backgroundColor: COLORS.header,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 8,
                  paddingRight: 8,
                  gap: 8,
                }}
              >
                <div style={{ color: COLORS.muted, fontSize: fs(18, fontScale) }}>‹</div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#334155",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: inter.fontFamily,
                      fontSize: fs(16, fontScale),
                      fontWeight: 600,
                      color: COLORS.text,
                    }}
                  >
                    BrokerNetwork
                  </div>
                  <div
                    style={{
                      fontFamily: inter.fontFamily,
                      fontSize: fs(12, fontScale),
                      color: COLORS.muted,
                    }}
                  >
                    en línea
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, color: COLORS.muted }}>
                  <span>📹</span>
                  <span>📞</span>
                  <span>⋮</span>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: fs(10, fontScale),
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: fs(10, fontScale),
                }}
              >
                {frame >= FRAMES.userType.start && (
                  <div style={{ alignSelf: "flex-end", maxWidth: "72%" }}>
                    <div
                      style={{
                        backgroundColor: COLORS.bubbleUser,
                        borderRadius: 12,
                        padding: `${fs(10, fontScale)}px ${fs(12, fontScale)}px`,
                        position: "relative",
                        transform: showSend
                          ? `scale(${0.96 + sendPop * 0.04})`
                          : undefined,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: inter.fontFamily,
                          fontSize: fs(15, fontScale),
                          color: COLORS.text,
                          lineHeight: 1.35,
                          position: "relative",
                        }}
                      >
                        {USER_MESSAGE_WORDS.slice(0, userWordsVisible).map((word, i) => {
                          const isLast = i === userWordsVisible - 1;
                          const { opacity, translateY } = isLast
                            ? wordEntranceStyle(
                                i,
                                userTimeUnits,
                                USER_WORD_START,
                                USER_MESSAGE_WORDS.length,
                              )
                            : { opacity: 1, translateY: 0 };
                          return (
                            <span
                              key={i}
                              style={{
                                display: isLast ? "inline-block" : "inline",
                                opacity,
                                transform: isLast
                                  ? `translateY(${translateY}px)`
                                  : undefined,
                              }}
                            >
                              {word}
                              {i < userWordsVisible - 1 ? " " : ""}
                            </span>
                          );
                        })}
                        {frame <= FRAMES.userType.end && cursorOpacitySmooth > 0.05 && (
                          <span style={{ opacity: cursorOpacitySmooth }}>|</span>
                        )}
                      </div>
                      {showSend && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 4,
                            fontSize: fs(11, fontScale),
                            color: COLORS.muted,
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <span>3:14 p. m.</span>
                          <span style={{ color: "#53bdeb" }}>✓✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {typing && (
                  <div style={{ alignSelf: "flex-start" }}>
                    <div
                      style={{
                        backgroundColor: COLORS.bubbleBot,
                        borderRadius: 12,
                        padding: `${fs(12, fontScale)}px ${fs(16, fontScale)}px`,
                        display: "flex",
                        gap: 4,
                      }}
                    >
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: fs(8, fontScale),
                            height: fs(8, fontScale),
                            borderRadius: fs(4, fontScale),
                            backgroundColor: COLORS.muted,
                            opacity: typingPhase === i ? 1 : 0.35,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {showBotShell && (
                  <div style={{ alignSelf: "flex-start", maxWidth: "72%" }}>
                    <div
                      style={{
                        backgroundColor: COLORS.bubbleBot,
                        borderRadius: 12,
                        padding: `${fs(12, fontScale)}px ${fs(12, fontScale)}px`,
                        opacity: bubbleEnter,
                        transform: `translateY(${bubbleY}px)`,
                      }}
                    >
                      <div
                        style={{
                          fontSize: fs(11, fontScale),
                          color: COLORS.muted,
                          marginBottom: 6,
                        }}
                      >
                        3:16 p. m.
                      </div>
                      {BOT_STAGGER_LINES.map((line, i) => {
                        const start = FRAMES.botStaggerStart + i * FRAMES.botStaggerStep;
                        const lineOpacity = interpolate(
                          frame,
                          [start, start + 10],
                          [0, 1],
                          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                        );
                        if (line.text === "" && !line.whatsapp) {
                          return (
                            <div key={i} style={{ height: 6, opacity: lineOpacity }} />
                          );
                        }
                        if (line.whatsapp) {
                          return (
                            <div
                              key={i}
                              style={{
                                fontFamily: inter.fontFamily,
                                fontSize: fs(15, fontScale),
                                lineHeight: 1.45,
                                marginTop: i === 0 ? 0 : 4,
                                opacity: lineOpacity,
                              }}
                            >
                              <span style={{ color: COLORS.text }}>{line.text}</span>
                              <span
                                style={{
                                  color: COLORS.accent,
                                  fontWeight: 600,
                                  display: "inline-block",
                                  transform: `scale(${scaleWhatsAppNumber(frame)})`,
                                  transformOrigin: "left center",
                                }}
                              >
                                {WHATSAPP_NUMBER}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <div
                            key={i}
                            style={{
                              fontFamily: inter.fontFamily,
                              fontSize: fs(15, fontScale),
                              color: COLORS.text,
                              lineHeight: 1.45,
                              marginTop: i === 0 ? 0 : 4,
                              opacity: lineOpacity,
                            }}
                          >
                            {line.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div
                style={{
                  height: 56,
                  backgroundColor: COLORS.header,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  paddingRight: 12,
                  gap: 8,
                  opacity: frame >= FRAMES.botBubbleIn.start ? 0.85 : 1,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "#2a3942",
                    borderRadius: 20,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 14,
                    fontFamily: inter.fontFamily,
                    fontSize: fs(14, fontScale),
                    color: COLORS.muted,
                  }}
                >
                  Message
                </div>
                <div style={{ fontSize: fs(22, fontScale) }}>🎤</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
