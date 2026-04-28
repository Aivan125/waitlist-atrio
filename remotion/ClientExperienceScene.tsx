import { Bath, Bed, CheckCircle, Heart, Maximize, X } from "lucide-react";
import type { CSSProperties } from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useAtrioMvpPhoneFrameScale } from "./atrioMvpPhoneFrameScale";

const font =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

const WHATS_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

const CLIENT_PROPERTY = {
  price: "$7,800,000 MXN",
  title: "Valle Vista 4-B, San Pedro",
  image:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
} as const;

/** @ 30 fps: notificación + app swipe + éxito (+1 s hold en pantalla de éxito). */
export const CLIENT_EXPERIENCE_DURATION = 330;

const T_NOTIF_IN = 10;
const T_NOTIF_FADE = 100;
const T_NOTIF_END = 115;
const T_APP_START = 120;
const T_HEART_TAP = 165;
/** Tras "Me interesa" la tarjeta vuela fuera. */
const T_FLY_START = 168;
const T_SUCCESS = 200;

const BASE_W = 375;
const BASE_H = 812;

const SPRING_IN = { damping: 16, stiffness: 200, mass: 0.9 } as const;
const iconRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  fontSize: 14,
  color: "rgb(255 255 255 / 0.85)",
  alignItems: "center",
};

const blue = "rgb(59 130 246)";

type Props = { globalStartFrame: number };

/**
 * App cliente estilo Tinder: solo like → selección enviada (sin calendario in-app).
 */
export function ClientExperienceScene({ globalStartFrame }: Props) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneScale = useAtrioMvpPhoneFrameScale();

  const t = Math.max(0, frame - globalStartFrame);

  const notifY =
    t < T_NOTIF_IN
      ? -200
      : spring({
          frame: Math.max(0, t - T_NOTIF_IN),
          fps,
          config: { damping: 18, stiffness: 200, mass: 0.65 },
        }) * 200 -
        200;
  const notifOp = interpolate(
    t,
    [T_NOTIF_FADE, T_NOTIF_END + 0.1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const notifScale = interpolate(
    t,
    [T_NOTIF_FADE, T_NOTIF_FADE + 4, T_NOTIF_END],
    [1, 0.95, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const showNotif = t >= T_NOTIF_IN && t < T_NOTIF_END + 0.1 && notifOp > 0.001;

  const showTinderApp = t >= T_APP_START && t < T_SUCCESS;
  const showActionButtons = t < T_FLY_START;
  const isFlying = t >= T_FLY_START && t < T_SUCCESS;

  const cardEnter = spring({
    frame: Math.max(0, t - T_APP_START),
    fps,
    config: SPRING_IN,
  });
  const cardY = interpolate(cardEnter, [0, 1], [28, 0]);
  const cardOp = interpolate(
    t,
    [T_APP_START, T_APP_START + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const heartTap = interpolate(
    t,
    [T_HEART_TAP, T_HEART_TAP + 2, T_HEART_TAP + 8],
    [1, 0.88, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const flyP = interpolate(
    t,
    [T_FLY_START, T_SUCCESS],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const flyX = flyP * 320;
  const flyY = flyP * -720;
  const flyRot = flyP * 14;
  const flyScale = 1 - flyP * 0.2;
  const flyOp = 1 - flyP;

  const successOp = interpolate(
    t,
    [T_SUCCESS, T_SUCCESS + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const successY2 = interpolate(
    t,
    [T_SUCCESS, T_SUCCESS + 18],
    [12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const lockOp =
    t < T_APP_START - 8
      ? 1
      : interpolate(
          t,
          [T_APP_START - 8, T_APP_START],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 520,
          height: 880,
          maxWidth: "90vw",
          maxHeight: "90vh",
          marginLeft: -260,
          marginTop: -440,
          borderRadius: 48,
          background: "rgb(59 130 246 / 0.22)",
          filter: "blur(64px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: BASE_W,
          minWidth: BASE_W,
          height: BASE_H,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 40,
          border: "8px solid #171717",
          backgroundColor: "#0a0a0a",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)",
          fontFamily: font,
          transform: `scale(${phoneScale})`,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background: "#050508",
              opacity: t < T_APP_START ? lockOp : 0,
            }}
          />

          {showNotif && (
            <div
              style={{
                position: "absolute",
                zIndex: 5,
                left: "5%",
                width: "90%",
                top: 16,
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 12,
                padding: 16,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(38, 38, 38, 0.92)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                transform: `translateY(${notifY}px) scale(${notifScale * notifOp})`,
                opacity: notifOp * notifScale,
              }}
            >
              <img
                src={WHATS_URL}
                alt=""
                width={40}
                height={40}
                style={{ width: 40, height: 40, flexShrink: 0 }}
                draggable={false}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                  Atrio
                </div>
                <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "#d4d4d4" }}>
                  Tu broker Juan seleccionó 2 propiedades para ti.
                </p>
              </div>
            </div>
          )}

          {showTinderApp && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                display: "flex",
                minHeight: 0,
                flexDirection: "column",
                opacity: cardOp,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  padding: "20px 16px 8px 16px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 4px 0",
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: blue,
                  }}
                >
                  PARA TI
                </p>
                <h1
                  style={{
                    margin: 0,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Elegir propiedad
                </h1>
              </div>
              <div
                style={{
                  position: "relative",
                  marginLeft: 12,
                  marginRight: 12,
                  marginBottom: 4,
                  minHeight: 0,
                  flex: 1,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 24,
                    overflow: isFlying ? "visible" : "hidden",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.4)",
                    opacity: Math.min(1, cardOp) * (isFlying ? flyOp : 1),
                    transform: isFlying
                      ? `translateX(${flyX}px) translateY(${flyY}px) rotate(${flyRot}deg) scale(${flyScale})`
                      : "none",
                    transformOrigin: "50% 80%",
                  }}
                >
                  <img
                    src={CLIENT_PROPERTY.image}
                    alt=""
                    draggable={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      boxSizing: "border-box",
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: "#fff",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {CLIENT_PROPERTY.price}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgb(255 255 255 / 0.9)",
                      }}
                    >
                      {CLIENT_PROPERTY.title}
                    </p>
                    <div style={iconRow}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Bed size={16} color="#e5e5e5" strokeWidth={2} />
                        3 Rec
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Bath size={16} color="#e5e5e5" strokeWidth={2} />
                        3.5
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <Maximize size={16} color="#e5e5e5" strokeWidth={2} />
                        320 m²
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {showActionButtons && (
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "4px 12px 24px 12px",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      display: "flex",
                      height: 48,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 16,
                      border: "1px solid #525252",
                      background: "#262626",
                      color: "#f43f5e",
                      cursor: "default",
                      fontFamily: font,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <X size={22} strokeWidth={2.5} />
                    Descartar
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      display: "flex",
                      height: 48,
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.2)",
                      background: "#e5e5e5",
                      color: "#171717",
                      cursor: "default",
                      fontFamily: font,
                      fontSize: 14,
                      fontWeight: 600,
                      transform: `scale(${heartTap})`,
                    }}
                  >
                    <Heart
                      size={22}
                      color="#e11d48"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={0}
                    />
                    Me interesa
                  </button>
                </div>
              )}
            </div>
          )}

          {t >= T_SUCCESS && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#0a0a0a",
                padding: "0 24px",
                boxSizing: "border-box",
                opacity: successOp,
                transform: `translateY(${successY2}px)`,
              }}
            >
              <CheckCircle
                className="mb-4 mx-auto text-emerald-500"
                size={56}
                strokeWidth={1.5}
                aria-hidden
              />
              <h2
                style={{
                  margin: "0 0 8px 0",
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                ¡Selección enviada!
              </h2>
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "#a3a3a3",
                }}
              >
                Tu broker te contactará por WhatsApp para agendar las visitas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
