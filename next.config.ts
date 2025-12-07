import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone para Docker (produção otimizada)
  output: 'standalone',
  
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://sdk.mercadopago.com https://secure.mlstatic.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.mercadopago.com https://api.mercadolibre.com https://*.mercadopago.com",
              "frame-src 'self' https://www.mercadopago.com https://sandbox.mercadopago.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
