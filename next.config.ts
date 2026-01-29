import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para Docker (produção otimizada)
  output: "standalone",

  // Evita que o Turbopack tente empacotar libs de WhatsApp/logger com arquivos de teste embutidos
  // que quebram a build (thread-stream/pino/baileys e deps). Mantém essas libs como externas
  // no servidor.
  serverExternalPackages: [
    "baileys",
    "pino",
    "thread-stream",
    "pino-elasticsearch",
    "jimp",
    "sharp",
    "tap",
    "desm",
    "fastbench",
    "why-is-node-running",
    "keyv",
    "@cacheable/memory",
    "@cacheable/utils",
    "cacheable",
  ],

  typescript: {
    // Only type-check source files, not generated
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' ws://localhost:3001 wss://localhost:3001 ws://tolivre.app:3001 wss://tolivre.app:3001 https://api.stripe.com https://*.stripe.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
