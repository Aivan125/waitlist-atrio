import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Acto0AtrioMvp } from "./Acto0AtrioMvp";
import { Acto5AtrioCta } from "./Acto5AtrioCta";
import { IphoneWhatsAppSceneAtrio } from "./IphoneWhatsAppSceneAtrio";
import { MvpWebMockPro } from "./MvpWebMockPro";
import {
  ATRIO_FRAME_BG,
  ATRIO_MVP_WEB,
  GLOBAL,
  crossfadeOpacity,
} from "./timeline-atrio-mvp-web";

const FADE = 18;
const WEB_FADE = 22;

const BGM_VOLUME_LANDSCAPE = 0.32;

export function AtrioMvpFlowPromoWeb() {
  const f = useCurrentFrame();

  const act0Op = crossfadeOpacity(f, GLOBAL.act0, FADE);
  const phone1Op = crossfadeOpacity(f, GLOBAL.phone1, FADE);
  const webOp = crossfadeOpacity(
    f,
    { start: GLOBAL.webBroker.start - 16, end: GLOBAL.webCitasHero.end },
    WEB_FADE,
  );

  const ctaOp = crossfadeOpacity(f, GLOBAL.cta, 24);

  return (
    <AbsoluteFill
      style={{
        width: ATRIO_MVP_WEB.width,
        height: ATRIO_MVP_WEB.height,
        backgroundColor: ATRIO_FRAME_BG,
      }}
    >
      <Sequence
        from={0}
        durationInFrames={ATRIO_MVP_WEB.durationInFrames}
        layout="none"
        name="Música fondo (audio-1.mp3)"
      >
        <Audio
          src={staticFile("audio-1.mp3")}
          volume={BGM_VOLUME_LANDSCAPE}
          loop
        />
      </Sequence>
      {act0Op > 0 && (
        <AbsoluteFill style={{ opacity: act0Op, zIndex: 1 }}>
          <Acto0AtrioMvp frame={f} />
        </AbsoluteFill>
      )}

      {phone1Op > 0 && (
        <AbsoluteFill style={{ opacity: phone1Op, zIndex: 2 }}>
          <IphoneWhatsAppSceneAtrio frameOffset={-GLOBAL.phone1.start} />
        </AbsoluteFill>
      )}

      {webOp > 0 && (
        <AbsoluteFill style={{ opacity: webOp, zIndex: 3 }}>
          <MvpWebMockPro globalFrame={f} />
        </AbsoluteFill>
      )}

      {ctaOp > 0 && (
        <AbsoluteFill style={{ opacity: ctaOp, zIndex: 6 }}>
          <Acto5AtrioCta frame={f - GLOBAL.cta.start} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
