import { canonicalUrl, getSiteUrlString } from "@/lib/site-url";

export function JsonLdOrganization() {
  const organizationId = `${getSiteUrlString()}/#organization`;
  const websiteId = `${getSiteUrlString()}/#website`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Atrio",
        url: canonicalUrl("/"),
        logo: `${getSiteUrlString()}/atrio/atrio-isotipo-negro.png`,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Atrio",
        url: canonicalUrl("/"),
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
