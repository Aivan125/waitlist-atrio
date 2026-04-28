import { ChevronLeft, Star } from "lucide-react";
import type { CSSProperties } from "react";
import { spring, useVideoConfig } from "remotion";
import {
  BOT1_LINE_COUNT,
  COPY_ATRIO_MVP,
  WA_PHASE1,
  bot1LineOpacity,
  bot2LineOpacity,
  opacityChatUIAtrio,
} from "./timeline-atrio-mvp-web";

const font =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

const PHONE_W = 375;
const PHONE_H = 812;
const WA_BG = "#0b141a";
const HEADER_BG = "#1f2c34";
const USER_BUBBLE = "#005c4b";
const INCOMING_BUBBLE = "#202c33";
const LINK = "#60a5fa";
const INK = "#e5e5e5";
const MUTED = "rgb(255 255 255 / 0.75)";

const linkStyle: CSSProperties = {
  color: LINK,
  textDecoration: "underline",
  textDecorationColor: "rgba(96, 165, 250, 0.9)",
  textUnderlineOffset: 3,
  fontWeight: 500,
};

const SPRING_CFG = { damping: 16, stiffness: 190, mass: 0.55 } as const;

function bubbleMotion(
  localFrame: number,
  start: number,
  fps: number,
): { o: number; y: number; s: number } {
  const t = localFrame - start;
  if (t < 0) {
    return { o: 0, y: 20, s: 0.9 };
  }
  const p = Math.min(
    1,
    spring({ frame: t, fps, config: SPRING_CFG }),
  );
  return {
    o: p,
    y: (1 - p) * 20,
    s: 0.9 + 0.1 * p,
  };
}

type Props = { localFrame: number };

/**
 * Contenido 375×812 — WhatsApp dark dentro del marco, **frame local** `WA_PHASE1`.
 */
export function AtrioMvpWhatsAppChatPhoneContent({ localFrame: frame }: Props) {
  const { fps } = useVideoConfig();
  const chatUI = opacityChatUIAtrio(frame);

  const showSend = frame >= WA_PHASE1.send.start;
  const typing1 =
    frame >= WA_PHASE1.typing1.start && frame <= WA_PHASE1.typing1.end;
  const typing2 =
    frame >= WA_PHASE1.typing2.start && frame <= WA_PHASE1.typing2.end;
  const showBot1 = frame >= WA_PHASE1.bot1In.start;
  const showBot2 = frame >= WA_PHASE1.bot2In.start;

  const userM = bubbleMotion(frame, WA_PHASE1.userType.start, fps);
  const bot1M = bubbleMotion(frame, WA_PHASE1.bot1In.start, fps);
  const bot2M = bubbleMotion(frame, WA_PHASE1.bot2In.start, fps);

  const type1M = bubbleMotion(frame, WA_PHASE1.typing1.start, fps);
  const type2M = bubbleMotion(frame, WA_PHASE1.typing2.start, fps);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: PHONE_W,
        height: PHONE_H,
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 40,
        border: "8px solid #171717",
        backgroundColor: WA_BG,
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.6)",
        fontFamily: font,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <header
        style={{
          display: "flex",
          height: 96,
          flexShrink: 0,
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 12,
          backgroundColor: HEADER_BG,
          zIndex: 10,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.25)",
        }}
      >
        <button
          type="button"
          aria-label="Atrás"
          style={{
            display: "flex",
            marginRight: 6,
            marginBottom: 2,
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "none",
            padding: 0,
            color: "#a3a3a3",
            cursor: "default",
          }}
        >
          <ChevronLeft size={26} strokeWidth={2} aria-hidden />
        </button>
        <div
          style={{
            display: "flex",
            width: 40,
            height: 40,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
            marginBottom: 0,
            borderRadius: 9999,
            background: "linear-gradient(145deg, #059669, #047857)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <Star
            size={20}
            color="#fff"
            fill="rgba(255,255,255,0.3)"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
        <div style={{ minWidth: 0, marginBottom: 0 }}>
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            Atrio
          </div>
          <div
            style={{
              marginTop: 2,
              fontSize: 12,
              fontWeight: 400,
              color: "#34d399",
            }}
          >
            Agente IA en línea
          </div>
        </div>
      </header>

      <div
        style={{
          display: "flex",
          minHeight: 0,
          flex: 1,
          flexDirection: "column",
          padding: 16,
          paddingBottom: 20,
          gap: 12,
          overflowX: "hidden",
          overflowY: "auto",
          opacity: chatUI,
        }}
      >
        {frame >= WA_PHASE1.userType.start && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: 12,
                borderRadius: "1rem 1rem 0.25rem 1rem",
                backgroundColor: USER_BUBBLE,
                color: "#fff",
                fontSize: 15,
                lineHeight: 1.375,
                boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
                opacity: userM.o,
                transform: `translateY(${userM.y}px) scale(${userM.s})`,
                transformOrigin: "100% 100%",
                alignSelf: "flex-end",
              }}
            >
              <div
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {COPY_ATRIO_MVP.userMessage}
              </div>
              <div
                aria-hidden={!showSend}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 6,
                  minHeight: 16,
                  fontSize: 11,
                  lineHeight: 1.2,
                  color: "rgba(255,255,255,0.65)",
                  alignItems: "center",
                  gap: 4,
                  opacity: showSend ? 1 : 0,
                }}
              >
                <span>2:14 p. m.</span>
                <span style={{ color: "#93c5fd" }}>✓✓</span>
              </div>
            </div>
          </div>
        )}

        {typing1 && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <TypingBubble frame={frame} enter={type1M} />
          </div>
        )}

        {showBot1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: 12,
                borderRadius: "1rem 1rem 1rem 0.25rem",
                backgroundColor: INCOMING_BUBBLE,
                color: INK,
                fontSize: 15,
                lineHeight: 1.375,
                boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
                opacity: bot1M.o,
                transform: `translateY(${bot1M.y}px) scale(${bot1M.s})`,
                transformOrigin: "0% 100%",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: MUTED,
                  marginBottom: 4,
                }}
              >
                2:16 p. m.
              </div>
                {Array.from({ length: BOT1_LINE_COUNT }).map((_, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      opacity: bot1LineOpacity(frame, i),
                    }}
                  >
                    {COPY_ATRIO_MVP.bot1Message}
                  </p>
                ))}
            </div>
          </div>
        )}

        {typing2 && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <TypingBubble frame={frame} enter={type2M} />
          </div>
        )}

        {showBot2 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: 12,
                borderRadius: "1rem 1rem 1rem 0.25rem",
                backgroundColor: INCOMING_BUBBLE,
                color: INK,
                fontSize: 15,
                lineHeight: 1.375,
                boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
                opacity: bot2M.o,
                transform: `translateY(${bot2M.y}px) scale(${bot2M.s})`,
                transformOrigin: "0% 100%",
                alignSelf: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: MUTED,
                }}
              >
                2:17 p. m.
              </div>
              <p
                style={{
                  margin: 0,
                  marginBottom: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  opacity: bot2LineOpacity(frame, 0),
                }}
              >
                {COPY_ATRIO_MVP.bot2Intro}
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 10,
                  opacity: bot2LineOpacity(frame, 1),
                }}
              >
                <a
                  href={`https://${COPY_ATRIO_MVP.linkUrl}`}
                  style={linkStyle}
                >
                  {COPY_ATRIO_MVP.linkUrl}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingBubble({
  frame,
  enter,
}: {
  frame: number;
  enter: { o: number; y: number; s: number };
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        minWidth: 120,
        maxWidth: "85%",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
        padding: "10px 14px",
        borderRadius: "1rem 1rem 1rem 0.25rem",
        backgroundColor: INCOMING_BUBBLE,
        boxShadow: "0 1px 2px rgb(0 0 0 / 0.2)",
        opacity: enter.o,
        transform: `translateY(${enter.y}px) scale(${enter.s})`,
        transformOrigin: "0% 100%",
        alignSelf: "flex-start",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "rgb(203 213 225)",
        }}
      >
        Escribiendo
      </span>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 9999,
            backgroundColor: "rgb(203 213 225)",
            transform: `translateY(${Math.sin(frame * 0.55 + i * 1.1) * 3}px)`,
            opacity: 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(frame * 0.55 + i * 1.1)),
          }}
        />
      ))}
    </div>
  );
}
