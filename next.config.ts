import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/service/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
      { source: "/project/:id", destination: "/projects/:id", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
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
