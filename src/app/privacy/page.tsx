import type { Metadata } from "next";
import PrivacyPolicy from "@/components/PrivacyPolicy";

const title = "Privacy Policy - Quikku";
const description =
  "Quikku's Privacy Policy. Learn how we collect, use, and protect your personal information. Your privacy is our priority.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title, description },
  twitter: { card: "summary", title, description },
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
