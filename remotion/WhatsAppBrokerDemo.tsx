import { AbsoluteFill } from "remotion";
import { IphoneWhatsAppScene } from "./IphoneWhatsAppScene";
import "./fonts";

/** Solo Acto B; alinear `frameOffset` con `FRAMES.actoB.start` en timeline.ts. */
export function WhatsAppBrokerDemo() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <IphoneWhatsAppScene frameOffset={243} />
    </AbsoluteFill>
  );
}
