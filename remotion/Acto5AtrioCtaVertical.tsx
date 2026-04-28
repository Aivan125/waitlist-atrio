import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { heroActo } from "./fonts";
import { ATRIO_FRAME_BG } from "./timeline-atrio-mvp-web";

type Props = { frame: number };
/** Tailwind neutral-500 / 600 / 400 / 200 */
const NEUTRAL_500 = "#737373";
const NEUTRAL_600 = "#525252";
const NEUTRAL_400 = "#a3a3a3";
const NEUTRAL_200 = "#e5e5e5";
const TITLE_FG = "#1c1c1c";

/**
 * CTA final — **solo 9:16**. Tipografía masiva fija (inline; Remotion no siempre aplica Tailwind).
 */
export function Acto5AtrioCtaVertical({ frame: tFrame }: Props) {
  const { height, fps } = useVideoConfig();

  const easeOut = Easing.out(Easing.cubic);
  const dur = 22;

  const el = (delay: number) => {
    const a = interpolate(
      tFrame,
      [delay, delay + dur],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut },
    );
    const y = interpolate(
      tFrame,
      [delay, delay + dur],
      [20, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut },
    );
    return { opacity: a, transform: `translateY(${y}px)` };
  };

  const logo = el(0);
  const title = el(6);
  const subtitle = el(14);
  const ctaIntro = el(24);
  const urlSpring = Math.min(
    1,
    spring({
      frame: Math.max(0, tFrame - 32),
      fps,
      config: { damping: 16, stiffness: 120, mass: 0.8 },
    }),
  );
  const urlY = (1 - urlSpring) * 20;
  const urlOp = urlSpring;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: height,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: ATRIO_FRAME_BG,
        fontFamily: heroActo.fontFamily,
        WebkitFontSmoothing: "antialiased",
        boxSizing: "border-box",
        paddingLeft: 48,
        paddingRight: 48,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 45% at 50% 38%, rgba(15, 14, 12, 0.04) 0%, transparent 55%)",
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          width: "100%",
          maxWidth: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: 32,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: NEUTRAL_500,
            ...logo,
          }}
        >
          ATRIO
        </div>
        <h1
          style={{
            margin: "0 0 40px 0",
            maxWidth: "100%",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.05em",
            textAlign: "center",
            color: TITLE_FG,
            textWrap: "balance",
            ...title,
          }}
        >
          Sé uno de los 50 Fundadores.
        </h1>
        <p
          style={{
            margin: "0 0 80px 0",
            maxWidth: 900,
            width: "100%",
            fontSize: 42,
            fontWeight: 500,
            lineHeight: 1.4,
            color: NEUTRAL_600,
            textAlign: "center",
            textWrap: "balance",
            ...subtitle,
          }}
        >
          Únete a nuestra red privada. Accede al piloto exclusivo sin costo y asegura
          una tarifa preferencial de por vida.
        </p>
        <p
          style={{
            margin: "0 0 24px 0",
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: NEUTRAL_400,
            ...ctaIntro,
          }}
        >
          Solicita tu acceso en:
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 64px",
            borderRadius: 9999,
            border: `1px solid ${NEUTRAL_200}`,
            backgroundColor: "#ffffff",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
            opacity: urlOp,
            transform: `translateY(${urlY}px)`,
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: TITLE_FG,
            }}
          >
            useatrio.com
          </span>
        </div>
      </div>
    </div>
  );
}
