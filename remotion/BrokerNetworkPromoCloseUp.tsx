import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ActoA } from "./ActoA";
import { ActoC } from "./ActoC";
import { IphoneWhatsAppSceneCloseUp } from "./IphoneWhatsAppSceneCloseUp";
import { opacityActA, opacityLayerB, opacityLayerC, STUDIO_SEQUENCES } from "./timeline";
import "./fonts";

/** Misma línea temporal que `BrokerNetworkPromo`; Acto B en variante close-up. */
export function BrokerNetworkPromoCloseUp() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Sequence {...STUDIO_SEQUENCES.actoA} name="Acto A — valor">
        <AbsoluteFill style={{ opacity: opacityActA(frame) }}>
          <ActoA />
        </AbsoluteFill>
      </Sequence>
      <Sequence {...STUDIO_SEQUENCES.actoB} name="Acto B — WhatsApp (close-up)">
        <AbsoluteFill style={{ opacity: opacityLayerB(frame) }}>
          <IphoneWhatsAppSceneCloseUp frameOffset={STUDIO_SEQUENCES.actoB.from} />
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
