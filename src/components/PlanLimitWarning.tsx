"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlanLimitWarningProps {
  currentCount: number;
  limit: number;
  resourceType: "profissionais" | "agendamentos";
  currentPlan: string;
  recommendedPlan?: string;
}

export function PlanLimitWarning({
  currentCount,
  limit,
  resourceType,
  currentPlan,
  recommendedPlan = "Pro Plus",
}: PlanLimitWarningProps) {
  const router = useRouter();
  const percentage = (currentCount / limit) * 100;

  // Mostrar aviso quando estiver acima de 80% do limite
  if (percentage < 80) return null;

  const isAtLimit = currentCount >= limit;
  const remaining = limit - currentCount;

  return (
    <Alert variant={isAtLimit ? "destructive" : "default"} className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {isAtLimit ? (
            <p>
              <strong>Limite atingido!</strong> Você está usando {currentCount}/
              {limit} {resourceType}.
              {recommendedPlan &&
                ` Faça upgrade para o plano ${recommendedPlan} para continuar.`}
            </p>
          ) : (
            <p>
              <strong>Atenção!</strong> Você está usando {currentCount}/{limit}{" "}
              {resourceType}. Restam apenas {remaining}.{" "}
              {recommendedPlan &&
                `Upgrade para ${recommendedPlan} para até ${resourceType === "profissionais" ? "10 profissionais" : "mais recursos"}!`}
            </p>
          )}
        </div>
        <Button
          size="sm"
          variant={isAtLimit ? "default" : "outline"}
          onClick={() => router.push("/dashboard/assinatura/planos")}
        >
          Ver Planos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
