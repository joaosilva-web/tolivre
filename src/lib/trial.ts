/**
 * Utilitários para gerenciamento de período de trial (teste grátis de 14 dias)
 */

export interface TrialStatus {
  isActive: boolean; // Se o trial ainda está ativo
  isExpired: boolean; // Se o trial expirou
  daysRemaining: number; // Dias restantes do trial (pode ser negativo se expirado)
  trialEndsAt: Date | null; // Data de término do trial
  hasSubscription: boolean; // Se o usuário já tem assinatura paga
}

/**
 * Verifica o status do trial de um usuário
 * @param trialEndsAt Data de término do trial (pode ser null se já converteu)
 * @param hasActiveSubscription Se o usuário já tem assinatura ativa
 */
export function checkTrialStatus(
  trialEndsAt: Date | null,
  hasActiveSubscription: boolean = false
): TrialStatus {
  // Se não tem trial definido e não tem assinatura = acesso bloqueado
  if (!trialEndsAt && !hasActiveSubscription) {
    return {
      isActive: false,
      isExpired: true,
      daysRemaining: 0,
      trialEndsAt: null,
      hasSubscription: false,
    };
  }

  // Se já tem assinatura ativa, trial não importa
  if (hasActiveSubscription) {
    return {
      isActive: false,
      isExpired: false,
      daysRemaining: 0,
      trialEndsAt,
      hasSubscription: true,
    };
  }

  // Calcular dias restantes do trial
  const now = new Date();
  const endDate = new Date(trialEndsAt!);
  const diffTime = endDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isExpired = daysRemaining < 0;
  const isActive = daysRemaining >= 0;

  return {
    isActive,
    isExpired,
    daysRemaining: Math.max(0, daysRemaining), // Não retornar valores negativos
    trialEndsAt: endDate,
    hasSubscription: false,
  };
}

/**
 * Verifica se o usuário pode acessar o sistema (trial ativo OU assinatura paga)
 */
export function canAccessSystem(
  trialEndsAt: Date | null,
  hasActiveSubscription: boolean = false
): boolean {
  const status = checkTrialStatus(trialEndsAt, hasActiveSubscription);
  return status.isActive || status.hasSubscription;
}

/**
 * Calcula a data de término do trial (hoje + 14 dias)
 */
export function calculateTrialEndDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date;
}

/**
 * Remove o trial ao converter para assinatura paga
 */
export function convertTrialToSubscription(): null {
  return null; // Setar trialEndsAt = null significa que converteu
}
