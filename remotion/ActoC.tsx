import {
  AbsoluteFill,
  Html5Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COPY, easeHero, FRAMES, isLandscapeHero } from "./timeline";
import { heroActo } from "./fonts";

type Props = {
  /** Si `ActoC` va dentro de `<Sequence from={…}>`, igualar al `from` del Sequence (frames globales en interpolaciones). */
  frameOffset?: number;
};

export function ActoC({ frameOffset = 0 }: Props) {
  const frame = useCurrentFrame() + frameOffset;
  const { width, height } = useVideoConfig();
  const landscape = isLandscapeHero(width, height);

  const textOpacity = interpolate(
    frame,
    [FRAMES.actoCTextIn.start, FRAMES.actoCTextIn.end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeHero },
  );

  const translateY = interpolate(
    frame,
    [FRAMES.actoCTextIn.start, FRAMES.actoCTextIn.end],
    [8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeHero },
  );

  const padding = landscape
    ? {
        paddingTop: 160,
        paddingLeft: 56,
        paddingRight: 56,
        paddingBottom: 56,
      }
    : {
        paddingTop: 720,
        paddingLeft: 80,
        paddingRight: 80,
        paddingBottom: 120,
      };

  const line1Size = landscape ? 28 : 36;
  const line2Size = landscape ? 20 : 26;
  const lineGap = landscape ? 12 : 16;
  const maxText = landscape ? 1080 : 920;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        justifyContent: "flex-start",
        alignItems: "center",
        ...padding,
        boxSizing: "border-box",
      }}
    >
      <Html5Audio src={staticFile("acto-C.mp3")} />
      <div
        style={{
          fontFamily: heroActo.fontFamily,
          textAlign: "center",
          maxWidth: maxText,
          opacity: textOpacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: line1Size,
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {COPY.actoCLine1}
        </div>
        <div
          style={{
            marginTop: lineGap,
            color: "#AEAEAE",
            fontSize: line2Size,
            fontWeight: 400,
            lineHeight: 1.2,
          }}
        >
          {COPY.actoCLine2}
        </div>
      </div>
    </AbsoluteFill>
  );
}
