import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { heroActo } from "./fonts";
import { isLandscapeHero } from "./timeline";

const SUBTITLE_DELAY_FRAMES = 20;

const stylesVertical = {
  title: {
    color: "#ffffff",
    fontSize: 44,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    textAlign: "center" as const,
    maxWidth: 896,
    lineHeight: 1.15,
    textWrap: "balance" as const,
  },
  subtitle: {
    color: "#a3a3a3",
    fontSize: 28,
    fontWeight: 400,
    marginTop: 24,
    textAlign: "center" as const,
    maxWidth: 672,
    lineHeight: 1.35,
    textWrap: "balance" as const,
  },
  footer: {
    color: "#a3a3a3",
    fontSize: 15,
    fontWeight: 400,
    marginTop: 32,
    textAlign: "center" as const,
  },
  padding: 32,
} as const;

const stylesLandscape = {
  title: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    textAlign: "center" as const,
    maxWidth: 1040,
    lineHeight: 1.15,
    textWrap: "balance" as const,
  },
  subtitle: {
    color: "#a3a3a3",
    fontSize: 22,
    fontWeight: 400,
    marginTop: 18,
    textAlign: "center" as const,
    maxWidth: 900,
    lineHeight: 1.35,
    textWrap: "balance" as const,
  },
  footer: {
    color: "#a3a3a3",
    fontSize: 14,
    fontWeight: 400,
    marginTop: 24,
    textAlign: "center" as const,
  },
  padding: 28,
} as const;

function useSpringUpFade(frame: number, fps: number) {
  const t = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.55, stiffness: 120 },
  });
  const opacity = interpolate(t, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(t, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, translateY };
}

function FooterLine({
  text,
  fromFrame,
  footerStyle,
}: {
  text: string;
  fromFrame: number;
  footerStyle: CSSProperties;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const footerAnim = useSpringUpFade(Math.max(0, frame - fromFrame), fps);
  return (
    <div
      style={{
        fontFamily: heroActo.fontFamily,
        ...footerStyle,
        opacity: footerAnim.opacity,
        transform: `translateY(${footerAnim.translateY}px)`,
      }}
    >
      {text}
    </div>
  );
}

type Props = {
  title?: string;
  subtitle?: string;
  footer?: string;
  footerFromFrame?: number;
};

export function AnimatedTextScene({
  title = "",
  subtitle = "",
  footer,
  footerFromFrame = 60,
}: Props) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const landscape = isLandscapeHero(width, height);
  const styles = landscape ? stylesLandscape : stylesVertical;

  const hasTitle = title.trim().length > 0;
  const hasSubtitle = subtitle.trim().length > 0;

  const titleAnim = useSpringUpFade(frame, fps);
  const subDelayedAnim = useSpringUpFade(Math.max(0, frame - SUBTITLE_DELAY_FRAMES), fps);
  const subPrimaryAnim = useSpringUpFade(frame, fps);
  const subAnim = hasTitle ? subDelayedAnim : subPrimaryAnim;

  const subtitleStyle = {
    fontFamily: heroActo.fontFamily,
    ...styles.subtitle,
    ...(hasTitle ? {} : { marginTop: 0 }),
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: styles.padding,
        boxSizing: "border-box",
      }}
    >
      {hasTitle ? (
        <div
          style={{
            fontFamily: heroActo.fontFamily,
            ...styles.title,
            opacity: titleAnim.opacity,
            transform: `translateY(${titleAnim.translateY}px)`,
          }}
        >
          {title}
        </div>
      ) : null}
      {hasSubtitle ? (
        <div
          style={{
            ...subtitleStyle,
            opacity: subAnim.opacity,
            transform: `translateY(${subAnim.translateY}px)`,
          }}
        >
          {subtitle}
        </div>
      ) : null}
      {footer ? (
        <FooterLine text={footer} fromFrame={footerFromFrame} footerStyle={styles.footer} />
      ) : null}
    </AbsoluteFill>
  );
}
