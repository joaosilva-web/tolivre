"use client";

import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { checkTrialStatus, type TrialStatus } from "@/lib/trial";

interface TrialBannerProps {
  trialEndsAt: Date | null;
  hasActiveSubscription?: boolean;
}

export function TrialBanner({
  trialEndsAt,
  hasActiveSubscription = false,
}: TrialBannerProps) {
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const status = checkTrialStatus(trialEndsAt, hasActiveSubscription);
    setTrialStatus(status);

    // Verificar se o usuário já dispensou o banner (localStorage)
    const dismissedUntil = localStorage.getItem("trialBannerDismissed");
    if (dismissedUntil) {
      const dismissedDate = new Date(dismissedUntil);
      if (dismissedDate > new Date()) {
        setDismissed(true);
      }
    }
  }, [trialEndsAt, hasActiveSubscription]);

  const handleDismiss = () => {
    setDismissed(true);
    // Dispensar por 24 horas
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);
    localStorage.setItem("trialBannerDismissed", tomorrow.toISOString());
  };

  // Não mostrar se já tem assinatura ou se foi dispensado
  if (!trialStatus || trialStatus.hasSubscription || dismissed) {
    return null;
  }

  // Não mostrar se ainda faltam mais de 7 dias
  if (trialStatus.daysRemaining > 7) {
    return null;
  }

  // Determinar cor e mensagem baseado nos dias restantes
  const getAlertVariant = () => {
    if (trialStatus.daysRemaining <= 2) return "destructive";
    if (trialStatus.daysRemaining <= 5) return "default";
    return "default";
  };

  const getMessage = () => {
    if (trialStatus.daysRemaining === 0) {
      return "Seu período de teste expira hoje!";
    }
    if (trialStatus.daysRemaining === 1) {
      return "Seu período de teste expira amanhã!";
    }
    return `Restam ${trialStatus.daysRemaining} dias do seu período de teste`;
  };

  return (
    <Alert
      variant={getAlertVariant()}
      className="mb-6 relative border-2 shadow-lg"
    >
      <Clock className="h-5 w-5" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold">{getMessage()}</span>
          <span className="text-sm text-muted-foreground">
            Escolha um plano para continuar usando todas as funcionalidades
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/escolher-plano">
            <Button size="sm" variant="default" className="shadow-md">
              Escolher Plano
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
