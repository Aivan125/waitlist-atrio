import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ActoA } from "./ActoA";
import { ActoC } from "./ActoC";
import { IphoneWhatsAppScene } from "./IphoneWhatsAppScene";
import { opacityActA, opacityLayerB, opacityLayerC, STUDIO_SEQUENCES } from "./timeline";
import "./fonts";

export function BrokerNetworkPromo() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence {...STUDIO_SEQUENCES.actoA} name="Acto A — valor">
        <AbsoluteFill style={{ opacity: opacityActA(frame) }}>
          <ActoA />
        </AbsoluteFill>
      </Sequence>
      <Sequence {...STUDIO_SEQUENCES.actoB} name="Acto B — WhatsApp">
        <AbsoluteFill style={{ opacity: opacityLayerB(frame) }}>
          <IphoneWhatsAppScene frameOffset={STUDIO_SEQUENCES.actoB.from} />
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
