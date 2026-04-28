import { AbsoluteFill } from "remotion";
import { IphoneWhatsAppSceneCloseUp } from "./IphoneWhatsAppSceneCloseUp";
import "./fonts";

/** Solo Acto B (close-up); mismo `frameOffset` que `WhatsAppBrokerDemo`. */
export function WhatsAppBrokerDemoCloseUp() {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <IphoneWhatsAppSceneCloseUp frameOffset={243} />
    </AbsoluteFill>
  );
}
