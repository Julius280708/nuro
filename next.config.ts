import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add other Next.js config options here
};
module.exports = {
  // your existing config,
  experimental: {
    appDir: true, // if using App Router
  },
};

export default nextConfig;
