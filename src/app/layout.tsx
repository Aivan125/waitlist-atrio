import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLdOrganization } from "@/components/json-ld-organization";
import { siteMetadataBase } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTitle = "Atrio | Lista de espera — 50 fundadores";
const defaultDescription =
  "Red privada para brokers inmobiliarios de alto ticket en Monterrey. Comparte inventario premium y encuentra propiedades con inteligencia artificial vía WhatsApp, sin grupos saturados.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0e0c",
};

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: {
    default: defaultTitle,
    template: "%s | Atrio",
  },
  description: defaultDescription,
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Atrio",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`bg-background ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className={`${geistMono.variable} ${geistSans.className} min-h-screen font-sans antialiased`}
      >
        <JsonLdOrganization />
        {children}
        {process.env.NODE_ENV === "production" ? <Analytics /> : null}
      </body>
    </html>
  );
}
