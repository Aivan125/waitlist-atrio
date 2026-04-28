/**
 * Chat Atrio con marco 375×812 estilo WhatsApp dark (misma familia de mock que Tinder),
 * timing `WA_PHASE1` en [timeline-atrio-mvp-web.ts](timeline-atrio-mvp-web.ts).
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

/** Layout panorámico — aún usado por [AtrioMvpWhatsAppNotification.tsx](AtrioMvpWhatsAppNotification.tsx). */
export function getAtrioWideChatLayout(
  width: number,
  height: number,
): AgentChatLayoutTokens {
  const cardWidth = Math.min(1680, width * 0.88);
  const cardMaxHeight = Math.min(980, height * 0.9);
  return {
    cardWidth,
    cardMaxHeight,
    headerH: 58,
    headerPadX: 26,
    icon: 24,
    titleSize: 19,
    bodySize: Math.round(width >= 1900 ? 24 : 22),
    bodyLineHeight: 1.52,
    bubblePad: 22,
    areaMinH: Math.round(height * 0.58),
    areaGap: 18,
    areaPad: 28,
    radiusCard: 24,
    radiusBubble: 20,
    typingPadY: 14,
    typingPadX: 26,
    typingLabelSize: 16,
    dot: 9,
    shadowCard: "0 32px 64px -16px rgba(6, 78, 59, 0.45)",
    shadowBubble: "0 14px 28px -6px rgba(0, 0, 0, 0.35)",
    typingShadow:
      "0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
  };
}

export function AtrioMvpWideChatScene({ frameOffset = 0 }: Props) {
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
