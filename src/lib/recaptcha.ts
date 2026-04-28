/** Verificación server-side de reCAPTCHA v3 (siteverify). */

const SITE_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

type SiteVerifyJson = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptchaV3(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("RECAPTCHA_SECRET_KEY no está definida");
    return false;
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const res = await fetch(SITE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as SiteVerifyJson;
  if (!data.success) {
    return false;
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
  if (typeof data.score !== "number" || data.score < minScore) {
    return false;
  }

  if (data.action != null && data.action !== "waitlist") {
    return false;
  }

  return true;
}
