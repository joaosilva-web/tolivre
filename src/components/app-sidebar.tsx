"use client";

import * as React from "react";
import {
  IconPlug,
  IconBuilding,
  IconCalendar,
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconCreditCard,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
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
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Appointments",
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
      title: "Company",
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
          title: "Exceções de Horários",
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
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
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
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
