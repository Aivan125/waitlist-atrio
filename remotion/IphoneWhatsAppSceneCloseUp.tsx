import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, WhatsAppPhoneBody } from "./WhatsAppPhoneBody";

/**
 * Close-up fuerte: el valor anterior (1.18 / 1.1) era demasiado sutil frente a la vista normal.
 * Origen ~40% vertical acerca el zoom al área de burbujas (no al centro geométrico del móvil).
 */
const CLOSE_UP_LAYOUT = {
  extraGroupScale: 1.42,
  fontScale: 1.22,
  /** Positivo baja el mockup y deja aire respecto al borde superior del lienzo. */
  groupTranslateExtraY: 52,
  transformOrigin: "50% 40%" as const,
  rootOverflowHidden: true,
};

type Props = { frameOffset?: number };

export function IphoneWhatsAppSceneCloseUp({ frameOffset = 0 }: Props) {
  const frame = useCurrentFrame() + frameOffset;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.canvas,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <WhatsAppPhoneBody frame={frame} {...CLOSE_UP_LAYOUT} />
    </AbsoluteFill>
  );
}
