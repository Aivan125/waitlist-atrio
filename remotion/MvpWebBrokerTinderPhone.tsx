import { Bath, Bed, Check, CheckCircle, Maximize, Send, X } from "lucide-react";
import type { CSSProperties } from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useAtrioMvpPhoneFrameScale } from "./atrioMvpPhoneFrameScale";
import { GLOBAL } from "./timeline-atrio-mvp-web";

const font =
  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";

const PROPERTIES = [
  {
    price: "$7,800,000 MXN",
    title: "Valle Vista 4-B, San Pedro",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
  },
  {
    price: "$12,500,000 MXN",
    title: "Residencia Chipinque",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&auto=format&fit=crop",
  },
  {
    price: "$8,200,000 MXN",
    title: "Loft San Jerónimo",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
  },
] as const;

/** Tiempos locales @ 30 fps (relativo a inicio de fase web broker). */
const T = {
  C1_TAP: 60,
  C1_SWIPE_END: 90,
  C2_TAP: 150,
  C2_SWIPE_END: 180,
  C3_TAP: 240,
  C3_SWIPE_END: 270,
} as const;

/** Último frame en que la 3.ª tarjeta termina la animación de salida (deriva de `T`). */
const FINAL_CARD_EXIT = T.C3_SWIPE_END;
const SUCCESS_START = FINAL_CARD_EXIT + 10;
const CLICK_FRAME = FINAL_CARD_EXIT + 50;
const SENT_AT = CLICK_FRAME + 5;

const BASE_W = 375;
const BASE_H = 812;
const SPRING_IN = { damping: 14, stiffness: 220, mass: 0.85 } as const;

const iconRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  fontSize: 14,
  color: "rgb(255 255 255 / 0.85)",
  alignItems: "center",
};


function tapButtonScale(
  t: number,
  triggerFrame: number,
): number {
  return interpolate(
    t,
    [triggerFrame, triggerFrame + 4, triggerFrame + 12],
    [1, 0.85, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );
}

type CardStyle = {
  x: number;
  r: number;
  s: number;
  o: number;
  z: number;
  draw: boolean;
};

function getCardStyle(i: number, t: number, fps: number): CardStyle {
  if (i === 0) {
    if (t >= T.C1_SWIPE_END) return { x: 0, r: 0, s: 1, o: 0, z: 0, draw: false };
    if (t < T.C1_TAP) {
      return { x: 0, r: 0, s: 1, o: 1, z: 3, draw: true };
    }
    const p = interpolate(
      t,
      [T.C1_TAP, T.C1_SWIPE_END],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return { x: 1000 * p, r: 15 * p, s: 1, o: 1, z: 3, draw: true };
  }
  if (i === 1) {
    if (t < T.C1_TAP) {
      return { x: 0, r: 0, s: 0.9, o: 0.5, z: 1, draw: true };
    }
    if (t < T.C1_SWIPE_END) {
      const fr = t - T.C1_TAP;
      const spr = Math.min(1, spring({ frame: fr, fps, config: SPRING_IN }));
      return {
        x: 0,
        r: 0,
        s: 0.9 + 0.1 * spr,
        o: 0.5 + 0.5 * spr,
        z: 2,
        draw: true,
      };
    }
    if (t < T.C2_TAP) {
      return { x: 0, r: 0, s: 1, o: 1, z: 3, draw: true };
    }
    if (t < T.C2_SWIPE_END) {
      const p = interpolate(
        t,
        [T.C2_TAP, T.C2_SWIPE_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      return { x: -1000 * p, r: -15 * p, s: 1, o: 1, z: 3, draw: true };
    }
    return { x: 0, r: 0, s: 1, o: 0, z: 0, draw: false };
  }
  if (i === 2) {
    if (t < T.C1_SWIPE_END) {
      return { x: 0, r: 0, s: 1, o: 0, z: 0, draw: false };
    }
    if (t < T.C2_TAP) {
      return { x: 0, r: 0, s: 0.9, o: 0.5, z: 1, draw: true };
    }
    if (t < T.C2_SWIPE_END) {
      const fr = t - T.C2_TAP;
      const spr = Math.min(1, spring({ frame: fr, fps, config: SPRING_IN }));
      return {
        x: 0,
        r: 0,
        s: 0.9 + 0.1 * spr,
        o: 0.5 + 0.5 * spr,
        z: 2,
        draw: true,
      };
    }
    if (t < T.C3_TAP) {
      return { x: 0, r: 0, s: 1, o: 1, z: 3, draw: true };
    }
    if (t < T.C3_SWIPE_END) {
      const p = interpolate(
        t,
        [T.C3_TAP, T.C3_SWIPE_END],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      return { x: 1000 * p, r: 15 * p, s: 1, o: 1, z: 3, draw: true };
    }
    return { x: 0, r: 0, s: 1, o: 0, z: 0, draw: false };
  }
  return { x: 0, r: 0, s: 1, o: 0, z: 0, draw: false };
}

function PropertyCardContent({
  price,
  title,
  imageUrl,
}: {
  price: string;
  title: string;
  imageUrl: string;
}) {
  return (
    <>
      <img
        src={imageUrl}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        draggable={false}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 45%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            color: "#ffffff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {price}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 500,
            color: "rgb(255 255 255 / 0.92)",
          }}
        >
          {title}
        </p>
        <div style={iconRow}>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Bed color="#e5e5e5" size={16} strokeWidth={2} aria-hidden />
            3 Rec
          </span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Bath color="#e5e5e5" size={16} strokeWidth={2} aria-hidden />
            3.5 Baños
          </span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Maximize
              color="#e5e5e5"
              size={16}
              strokeWidth={2}
              aria-hidden
            />
            320 m²
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Pet Friendly", "Alberca", "Seguridad 24/7"].map((label) => (
            <span
              key={label}
              style={{
                borderRadius: 9999,
                backgroundColor: "rgb(255 255 255 / 0.2)",
                padding: "4px 12px",
                fontSize: 12,
                color: "#ffffff",
                backdropFilter: "blur(12px)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * 3 propiedades consecutivas, swipe y taps simulados (frame local a webBroker).
 * useCurrentFrame + GLOBAL.webBroker.start como tiempo 0.
 */
export function MvpWebBrokerTinderPhone() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phoneScale = useAtrioMvpPhoneFrameScale();
  const t = Math.max(0, frame - GLOBAL.webBroker.start);

  const checkScale = tapButtonScale(t, T.C1_TAP) * tapButtonScale(t, T.C3_TAP);
  const xScale = tapButtonScale(t, T.C2_TAP);

  const oldRoundsOpacity =
    t <= FINAL_CARD_EXIT
      ? 1
      : interpolate(
          t,
          [FINAL_CARD_EXIT + 1, SUCCESS_START],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

  const successIntro =
    t < SUCCESS_START
      ? 0
      : interpolate(
          t,
          [SUCCESS_START, SUCCESS_START + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
  const successY = interpolate(
    t,
    [SUCCESS_START, SUCCESS_START + 20],
    [12, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const sendEntranceY = interpolate(
    t,
    [SUCCESS_START, SUCCESS_START + 20],
    [10, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const clickPulse = interpolate(
    t,
    [CLICK_FRAME, CLICK_FRAME + 2, CLICK_FRAME + 5],
    [1, 0.95, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const sent = t >= SENT_AT;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: BASE_W,
        height: BASE_H,
        flexDirection: "column",
        overflow: "visible",
        borderRadius: 40,
        border: "8px solid #171717",
        backgroundColor: "#0a0a0a",
        boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.6)",
        fontFamily: font,
        transform: `scale(${phoneScale})`,
        transformOrigin: "center center",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <header style={{ flexShrink: 0, padding: 24, overflow: "hidden" }}>
        <p
          style={{
            margin: "0 0 4px 0",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#10b981",
          }}
        >
          RESULTADOS DE IA
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
          }}
        >
          Revisión
        </h1>
        <p
          style={{
            margin: "6px 0 0 0",
            fontSize: 14,
            color: "#a3a3a3",
          }}
        >
          Elige qué enviar a tu cliente
        </p>
      </header>

      <div
        style={{
          position: "relative",
          display: "flex",
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 8,
          minHeight: 0,
          flex: 1,
          flexDirection: "column",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: 360,
            flex: 1,
            borderRadius: 24,
            overflow: "visible",
          }}
        >
          {t >= SUCCESS_START && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                borderRadius: 24,
                zIndex: 5,
                pointerEvents: "none",
                opacity: successIntro,
                transform: `translateY(${successY}px)`,
              }}
            >
              <CheckCircle
                size={64}
                color="#10b981"
                strokeWidth={1.75}
                aria-hidden
                style={{
                  marginBottom: 24,
                  marginLeft: "auto",
                  marginRight: "auto",
                  filter:
                    "drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))",
                }}
              />
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#ffffff",
                  textAlign: "center",
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                Propiedades filtradas
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgb(163 163 163)",
                  textAlign: "center",
                }}
              >
                Opciones listas para compartir.
              </div>
            </div>
          )}

          {PROPERTIES.map((prop, i) => {
            const st = getCardStyle(i, t, fps);
            if (!st.draw) return null;
            return (
              <div
                key={prop.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 24,
                  overflow: "hidden",
                  zIndex: st.z,
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.35)",
                  transform: `translateX(${st.x}px) rotate(${st.r}deg) scale(${st.s})`,
                  transformOrigin: "50% 50%",
                  opacity: st.o,
                }}
              >
                <PropertyCardContent
                  price={prop.price}
                  title={prop.title}
                  imageUrl={prop.image}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          position: "relative",
          minHeight: 104,
          paddingTop: 8,
          paddingBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            opacity: oldRoundsOpacity,
            pointerEvents: oldRoundsOpacity < 0.02 ? "none" : "auto",
          }}
        >
          <button
            type="button"
            aria-label="Descartar"
            style={{
              display: "flex",
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              border: "1px solid #262626",
              backgroundColor: "#171717",
              color: "#f43f5e",
              boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.35)",
              cursor: "default",
              padding: 0,
              transform: `scale(${xScale})`,
            }}
          >
            <X size={32} strokeWidth={2.5} color="#f43f5e" />
          </button>
          <button
            type="button"
            aria-label="Enviar"
            style={{
              display: "flex",
              width: 64,
              height: 64,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 9999,
              border: "none",
              backgroundColor: "#10b981",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.45)",
              cursor: "default",
              padding: 0,
              transform: `scale(${checkScale})`,
            }}
          >
            <Check size={32} strokeWidth={2.5} color="#ffffff" />
          </button>
        </div>

        {t >= SUCCESS_START && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 8,
              bottom: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: successIntro,
              pointerEvents: "none",
            }}
          >
            <button
              type="button"
              style={{
                width: "85%",
                maxWidth: 320,
                marginLeft: "auto",
                marginRight: "auto",
                border: "none",
                borderRadius: 16,
                padding: "16px 20px",
                fontSize: 18,
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: sent ? "#059669" : "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "default",
                fontFamily: font,
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.2)",
                transform: `translateY(${sendEntranceY}px) scale(${clickPulse})`,
              }}
            >
              <Send size={20} color="#ffffff" strokeWidth={2} aria-hidden />
              {sent ? "¡Enviado por WhatsApp!" : "Enviar al Cliente"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
