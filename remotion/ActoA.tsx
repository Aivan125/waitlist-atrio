import { AbsoluteFill, Html5Audio, Sequence, staticFile } from "remotion";
import { AnimatedTextScene } from "./AnimatedTextScene";
import { COPY } from "./timeline";

const SEQ = 90;
const SEQ_SCENE3_TITLE = 50;

export function ActoA() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence durationInFrames={SEQ}>
        <Html5Audio src={staticFile("1-escena.mp3")} />
        <AnimatedTextScene
          title={COPY.actoAScene1Title}
          subtitle={COPY.actoAScene1Subtitle}
        />
      </Sequence>
      <Sequence from={90} durationInFrames={SEQ + SEQ_SCENE3_TITLE}>
        <Html5Audio src={staticFile("2-escena.mp3")} />
        <Sequence durationInFrames={SEQ}>
          <AnimatedTextScene
            title={COPY.actoAScene2Title}
            subtitle={COPY.actoAScene2Subtitle}
          />
        </Sequence>
        <Sequence from={SEQ} durationInFrames={SEQ_SCENE3_TITLE}>
          <AnimatedTextScene title={COPY.actoAScene3Title} subtitle="" />
        </Sequence>
      </Sequence>
    </AbsoluteFill>
  );
}
