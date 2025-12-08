# Sistema de Trial de 14 Dias - ToLivre

## Visão Geral

Implementação completa do sistema de trial gratuito de 14 dias conforme anunciado no site. Após o término do trial, o usuário é obrigado a escolher um plano pago para continuar usando a plataforma.

## Arquitetura

### 1. Modelo de Dados

**User Model** - Adicionado campo `trialEndsAt`:
```prisma
trialEndsAt DateTime? // Data de término do período de teste (null = sem trial ou já converteu)
```

- `trialEndsAt != null` e `> NOW()` = Trial ativo
- `trialEndsAt != null` e `< NOW()` = Trial expirado (bloquear acesso)
- `trialEndsAt == null` = Usuário converteu para assinatura paga (acesso liberado)

### 2. Fluxo de Registro

**Arquivo**: `src/app/api/register/route.ts`

Ao criar novo usuário:
```typescript
const trialEndsAt = new Date();
trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14 dias a partir de hoje

await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    trialEndsAt, // Trial automático
  },
});
```

### 3. Verificação de Acesso

**Arquivo**: `src/lib/trial.ts`

Funções utilitárias:
- `checkTrialStatus()` - Retorna status detalhado do trial
- `canAccessSystem()` - Verifica se usuário pode acessar (trial ativo OU assinatura paga)
- `calculateTrialEndDate()` - Calcula data de término (hoje + 14 dias)

**Arquivo**: `src/app/dashboard/layout.tsx`

Bloqueio no layout do dashboard:
```typescript
const hasActiveSubscription = userWithTrial?.company?.subscription?.status === "ACTIVE";

if (!canAccessSystem(userWithTrial?.trialEndsAt || null, hasActiveSubscription)) {
  redirect("/escolher-plano"); // Força escolha de plano
}
```

### 4. Página de Escolha de Plano

**Arquivo**: `src/app/escolher-plano/page.tsx`

- Exibida quando trial expira
- Mostra planos disponíveis (Professional e Enterprise)
- Integração com Mercado Pago para pagamento
- Botão "Escolher Plano" cria checkout e redireciona

Planos disponíveis:
- **Professional**: R$ 49/mês
  - Agendamentos ilimitados
  - Até 3 profissionais
  - Integração WhatsApp
  - Lembretes automáticos
  - Relatórios avançados
  - Suporte prioritário

- **Enterprise**: R$ 149/mês
  - Tudo do Professional +
  - Profissionais ilimitados
  - API completa
  - White label
  - Treinamento dedicado
  - Suporte 24/7

### 5. Banner de Aviso

**Arquivo**: `src/components/trial-banner.tsx`

Banner no topo do dashboard exibido quando:
- Trial tem 7 dias ou menos
- Não tem assinatura ativa
- Usuário não dispensou nas últimas 24h

Cores do banner:
- Verde/Amarelo: 7-6 dias restantes
- Laranja: 5-3 dias restantes
- Vermelho: 2-0 dias restantes

### 6. Processamento de Pagamento

#### Criar Checkout
**Arquivo**: `src/app/api/subscription/create-checkout/route.ts`

1. Valida plano escolhido
2. Cria preferência no Mercado Pago
3. Salva intenção de pagamento no banco
4. Retorna URL do checkout

#### Webhook
**Arquivo**: `src/app/api/subscription/webhook/route.ts`

Quando Mercado Pago confirma pagamento:
1. Atualiza `Company.contrato` (FREE → PRO ou ENTERPRISE)
2. Cria/atualiza `Subscription` com status ACTIVE
3. **Remove trial**: `User.trialEndsAt = null`
4. Atualiza `Payment` com status PAID

Após conversão, usuário tem acesso permanente (enquanto assinatura estiver ativa).

## URLs de Redirecionamento

- **Success**: `/dashboard?payment=success`
- **Failure**: `/escolher-plano?payment=failure`
- **Pending**: `/dashboard?payment=pending`

## Variáveis de Ambiente Necessárias

```env
# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=seu_token_aqui

# App URL (para callbacks)
NEXT_PUBLIC_APP_URL=https://ocupae.com.br
```

## Migration para Produção

**Arquivo**: `prisma/migrations/20251208000000_add_trial_ends_at/migration.sql`

Para aplicar em produção:
```bash
# Aplicar migration
npx prisma migrate deploy

# OU executar manualmente no PostgreSQL:
ALTER TABLE "User" ADD COLUMN "trialEndsAt" TIMESTAMP(3);
UPDATE "User" SET "trialEndsAt" = NOW() + INTERVAL '14 days' WHERE "trialEndsAt" IS NULL;

# Regenerar Prisma Client
npx prisma generate
```

## Fluxo Completo

### Novo Usuário
1. Registra em `/login?tab=register`
2. Sistema define `trialEndsAt = hoje + 14 dias`
3. Usuário pode usar todas as funcionalidades
4. Banner aparece quando faltam ≤7 dias
5. Ao expirar, redireciona para `/escolher-plano`

### Escolha de Plano
1. Usuário escolhe plano
2. Sistema cria checkout no Mercado Pago
3. Usuário paga
4. Webhook processa pagamento
5. Sistema ativa assinatura e remove trial
6. Usuário volta ao dashboard com acesso total

### Usuário com Assinatura Ativa
- `trialEndsAt = null`
- `Subscription.status = ACTIVE`
- Acesso liberado permanentemente
- Banner não aparece

## Testes

### Testar Trial Expirando
```typescript
// No console do navegador (localStorage):
localStorage.removeItem("trialBannerDismissed");
```

### Simular Trial Expirado
```sql
-- No banco de dados:
UPDATE "User" SET "trialEndsAt" = NOW() - INTERVAL '1 day' WHERE email = 'teste@example.com';
```

### Testar Conversão
1. Criar usuário teste
2. Acessar dashboard (trial ativo)
3. Aguardar 14 dias OU alterar `trialEndsAt` manualmente
4. Tentar acessar dashboard → deve redirecionar para `/escolher-plano`
5. Escolher plano → pagar no Mercado Pago
6. Webhook processa → acesso liberado

## Segurança

- **Rate limiting**: API de registro já tem rate limit por IP
- **Autenticação**: Todos os endpoints de assinatura exigem JWT válido
- **Validação**: Webhook valida metadata do Mercado Pago
- **Idempotência**: Webhook pode ser chamado múltiplas vezes (upsert)

## Monitoramento

Logs importantes:
```
[Mercado Pago Webhook] Notificação recebida
[Mercado Pago Webhook] Pagamento aprovado para company X
[Mercado Pago Webhook] Assinatura ativada: PRO para company X
[Mercado Pago Webhook] Pagamento rejeitado para company X
```

## Melhorias Futuras

1. **Email de aviso**: Enviar email quando faltam 7, 3 e 1 dia
2. **Dashboard de assinatura**: Página para usuário gerenciar assinatura
3. **Cancelamento**: Permitir cancelar assinatura (mantém até fim do período)
4. **Renovação automática**: Implementar cobrança recorrente
5. **Trial estendido**: Permitir admin estender trial manualmente
6. **Analytics**: Tracking de conversão trial → pago

## Arquivos Modificados/Criados

### Schema
- `prisma/schema.prisma` - Adicionado `trialEndsAt` no User

### API Routes
- `src/app/api/register/route.ts` - Define trial ao registrar
- `src/app/api/auth/whoami/route.ts` - Inclui `trialEndsAt` na resposta
- `src/app/api/subscription/create-checkout/route.ts` - Cria checkout Mercado Pago
- `src/app/api/subscription/webhook/route.ts` - Processa callback de pagamento

### Pages
- `src/app/escolher-plano/page.tsx` - Página de seleção de plano obrigatória
- `src/app/dashboard/layout.tsx` - Bloqueio de acesso + banner

### Components
- `src/components/trial-banner.tsx` - Banner de aviso no dashboard

### Utilities
- `src/lib/trial.ts` - Funções de verificação de trial

### Migrations
- `prisma/migrations/20251208000000_add_trial_ends_at/migration.sql` - SQL da migration

## Status de Implementação

✅ **Completo e pronto para produção**

Todos os componentes foram implementados e testados:
- [x] Schema atualizado
- [x] Registro define trial automaticamente
- [x] Verificação de acesso no dashboard
- [x] Página de escolha de plano
- [x] Banner de aviso
- [x] Integração com Mercado Pago
- [x] Webhook de conversão
- [x] Remoção de trial após pagamento
- [x] Migration SQL

## Deploy Checklist

Antes de fazer deploy em produção:

1. ✅ Verificar variáveis de ambiente (`MERCADOPAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_APP_URL`)
2. ✅ Aplicar migration no banco (`npx prisma migrate deploy`)
3. ✅ Regenerar Prisma Client (`npx prisma generate`)
4. ✅ Configurar webhook no Mercado Pago (apontar para `/api/subscription/webhook`)
5. ✅ Testar fluxo completo em staging
6. ✅ Restart do servidor Node.js

---

**Documentação gerada em**: 08/12/2025
**Versão**: 1.0.0
