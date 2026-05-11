import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: canonicalUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: canonicalUrl("/privacidad"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
