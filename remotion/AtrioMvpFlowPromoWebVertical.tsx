import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Acto0AtrioMvpVertical } from "./Acto0AtrioMvpVertical";
import { Acto5AtrioCtaVertical } from "./Acto5AtrioCtaVertical";
import { IphoneWhatsAppSceneAtrioVertical } from "./IphoneWhatsAppSceneAtrioVertical";
import { MvpWebMockProVertical } from "./MvpWebMockProVertical";
import {
  ATRIO_FRAME_BG,
  ATRIO_MVP_WEB_VERTICAL,
  GLOBAL,
  crossfadeOpacity,
} from "./timeline-atrio-mvp-web";

const FADE = 18;
const WEB_FADE = 22;

/**
 * Misma línea de tiempo y escenas que `AtrioMvpFlowPromoWeb`, en **1080×1920 (9:16)**.
 * `public/audio/1-try.mp3` — reemplazá el archivo a medida que alargas la locución; dura
 * todo el video (`durationInFrames` = composición). Si el MP3 es más corto, el final queda
 * en silencio en el render hasta que subas un archivo más largo.
 * Música de fondo: `public/audio-1.mp3` en bucle, volumen bajo bajo la voz.
 */
const BGM_VOLUME_VERTICAL = 0.22;

export function AtrioMvpFlowPromoWebVertical() {
  const f = useCurrentFrame();

  const act0Op = crossfadeOpacity(f, GLOBAL.act0, FADE);
  const phone1Op = crossfadeOpacity(f, GLOBAL.phone1, FADE);
  const webOp = crossfadeOpacity(
    f,
    { start: GLOBAL.webBroker.start - 16, end: GLOBAL.webCitasHero.end },
    WEB_FADE,
  );

  const ctaOp = crossfadeOpacity(f, GLOBAL.cta, 24);

  const D = ATRIO_MVP_WEB_VERTICAL.durationInFrames;

  return (
    <AbsoluteFill
      style={{
        width: ATRIO_MVP_WEB_VERTICAL.width,
        height: ATRIO_MVP_WEB_VERTICAL.height,
        backgroundColor: ATRIO_FRAME_BG,
      }}
    >
      <Sequence
        from={0}
        durationInFrames={D}
        layout="none"
        name="Vídeo 9:16 + locución (1-try.mp3)"
      >
        <Audio
          src={staticFile("audio-1.mp3")}
          volume={BGM_VOLUME_VERTICAL}
          loop
          name="Música fondo (audio-1.mp3)"
        />
        <Audio src={staticFile("audio/1-try.mp3")} />
        {act0Op > 0 && (
          <AbsoluteFill style={{ opacity: act0Op, zIndex: 1 }}>
            <Acto0AtrioMvpVertical frame={f} />
          </AbsoluteFill>
        )}

        {phone1Op > 0 && (
          <AbsoluteFill style={{ opacity: phone1Op, zIndex: 2 }}>
            <IphoneWhatsAppSceneAtrioVertical frameOffset={-GLOBAL.phone1.start} />
          </AbsoluteFill>
        )}

        {webOp > 0 && (
          <AbsoluteFill style={{ opacity: webOp, zIndex: 3 }}>
            <MvpWebMockProVertical globalFrame={f} />
          </AbsoluteFill>
        )}

        {ctaOp > 0 && (
          <AbsoluteFill style={{ opacity: ctaOp, zIndex: 6 }}>
            <Acto5AtrioCtaVertical frame={f - GLOBAL.cta.start} />
          </AbsoluteFill>
        )}
      </Sequence>
    </AbsoluteFill>
  );
}
