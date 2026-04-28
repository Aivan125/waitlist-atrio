import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, WhatsAppPhoneBody } from "./WhatsAppPhoneBody";

const DEFAULT_LAYOUT = {
  extraGroupScale: 1,
  fontScale: 1,
  groupTranslateExtraY: 0,
  transformOrigin: "50% 50%" as const,
  rootOverflowHidden: false,
};

type Props = { frameOffset?: number };

export function IphoneWhatsAppScene({ frameOffset = 0 }: Props) {
  const frame = useCurrentFrame() + frameOffset;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.canvas,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WhatsAppPhoneBody frame={frame} {...DEFAULT_LAYOUT} />
    </AbsoluteFill>
  );
}
