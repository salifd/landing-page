import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import TermsOfUse from "@/components/TermsOfUse";

const title = "Terms of Use — Quikku Pay";
const description =
  "Read Quikku's Terms of Use. Learn about our waitlist registration, user responsibilities, and service terms for innovative travel payment solutions.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
  ...socialMetadata({ title, description, path: "/terms", card: "summary" }),
};

export default function TermsPage() {
  return <TermsOfUse />;
}
