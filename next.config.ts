import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable modern image formats and keep existing remote patterns
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  // Ensure SWC minify is enabled for smaller JS bundles
};

export default nextConfig;
