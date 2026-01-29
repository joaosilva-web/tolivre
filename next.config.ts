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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://*.stripe.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' http://localhost:3001 https://localhost:3001 ws://localhost:3001 wss://localhost:3001 https://api.stripe.com https://*.stripe.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
