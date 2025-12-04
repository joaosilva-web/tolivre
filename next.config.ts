import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore generated Prisma files during build
    ignoreDuringBuilds: false,
    dirs: ['src/app', 'src/components', 'src/hooks', 'src/lib', 'src/context']
  },
  typescript: {
    // Only type-check source files, not generated
    ignoreBuildErrors: false,
  }
};

export default nextConfig;
