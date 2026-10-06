import type { Metadata } from "next";
import NotFound from "@/components/NotFound";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Quikku",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFoundPage() {
  return <NotFound />;
}
