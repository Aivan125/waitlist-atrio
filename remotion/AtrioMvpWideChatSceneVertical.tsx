/**
 * Misma simulación WhatsApp 375×812 que [AtrioMvpWideChatScene.tsx](AtrioMvpWideChatScene.tsx);
 * composición 9:16 — escala vía [useAtrioMvpPhoneFrameScale](atrioMvpPhoneFrameScale.ts).
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import type { AgentChatLayoutTokens } from "./AgentChatScene";
import { useAtrioMvpPhoneFrameScale } from "./atrioMvpPhoneFrameScale";
import { AtrioMvpWhatsAppChatPhoneContent } from "./AtrioMvpWhatsAppChatPhoneContent";
import {
  ATRIO_FRAME_BG,
  opacityPhoneGroupAtrio,
  scalePhoneEnterAtrio,
} from "./timeline-atrio-mvp-web";
import { inter } from "./fonts";

type Props = { frameOffset?: number };

export function getAtrioWideChatLayoutVertical(
  width: number,
  height: number,
): AgentChatLayoutTokens {
  const cardWidth = Math.min(1000, width * 0.94);
  const cardMaxHeight = Math.min(1200, height * 0.76);
  return {
    cardWidth,
    cardMaxHeight,
    headerH: 50,
    headerPadX: 18,
    icon: 20,
    titleSize: 17,
    bodySize: Math.round(width >= 900 ? 17 : 15),
    bodyLineHeight: 1.48,
    bubblePad: 16,
    areaMinH: Math.round(height * 0.36),
    areaGap: 12,
    areaPad: 16,
    radiusCard: 20,
    radiusBubble: 16,
    typingPadY: 12,
    typingPadX: 20,
    typingLabelSize: 14,
    dot: 8,
    shadowCard: "0 24px 48px -12px rgba(6, 78, 59, 0.4)",
    shadowBubble: "0 12px 24px -6px rgba(0, 0, 0, 0.32)",
    typingShadow:
      "0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
  };
}

export function AtrioMvpWideChatSceneVertical({ frameOffset = 0 }: Props) {
  const frame = useCurrentFrame() + frameOffset;
  const phoneScale = useAtrioMvpPhoneFrameScale();
  const cardOpacity = opacityPhoneGroupAtrio(frame);
  const cardScale = scalePhoneEnterAtrio(frame);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ATRIO_FRAME_BG,
        fontFamily: inter.fontFamily,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          opacity: cardOpacity,
          transform: `scale(${phoneScale * cardScale})`,
        }}
      >
        <AtrioMvpWhatsAppChatPhoneContent localFrame={frame} />
      </div>
    </AbsoluteFill>
  );
}
