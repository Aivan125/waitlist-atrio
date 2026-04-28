/**
 * Segundo tramo — notificación en el mismo formato panorámico que AtrioMvpWideChatScene.
 */
import { Sparkles } from "lucide-react";
import { AbsoluteFill, Easing, interpolate, useVideoConfig } from "remotion";
import { getAtrioWideChatLayout } from "./AtrioMvpWideChatScene";
import { ATRIO_FRAME_BG, COPY_ATRIO_MVP } from "./timeline-atrio-mvp-web";
import { inter } from "./fonts";

const LINES = COPY_ATRIO_MVP.notification.split("\n\n").filter(Boolean);

type Props = { frame: number };

export function AtrioMvpWhatsAppNotification({ frame }: Props) {
  const { width, height } = useVideoConfig();
  const L = getAtrioWideChatLayout(width, height);

  const bubbleEnter = interpolate(frame, [12, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const bubbleY = interpolate(frame, [12, 38], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(frame, [0, 22], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ATRIO_FRAME_BG,
        fontFamily: inter.fontFamily,
      }}
    >
      <div
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
          backgroundColor: "rgba(23, 23, 23, 0.92)",
          boxShadow: L.shadowCard,
        }}
      >
        <header
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
            style={{ marginRight: 12, flexShrink: 0, color: "#34d399" }}
            width={L.icon}
            height={L.icon}
            strokeWidth={2}
            aria-hidden
          />
          <span
            style={{
              fontWeight: 500,
              color: "#fff",
              fontSize: L.titleSize,
              letterSpacing: "-0.02em",
            }}
          >
            Atrio
          </span>
        </header>

        <div
          style={{
            padding: L.areaPad,
            minHeight: L.areaMinH,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "92%",
                borderRadius: `${L.radiusBubble}px ${L.radiusBubble}px ${L.radiusBubble}px 6px`,
                border: "1px solid rgba(255, 255, 255, 0.05)",
                padding: L.bubblePad,
                fontSize: L.bodySize,
                lineHeight: L.bodyLineHeight,
                opacity: bubbleEnter,
                transform: `translateY(${bubbleY}px)`,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#e5e5e5",
                boxShadow: L.shadowBubble,
              }}
            >
              <div
                style={{
                  fontSize: Math.round(L.bodySize * 0.55),
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 10,
                }}
              >
                3:22 p. m.
              </div>
              {LINES.map((line, i) => (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    marginTop: i === 0 ? 0 : 12,
                    whiteSpace: "pre-wrap",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
