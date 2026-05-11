/**
 * URL pública absoluta del sitio (sin barra final en el dominio para composición manual).
 * Producción: define `NEXT_PUBLIC_SITE_URL` en Vercel / `.env.local` (ej. https://useatrio.com).
 */
export function getSiteUrlString(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv?.length) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000".replace(/\/$/, "");
  }
  return "https://useatrio.com".replace(/\/$/, "");
}

export function siteMetadataBase(): URL {
  const s = getSiteUrlString();
  return new URL(`${s}/`);
}

/** Canonical absoluta para una ruta (pathname con barra inicial; `/` para inicio). */
export function canonicalUrl(pathname: string = "/"): string {
  const base = getSiteUrlString();
  const path =
    pathname === "/" || pathname === ""
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  return path === "/" ? `${base}/` : `${base}${path}`;
}
