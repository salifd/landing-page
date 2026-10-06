import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Copy contains plain apostrophes/quotes, which React renders fine
      "react/no-unescaped-entities": "off",
      // Static export: next/image can't optimize, so plain <img> is fine
      "@next/next/no-img-element": "off",
    },
  },
  {
    files: ["*.config.js"],
    rules: { "import/no-anonymous-default-export": "off" },
  },
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "php/**"]),
]);
