import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages only serves files, so every route is rendered at build time.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
