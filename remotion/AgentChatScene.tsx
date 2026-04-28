import { Sparkles } from "lucide-react";
import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Easing,
  Html5Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AGENT2_AI_SEGMENTS,
  AGENT2_LISTING_LINK,
  AGENT2_USER_MESSAGE,
  AGENT_AI_SEGMENTS,
  AGENT_CHAT_HEADER_TITLE,
  AGENT_LISTING_LINK,
  AGENT_USER_MESSAGE,
} from "./agentChatCopy";
import { AGENT_LOCAL, agentConversationTurnLocal, localFrameFromGlobal } from "./agentChatTimeline";
import { inter } from "./fonts";
import "./fonts";
import { FPS, isLandscapeHero } from "./timeline";

type Props = { frameOffset?: number };

const SPRING_CONFIG = { damping: 18, stiffness: 180, mass: 0.85 };

export type AgentChatLayoutTokens = {
  cardWidth: number;
  cardMaxHeight: number | undefined;
  headerH: number;
  headerPadX: number;
  icon: number;
  titleSize: number;
  bodySize: number;
  bodyLineHeight: number;
  bubblePad: number;
  areaMinH: number;
  areaGap: number;
  areaPad: number;
  radiusCard: number;
  radiusBubble: number;
  typingPadY: number;
  typingPadX: number;
  typingLabelSize: number;
  dot: number;
  shadowCard: string;
  shadowBubble: string;
  typingShadow: string;
};

/** Escala para legibilidad en 1080×1920 (la spec original era ~400px). */
const L_VERTICAL: AgentChatLayoutTokens = {
  cardWidth: 880,
  cardMaxHeight: undefined,
  headerH: 96,
  headerPadX: 32,
  icon: 28,
  titleSize: 22,
  bodySize: 26,
  bodyLineHeight: 1.55,
  bubblePad: 28,
  areaMinH: 700,
  areaGap: 22,
  areaPad: 32,
  radiusCard: 30,
  radiusBubble: 24,
  typingPadY: 20,
  typingPadX: 28,
  typingLabelSize: 19,
  dot: 10,
  shadowCard: "0 36px 72px -18px rgba(6, 78, 59, 0.4)",
  shadowBubble: "0 14px 28px -6px rgba(0, 0, 0, 0.35)",
  typingShadow: "0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
};

/** 1280×720: card ancha, tipografía y área acotadas al alto del lienzo. */
const L_LANDSCAPE: AgentChatLayoutTokens = {
  cardWidth: 1120,
  cardMaxHeight: 704,
  headerH: 52,
  headerPadX: 22,
  icon: 22,
  titleSize: 17,
  bodySize: 20,
  bodyLineHeight: 1.5,
  bubblePad: 18,
  areaMinH: 520,
  areaGap: 14,
  areaPad: 18,
  radiusCard: 22,
  radiusBubble: 18,
  typingPadY: 12,
  typingPadX: 22,
  typingLabelSize: 15,
  dot: 8,
  shadowCard: "0 28px 56px -14px rgba(6, 78, 59, 0.4)",
  shadowBubble: "0 12px 24px -6px rgba(0, 0, 0, 0.35)",
  typingShadow: "0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
};

function getAgentChatLayout(width: number, height: number): AgentChatLayoutTokens {
  return isLandscapeHero(width, height) ? L_LANDSCAPE : L_VERTICAL;
}

function staggerSegmentStyle(
  t: number,
  segmentIndex: number,
  total: number,
): { opacity: number; transform: string } {
  if (t < AGENT_LOCAL.staggerStart) {
    return { opacity: 0, transform: "translateY(12px)" };
  }
  const span = (AGENT_LOCAL.staggerEnd - AGENT_LOCAL.staggerStart) / total;
  const start = AGENT_LOCAL.staggerStart + segmentIndex * span;
  const end = start + Math.min(5, span * 0.65);
  const opacity = interpolate(t, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(t, [start, end], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return { opacity, transform: `translateY(${y}px)` };
}

const linkUrlStyle: CSSProperties = {
  color: "#60a5fa",
  textDecoration: "underline",
  textDecorationColor: "rgba(96, 165, 250, 0.85)",
  textUnderlineOffset: 5,
  fontWeight: 500,
};

function renderAgentSegment(text: string, listingLink: string) {
  if (text.startsWith("Link:") && text.includes(listingLink)) {
    return (
      <>
        <span>Link: </span>
        <a href={listingLink} style={linkUrlStyle}>
          {listingLink}
        </a>
      </>
    );
  }
  return text;
}

type TurnProps = {
  t: number;
  userMessage: string;
  segments: readonly string[];
  listingLink: string;
  fps: number;
  L: AgentChatLayoutTokens;
};

function ConversationTurn({ t, userMessage, segments, listingLink, fps, L }: TurnProps) {
  const userSpringFrame = Math.max(0, t - AGENT_LOCAL.userBubble);
  const userPop = spring({
    frame: userSpringFrame,
    fps: fps ?? FPS,
    config: SPRING_CONFIG,
  });
  const userTranslateY = interpolate(userPop, [0, 1], [40, 0]);
  const userScale = interpolate(userPop, [0, 1], [0.88, 1]);
  const userOpacity =
    t < AGENT_LOCAL.userBubble ? 0 : interpolate(userPop, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const showTyping = t >= AGENT_LOCAL.typingStart && t < AGENT_LOCAL.typingEnd;

  const aiSpringFrame = Math.max(0, t - AGENT_LOCAL.aiBubble);
  const aiPop = spring({
    frame: aiSpringFrame,
    fps: fps ?? FPS,
    config: SPRING_CONFIG,
  });
  const aiTranslateY = interpolate(aiPop, [0, 1], [32, 0]);
  const aiScale = interpolate(aiPop, [0, 1], [0.94, 1]);
  const aiShellOpacity =
    t < AGENT_LOCAL.aiBubble ? 0 : interpolate(aiPop, [0, 1], [0, 1], { extrapolateRight: "clamp" });

  const n = segments.length;

  return (
    <>
      {t >= AGENT_LOCAL.userBubble && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            className="max-w-[85%] text-white shadow-lg"
            style={{
              maxWidth: "85%",
              opacity: userOpacity,
              transform: `translateY(${userTranslateY}px) scale(${userScale})`,
              background: "linear-gradient(to bottom right, #059669, #047857)",
              borderRadius: `${L.radiusBubble}px ${L.radiusBubble}px 6px ${L.radiusBubble}px`,
              padding: L.bubblePad,
              fontSize: L.bodySize,
              lineHeight: L.bodyLineHeight,
              color: "#fff",
              boxShadow: L.shadowBubble,
            }}
          >
            {userMessage}
          </div>
        </div>
      )}

      {showTyping && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderRadius: `${L.radiusBubble}px ${L.radiusBubble}px ${L.radiusBubble}px 6px`,
              border: "1px solid rgba(52, 211, 153, 0.35)",
              padding: `${L.typingPadY}px ${L.typingPadX}px`,
              background:
                "linear-gradient(145deg, rgba(45, 55, 52, 0.95) 0%, rgba(28, 35, 33, 0.98) 100%)",
              boxShadow: L.typingShadow,
            }}
          >
            <span
              style={{
                fontSize: L.typingLabelSize,
                fontWeight: 600,
                color: "#f5f5f5",
                letterSpacing: "0.02em",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
              }}
            >
              Escribiendo
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }} aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: L.dot,
                    height: L.dot,
                    borderRadius: 9999,
                    backgroundColor: "#34d399",
                    boxShadow: "0 0 10px rgba(52, 211, 153, 0.65)",
                    transform: `translateY(${Math.sin(t * 0.55 + i * 1.1) * 7}px) scale(${0.85 + Math.sin(t * 0.55 + i * 1.1) * 0.12})`,
                  }}
                />
              ))}
            </span>
          </div>
        </div>
      )}

      {t >= AGENT_LOCAL.aiBubble && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            className="flex max-w-[90%] flex-col self-start rounded-2xl rounded-tl-sm border border-white/5"
            style={{
              display: "flex",
              maxWidth: "90%",
              flexDirection: "column",
              gap: 12,
              alignSelf: "flex-start",
              borderRadius: `${L.radiusBubble}px ${L.radiusBubble}px ${L.radiusBubble}px 6px`,
              border: "1px solid rgba(255, 255, 255, 0.05)",
              padding: L.bubblePad,
              fontSize: L.bodySize,
              lineHeight: L.bodyLineHeight,
              opacity: aiShellOpacity,
              transform: `translateY(${aiTranslateY}px) scale(${aiScale})`,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "#e5e5e5",
            }}
          >
            {segments.map((text, i) => {
              const st = staggerSegmentStyle(t, i, n);
              return (
                <p key={i} className="whitespace-pre-wrap" style={{ ...st, letterSpacing: "-0.01em" }}>
                  {renderAgentSegment(text, listingLink)}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export function AgentChatScene({ frameOffset = 0 }: Props) {
  const frame = useCurrentFrame() + frameOffset;
  const { fps, width, height } = useVideoConfig();
  const L = getAgentChatLayout(width, height);
  const local = localFrameFromGlobal(frame);
  const turn = agentConversationTurnLocal(local);

  const cardOpacity =
    local < 0
      ? 0
      : interpolate(local, [AGENT_LOCAL.cardEnterStart, AGENT_LOCAL.cardEnterEnd], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

  const cardScale =
    local < 0
      ? 0.95
      : interpolate(
          local,
          [AGENT_LOCAL.cardEnterStart, AGENT_LOCAL.cardEnterEnd],
          [0.95, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          },
        );

  return (
    <AbsoluteFill
      className="flex items-center justify-center"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        fontFamily: inter.fontFamily,
      }}
    >
      <Html5Audio src={staticFile("acto-B.mp3")} />
      <div
        className="flex flex-col overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl"
        style={{
          display: "flex",
          width: L.cardWidth,
          maxWidth: "96%",
          maxHeight: L.cardMaxHeight ?? undefined,
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: L.radiusCard,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          backgroundColor: "rgba(23, 23, 23, 0.88)",
          boxShadow: L.shadowCard,
        }}
      >
        <header
          className="flex items-center border-b border-white/10"
          style={{
            display: "flex",
            alignItems: "center",
            height: L.headerH,
            paddingLeft: L.headerPadX,
            paddingRight: L.headerPadX,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
          }}
        >
          <Sparkles
            className="mr-3 shrink-0 text-emerald-400"
            width={L.icon}
            height={L.icon}
            strokeWidth={2}
            aria-hidden
          />
          <span
            className="font-medium text-white"
            style={{ fontSize: L.titleSize, letterSpacing: "-0.02em" }}
          >
            {AGENT_CHAT_HEADER_TITLE}
          </span>
        </header>

        <div
          className="flex flex-col"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: L.areaGap,
            minHeight: L.areaMinH,
            flex: L.cardMaxHeight != null ? 1 : undefined,
            minWidth: 0,
            padding: L.areaPad,
            position: "relative",
            overflow: L.cardMaxHeight != null ? "auto" : undefined,
          }}
        >
          {turn === null ? (
            // Hueco breve entre conversación 1 y 2 (misma tarjeta, mensajes limpios).
            <div style={{ minHeight: 48 }} aria-hidden />
          ) : turn.turn === 1 ? (
            <ConversationTurn
              t={turn.t}
              fps={fps ?? FPS}
              L={L}
              userMessage={AGENT_USER_MESSAGE}
              segments={AGENT_AI_SEGMENTS}
              listingLink={AGENT_LISTING_LINK}
            />
          ) : (
            <ConversationTurn
              t={turn.t}
              fps={fps ?? FPS}
              L={L}
              userMessage={AGENT2_USER_MESSAGE}
              segments={AGENT2_AI_SEGMENTS}
              listingLink={AGENT2_LISTING_LINK}
            />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}
