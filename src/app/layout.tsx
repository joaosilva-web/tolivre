import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/SessionProvider";
import { WebSocketProvider } from "@/context/WebSocketProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TôLivre - Sistema de Agendamentos",
  description:
    "Plataforma de agendamento com confirmações automáticas via WhatsApp para reduzir no‑shows e otimizar seu tempo.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "TôLivre - Agendamentos com confirmação automática",
    description:
      "Agendamentos confirmados automaticamente por WhatsApp — menos faltas, mais pontualidade. Experimente 14 dias grátis.",
    images: ["/logo.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TôLivre - Agendamentos com confirmação automática",
    description:
      "Agendamentos confirmados automaticamente por WhatsApp — menos faltas, mais pontualidade.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
