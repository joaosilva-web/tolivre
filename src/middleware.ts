import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lista de origens permitidas em desenvolvimento
const allowedOriginsInDev = [
  "http://localhost:8081", // Metro Bundler (React Native)
  "http://localhost:19000", // Expo
  "http://localhost:19006", // Expo Web
  "http://localhost:3000", // Next.js dev
  "http://10.0.2.2:8081", // Android Emulator
  "http://192.168", // Rede local (qualquer IP 192.168.x.x)
];

// Lista de origens permitidas em produção
const allowedOriginsInProd = ["https://tolivre.app", "https://www.tolivre.app"];

export function middleware(request: NextRequest) {
  // Apenas aplicar CORS em rotas /api/*
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  const response = NextResponse.next();

  // Determinar origens permitidas baseado no ambiente
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? allowedOriginsInProd
      : allowedOriginsInDev;

  // Verificar se a origin está permitida
  const isAllowedOrigin =
    origin &&
    (process.env.NODE_ENV === "development"
      ? // Em dev, permite qualquer origin que comece com as permitidas
        allowedOrigins.some((allowed) => origin.startsWith(allowed))
      : // Em prod, exige match exato
        allowedOrigins.includes(origin));

  // Se a origin está permitida, adicionar headers CORS
  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  // Sempre adicionar outros headers CORS
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie, X-Requested-With",
  );

  // Tratar requisições OPTIONS (preflight)
  if (request.method === "OPTIONS") {
    const preflightResponse = new NextResponse(null, { status: 200 });

    if (isAllowedOrigin) {
      preflightResponse.headers.set("Access-Control-Allow-Origin", origin);
      preflightResponse.headers.set("Access-Control-Allow-Credentials", "true");
    }

    preflightResponse.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    preflightResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Cookie, X-Requested-With",
    );
    preflightResponse.headers.set("Access-Control-Max-Age", "86400");

    return preflightResponse;
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
