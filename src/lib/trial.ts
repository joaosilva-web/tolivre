export type TrialStatus = {
  hasSubscription: boolean;
  isTrialing: boolean;
  expired: boolean;
  daysRemaining: number;
  trialEndsAt: Date | null;
};

function normalizeDate(value: Date | string | null): Date | null {
  if (!value) return null;
  return value instanceof Date ? value : new Date(value);
}

function calculateDaysRemaining(trialEndsAt: Date | null): number {
  if (!trialEndsAt) return 0;
  const now = new Date();
  const diff = trialEndsAt.getTime() - now.getTime();
  if (diff <= 0) return 0;
  const dayMs = 1000 * 60 * 60 * 24;
  return Math.ceil(diff / dayMs);
}

export function checkTrialStatus(
  trialEndsAt: Date | string | null,
  hasActiveSubscription: boolean,
): TrialStatus {
  const endDate = normalizeDate(trialEndsAt);
  const daysRemaining = calculateDaysRemaining(endDate);
  const isTrialing = !!endDate && daysRemaining > 0;
  const expired = !!endDate && daysRemaining === 0;

  return {
    hasSubscription: hasActiveSubscription,
    isTrialing,
    expired,
    daysRemaining,
    trialEndsAt: endDate,
  };
}

export function canAccessSystem(
  trialEndsAt: Date | string | null,
  hasActiveSubscription: boolean,
): boolean {
  if (hasActiveSubscription) return true;
  const status = checkTrialStatus(trialEndsAt, hasActiveSubscription);
  // Allow access while trial is active; block if expired or missing.
  return status.isTrialing;
}
