import { heroActo } from "./fonts";
import {
  ATRIO_FRAME_BG,
  COPY_ATRIO_MVP,
  act0IntroPartOpacity,
  act0IntroPartTranslateY,
} from "./timeline-atrio-mvp-web";

type Props = { frame: number };
const FG = "#0F0E0C";

const PARTS = [
  { id: 1 as const, text: COPY_ATRIO_MVP.act0Intro1, fontSize: 56 },
  { id: 2 as const, text: COPY_ATRIO_MVP.act0Intro2, fontSize: 52 },
  { id: 3 as const, text: COPY_ATRIO_MVP.act0Intro3, fontSize: 44 },
] as const;

/** Acto 0: tres frases con crossfade y leve slide (intro al flujo MVP). */
export function Acto0AtrioMvp({ frame }: Props) {
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
      {PARTS.map(({ id, text, fontSize }) => {
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
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 100,
              paddingRight: 100,
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            <h1
              style={{
                fontFamily: heroActo.fontFamily,
                fontWeight: 300,
                fontSize,
                color: FG,
                lineHeight: 1.18,
                maxWidth: 1400,
                textAlign: "center",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {text}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
