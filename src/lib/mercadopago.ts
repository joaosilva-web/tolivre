import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

// Validar variáveis de ambiente
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado");
}

// Configurar cliente do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
  },
});

export const preferenceClient = new Preference(client);
export const paymentClient = new Payment(client);

export default client;
