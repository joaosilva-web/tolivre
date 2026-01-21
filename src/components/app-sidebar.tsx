"use client";

import * as React from "react";
import {
  IconPlug,
  IconBuilding,
  IconCalendar,
  IconDashboard,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconCreditCard,
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import IconLogo from "./ui/icon-logo";

const data = {
  navMain: [
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
          title: "Equipe",
          url: "/dashboard/company/team",
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
        },
        {
          title: "Comissões",
          url: "/dashboard/reports/commissions",
        },
      ],
    },
    {
      title: "Integrações",
      url: "/dashboard/integrations",
      icon: IconPlug,
    },
    {
      title: "Segurança",
      url: "/dashboard/security",
      icon: IconSettings,
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
      title: "Configurações",
      url: "/dashboard/settings/exceptions",
      icon: IconSettings,
      items: [
        {
          title: "Exceções de Horário",
          url: "/dashboard/settings/exceptions",
        },
      ],
    },
    {
      title: "Assinatura",
      url: "/dashboard/assinatura",
      icon: IconCreditCard,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavMain items={data.navMain} />
        {/* NavDocuments has been removed */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
