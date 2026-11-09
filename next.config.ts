import type { NextConfig } from "next";
import oldUrls from "./data/source/omdirigeringar.json";

/**
 * Omdirigeringar från den tidigare webbplatsens adresser (t.ex. /barkis) till de nya produktsidorna.
 * Viktigt eftersom QR-koder på redan utskrivna hylletiketter pekar på de gamla adresserna.
 */
function legacyRedirects() {
  const entries = Object.entries(oldUrls as Record<string, string>);
  const redirects: { source: string; destination: string; permanent: boolean }[] = [];
  for (const [from, to] of entries) {
    const sources = new Set([`/${from}`, `/${encodeURI(from)}`]);
    for (const source of sources) redirects.push({ source, destination: to, permanent: true });
  }
  return redirects;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;
