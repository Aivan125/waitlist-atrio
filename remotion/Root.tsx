import { AbsoluteFill, Composition } from "remotion";
import { AtrioMvpFlowPromoWeb } from "./AtrioMvpFlowPromoWeb";
import { ClientExperienceScene, CLIENT_EXPERIENCE_DURATION } from "./ClientExperienceScene";
import { BrokerNetworkPromo } from "./BrokerNetworkPromo";
import { BrokerNetworkPromoAgentChat } from "./BrokerNetworkPromoAgentChat";
import { BrokerNetworkPromoCloseUp } from "./BrokerNetworkPromoCloseUp";
import { WhatsAppBrokerDemo } from "./WhatsAppBrokerDemo";
import { WhatsAppBrokerDemoCloseUp } from "./WhatsAppBrokerDemoCloseUp";
import {
  DURATION_FRAMES,
  FPS,
  HEIGHT,
  HEIGHT_HERO_LANDSCAPE,
  WIDTH,
  WIDTH_HERO_LANDSCAPE,
} from "./timeline";
import {
  ATRIO_FRAME_BG,
  ATRIO_MVP_WEB,
  ATRIO_MVP_WEB_VERTICAL,
} from "./timeline-atrio-mvp-web";
import { AtrioMvpFlowPromoWebVertical } from "./AtrioMvpFlowPromoWebVertical";

function ClientExperienceOnly() {
  return (
    <AbsoluteFill style={{ backgroundColor: ATRIO_FRAME_BG }}>
      <ClientExperienceScene globalStartFrame={0} />
    </AbsoluteFill>
  );
}

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AtrioMvpFlowPromoWeb"
        component={AtrioMvpFlowPromoWeb}
        durationInFrames={ATRIO_MVP_WEB.durationInFrames}
        fps={ATRIO_MVP_WEB.fps}
        width={ATRIO_MVP_WEB.width}
        height={ATRIO_MVP_WEB.height}
        defaultProps={{}}
      />
      <Composition
        id="AtrioMvpFlowPromoWebVertical"
        component={AtrioMvpFlowPromoWebVertical}
        durationInFrames={ATRIO_MVP_WEB_VERTICAL.durationInFrames}
        fps={ATRIO_MVP_WEB_VERTICAL.fps}
        width={ATRIO_MVP_WEB_VERTICAL.width}
        height={ATRIO_MVP_WEB_VERTICAL.height}
        defaultProps={{}}
      />
      <Composition
        id="ClientExperienceScene"
        component={ClientExperienceOnly}
        durationInFrames={CLIENT_EXPERIENCE_DURATION}
        fps={ATRIO_MVP_WEB.fps}
        width={ATRIO_MVP_WEB.width}
        height={ATRIO_MVP_WEB.height}
        defaultProps={{}}
      />
      <Composition
        id="BrokerNetworkPromo"
        component={BrokerNetworkPromo}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="BrokerNetworkPromoAgentChat"
        component={BrokerNetworkPromoAgentChat}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="BrokerNetworkPromoAgentChat720p"
        component={BrokerNetworkPromoAgentChat}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH_HERO_LANDSCAPE}
        height={HEIGHT_HERO_LANDSCAPE}
        defaultProps={{}}
      />
      <Composition
        id="WhatsAppBrokerDemo"
        component={WhatsAppBrokerDemo}
        durationInFrames={386}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="BrokerNetworkPromoCloseUp"
        component={BrokerNetworkPromoCloseUp}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
      <Composition
        id="WhatsAppBrokerDemoCloseUp"
        component={WhatsAppBrokerDemoCloseUp}
        durationInFrames={386}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
}
