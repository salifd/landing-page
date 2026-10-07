import type { Metadata } from "next";
import NotFound from "@/components/NotFound";

export const metadata: Metadata = {
  title: "Page not found — Quikku Pay",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFoundPage() {
  return <NotFound />;
}
