# 📚 Documentação da API - TôLivre

> Sistema de agendamentos online para profissionais autônomos e pequenos negócios.

**Base URL:** `https://tolivre.app/api` (produção) ou `http://localhost:3000/api` (desenvolvimento)

**Formato de resposta:** JSON com envelope padrão

```json
// Sucesso
{
  "success": true,
  "data": { ... }
}

// Erro
{
  "success": false,
  "error": "Mensagem de erro",
  "errorDetails": { ... } // opcional
}
```

---

## 🔐 Autenticação

A API utiliza **cookies httpOnly** para autenticação. O token `auth-token` é retornado automaticamente nos endpoints de login e registro.

### Headers Necessários

```bash
# Para requisições autenticadas
Cookie: auth-token=SEU_TOKEN_AQUI

# Para criar novos recursos
Content-Type: application/json
```

---

## 📋 Índice de Endpoints

1. [Autenticação](#-autenticação-1)
2. [Usuários](#-usuários)
3. [Empresas](#-empresas)
4. [Serviços](#-serviços)
5. [Agendamentos](#-agendamentos)
6. [Clientes](#-clientes)
7. [Profissionais](#-profissionais)
8. [Assinaturas e Pagamentos](#-assinaturas-e-pagamentos)
9. [Suporte](#-suporte)
10. [Segurança (2FA)](#-segurança-2fa)
11. [Dashboard e Relatórios](#-dashboard-e-relatórios)
12. [WhatsApp](#-whatsapp)
13. [Webhooks](#-webhooks)

---

## 🔑 Autenticação

### POST /api/auth/login

Autentica um usuário e retorna cookie de sessão.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "SenhaSegura123"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "clx123abc",
      "email": "joao@example.com",
      "name": "João Silva",
      "role": "OWNER",
      "companyId": "clx456def",
      "emailVerified": true
    }
  }
}
```

**Erros:**

- `401` - Credenciais inválidas
- `403` - Email não verificado
- `429` - Muitas tentativas (rate limit)

---

### POST /api/register

Cria nova conta de usuário e empresa.

**Request:**

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "SenhaSegura123",
    "companyName": "Barbearia João",
    "recaptchaToken": "03AGdBq..."
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "message": "Usuário criado com sucesso! Verifique seu email para ativar sua conta.",
    "userId": "clx123abc"
  }
}
```

**Erros:**

- `400` - Dados inválidos ou email já cadastrado
- `422` - reCAPTCHA inválido

---

### POST /api/auth/forgot-password

Solicita recuperação de senha via email.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Se o email existir, você receberá instruções para redefinir sua senha"
  }
}
```

> ⚠️ Por segurança, sempre retorna sucesso mesmo se o email não existir.

---

### POST /api/auth/reset-password

Redefine senha usando token recebido por email.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "64_caracteres_hex_token",
    "password": "NovaSenhaSegura123"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Senha redefinida com sucesso"
  }
}
```

**Erros:**

- `400` - Token inválido, expirado ou já usado
- `422` - Senha não atende requisitos (min 8 chars, maiúscula, minúscula, número)

---

### POST /api/auth/verify-email

Verifica email do usuário após registro.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "token": "verification_token_from_email"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Email verificado com sucesso"
  }
}
```

---

### GET /api/auth/whoami

Retorna dados do usuário autenticado.

**Request:**

```bash
curl http://localhost:3000/api/auth/whoami \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "email": "joao@example.com",
    "name": "João Silva",
    "role": "OWNER",
    "companyId": "clx456def",
    "emailVerified": true,
    "twoFactorEnabled": false,
    "company": {
      "id": "clx456def",
      "name": "Barbearia João",
      "slug": "barbearia-joao"
    }
  }
}
```

---

### POST /api/auth/logout

Encerra sessão do usuário.

**Request:**

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Logout realizado com sucesso"
  }
}
```

---

## 👥 Usuários

### GET /api/users

Lista usuários da empresa (apenas OWNER/MANAGER).

**Request:**

```bash
curl http://localhost:3000/api/users \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx123abc",
      "name": "João Silva",
      "email": "joao@example.com",
      "role": "OWNER",
      "createdAt": "2026-01-15T10:00:00Z",
      "services": ["clx789ghi", "clx012jkl"]
    },
    {
      "id": "clx456def",
      "name": "Maria Santos",
      "email": "maria@example.com",
      "role": "EMPLOYEE",
      "createdAt": "2026-02-01T14:30:00Z"
    }
  ]
}
```

---

### POST /api/users/photo

Upload de foto do profissional.

**Request:**

```bash
curl -X POST http://localhost:3000/api/users/photo \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -F "photo=@foto.jpg"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "photoUrl": "https://storage.example.com/users/clx123abc/photo.jpg"
  }
}
```

**Limites:**

- Tamanho máximo: 5MB
- Formatos: JPEG, PNG, WebP

---

## 🏢 Empresas

### GET /api/company

Retorna dados da empresa do usuário autenticado.

**Request:**

```bash
curl http://localhost:3000/api/company \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "name": "Barbearia João",
    "slug": "barbearia-joao",
    "createdAt": "2026-01-15T10:00:00Z",
    "subscriptionPlan": "PREMIUM",
    "subscriptionStatus": "ACTIVE",
    "trialEndsAt": null
  }
}
```

---

### PUT /api/company

Atualiza dados da empresa.

**Request:**

```bash
curl -X PUT http://localhost:3000/api/company \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Barbearia João - Premium",
    "whatsapp": "5511999999999",
    "instagram": "@barbearia_joao"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx456def",
    "name": "Barbearia João - Premium",
    "whatsapp": "5511999999999",
    "instagram": "@barbearia_joao"
  }
}
```

---

### GET /api/company/page

Retorna configuração da página pública de agendamento.

**Request:**

```bash
curl http://localhost:3000/api/company/page \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx789page",
    "slug": "barbearia-joao",
    "title": "Barbearia João",
    "description": "A melhor barbearia da região",
    "primaryColor": "#1a73e8",
    "accentColor": "#fbbc04",
    "logo": "https://...",
    "coverImage": "https://...",
    "showServices": true,
    "showTestimonials": true
  }
}
```

---

### POST /api/company/page

Cria/atualiza página pública de agendamento.

**Request:**

```bash
curl -X POST http://localhost:3000/api/company/page \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "barbearia-joao",
    "title": "Barbearia João",
    "description": "A melhor barbearia da região",
    "primaryColor": "#1a73e8",
    "whatsapp": "5511999999999",
    "showServices": true
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "clx789page",
    "slug": "barbearia-joao",
    "url": "https://tolivre.app/barbearia-joao"
  }
}
```

---

## 🛠️ Serviços

### GET /api/services

Lista serviços da empresa.

**Request:**

```bash
curl http://localhost:3000/api/services \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx789ghi",
      "name": "Corte de Cabelo",
      "description": "Corte masculino tradicional",
      "price": 50.0,
      "duration": 30,
      "color": "#1a73e8",
      "active": true
    },
    {
      "id": "clx012jkl",
      "name": "Barba",
      "price": 30.0,
      "duration": 20
    }
  ]
}
```

---

### POST /api/services

Cria novo serviço.

**Request:**

```bash
curl -X POST http://localhost:3000/api/services \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Corte + Barba",
    "description": "Pacote completo",
    "price": 70.00,
    "duration": 50,
    "color": "#fbbc04"
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "clx345mno",
    "name": "Corte + Barba",
    "price": 70.0,
    "duration": 50
  }
}
```

---

### PUT /api/services/[id]

Atualiza serviço existente.

**Request:**

```bash
curl -X PUT http://localhost:3000/api/services/clx789ghi \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 55.00
  }'
```

---

### DELETE /api/services/[id]

Remove serviço (apenas se não tiver agendamentos futuros).

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/services/clx789ghi \
  -H "Cookie: auth-token=SEU_TOKEN"
```

---

## 📅 Agendamentos

### GET /api/appointments

Lista agendamentos da empresa com filtros.

**Query Parameters:**

- `startDate` - Data inicial (ISO 8601)
- `endDate` - Data final (ISO 8601)
- `status` - Status do agendamento (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- `professionalId` - Filtrar por profissional
- `clientId` - Filtrar por cliente

**Request:**

```bash
curl "http://localhost:3000/api/appointments?startDate=2026-02-10T00:00:00Z&status=CONFIRMED" \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx678appt",
      "dateTime": "2026-02-15T14:00:00Z",
      "status": "CONFIRMED",
      "clientName": "Carlos Silva",
      "clientPhone": "11999999999",
      "clientEmail": "carlos@example.com",
      "service": {
        "id": "clx789ghi",
        "name": "Corte de Cabelo",
        "price": 50.0,
        "duration": 30
      },
      "professional": {
        "id": "clx123abc",
        "name": "João Silva"
      },
      "notes": "Cliente prefere corte baixo",
      "reminderSent": true
    }
  ]
}
```

---

### POST /api/appointments

Cria novo agendamento (interno - dashboard).

**Request:**

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dateTime": "2026-02-15T14:00:00Z",
    "serviceId": "clx789ghi",
    "professionalId": "clx123abc",
    "clientName": "Carlos Silva",
    "clientPhone": "11999999999",
    "clientEmail": "carlos@example.com",
    "notes": "Cliente prefere corte baixo"
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "clx678appt",
    "dateTime": "2026-02-15T14:00:00Z",
    "status": "CONFIRMED",
    "confirmationCode": "ABC123"
  }
}
```

**Erros:**

- `409` - Horário já ocupado
- `400` - Horário fora do expediente

---

### POST /api/appointments/public

Cria agendamento via página pública (sem autenticação).

**Request:**

```bash
curl -X POST http://localhost:3000/api/appointments/public \
  -H "Content-Type: application/json" \
  -d '{
    "companySlug": "barbearia-joao",
    "dateTime": "2026-02-15T14:00:00Z",
    "serviceId": "clx789ghi",
    "professionalId": "clx123abc",
    "clientName": "Carlos Silva",
    "clientPhone": "11999999999",
    "clientEmail": "carlos@example.com",
    "recaptchaToken": "03AGdBq..."
  }'
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "clx678appt",
    "confirmationCode": "ABC123",
    "message": "Agendamento confirmado! Você receberá um lembrete por WhatsApp/email."
  }
}
```

**Rate Limiting:** 5 agendamentos por IP a cada 15 minutos.

---

### PUT /api/appointments/[id]

Atualiza agendamento existente.

**Request:**

```bash
curl -X PUT http://localhost:3000/api/appointments/clx678appt \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "COMPLETED",
    "notes": "Cliente satisfeito com o resultado"
  }'
```

---

### DELETE /api/appointments/[id]

Cancela agendamento.

**Request:**

```bash
curl -X DELETE http://localhost:3000/api/appointments/clx678appt \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "message": "Agendamento cancelado com sucesso"
  }
}
```

---

## 👤 Clientes

### GET /api/clients

Lista clientes da empresa.

**Query Parameters:**

- `search` - Buscar por nome, email ou telefone
- `tag` - Filtrar por tag

**Request:**

```bash
curl "http://localhost:3000/api/clients?search=Carlos" \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx901client",
      "name": "Carlos Silva",
      "email": "carlos@example.com",
      "phone": "11999999999",
      "totalAppointments": 5,
      "lastAppointment": "2026-02-01T14:00:00Z",
      "tags": ["VIP", "Recorrente"]
    }
  ]
}
```

---

### POST /api/clients

Cria novo cliente.

**Request:**

```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Silva",
    "email": "carlos@example.com",
    "phone": "11999999999",
    "notes": "Cliente fiel, sempre pontual"
  }'
```

---

### GET /api/clients/[id]

Retorna detalhes de um cliente específico.

**Request:**

```bash
curl http://localhost:3000/api/clients/clx901client \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx901client",
    "name": "Carlos Silva",
    "email": "carlos@example.com",
    "phone": "11999999999",
    "notes": "Cliente fiel",
    "appointments": [
      {
        "id": "clx678appt",
        "dateTime": "2026-02-15T14:00:00Z",
        "service": "Corte de Cabelo",
        "status": "CONFIRMED"
      }
    ],
    "tags": ["VIP"]
  }
}
```

---

## 💰 Assinaturas e Pagamentos

### GET /api/subscriptions

Retorna status da assinatura da empresa.

**Request:**

```bash
curl http://localhost:3000/api/subscriptions \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "plan": "PREMIUM",
    "status": "ACTIVE",
    "currentPeriodEnd": "2026-03-15T23:59:59Z",
    "cancelAtPeriodEnd": false,
    "stripeCustomerId": "cus_...",
    "stripeSubscriptionId": "sub_..."
  }
}
```

---

### POST /api/subscriptions/checkout

Inicia checkout de assinatura (Stripe ou Mercado Pago).

**Request:**

```bash
curl -X POST http://localhost:3000/api/subscriptions/checkout \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "plan": "PREMIUM",
    "billingCycle": "MONTHLY",
    "paymentMethod": "STRIPE"
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/c/pay/cs_test_...",
    "sessionId": "cs_test_..."
  }
}
```

**Planos disponíveis:**

- `BASIC` - R$ 29,90/mês
- `PREMIUM` - R$ 49,90/mês
- `ENTERPRISE` - R$ 99,90/mês

---

### POST /api/subscriptions/cancel

Cancela assinatura no final do período atual.

**Request:**

```bash
curl -X POST http://localhost:3000/api/subscriptions/cancel \
  -H "Cookie: auth-token=SEU_TOKEN"
```

---

### POST /api/webhooks/stripe

Webhook para eventos do Stripe (assinatura criada, paga, cancelada).

**Headers:**

- `stripe-signature` - Assinatura do webhook

> ⚠️ Este endpoint deve ser configurado no dashboard do Stripe.

---

## 💬 Suporte

### GET /api/support/conversations

Lista conversas de suporte da empresa.

**Request:**

```bash
curl http://localhost:3000/api/support/conversations \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": "clx234conv",
      "subject": "Dúvida sobre plano Premium",
      "status": "OPEN",
      "priority": "MEDIUM",
      "createdAt": "2026-02-09T10:00:00Z",
      "lastMessageAt": "2026-02-09T14:30:00Z",
      "unreadCount": 2
    }
  ]
}
```

---

### POST /api/support/conversations

Cria nova conversa de suporte.

**Request:**

```bash
curl -X POST http://localhost:3000/api/support/conversations \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Dúvida sobre integração WhatsApp",
    "message": "Como faço para conectar minha conta do WhatsApp?",
    "priority": "MEDIUM"
  }'
```

---

### POST /api/support/conversations/[id]/messages

Envia mensagem em conversa existente.

**Request:**

```bash
curl -X POST http://localhost:3000/api/support/conversations/clx234conv/messages \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Obrigado pela resposta!"
  }'
```

---

## 🔒 Segurança (2FA)

### POST /api/security/2fa/setup

Inicia configuração de autenticação de dois fatores.

**Request:**

```bash
curl -X POST http://localhost:3000/api/security/2fa/setup \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCode": "data:image/png;base64,...",
    "backupCodes": ["ABC123-DEF456", "GHI789-JKL012"]
  }
}
```

---

### POST /api/security/2fa/verify

Verifica código e ativa 2FA.

**Request:**

```bash
curl -X POST http://localhost:3000/api/security/2fa/verify \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "123456"
  }'
```

---

### POST /api/security/2fa/disable

Desativa autenticação de dois fatores.

**Request:**

```bash
curl -X POST http://localhost:3000/api/security/2fa/disable \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "SenhaAtual123"
  }'
```

---

## 📊 Dashboard e Relatórios

### GET /api/dashboard/stats

Retorna estatísticas gerais do dashboard.

**Query Parameters:**

- `startDate` - Data inicial
- `endDate` - Data final

**Request:**

```bash
curl "http://localhost:3000/api/dashboard/stats?startDate=2026-02-01&endDate=2026-02-10" \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "totalAppointments": 45,
    "confirmedAppointments": 38,
    "cancelledAppointments": 7,
    "totalRevenue": 2250.0,
    "averageTicket": 50.0,
    "newClients": 12,
    "returningClients": 26,
    "appointmentsByDay": [
      { "date": "2026-02-01", "count": 5 },
      { "date": "2026-02-02", "count": 8 }
    ]
  }
}
```

---

### GET /api/reports/commissions

Relatório de comissões de profissionais.

**Request:**

```bash
curl "http://localhost:3000/api/reports/commissions?month=2026-02" \
  -H "Cookie: auth-token=SEU_TOKEN"
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "professionalId": "clx123abc",
      "professionalName": "João Silva",
      "totalAppointments": 30,
      "totalRevenue": 1500.0,
      "commissionRate": 0.4,
      "commissionAmount": 600.0,
      "paid": false
    }
  ]
}
```

---

## 📱 WhatsApp

### POST /api/whatsapp/send

Envia mensagem via WhatsApp (integração UAZAPI).

**Request:**

```bash
curl -X POST http://localhost:3000/api/whatsapp/send \
  -H "Cookie: auth-token=SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "5511999999999",
    "message": "Olá! Seu agendamento está confirmado para amanhã às 14h."
  }'
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "messageId": "msg_123abc",
    "status": "sent"
  }
}
```

> ⚠️ Requer configuração prévia da integração UAZAPI no dashboard.

---

## 🔔 Webhooks

### POST /api/webhooks/stripe

Recebe eventos do Stripe.

**Headers:**

- `stripe-signature` - Assinatura HMAC do webhook

**Eventos suportados:**

- `checkout.session.completed` - Assinatura criada
- `invoice.paid` - Pagamento recebido
- `invoice.payment_failed` - Pagamento falhou
- `customer.subscription.deleted` - Assinatura cancelada

---

### POST /api/webhooks/mercadopago

Recebe notificações do Mercado Pago.

**Query Parameters:**

- `id` - ID da notificação
- `topic` - Tipo de notificação (payment, merchant_order)

---

## ⚙️ Utilitários

### GET /api/health

Health check da API.

**Request:**

```bash
curl http://localhost:3000/api/health
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "connected",
    "timestamp": "2026-02-10T15:30:00Z"
  }
}
```

---

## 🚫 Códigos de Erro HTTP

| Código | Significado           | Exemplo                                       |
| ------ | --------------------- | --------------------------------------------- |
| `400`  | Bad Request           | Dados inválidos, campos obrigatórios faltando |
| `401`  | Unauthorized          | Token ausente ou inválido                     |
| `403`  | Forbidden             | Sem permissão para acessar recurso            |
| `404`  | Not Found             | Recurso não encontrado                        |
| `409`  | Conflict              | Horário já ocupado, email duplicado           |
| `422`  | Unprocessable Entity  | Validação de dados falhou (Zod)               |
| `429`  | Too Many Requests     | Rate limit excedido                           |
| `500`  | Internal Server Error | Erro no servidor                              |

---

## 🔐 Rate Limiting

**Limites por IP:**

- Login: 5 tentativas / 15 minutos
- Registro: 3 contas / hora
- Agendamento público: 5 / 15 minutos
- Endpoints autenticados: 100 / minuto

**Headers de resposta:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1707577200
```

**Erro 429:**

```json
{
  "success": false,
  "error": "Muitas requisições. Tente novamente em 15 minutos.",
  "retryAfter": 900
}
```

---

## 🔒 Segurança

### Headers de Segurança

A API implementa:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

### CORS

Configurado para aceitar requests de:

- `https://tolivre.app`
- `http://localhost:3000` (apenas desenvolvimento)

### reCAPTCHA

Endpoints públicos exigem token reCAPTCHA v3:

- `/api/register`
- `/api/appointments/public`
- `/api/leads`

**Como obter token:**

```javascript
grecaptcha.ready(() => {
  grecaptcha.execute("SITE_KEY", { action: "submit" }).then((token) => {
    // Enviar token na requisição
  });
});
```

---

## 📞 Suporte

**Dúvidas sobre a API?**

- 📧 Email: suporte@tolivre.app
- 💬 Chat: disponível no dashboard
- 📖 Docs: https://docs.tolivre.app

---

**Última atualização:** 10/02/2026  
**Versão da API:** 1.0
