import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/restaurant-menu' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/restaurant-menu' : '',
};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

export default withPWAConfig(nextConfig);