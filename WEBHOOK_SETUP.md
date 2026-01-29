# Configuração do Webhook UAZAPI

Este documento explica como configurar e testar o webhook do UAZAPI para confirmação/cancelamento de agendamentos.

## 1. Configurar o Webhook

### Opção A: Via API (Recomendado)

Faça uma requisição POST para configurar o webhook automaticamente:

```bash
POST https://tolivre.app/api/admin/configure-webhook
```

Ou use cURL:

```bash
curl -X POST https://tolivre.app/api/admin/configure-webhook
```

### Opção B: Via cURL direto no UAZAPI

```bash
curl -X POST https://tolivre.uazapi.com/webhook \
  -H "Content-Type: application/json" \
  -H "token: SEU_TOKEN_AQUI" \
  -d '{
    "url": "https://tolivre.app/api/webhooks/uazapi",
    "events": ["messages"],
    "excludeMessages": ["wasSentByApi"]
  }'
```

## 2. Verificar Configuração Atual

```bash
GET https://tolivre.app/api/admin/configure-webhook
```

Ou use cURL:

```bash
curl https://tolivre.app/api/admin/configure-webhook
```

Ou direto no UAZAPI:

```bash
curl https://tolivre.uazapi.com/webhook \
  -H "token: SEU_TOKEN_AQUI"
```

## 3. Como Funciona

### Fluxo de Reagendamento

1. **Admin reagenda** um compromisso no calendário
2. **Sistema envia** mensagem WhatsApp com botões:
   - ✅ Confirmar
   - ❌ Cancelar
3. **Cliente clica** em um dos botões no WhatsApp
4. **UAZAPI envia** webhook para `https://tolivre.app/api/webhooks/uazapi`
5. **Sistema processa** e atualiza status do agendamento:
   - `confirm_123` → Status: `CONFIRMED`
   - `cancel_123` → Status: `CANCELED`
6. **Cliente recebe** mensagem de confirmação

### Formato do Payload Recebido

O webhook recebe diferentes formatos dependendo do tipo de mensagem. O sistema verifica:

```javascript
// Formato 1: Padrão WhatsApp
body.message.buttonsResponseMessage.selectedButtonId;

// Formato 2: Simplificado
body.selectedButtonId;

// Formato 3: Com data wrapper
body.data.selectedButtonId;
```

**Exemplo de payload**:

```json
{
  "message": {
    "buttonsResponseMessage": {
      "selectedButtonId": "confirm_cm5abc123xyz"
    }
  },
  "key": {
    "remoteJid": "5511999999999@s.whatsapp.net",
    "fromMe": false,
    "id": "ABC123XYZ"
  },
  "messageTimestamp": "1704067200"
}
```

## 4. Testar o Webhook

### Sites para Teste (durante desenvolvimento)

Use um destes serviços para inspecionar webhooks:

1. **webhook.cool** (recomendado) - https://webhook.cool/
2. **rbaskets.in** - https://rbaskets.in/
3. **webhook.site** - https://webhook.site/

### Passos para Testar

1. Acesse um dos sites acima e copie a URL gerada
2. Configure o webhook temporariamente:
   ```bash
   curl -X POST https://tolivre.uazapi.com/webhook \
     -H "token: SEU_TOKEN" \
     -d '{
       "url": "https://webhook.cool/SEU_ID",
       "events": ["messages"],
       "excludeMessages": ["wasSentByApi"]
     }'
   ```
3. Reagende um compromisso no sistema
4. Cliente recebe mensagem e clica em um botão
5. Verifique o payload no site de teste
6. Reconfigure o webhook para produção:
   ```bash
   curl -X POST https://tolivre.app/api/admin/configure-webhook
   ```

## 5. Troubleshooting

### Webhook não está recebendo eventos

1. **Verifique se o webhook está configurado**:

   ```bash
   curl https://tolivre.uazapi.com/webhook -H "token: SEU_TOKEN"
   ```

   Resposta esperada:

   ```json
   [
     {
       "enabled": true,
       "url": "https://tolivre.app/api/webhooks/uazapi",
       "events": ["messages"],
       "excludeMessages": ["wasSentByApi"]
     }
   ]
   ```

2. **Verifique os logs do servidor**:

   ```bash
   # No servidor de produção
   docker logs -f CONTAINER_ID

   # Procure por:
   [uazapi webhook] Received: {...}
   ```

3. **Teste manualmente** enviando um payload:
   ```bash
   curl -X POST https://tolivre.app/api/webhooks/uazapi \
     -H "Content-Type: application/json" \
     -d '{
       "message": {
         "buttonsResponseMessage": {
           "selectedButtonId": "confirm_cm5abc123"
         }
       }
     }'
   ```

### Botões não aparecem no WhatsApp

1. **Verifique se o número está correto**:
   - Deve estar em formato internacional: `5511999999999`
   - Sem caracteres especiais: `+`, `-`, `(`, `)`, espaços

2. **Verifique os logs de envio**:

   ```
   [RESCHEDULE] Sending WhatsApp to: 5511999999999
   [uazapi] POST https://tolivre.uazapi.com/send/menu
   ```

3. **Formato dos botões**:
   ```typescript
   choices: [
     "✅ Confirmar|confirm_APPOINTMENT_ID",
     "❌ Cancelar|cancel_APPOINTMENT_ID",
   ];
   ```

   - Formato: `Texto|id`
   - ID deve seguir padrão: `action_appointmentId`

### Logs importantes

```bash
# Webhook recebeu o evento
[uazapi webhook] Received: {...}

# Button ID encontrado
[uazapi webhook] Button ID found: confirm_cm5abc123

# Agendamento confirmado
[uazapi webhook] Appointment confirmed: cm5abc123

# Mensagem enviada
[uazapi] POST https://tolivre.uazapi.com/send/text
```

## 6. Variáveis de Ambiente Necessárias

```env
# UAZAPI
UAZAPI_URL=https://tolivre.uazapi.com
UAZAPI_INSTANCE_TOKEN=seu_token_aqui
UAZAPI_HEADER=token

# App
NEXT_PUBLIC_APP_URL=https://tolivre.app
```

## 7. Segurança

### Prevenir Loops

**SEMPRE** inclua `"excludeMessages": ["wasSentByApi"]` no webhook para evitar que mensagens enviadas pela API sejam recebidas novamente, criando loops infinitos.

### Validação

O webhook valida:

- Formato do button ID: `action_appointmentId`
- Action deve ser: `confirm` ou `cancel`
- Appointment ID deve existir no banco

## 8. Monitoramento

### Logs em Produção

```bash
# Ver logs em tempo real
docker logs -f CONTAINER_ID | grep "uazapi"

# Ver últimas 100 linhas
docker logs --tail 100 CONTAINER_ID | grep "uazapi"

# Salvar logs para análise
docker logs CONTAINER_ID > uazapi.log 2>&1
```

### Métricas a Monitorar

- Total de webhooks recebidos
- Taxa de sucesso/erro
- Tempo de processamento
- Mensagens não processadas (button ID inválido)

## 9. Exemplo Completo

### 1. Configurar webhook

```bash
curl -X POST https://tolivre.app/api/admin/configure-webhook
```

### 2. Reagendar compromisso via dashboard

- Arrastar compromisso para novo horário no calendário
- Sistema envia WhatsApp automaticamente

### 3. Cliente clica no botão

- WhatsApp mostra botões interativos
- Cliente clica em "✅ Confirmar"

### 4. Webhook processa

```
[uazapi webhook] Received: {...}
[uazapi webhook] Button ID found: confirm_cm5abc123
[uazapi webhook] Appointment confirmed: cm5abc123
```

### 5. Cliente recebe confirmação

```
✅ Agendamento Confirmado!

Obrigado por confirmar, João Silva!

Seu agendamento está confirmado:

📅 Data: 25/01/2026
⏰ Horário: 14:00
💼 Serviço: Corte de Cabelo
👤 Profissional: Maria Santos
🏢 Local: ToLivre

Até lá! 😊
```
