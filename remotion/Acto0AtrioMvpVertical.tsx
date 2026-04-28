import { heroActo } from "./fonts";
import {
  ATRIO_FRAME_BG,
  COPY_ATRIO_MVP,
  act0IntroPartOpacity,
  act0IntroPartTranslateY,
} from "./timeline-atrio-mvp-web";

type Props = { frame: number };

const PART_IDS = [1, 2, 3] as const;
const TEXTS = [
  COPY_ATRIO_MVP.act0Intro1,
  COPY_ATRIO_MVP.act0Intro2,
  COPY_ATRIO_MVP.act0Intro3,
] as const;

/** Equivalente a `tracking-tighter` (Tailwind). */
const TRACKING_TIGHTER = "-0.05em";

const introTitleStyle = {
  fontFamily: heroActo.fontFamily,
  fontSize: 100,
  lineHeight: 1.05,
  letterSpacing: TRACKING_TIGHTER,
  fontWeight: 700,
  color: "#1c1c1c",
  textAlign: "center" as const,
  textWrap: "balance" as const,
  margin: 0,
  maxWidth: "100%",
  width: "100%",
};

/**
 * Acto 0 — **solo 9:16**. Tres frases a pantalla; tipografía masiva fija (Remotion: estilos en línea).
 */
export function Acto0AtrioMvpVertical({ frame }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: ATRIO_FRAME_BG,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {PART_IDS.map((id, i) => {
        const opacity = act0IntroPartOpacity(frame, id);
        const y = act0IntroPartTranslateY(frame, id);
        if (opacity < 0.002) return null;
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              marginLeft: "auto",
              marginRight: "auto",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 48,
              paddingRight: 48,
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            <h1 style={introTitleStyle}>{TEXTS[i]}</h1>
          </div>
        );
      })}
    </div>
  );
}
