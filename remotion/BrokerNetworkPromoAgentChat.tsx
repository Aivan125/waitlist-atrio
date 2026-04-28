import {
  AbsoluteFill,
  Html5Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ActoA } from "./ActoA";
import { ActoC } from "./ActoC";
import { AgentChatScene } from "./AgentChatScene";
import {
  opacityActA,
  opacityLayerB,
  opacityLayerC,
  STUDIO_SEQUENCES,
} from "./timeline";
import "./fonts";

export function BrokerNetworkPromoAgentChat() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Html5Audio
        loop
        src={staticFile("audio-1.mp3")}
        volume={0.2}
        name="Música de fondo"
      />
      <Sequence {...STUDIO_SEQUENCES.actoA} name="Acto A — valor">
        <AbsoluteFill style={{ opacity: opacityActA(frame) }}>
          <ActoA />
        </AbsoluteFill>
      </Sequence>
      <Sequence {...STUDIO_SEQUENCES.actoB} name="Acto B — Agent Chat">
        <AbsoluteFill style={{ opacity: opacityLayerB(frame) }}>
          <AgentChatScene frameOffset={STUDIO_SEQUENCES.actoB.from} />
        </AbsoluteFill>
      </Sequence>
      <Sequence {...STUDIO_SEQUENCES.actoC} name="Acto C — CTA">
        <AbsoluteFill style={{ opacity: opacityLayerC(frame) }}>
          <ActoC frameOffset={STUDIO_SEQUENCES.actoC.from} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
