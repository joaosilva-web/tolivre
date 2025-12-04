import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({
  children,
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: "default" | "destructive" }) {
  return (
    <div
      data-slot="alert"
      className={cn(
        "flex items-start gap-3 rounded-md border px-4 py-3 text-sm",
        variant === "destructive"
          ? "bg-destructive/10 border-destructive text-destructive"
          : "bg-secondary/5 border-muted text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm leading-tight", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Alert;
