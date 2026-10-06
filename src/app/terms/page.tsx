import type { Metadata } from "next";
import TermsOfUse from "@/components/TermsOfUse";

const title = "Terms of Use - Quikku";
const description =
  "Read Quikku's Terms of Use. Learn about our waitlist registration, user responsibilities, and service terms for innovative travel payment solutions.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title, description },
  twitter: { card: "summary", title, description },
};

export default function TermsPage() {
  return <TermsOfUse />;
}
