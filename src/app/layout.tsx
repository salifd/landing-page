import type { Metadata, Viewport } from "next";
import Script from "next/script";
import MatomoPageView from "@/components/MatomoPageView";
import MotionController from "@/components/MotionController";
import "./globals.css";

const SITE_URL = "https://www.quikkupay.com";
const TITLE = "Quikku - The Future of Payment for Travellers";
const SHARE_DESCRIPTION =
  "Reimagining how the world moves. Join us on our journey to design innovative payment solutions for global travelers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description:
    "Reimagining how the world moves. Join us on our journey to design innovative payment solutions for global travelers. Be the first to embark with Quikku.",
  keywords: [
    "travel payment",
    "digital payment",
    "international payment",
    "travel fintech",
    "global mobility",
    "traveler payment solutions",
    "payment innovation",
    "cross-border payments",
    "travel finance",
    "seamless payments",
    "Quikku",
  ],
  authors: [{ name: "Quikku" }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [
      {
        url: "/assets/images/illustration_2.webp",
        width: 1200,
        height: 630,
        alt: "Quikku - Travel Payment Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: ["/assets/images/illustration_2.webp"],
  },
  other: {
    language: "English",
    "revisit-after": "7 days",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2472",
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quikku",
    alternateName: "QuikkuPay",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description:
      "Innovative payment solutions for global travelers. Reimagining how the world moves with seamless cross-border payments.",
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
    name: "Quikku",
    url: SITE_URL,
    description: "The Future of Payment for Travellers",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Payment Processing",
    provider: { "@type": "Organization", name: "Quikku" },
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "International Travelers" },
    category: "Financial Technology",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flag JS before first paint so scroll reveals can start hidden */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..600&family=Poppins:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.brevo.com" />

        {structuredData.map((data) => (
          <script
            key={data["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body>
        {children}

        {/* Matomo */}
        <Script id="matomo" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//analytics.quikku.io/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        <MatomoPageView />
        <MotionController />
      </body>
    </html>
  );
}
