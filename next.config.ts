import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Output standalone para Docker (produção otimizada)
  // Temporariamente desabilitado devido a conflito com Sentry no Windows
  // output: "standalone",

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
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, Cookie, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 24 horas de cache para preflight
          },
        ],
      },
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "tolivre",
  project: "tolivre-app",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Source maps configuration
  sourcemaps: {
    disable: false, // Enable source maps for better debugging
  },

  // Webpack treeshaking configuration
  webpack: {
    treeshake: {
      removeDebugLogging: true, // Remove debug logging in production
    },
    reactComponentAnnotation: {
      enabled: true, // Show full component names in Sentry
    },
    automaticVercelMonitors: true, // Enable Vercel Cron Monitors
  },
});
