import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/restaurant-menu',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;