import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Production builds are exported as static HTML to `out/`, served by Apache
  // alongside the PHP API (see public/.htaccess).
  output: isDev ? undefined : "export",
  images: { unoptimized: true },
  // Remove console logs in production builds
  compiler: {
    removeConsole: !isDev,
  },
  // Proxy /api to the local PHP server during development
  ...(isDev && {
    async rewrites() {
      return [{ source: "/api/:path*", destination: "http://localhost:8080/api/:path*" }];
    },
  }),
};

export default nextConfig;
