import { Easing, interpolate, spring, useVideoConfig } from "remotion";
import { heroActo } from "./fonts";
import { ATRIO_FRAME_BG } from "./timeline-atrio-mvp-web";

type Props = { frame: number };

/**
 * CTA final — modo claro (Atrio Cal = `ATRIO_FRAME_BG`, misma base que la landing).
 * Tokens: `src/app/globals.css` :root (negro Atrio + opacidades sobre claro).
 */
const ATRIO_BLACK = "#0f0e0c";
const FG_BODY = "rgb(15 14 12 / 65%)";
const FG_TERTIARY = "rgb(15 14 12 / 45%)";
const LOGO = "rgb(15 14 12 / 50%)";
const BORDER_SUBTLE = "rgb(15 14 12 / 12%)";
const SURFACE_CARD = "rgb(255 255 255 / 85%)";
const TITLE_GRAD_END = "rgb(55 52 48)";

/**
 * Fondo claro + contraste WCAG-friendly. `frame` = local a la fase CTA.
 */
export function Acto5AtrioCta({ frame: tFrame }: Props) {
  const { fps } = useVideoConfig();

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: ATRIO_FRAME_BG,
        fontFamily: heroActo.fontFamily,
        WebkitFontSmoothing: "antialiased",
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
          maxWidth: 1120,
          flexDirection: "column",
          alignItems: "center",
          padding: "0 32px 80px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: 32,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: LOGO,
            ...logo,
          }}
        >
          atrio
        </div>
        <h1
          style={{
            margin: "0 0 24px 0",
            maxWidth: 1000,
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            textAlign: "center",
            backgroundImage: `linear-gradient(92deg, ${ATRIO_BLACK} 0%, ${TITLE_GRAD_END} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textWrap: "balance",
            ...title,
          }}
        >
          Sé uno de los 50 Fundadores.
        </h1>
        <p
          style={{
            margin: "0 0 48px 0",
            maxWidth: 768,
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.65,
            color: FG_BODY,
            textWrap: "balance",
            ...subtitle,
          }}
        >
          Únete a nuestra red privada. Accede al piloto exclusivo sin costo y asegura
          una tarifa preferencial de por vida.
        </p>
        <p
          style={{
            margin: "0 0 12px 0",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: FG_TERTIARY,
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
            padding: "16px 32px",
            borderRadius: 9999,
            border: `1px solid ${BORDER_SUBTLE}`,
            background: SURFACE_CARD,
            boxShadow: "0 4px 28px rgb(15 14 12 / 7%)",
            opacity: urlOp,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: ATRIO_BLACK,
            }}
          >
            useatrio.com
          </span>
        </div>
      </div>
    </div>
  );
}
