import { Easing, interpolate } from "remotion";
import { ClientExperienceScene } from "./ClientExperienceScene";
import { MvpWebBrokerTinderPhone } from "./MvpWebBrokerTinderPhone";
import { MvpWebCitasHeroScene } from "./MvpWebCitasHeroScene";
import { MvpWebDoneBrokerScene } from "./MvpWebDoneBrokerScene";
import { ATRIO_FRAME_BG, GLOBAL } from "./timeline-atrio-mvp-web";

export type MvpWebPhase = "broker" | "client-experience" | "citas-hero" | "done";

const CAL = ATRIO_FRAME_BG;

function phaseForFrame(f: number): MvpWebPhase {
  if (f < GLOBAL.webBroker.start) {
    return "broker";
  }
  if (f >= GLOBAL.webCitasHero.start) {
    return "citas-hero";
  }
  if (f >= GLOBAL.webDone.start) {
    return "done";
  }
  if (f >= GLOBAL.clientExperience.start) {
    return "client-experience";
  }
  return "broker";
}

function localFrameForPhase(f: number, phase: MvpWebPhase): number {
  switch (phase) {
    case "broker":
      return Math.max(0, f - GLOBAL.webBroker.start);
    case "client-experience":
      return f - GLOBAL.clientExperience.start;
    case "citas-hero":
      return f - GLOBAL.webCitasHero.start;
    case "done":
      return f - GLOBAL.webDone.start;
    default:
      return 0;
  }
}

type Props = { globalFrame: number };

export function MvpWebMockPro({ globalFrame }: Props) {
  const phase = phaseForFrame(globalFrame);
  const lf = localFrameForPhase(globalFrame, phase);

  const enterY = interpolate(
    globalFrame,
    [GLOBAL.webBroker.start - 16, GLOBAL.webBroker.start + 35],
    [28, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  if (phase === "broker") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CAL,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${enterY}px)`,
        }}
      >
        <MvpWebBrokerTinderPhone />
      </div>
    );
  }

  if (phase === "client-experience") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: CAL,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClientExperienceScene globalStartFrame={GLOBAL.clientExperience.start} />
      </div>
    );
  }

  if (phase === "done") {
    return <MvpWebDoneBrokerScene localFrame={lf} enterY={0} />;
  }

  return <MvpWebCitasHeroScene localFrame={lf} enterY={0} />;
}
