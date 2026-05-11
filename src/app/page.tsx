import { LandingPage } from "@/components/landing/landing-page";
import { canonicalUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: canonicalUrl("/"),
  },
};

export default function Home() {
  return <LandingPage />;
}
