import Stripe from "stripe";

// Validar variáveis de ambiente
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY não configurado");
}

// Detectar se está usando chaves de teste em produção
const isTestKey = process.env.STRIPE_SECRET_KEY.startsWith("sk_test_");
const isProduction = process.env.NODE_ENV === "production";

if (!isTestKey && !isProduction) {
  console.warn(
    "[Stripe] ⚠️ AVISO: Usando chaves de produção em ambiente de desenvolvimento. " +
      "Use chaves de teste (sk_test_...) para desenvolvimento.",
  );
}

// Configurar cliente do Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia" as any,
  timeout: 10000, // Aumentar timeout para 10s
});

export default stripe;

// Função helper para criar preços (price) no Stripe
export async function createOrRetrievePrice(
  productId: string,
  amount: number,
  currency: string = "brl",
  name: string,
) {
  try {
    const unitAmount = Math.round(amount * 100); // Stripe exige inteiro em centavos

    // Buscar se já existe um preço ativo para este produto com o mesmo valor
    const existingPrices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    const existingPrice = existingPrices.data.find(
      (price) => price.unit_amount === unitAmount,
    );

    if (existingPrice) {
      return existingPrice;
    }

    // Criar novo preço se não existir
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency: currency,
      recurring: {
        interval: "month",
        interval_count: 1,
      },
    });

    return price;
  } catch (error) {
    console.error("[Stripe] Erro ao criar/buscar preço:", error);
    throw error;
  }
}

// Função helper para criar produtos no Stripe
export async function createOrRetrieveProduct(
  productId: string,
  name: string,
  description?: string,
) {
  try {
    // Tentar buscar produto existente
    const existingProduct = await stripe.products
      .retrieve(productId)
      .catch(() => null);

    if (existingProduct) {
      return existingProduct;
    }

    // Criar novo produto se não existir
    const product = await stripe.products.create({
      id: productId,
      name: name,
      description: description,
    });

    return product;
  } catch (error) {
    console.error("[Stripe] Erro ao criar/buscar produto:", error);
    throw error;
  }
}

// Função helper para criar sessão de checkout
export async function createCheckoutSession({
  priceId,
  customerEmail,
  customerName,
  successUrl,
  cancelUrl,
  metadata,
}: {
  priceId: string;
  customerEmail: string;
  customerName?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata,
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Erro ao criar sessão de checkout:", error);
    throw error;
  }
}
