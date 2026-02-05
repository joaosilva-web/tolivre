"use client";

import { IconChevronRight, type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ContractType } from "@/generated/prisma/client";

// Ordem dos planos (para comparação)
const PLAN_HIERARCHY: Record<ContractType, number> = {
  TRIAL: 0,
  BASIC: 1,
  PROFESSIONAL: 2,
  PRO_PLUS: 3,
  BUSINESS: 4,
};

function canAccessFeature(currentPlan: ContractType | null, requiredPlan?: ContractType): boolean {
  if (!requiredPlan) return true; // Feature sem restrição
  if (!currentPlan) return false; // Sem plano, sem acesso
  
  return PLAN_HIERARCHY[currentPlan] >= PLAN_HIERARCHY[requiredPlan];
}

function getPlanDisplayName(plan: ContractType): string {
  const names: Record<ContractType, string> = {
    TRIAL: "Trial",
    BASIC: "Básico",
    PROFESSIONAL: "Profissional",
    PRO_PLUS: "Pro Plus",
    BUSINESS: "Business",
  };
  return names[plan] || plan;
}

export function NavMain({
  items,
  companyPlan,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    badge?: string;
    requiredPlan?: ContractType;
    items?: {
      title: string;
      url: string;
      badge?: string;
      requiredPlan?: ContractType;
    }[];
  }[];
  companyPlan: ContractType | null;
}) {
  const pathname = usePathname();

  const isExact = (url: string) => pathname === url;
  const isInSection = (url: string) =>
    pathname === url || pathname?.startsWith(`${url}/`);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const sectionOpen = isInSection(item.url);
            const sectionExact = isExact(item.url);

            return item.items ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={sectionOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={sectionExact ? "text-primary" : ""}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const subActive = isExact(subItem.url);
                        const hasAccess = canAccessFeature(companyPlan, subItem.requiredPlan);
                        
                        const menuButton = (
                          <SidebarMenuSubButton
                            asChild={hasAccess}
                            className={`${subActive ? "text-primary" : ""} ${!hasAccess ? "opacity-50 cursor-not-allowed" : ""}`}
                            aria-current={subActive ? "page" : undefined}
                          >
                            {hasAccess ? (
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <Badge variant="secondary" className="ml-auto text-xs">
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2 w-full">
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <Badge variant="outline" className="ml-auto text-xs">
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </SidebarMenuSubButton>
                        );

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            {!hasAccess && subItem.requiredPlan ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {menuButton}
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    <p>Disponível no plano {getPlanDisplayName(subItem.requiredPlan)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              menuButton
                            )}
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <Link href={item.url} key={item.title}>
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isExact(item.url) ? "text-primary" : ""}
                    aria-current={isExact(item.url) ? "page" : undefined}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
