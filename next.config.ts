import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" bundles a minimal Node.js server into .next/standalone — used
  // by the Dockerfile and compatible with Vercel (which ignores this setting
  // and uses its own runtime automatically).
  //
  // ⚠️  GitHub Pages / static CDN: change this value to "export" before
  //     running `npm run build`.  All dynamic routes already expose
  //     generateStaticParams(), so the static build will work out of the box.
  output: "standalone",

  images: {
    // Allow SVG images (used for placeholder astrophotography shots).
    // In production replace these with real JPEG/WebP images.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

