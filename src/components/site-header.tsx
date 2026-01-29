import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NotificationBell } from "@/components/notification-bell";
import { TrialTimer } from "@/components/trial-timer";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-gradient-to-r from-primary/5 via-secondary/5 to-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <nav aria-label="Breadcrumb" className="flex items-center gap-3">
          {/* Dynamic breadcrumb based on pathname */}
          <Breadcrumb />
        </nav>
        <TrialTimer />
        <div className="ml-auto flex items-center gap-2">
          <NotificationBell />
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              <CircleQuestionMark className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function mapSegmentToLabel(seg: string) {
  const map: Record<string, string> = {
    dashboard: "Dashboard",
    settings: "Configurações",
    profile: "Perfil",
    services: "Serviços",
    appointments: "Agendamentos",
    "working-hours": "Horários",
    integrations: "Integrações",
    login: "Entrar",
    demonstracao: "Demonstração",
  };

  if (map[seg]) return map[seg];
  const label = decodeURIComponent(seg).replace(/-/g, " ");
  return label.replace(/\b\w/g, (c) => c.toUpperCase());
}

function Breadcrumb() {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const items = useMemo(() => {
    const acc: { label: string; href: string }[] = [
      { label: "Dashboard", href: "/dashboard" },
    ];
    let cur = "";
    for (const seg of segments) {
      cur += `/${seg}`;
      // Avoid duplicating the 'dashboard' root segment
      if (seg === "dashboard") continue;
      acc.push({ label: mapSegmentToLabel(seg), href: cur });
    }
    return acc;
  }, [pathname]);

  return (
    <div className="flex items-center gap-2">
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        return isLast ? (
          <span
            key={it.href}
            className="text-base font-medium text-primary"
            aria-current="page"
          >
            {it.label}
          </span>
        ) : (
          <span key={it.href} className="flex items-center gap-2">
            <Link
              href={it.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {it.label}
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
          </span>
        );
      })}
    </div>
  );
}
