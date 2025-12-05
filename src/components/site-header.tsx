import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleQuestionMark } from "lucide-react";
import { NotificationBell } from "@/components/notification-bell";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-gradient-to-r from-primary/5 via-blue-500/5 to-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
          Documents
        </h1>
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
