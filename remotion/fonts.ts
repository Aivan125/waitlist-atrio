import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";

/** UI del chat (Agent Chat) — Inter 400 / 600 */
export const inter = loadFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

/** Acto A y Acto C — [Geist](https://fonts.google.com/specimen/Geist) */
export const heroActo = loadGeist("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});
