import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {};

const withPWAConfig = withPWA({
  dest: "public",
  disable: !isProd,
  register: true,
});

export default isProd ? withPWAConfig(nextConfig) : nextConfig;