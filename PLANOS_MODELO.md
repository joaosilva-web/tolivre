# Modelo de Planos TôLivre

## Visão Geral

O TôLivre agora opera com um modelo de assinatura baseado em **trial de 14 dias** seguido de planos pagos escalonados conforme as necessidades do negócio.

## Planos Disponíveis

### 1. Básico - R$ 69,90/mês

**Ideal para:** Profissionais autônomos

**Funcionalidades:**

- ✅ Agendamentos ilimitados
- ✅ 1 profissional
- ✅ Gestão de clientes
- ✅ Gestão de serviços
- ✅ Calendário semanal
- ✅ Horários de funcionamento
- ✅ Exportação de dados (CSV)
- ✅ Suporte por email
- ❌ Integração WhatsApp
- ❌ Lembretes automáticos
- ❌ Relatórios e estatísticas
- ❌ Página de agendamento pública

**ContractType:** `BASIC`

---

### 2. Profissional - R$ 99,90/mês ⭐ MAIS POPULAR

**Ideal para:** Pequenos negócios com equipe

**Funcionalidades:**

- ✅ Tudo do plano Básico +
- ✅ Até 3 profissionais
- ✅ Integração WhatsApp
- ✅ Lembretes automáticos via WhatsApp
- ✅ Relatórios e estatísticas (dashboard)
- ✅ Página de agendamento pública (`/[slug]`)
- ✅ Personalização de cores
- ✅ Upload de logo
- ✅ Tags e categorias
- ✅ Suporte prioritário
- ❌ Profissionais ilimitados
- ❌ Sistema de comissões

**ContractType:** `PROFESSIONAL`

---

### 3. Business - R$ 169,90/mês

**Ideal para:** Empresas estabelecidas

**Funcionalidades:**

- ✅ Tudo do plano Profissional +
- ✅ Profissionais ilimitados
- ✅ Sistema de comissões
- ✅ Fotos dos profissionais
- ✅ Múltiplos serviços por agendamento
- ✅ Gestão de exceções de horário
- ✅ Notificações em tempo real (WebSocket)
- ✅ Assinaturas e pagamentos (Subscription model)
- ✅ Suporte prioritário por WhatsApp
- ✅ Migração assistida
- ✅ Treinamento personalizado
- ✅ Backup automático diário

**ContractType:** `BUSINESS`

---

## Desconto Anual

Todos os planos têm **20% de desconto** no pagamento anual:

| Plano        | Mensal    | Anual       | Economia  |
| ------------ | --------- | ----------- | --------- |
| Básico       | R$ 69,90  | R$ 670,32   | R$ 168,48 |
| Profissional | R$ 99,90  | R$ 958,32   | R$ 240,48 |
| Business     | R$ 169,90 | R$ 1.630,32 | R$ 408,48 |

## Trial de 14 Dias

- **Duração:** 14 dias a partir da criação da empresa
- **Acesso:** Funcionalidades completas do plano escolhido
- **Sem cartão:** Não é necessário cartão de crédito para começar
- **Notificações:** Sistema alerta quando faltam 3 dias para expirar

## Funcionalidades por Módulo

### Core (Todos os planos)

- Gestão de clientes
- Gestão de serviços
- Agendamentos ilimitados
- Calendário semanal
- Horários de funcionamento
- Exportação de dados CSV

### Premium (Profissional e Business)

- Integração WhatsApp (UAZAPI)
- Lembretes automáticos
- Página pública de agendamento
- Relatórios e estatísticas
- Tags e categorias
- Personalização visual

### Business Only

- Profissionais ilimitados
- Sistema de comissões (`Professional.commission`)
- Fotos de profissionais (`Professional.photoUrl`)
- WebSocket (notificações em tempo real)
- Sistema de assinaturas (`Subscription` model)
- Exceções de horário (`WorkingHourException`)

## Estrutura de Banco de Dados

```prisma
enum ContractType {
  TRIAL         // Durante período de teste
  BASIC         // Plano Básico
  PROFESSIONAL  // Plano Profissional
  BUSINESS      // Plano Business
}

model Company {
  contrato           ContractType @default(TRIAL)
  trialEndsAt        DateTime?
  subscriptionStatus String?      @default("trial")
  // ... outros campos
}
```

## Lógica de Restrições

### Profissionais

- **Básico:** Máximo 1 profissional
- **Profissional:** Máximo 3 profissionais
- **Business:** Ilimitado

### WhatsApp

- **Básico:** Sem acesso
- **Profissional+:** Integração completa via UAZAPI

### Relatórios

- **Básico:** Apenas exportação CSV
- **Profissional+:** Dashboard completo com estatísticas

### Página Pública

- **Básico:** Sem página pública
- **Profissional+:** `/[slug]` com personalização

## Migração de Dados

Empresas existentes foram migradas seguindo este mapeamento:

| Tipo Antigo | Tipo Novo    |
| ----------- | ------------ |
| FREE        | TRIAL        |
| PRO         | BASIC        |
| PREMIUM     | PROFESSIONAL |
| ENTERPRISE  | BUSINESS     |

## Próximos Passos

1. ✅ Implementar componente TrialBanner no dashboard
2. ✅ Implementar verificação de limites por plano
3. ⏳ Criar fluxo de upgrade/downgrade
4. ⏳ Integrar com gateway de pagamento (Mercado Pago)
5. ⏳ Implementar sistema de faturas
6. ⏳ Criar notificações de expiração de trial
7. ⏳ Implementar bloqueio de funcionalidades por plano
