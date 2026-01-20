# Configuração do Stripe

## Migração do Mercado Pago para Stripe

A aplicação foi migrada do Mercado Pago para Stripe para processamento de pagamentos. Siga os passos abaixo para configurar:

## 1. Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_..."  # Para desenvolvimento
STRIPE_WEBHOOK_SECRET="whsec_..." # Para webhooks
```

### Obtendo as Chaves do Stripe

1. Acesse [Stripe Dashboard](https://dashboard.stripe.com/)
2. Vá para **Developers > API Keys**
3. Copie a **Secret Key** (começa com `sk_test_` para desenvolvimento)
4. Para webhooks, vá para **Developers > Webhooks** e crie um webhook

## 2. Configuração do Webhook

### URL do Webhook
```
https://yourdomain.com/api/subscription/stripe-webhook
```

### Eventos Necessários
Configure o webhook para receber estes eventos:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`
- `customer.subscription.updated`

### Webhook Secret
Após criar o webhook, copie o **Webhook Signing Secret** para a variável `STRIPE_WEBHOOK_SECRET`.

## 3. Testes

Para testar em desenvolvimento:

1. Use chaves de teste do Stripe (`sk_test_...`)
2. Use cartões de teste do Stripe:
   - **Sucesso**: `4242 4242 4242 4242`
   - **Falha**: `4000 0000 0000 0002`
3. Configure o webhook para apontar para seu localhost usando ngrok ou similar

## 4. Produção

Para produção:

1. Use chaves live do Stripe (`sk_live_...`)
2. Configure webhooks para seu domínio de produção
3. Teste thoroughly antes de ir para produção

## 5. Diferenças da Implementação

### Mercado Pago → Stripe

- **Preferências** → **Checkout Sessions**
- **Pagamentos únicos** → **Subscriptions recorrentes**
- **Notificações manuais** → **Webhooks automáticos**
- **External Reference** → **Metadata**

### Novos Endpoints

- `POST /api/subscriptions/checkout` - Cria sessão de checkout
- `POST /api/subscription/stripe-webhook` - Processa webhooks

### Novos Campos no Banco

```sql
-- Subscription table
stripeSubscriptionId TEXT UNIQUE
stripeCustomerId TEXT
stripePriceId TEXT

-- Payment table
stripePaymentIntentId TEXT UNIQUE
```

## 6. Teste da Migração

Para testar se a migração funcionou:

1. Execute `npm run dev`
2. Vá para `/escolher-plano`
3. Selecione um plano
4. Deve redirecionar para o checkout do Stripe
5. Após pagamento, deve ativar a assinatura

## 7. Rollback (se necessário)

Se precisar voltar para Mercado Pago:

1. Restaure as dependências: `npm install mercadopago`
2. Restaure os arquivos deletados (se tiver backup)
3. Reconfigure as variáveis de ambiente do Mercado Pago
4. Teste novamente

## Suporte

Para dúvidas sobre Stripe:
- [Documentação Stripe](https://stripe.com/docs)
- [Stripe Dashboard](https://dashboard.stripe.com/)
- [Test Cards](https://stripe.com/docs/testing)
