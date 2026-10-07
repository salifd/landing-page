import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const title = "Privacy Policy — Quikku Pay";
const description =
  "Quikku's Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy is our priority.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
  ...socialMetadata({ title, description, path: "/privacy", card: "summary" }),
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
