import type { CSSProperties } from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";
import { heroActo } from "./fonts";
import { ATRIO_FRAME_BG } from "./timeline-atrio-mvp-web";

/** Equivalentes a `from-emerald-500` / `to-emerald-300` (Tailwind) para el gradiente inline. */
const EMERALD_500 = "#10b981";
const EMERALD_300 = "#6ee7b7";
const NEUTRAL_500 = "#737373";

type Props = {
  localFrame: number;
  enterY: number;
};

const verticalContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: 900,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: 32,
  paddingRight: 32,
  boxSizing: "border-box",
};

const verticalH1: CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: 110,
  lineHeight: 1.05,
  letterSpacing: "-0.05em",
  fontWeight: 800,
};

const verticalLine1: CSSProperties = {
  color: "#1c1c1c",
};

const verticalLine2: CSSProperties = {
  display: "inline-block",
  textAlign: "center",
  color: "transparent",
  backgroundImage: `linear-gradient(to right, ${EMERALD_500}, ${EMERALD_300})`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const verticalSub: CSSProperties = {
  marginTop: 48,
  maxWidth: 800,
  textAlign: "center",
  fontSize: 40,
  fontWeight: 500,
  lineHeight: 1.375,
  color: NEUTRAL_500,
  textWrap: "balance",
};

/**
 * Titular comercial antes del WhatsApp al broker ([MvpWebDoneBrokerScene](MvpWebDoneBrokerScene.tsx)).
 *
 * La rama 9:16 usa solo estilos en línea: el bundler de Remotion no siempre aplica
 * las clases de Tailwind de `remotion.css` (el preview se veía sin tipografía ni gradiente).
 */
export function MvpWebCitasHeroScene({ localFrame: lf, enterY }: Props) {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  const pop = interpolate(lf, [0, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const slide = interpolate(lf, [0, 28], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const titlePx = isVertical ? 48 : 60;
  const subPx = isVertical ? 20 : 24;

  const animStyle: CSSProperties = {
    opacity: pop,
    transform: `translateY(${slide}px)`,
  };

  if (isVertical) {
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
          padding: "32px 0",
          backgroundColor: ATRIO_FRAME_BG,
          transform: `translateY(${enterY}px)`,
          overflow: "hidden",
        }}
      >
        <div style={{ ...verticalContainer, ...animStyle }}>
          <h1 style={{ ...verticalH1, fontFamily: heroActo.fontFamily }}>
            <span style={verticalLine1}>El cliente elige.</span>
            <br />
            <span style={verticalLine2}>Tú cierras.</span>
          </h1>
          <p style={{ ...verticalSub, fontFamily: heroActo.fontFamily }}>
            Deja que la IA filtre. Tú dedícate a vender.
          </p>
        </div>
      </div>
    );
  }

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
        padding: "48px 64px",
        backgroundColor: ATRIO_FRAME_BG,
        transform: `translateY(${enterY}px)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "min(90%, 56rem)",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          ...animStyle,
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: 16,
            fontFamily: heroActo.fontFamily,
            fontWeight: 700,
            fontSize: titlePx,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            textAlign: "center",
            textWrap: "balance",
            maxWidth: "22ch",
          }}
        >
          <span style={{ color: "#1c1c1c" }}>El cliente elige.</span>
          <br />
          <span
            style={{
              backgroundImage:
                "linear-gradient(92deg, #059669 0%, #34d399 55%, #a7f3d0 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Tú cierras.
          </span>
        </h2>
        <p
          style={{
            margin: 0,
            maxWidth: "38ch",
            fontFamily: heroActo.fontFamily,
            fontSize: subPx,
            fontWeight: 500,
            lineHeight: 1.45,
            textAlign: "center",
            textWrap: "balance",
            color: "rgb(82 82 82)",
          }}
        >
          Deja que la IA filtre. Tú dedícate a vender.
        </p>
      </div>
    </div>
  );
}
