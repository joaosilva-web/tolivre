/**
 * Utilitários para trabalhar com Sentry
 * Facilita o envio de erros customizados e contexto adicional
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Captura um erro customizado com contexto adicional
 *
 * @example
 * ```ts
 * try {
 *   await createAppointment(data);
 * } catch (error) {
 *   captureError(error, {
 *     context: "create-appointment",
 *     extra: { appointmentData: data },
 *     user: { id: userId, email: userEmail }
 *   });
 *   throw error;
 * }
 * ```
 */
export function captureError(
  error: unknown,
  options?: {
    context?: string;
    extra?: Record<string, unknown>;
    user?: { id: string; email?: string; username?: string };
    level?: "fatal" | "error" | "warning" | "info" | "debug";
  },
) {
  Sentry.withScope((scope) => {
    if (options?.context) {
      scope.setContext("custom", { context: options.context });
    }

    if (options?.extra) {
      scope.setExtras(options.extra);
    }

    if (options?.user) {
      scope.setUser(options.user);
    }

    if (options?.level) {
      scope.setLevel(options.level);
    }

    Sentry.captureException(error);
  });
}

/**
 * Captura uma mensagem customizada (não é um erro, apenas informação)
 *
 * @example
 * ```ts
 * captureMessage("Payment webhook received but subscription not found", {
 *   level: "warning",
 *   extra: { webhookData: data }
 * });
 * ```
 */
export function captureMessage(
  message: string,
  options?: {
    level?: "fatal" | "error" | "warning" | "info" | "debug";
    extra?: Record<string, unknown>;
  },
) {
  Sentry.withScope((scope) => {
    if (options?.extra) {
      scope.setExtras(options.extra);
    }

    Sentry.captureMessage(message, options?.level || "info");
  });
}

/**
 * Adiciona breadcrumb (rastro) para ajudar a debugar o contexto do erro
 *
 * @example
 * ```ts
 * addBreadcrumb({
 *   category: "appointment",
 *   message: "User selected service",
 *   data: { serviceId, serviceName }
 * });
 * ```
 */
export function addBreadcrumb(breadcrumb: {
  category: string;
  message: string;
  level?: "fatal" | "error" | "warning" | "info" | "debug";
  data?: Record<string, unknown>;
}) {
  Sentry.addBreadcrumb(breadcrumb);
}

/**
 * Define o usuário atual para contexto do Sentry
 * Útil para identificar quem teve o erro
 *
 * @example
 * ```ts
 * setUser({ id: user.id, email: user.email });
 * ```
 */
export function setUser(user: {
  id: string;
  email?: string;
  username?: string;
}) {
  Sentry.setUser(user);
}

/**
 * Remove o usuário do contexto (útil no logout)
 */
export function clearUser() {
  Sentry.setUser(null);
}
