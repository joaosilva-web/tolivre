interface SendWhatsAppOpts {
  to: string; // client phone
  from: string; // company phone
  message: string;
}

/**
 * Send a WhatsApp message using Evolution API.
 *
 * Configure via env:
 * - EVOLUTION_API_URL (full URL to the message send endpoint, e.g. https://api.evolution-api.com/v2/messages)
 * - EVOLUTION_API_TOKEN (Bearer token)
 *
 * This helper is intentionally permissive about the exact payload shape because
 * different Evolution installations may require a slightly different JSON body.
 * It tries a common shape: { from, to, type: 'text', text: { body } }.
 */
export async function sendWhatsAppMessage(opts: SendWhatsAppOpts) {
  const url =
    process.env.EVOLUTION_API_URL || process.env.EVOLUTION_WHATSAPP_ENDPOINT;
  const token =
    process.env.EVOLUTION_API_TOKEN || process.env.EVOLUTION_API_KEY;
  const headerName = process.env.EVOLUTION_API_HEADER || ""; // optional custom header name
  const defaultCountry = (process.env.EVOLUTION_DEFAULT_COUNTRY || "").replace(
    /\D/g,
    ""
  );
  if (!url || !token) {
    const msg =
      "Evolution API not configured (EVOLUTION_API_URL/EVOLUTION_API_TOKEN)";
    console.warn(msg);
    return { ok: false, error: msg } as const;
  }

  const payload = {
    from: opts.from,
    to: opts.to,
    type: "text",
    text: { body: opts.message },
  };

  // normalize phone numbers to digits-only and optionally add default country code
  const normalize = (p?: string) => {
    if (!p) return undefined;
    let digits = String(p).replace(/\D/g, "");
    if (!digits) return undefined;
    // if defaultCountry provided and number doesn't start with it and looks local-ish, prefix
    if (
      defaultCountry &&
      !digits.startsWith(defaultCountry) &&
      digits.length <= 11
    ) {
      digits = `${defaultCountry}${digits}`;
    }
    return digits;
  };

  const toNormalized = normalize(opts.to);
  const fromNormalized = normalize(opts.from);

  // log payload for debugging (show normalized numbers)
  try {
    console.log("[evolution] Sending WhatsApp payload to", url);
    console.log("[evolution] raw payload:", JSON.stringify(payload));
    console.log("[evolution] normalized phones:", {
      to: toNormalized,
      from: fromNormalized,
    });

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (headerName) {
      headers[headerName] = token;
    } else {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // if we normalized phones, update payload to use them
    if (toNormalized) payload.to = toNormalized;
    if (fromNormalized) payload.from = fromNormalized;

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.error("[evolution] API error", res.status, text);
      return { ok: false, status: res.status, body: text } as const;
    }

    console.log("[evolution] API success", res.status, text);
    return { ok: true, status: res.status, body: text } as const;
  } catch (err) {
    console.error(
      "[evolution] Failed to send WhatsApp via Evolution API:",
      err
    );
    return { ok: false, error: String(err) } as const;
  }
}
