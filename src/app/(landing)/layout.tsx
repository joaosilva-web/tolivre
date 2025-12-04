import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToLivre - Sistema de Agendamentos Inteligente",
  description:
    "Simplifique seus agendamentos com integração WhatsApp e gestão completa de clientes.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
