import { useVideoConfig } from "remotion";

const BASE_W = 375;
const BASE_H = 812;
const MARGIN_V = 40;
const MARGIN_H = 64;

/**
 * Escala un mock 375×812 al lienzo. Misma lógica que el teléfono Tinder
 * (9:16 más grande, 16:9 clásico).
 */
export function useAtrioMvpPhoneFrameScale(): number {
  const { width, height } = useVideoConfig();
  const is9x16 = height > width;
  if (is9x16) {
    const marginV = 24;
    const marginH = 40;
    const fitPad = 0.99;
    const maxScale = 2.22;
    const byHeight = (height - 2 * marginV) / BASE_H;
    const byWidth = (width - 2 * marginH) / BASE_W;
    const fit = Math.min(byHeight, byWidth) * fitPad;
    return Math.max(0.88, Math.min(fit, maxScale));
  }
  const byHeight = (height - 2 * MARGIN_V) / BASE_H;
  const byWidth = (width - 2 * MARGIN_H) / BASE_W;
  const fit = Math.min(byHeight, byWidth) * 0.97;
  return Math.max(0.88, Math.min(fit, 1.42));
}
