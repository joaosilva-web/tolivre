export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

export const onRequestError = async (
  err: Error,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string };
  },
) => {
  // Log the error for debugging
  console.error("Request error:", {
    error: err.message,
    path: request.path,
    method: request.method,
  });

  // Sentry will automatically capture this if initialized
};
