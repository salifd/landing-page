import type { Metadata, Viewport } from "next";
import Script from "next/script";
import MatomoPageView from "@/components/MatomoPageView";
import MotionController from "@/components/MotionController";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, socialMetadata, STRUCTURED_DATA } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "QR code payment",
    "Southeast Asia travel payment",
    "tourist payment app",
    "Visa Mastercard QR",
    "Thailand payment",
    "Vietnam payment",
    "Philippines payment",
    "travel fintech",
    "international payment",
    "Quikku",
    "Quikku Pay",
  ],
  authors: [{ name: "Quikku" }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  ...socialMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" }),
};

export const viewport: Viewport = {
  themeColor: "#0a2472",
};

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

        {STRUCTURED_DATA.map((data) => (
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
