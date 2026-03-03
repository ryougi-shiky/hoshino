import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages / CDN deployment.
  // Comment out the `output` line if you are deploying to Vercel
  // (Vercel supports the full Next.js runtime natively).
  // output: "export",

  images: {
    // Allow SVG images (used for placeholder astrophotography shots).
    // In production replace these with real JPEG/WebP images.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

