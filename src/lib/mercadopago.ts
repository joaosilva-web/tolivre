import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Validar variáveis de ambiente
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado");
}

// Detectar se está usando credenciais de teste em produção
const isTestCredential = process.env.MERCADOPAGO_ACCESS_TOKEN.includes("TEST-");
const isProduction = process.env.NODE_ENV === "production";

if (isTestCredential && isProduction) {
  console.warn(
    "[MercadoPago] ⚠️ AVISO: Usando credenciais TEST em ambiente de PRODUÇÃO. " +
      "O checkout pode não funcionar corretamente. " +
      "Use credenciais de produção para domínios públicos."
  );
}

// Configurar cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 10000, // Aumentar timeout para 10s
  },
});

export const preferenceClient = new Preference(client);
export const paymentClient = new Payment(client);

export default client;
