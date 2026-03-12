"use client";

import * as React from "react";
import {
  IconGauge,
  IconBuilding,
  IconCalendar,
  IconDashboard,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconCreditCard,
  IconLock,
  IconMessageCircle,
} from "@tabler/icons-react";

// Removed NavDocuments import as it will no longer be used
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import IconLogo from "./ui/icon-logo";
import { useSessionContext } from "@/context/SessionProvider";
import { SupportMenuItem } from "@/components/support/SupportMenuItem";
import type { ContractType } from "@/generated/prisma/client";

// Helper para verificar se é usuário interno do ToLivre
function isToLivreStaff(email?: string): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith("@tolivre.app");
}

const baseNavMain = [
  {
    title: "Início",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Agendamentos",
    url: "/dashboard/appointments",
    icon: IconCalendar,
    items: [
      {
        title: "Lista",
        url: "/dashboard/appointments",
      },
      {
        title: "Calendário",
        url: "/dashboard/appointments/calendar",
      },
      {
        title: "Novo Agendamento",
        url: "/dashboard/appointments/new",
      },
    ],
  },
  {
    title: "Empresa",
    url: "/dashboard/company",
    icon: IconBuilding,
    items: [
      {
        title: "Visão Geral",
        url: "/dashboard/company",
      },
      {
        title: "Profissionais",
        url: "/dashboard/company/professionals",
      },
      {
        title: "Horários",
        url: "/dashboard/company/working-hours",
      },
      {
        title: "Serviços",
        url: "/dashboard/company/services",
      },
      {
        title: "Equipe",
        url: "/dashboard/company/team",
        badge: "PRO+",
        requiredPlan: "PRO_PLUS" as ContractType,
      },
      {
        title: "Página Pública",
        url: "/dashboard/company/page-settings",
      },
    ],
  },
  {
    title: "Relatórios",
    url: "/dashboard/financial",
    icon: IconReport,
    items: [
      {
        title: "Financeiro",
        url: "/dashboard/financial",
        badge: "PRO",
        requiredPlan: "PROFESSIONAL" as ContractType,
      },
      {
        title: "Comissões",
        url: "/dashboard/reports/commissions",
        badge: "PRO+",
        requiredPlan: "PRO_PLUS" as ContractType,
      },
    ],
  },
];

// Menu exclusivo da equipe interna TôLivre
const internalNavItems = [
  {
    title: "Suporte",
    url: "/dashboard/support",
    icon: IconMessageCircle,
  },
  {
    title: "Gestão TôLivre",
    url: "/dashboard/management",
    icon: IconGauge,
  },
];

const commonNavItems = [
  {
    title: "Segurança",
    url: "/dashboard/security",
    icon: IconLock,
    items: [
      {
        title: "Visão Geral",
        url: "/dashboard/security",
      },
      {
        title: "Autenticação 2FA",
        url: "/dashboard/security/2fa",
      },
    ],
  },
  {
    title: "Assinatura",
    url: "/dashboard/assinatura",
    icon: IconCreditCard,
  },
];

// navSecondary removed; we'll render a Support item directly in the sidebar footer

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSessionContext();
  const [companyPlan, setCompanyPlan] = React.useState<ContractType | null>(
    null,
  );

  // Buscar plano da empresa
  React.useEffect(() => {
    if (user?.companyId) {
      fetch(`/api/company/${user.companyId}`)
        .then((res) => res.json())
        .then((data) => {
          setCompanyPlan(data.data?.contrato || data.contrato || null);
        })
        .catch(() => setCompanyPlan(null));
    }
  }, [user?.companyId]);

  // Constrói o menu dinamicamente baseado no usuário
  const navMain = React.useMemo(() => {
    const items = [...baseNavMain, ...commonNavItems];

    // Staff do ToLivre também vê os menus internos (Suporte + Gestão TôLivre)
    if (isToLivreStaff(user?.email)) {
      items.push(...internalNavItems);
    }

    return items;
  }, [user?.email]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span>
                  <IconLogo />
                </span>
                <span className="text-base font-bold">TôLivre</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} companyPlan={companyPlan} />
        {/* NavDocuments has been removed */}
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div>
                  <SupportMenuItem />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
