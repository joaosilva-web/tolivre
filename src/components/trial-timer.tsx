"use client";

import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TrialTimer() {
  const { user, loading } = useSession();
  const [timeLeft, setTimeLeft] = useState<string>("");

  console.log(
    "[TrialTimer] Componente montado - User:",
    user?.id,
    "Loading:",
    loading,
    "CompanyId:",
    user?.companyId
  );

  useEffect(() => {
    console.log(
      "[TrialTimer] useEffect disparado - User:",
      user?.id,
      "Loading:",
      loading,
      "CompanyId:",
      user?.companyId
    );

    if (!user?.companyId || loading) {
      console.log("[TrialTimer] Retornando early - sem user ou loading");
      return;
    }

    const calculateTimeLeft = async () => {
      try {
        console.log("[TrialTimer] Buscando status do trial...");
        const res = await fetch("/api/subscription/trial-status");
        console.log("[TrialTimer] Response status:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("[TrialTimer] Trial data:", data);

          if (data.data?.isInTrial && data.data?.trialEndsAt) {
            const trialEnd = new Date(data.data.trialEndsAt);
            const now = new Date();
            const diffMs = trialEnd.getTime() - now.getTime();

            console.log("[TrialTimer] Trial end:", trialEnd);
            console.log("[TrialTimer] Now:", now);
            console.log("[TrialTimer] Diff (ms):", diffMs);

            if (diffMs > 0) {
              const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );

              console.log("[TrialTimer] Days left:", days, "Hours:", hours);

              if (days > 0) {
                setTimeLeft(`${days}d ${hours}h de trial`);
              } else {
                setTimeLeft(`${hours}h de trial`);
              }
            } else {
              console.log("[TrialTimer] Trial expirado");
              setTimeLeft("Trial expirado");
            }
          } else {
            console.log(
              "[TrialTimer] Usuário não está em trial ou trialEndsAt não existe"
            );
            setTimeLeft("");
          }
        } else {
          console.error("[TrialTimer] Erro na resposta:", res.status);
        }
      } catch (err) {
        console.error("[TrialTimer] Erro ao buscar status do trial:", err);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, [user?.companyId, loading]);

  console.log("[TrialTimer] Renderizando - timeLeft:", timeLeft);

  // Temporariamente sempre renderizar para teste
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 dark:bg-yellow-900"
    >
      <Clock className="h-3.5 w-3.5" />
      <span className="text-xs font-medium">{timeLeft || "Carregando..."}</span>
    </Badge>
  );
}
