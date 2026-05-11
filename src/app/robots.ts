import type { MetadataRoute } from "next";
import { getSiteUrlString } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrlString();
  const host = new URL(`${base}/`).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host,
    sitemap: `${base}/sitemap.xml`,
  };
}
