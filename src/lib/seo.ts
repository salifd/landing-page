import type { Metadata } from "next";

/** Site-wide SEO values, shared by the root layout and every page's metadata. */
export const SITE_URL = "https://quikkupay.com";
export const SITE_NAME = "Quikku Pay";
export const SITE_TITLE = "Quikku Pay — Scan any QR code. Pay instantly.";
export const SITE_DESCRIPTION =
  "Pay any Southeast Asian QR code with your Visa or Mastercard. No local bank account, no cash needed. Travel smarter with Quikku Pay.";
export const TWITTER_HANDLE = "@quikkupay";

export const SHARE_IMAGE = {
  url: "/assets/images/hero_2.png",
  width: 1200,
  height: 630,
  alt: "Quikku Pay — Scan any Southeast Asian QR code with your Visa or Mastercard",
};

/**
 * Open Graph / Twitter metadata for a page. Next.js replaces (does not merge) a parent's
 * openGraph and twitter objects, so every page passes through here to keep the shared fields.
 */
export function socialMetadata({
  title,
  description,
  path,
  card = "summary_large_image",
}: {
  title: string;
  description: string;
  path: string;
  card?: "summary" | "summary_large_image";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card,
      site: TWITTER_HANDLE,
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/** schema.org structured data (JSON-LD) rendered in the root layout. */
export const STRUCTURED_DATA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quikku",
    alternateName: "Quikku Pay",
    url: SITE_URL,
    logo: `${SITE_URL}/web-app-manifest-512x512.png`,
    description: "Pay any Southeast Asian QR code with your Visa or Mastercard. No local bank account, no cash needed.",
    foundingDate: "2025",
    sameAs: ["https://twitter.com/quikkupay", "https://www.linkedin.com/company/quikku"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@quikkupay.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Scan any QR code. Pay instantly. Pay any Southeast Asian QR code with your Visa or Mastercard — no local bank account, no cash needed.",
  },
];
