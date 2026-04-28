import { AtrioMvpWideChatSceneVertical } from "./AtrioMvpWideChatSceneVertical";

type Props = { frameOffset?: number };

/** Escena chat Atrio 9:16 — solo para [`AtrioMvpFlowPromoWebVertical`](AtrioMvpFlowPromoWebVertical.tsx). */
export function IphoneWhatsAppSceneAtrioVertical({ frameOffset = 0 }: Props) {
  return <AtrioMvpWideChatSceneVertical frameOffset={frameOffset} />;
}
