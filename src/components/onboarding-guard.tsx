"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSession from "@/hooks/useSession";
import { Loader2 } from "lucide-react";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: sessionLoading } = useSession();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Não verifica se estiver na página de onboarding ou login
      if (
        pathname === "/dashboard/onboarding" ||
        pathname === "/login" ||
        pathname === "/registro"
      ) {
        setChecking(false);
        return;
      }

      if (sessionLoading || !user) {
        return;
      }

      try {
        const res = await fetch("/api/onboarding/status");
        if (res.ok) {
          const data = await res.json();
          console.log("OnboardingGuard - Status:", data.data);
          
          if (data.data?.needsOnboarding) {
            console.log("OnboardingGuard - Redirecionando para onboarding");
            router.push("/dashboard/onboarding");
            return;
          }
          
          console.log("OnboardingGuard - Onboarding completo, permitindo acesso");
        }
      } catch (err) {
        console.error("Erro ao verificar onboarding:", err);
      }

      setChecking(false);
    };

    checkOnboardingStatus();
  }, [user, sessionLoading, router, pathname]);

  // Mostra loading enquanto verifica
  if (checking || sessionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
