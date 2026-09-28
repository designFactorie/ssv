import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
    qualities: [60, 75],
  },
};

export default nextConfig;
