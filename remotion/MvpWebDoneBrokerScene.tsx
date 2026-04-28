import { ChevronLeft, Star } from "lucide-react";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { useAtrioMvpPhoneFrameScale } from "./atrioMvpPhoneFrameScale";
import { ATRIO_FRAME_BG } from "./timeline-atrio-mvp-web";

const PHONE_W = 375;
const PHONE_H = 812;
const WA_BG = "#0b141a";
const HEADER_BG = "#1f2c34";
const INCOMING = "#202c33";
const LINK = "#60a5fa";
const fontUi =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

const F = {
  typing1Start: 10,
  typing1End: 39,
  bubble1Start: 40,
  typing2Start: 90,
  typing2End: 119,
  bubble2Start: 120,
} as const;

const SPRING = { damping: 16, stiffness: 200, mass: 0.55 } as const;

type Props = {
  localFrame: number;
  enterY: number;
};

/**
 * **Solo** mock WhatsApp de confirmación al broker. El titular comercial va en
 * [MvpWebCitasHeroScene](MvpWebCitasHeroScene.tsx) (después en timeline).
 * Fase global ~180 f @ 30 fps (animación + lectura breve).
 */
export function MvpWebDoneBrokerScene({ localFrame: lf, enterY }: Props) {
  const { width, height, fps } = useVideoConfig();
  const basePhoneScale = useAtrioMvpPhoneFrameScale();
  const isVertical = height > width;
  const phoneScale = basePhoneScale * (isVertical ? 0.9 : 1);

  const donePop = interpolate(lf, [0, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const doneSlide = interpolate(lf, [0, 36], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const showTyping1 = lf >= F.typing1Start && lf <= F.typing1End;
  const showTyping2 = lf >= F.typing2Start && lf <= F.typing2End;
  const showB1 = lf >= F.bubble1Start;
  const showB2 = lf >= F.bubble2Start;

  const b1M = springMotion(lf, F.bubble1Start, fps);
  const b2M = springMotion(lf, F.bubble2Start, fps);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px 32px",
        backgroundColor: ATRIO_FRAME_BG,
        transform: `translateY(${enterY}px)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100%",
          margin: "auto 0",
          opacity: donePop,
          transform: `translateY(${doneSlide}px) scale(${phoneScale})`,
          transformOrigin: "center center",
        }}
      >
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
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
            fontFamily: fontUi,
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
              }}
            >
              <Star
                size={20}
                color="#fff"
                fill="rgba(255,255,255,0.25)"
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
              gap: 12,
              overflow: "auto",
              backgroundColor: WA_BG,
            }}
          >
            {showTyping1 && <TypingRow lf={lf} />}

            {showB1 && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    maxWidth: "90%",
                    padding: 12,
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    backgroundColor: INCOMING,
                    color: "rgb(229 231 235)",
                    fontSize: 15,
                    lineHeight: 1.375,
                    alignSelf: "flex-start",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    opacity: b1M.o,
                    transform: `translateY(${b1M.y}px) scale(${b1M.s})`,
                    transformOrigin: "0% 100%",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 10 }}>
                    ✅ ¡El cliente ya eligió!
                  </div>
                  <div style={{ fontWeight: 400 }}>
                    Carlos M. marcó 2 propiedades como favoritas.
                  </div>
                </div>
              </div>
            )}

            {showTyping2 && <TypingRow lf={lf} />}

            {showB2 && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    maxWidth: "90%",
                    padding: 12,
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    backgroundColor: INCOMING,
                    color: "rgb(229 231 235)",
                    fontSize: 15,
                    lineHeight: 1.375,
                    alignSelf: "flex-start",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.1)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    opacity: b2M.o,
                    transform: `translateY(${b2M.y}px) scale(${b2M.s})`,
                    transformOrigin: "0% 100%",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 400 }}>
                  Estas son las opciones que aprobó el cliente. Revisa la lista para coordinar las visitas y agendar las citas:
                  </p>
                  <p style={{ margin: "10px 0 0 0", fontWeight: 500 }}>
                    <span
                      style={{
                        color: LINK,
                        textDecoration: "underline",
                        textDecorationColor: "rgba(96, 165, 250, 0.85)",
                      }}
                    >
                      useatrio.com/citas/carlos-m
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingRow({ lf }: { lf: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div
        style={{
          display: "inline-flex",
          width: 64,
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          padding: 12,
          borderRadius: "1rem 1rem 1rem 0.25rem",
          backgroundColor: INCOMING,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 9999,
              backgroundColor: "rgb(203 213 225)",
              transform: `translateY(${Math.sin(lf * 0.55 + i * 1.1) * 2}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function springMotion(
  lf: number,
  start: number,
  fps: number,
): { o: number; y: number; s: number } {
  const t = lf - start;
  if (t < 0) {
    return { o: 0, y: 20, s: 0.9 };
  }
  const p = Math.min(1, spring({ frame: t, fps, config: SPRING }));
  return {
    o: p,
    y: (1 - p) * 20,
    s: 0.9 + 0.1 * p,
  };
}
