import { AtrioMvpWideChatScene } from "./AtrioMvpWideChatScene";

type Props = { frameOffset?: number };

/** Escena chat Atrio 16:9 — layout panorámico (legible), no mock iPhone estrecho. */
export function IphoneWhatsAppSceneAtrio({ frameOffset = 0 }: Props) {
  return <AtrioMvpWideChatScene frameOffset={frameOffset} />;
}
