# 📧 Configuração de Email - Verificação de Email

Este documento explica como configurar o envio de emails para verificação de cadastro no ToLivre.

## 🎯 Funcionalidades Implementadas

- ✅ Verificação de email obrigatória no registro
- ✅ Email automático com link de verificação
- ✅ Link de verificação expira em 24 horas
- ✅ Bloqueio de login para emails não verificados
- ✅ Página para reenviar email de verificação
- ✅ Rate limiting (2 minutos entre reenvios)
- ✅ Templates HTML responsivos e profissionais

## ⚙️ Configuração SMTP

### Opção 1: Gmail (Desenvolvimento)

1. **Ativar autenticação de 2 fatores** na sua conta Google

2. **Gerar senha de app**:

   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "Email" e "Outro (nome personalizado)"
   - Digite "ToLivre" e clique em "Gerar"
   - Copie a senha gerada (16 caracteres)

3. **Configurar .env**:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu@gmail.com
SMTP_PASS=sua_senha_de_app_16_caracteres
SMTP_FROM_NAME=TôLivre
SMTP_FROM_EMAIL=noreply@tolivre.com.br
```

**Importante**: Gmail tem limite de 500 emails/dia.

### Opção 2: Resend (Recomendado para Produção)

Resend é um serviço moderno e simples para envio de emails transacionais.

1. **Criar conta**: https://resend.com
2. **Obter API Key**
3. **Instalar SDK**:

```bash
npm install resend
```

4. **Atualizar `src/lib/email.ts`**:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.SMTP_FROM_NAME || "TôLivre"} <${
        process.env.SMTP_FROM_EMAIL
      }>`,
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[Email] Erro ao enviar:", error);
      return { success: false, error: String(error) };
    }

    console.log("[Email] Enviado com sucesso:", data.id);
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("[Email] Erro ao enviar email:", error);
    return { success: false, error: String(error) };
  }
}
```

5. **Configurar .env**:

```bash
RESEND_API_KEY=re_sua_key_aqui
SMTP_FROM_NAME=TôLivre
SMTP_FROM_EMAIL=noreply@seudominio.com
```

**Vantagens**:

- ✅ 100 emails/dia grátis
- ✅ 3.000 emails/mês no plano gratuito
- ✅ Setup instantâneo
- ✅ Dashboard com métricas
- ✅ API moderna e simples

### Opção 3: AWS SES (Produção em Escala)

Para produção com alto volume:

1. **Criar conta AWS**
2. **Configurar SES**: https://console.aws.amazon.com/ses
3. **Verificar domínio**
4. **Solicitar saída do sandbox**

```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu_access_key_id
SMTP_PASS=sua_secret_access_key
```

**Vantagens**:

- ✅ $0.10 por 1.000 emails
- ✅ Escala ilimitada
- ✅ 99.9% uptime
- ✅ Integração com AWS

### Opção 4: SendGrid

Outra alternativa popular:

1. **Criar conta**: https://sendgrid.com
2. **Obter API Key**
3. **Configurar**:

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.sua_api_key_aqui
```

## 🧪 Testando em Desenvolvimento

Se não quiser configurar SMTP em desenvolvimento:

1. A aplicação **não bloqueia** o registro se SMTP não estiver configurado
2. O link de verificação aparece nos **logs do console**:

```
[Email] To: usuario@email.com
[Email] Subject: Verifique seu email - TôLivre
[Email] HTML: <html>...</html>
```

3. Copie o link do HTML e teste manualmente

## 📋 Fluxo Completo

### 1. Registro

```
POST /api/register
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "message": "Usuário criado com sucesso! Verifique seu email para ativar sua conta.",
    "userId": "cuid..."
  }
}
```

### 2. Email Enviado

```
Subject: Verifique seu email - TôLivre
Body: [Template HTML com botão "Verificar Email"]
Link: https://tolivre.com.br/verificar-email?token=abc123...
```

### 3. Verificação

```
POST /api/auth/verify-email
{
  "token": "abc123..."
}
```

**Response (Sucesso)**:

```json
{
  "success": true,
  "data": {
    "message": "Email verificado com sucesso! Você já pode fazer login.",
    "verified": true
  }
}
```

**Response (Expirado)**:

```json
{
  "success": false,
  "error": "Token de verificação expirado. Solicite um novo email de verificação."
}
```

### 4. Tentativa de Login Sem Verificação

```
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

**Response**:

```json
{
  "success": false,
  "error": "Por favor, verifique seu email antes de fazer login. Verifique sua caixa de entrada e spam."
}
```

### 5. Reenviar Verificação

```
PUT /api/auth/verify-email
{
  "email": "joao@email.com"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "message": "Email de verificação enviado com sucesso!"
  }
}
```

## 🔒 Segurança

### Tokens de Verificação

- ✅ 32 bytes aleatórios (crypto.randomBytes)
- ✅ Único por usuário (constraint no banco)
- ✅ Expira em 24 horas
- ✅ Removido após verificação

### Rate Limiting

- ✅ Máximo 1 reenvio a cada 2 minutos
- ✅ Previne spam de emails
- ✅ Retorna tempo de espera no erro

### Database Schema

```prisma
model User {
  // ...campos existentes
  emailVerified      Boolean   @default(false)
  verificationToken  String?   @unique
  verificationSentAt DateTime?
}
```

## 📱 Páginas Criadas

### 1. `/verificar-email` - Verificação de Email

- Valida token automaticamente ao carregar
- Exibe sucesso ou erro
- Redireciona para login após 3 segundos
- Link para reenviar se expirado

### 2. `/reenviar-verificacao` - Reenviar Email

- Formulário simples com campo de email
- Validação de rate limit
- Feedback visual de sucesso/erro
- Link para login e registro

## 🎨 Template de Email

O email enviado é responsivo e funciona em todos os clientes:

- ✅ Gmail, Outlook, Apple Mail, Thunderbird
- ✅ Mobile e Desktop
- ✅ Modo claro e escuro
- ✅ Botão CTA destacado
- ✅ Link alternativo (fallback)
- ✅ Footer com branding

## 🐛 Troubleshooting

### Email não está sendo enviado

1. **Verifique os logs**:

```bash
[Email] Erro ao enviar email: Error: ...
```

2. **Verifique as variáveis de ambiente**:

```bash
echo $SMTP_HOST
echo $SMTP_USER
```

3. **Teste a conexão SMTP**:

```bash
telnet smtp.gmail.com 587
```

4. **Verifique autenticação de 2 fatores** (Gmail)

5. **Verifique limites de envio** do provedor

### Token expirado

1. Usuário deve clicar em "Reenviar verificação"
2. Novo token é gerado automaticamente
3. Email é enviado novamente

### Email não chega

1. Verificar **caixa de spam**
2. Verificar **filtros de email**
3. Verificar **blacklist** do IP/domínio
4. Usar serviço profissional (Resend, SendGrid)

### Erro de SMTP em produção

```bash
# Usar variáveis de ambiente corretas
SMTP_HOST=smtp.provedor.com  # não localhost
SMTP_USER=usuario@dominio.com
SMTP_PASS=senha_ou_api_key

# Verificar firewall
# Porta 587 deve estar aberta
```

## 📊 Métricas Recomendadas

Monitore:

- Taxa de emails entregues
- Taxa de verificação (usuários que verificam)
- Tempo médio até verificação
- Emails devolvidos (bounce rate)
- Reclamações de spam

## 🚀 Deploy em Produção

### Checklist:

- [ ] SMTP configurado com serviço profissional
- [ ] Domínio verificado no provedor de email
- [ ] SPF, DKIM, DMARC configurados
- [ ] `NEXT_PUBLIC_APP_URL` aponta para domínio real
- [ ] Certificado SSL válido (HTTPS)
- [ ] Logs configurados para monitorar entregas
- [ ] Usuários existentes marcados como verificados (migration)

### Migration para usuários existentes:

```sql
-- Marcar todos os usuários existentes como verificados
UPDATE "User" SET "emailVerified" = true WHERE "createdAt" < NOW();
```

Ou via Prisma:

```typescript
await prisma.user.updateMany({
  where: {
    createdAt: { lt: new Date() },
  },
  data: {
    emailVerified: true,
  },
});
```

---

**Pronto!** Sistema de verificação de email totalmente funcional e seguro! 🎉
