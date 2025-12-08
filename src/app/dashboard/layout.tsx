import { getUserFromCookie } from "@/app/libs/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { canAccessSystem } from "@/lib/trial";
import prisma from "@/lib/prisma";
import { TrialBanner } from "@/components/trial-banner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookie();
  if (!user) redirect("/login");

  // Verificar status do trial e assinatura
  const userWithTrial = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      trialEndsAt: true,
      company: {
        select: {
          subscription: {
            select: {
              status: true,
            },
          },
        },
      },
    },
  });

  const hasActiveSubscription =
    userWithTrial?.company?.subscription?.status === "ACTIVE";

  // Se o trial expirou e não tem assinatura ativa, redirecionar para escolher plano
  if (
    !canAccessSystem(userWithTrial?.trialEndsAt || null, hasActiveSubscription)
  ) {
    redirect("/escolher-plano");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="">
          <TrialBanner
            trialEndsAt={userWithTrial?.trialEndsAt || null}
            hasActiveSubscription={hasActiveSubscription}
          />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
