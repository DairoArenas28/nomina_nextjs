import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: false
  }
};

export default nextConfig;
