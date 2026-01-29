# 🔔 Como Testar as Notificações - GUIA RÁPIDO

## ✅ O que foi corrigido

O **servidor WebSocket não estava sendo inicializado**, então as notificações nunca eram enviadas. Agora:

- ✅ Servidor WebSocket roda automaticamente na porta 3001
- ✅ Clientes conectam via Socket.IO autenticado
- ✅ Notificações aparecem em tempo real no sininho do header

## 🧪 Como Testar AGORA

### 1️⃣ Acesse o Dashboard (janela 1)

1. Abra http://localhost:3000
2. Faça **login** no dashboard
3. Abra o **Console do navegador** (F12 → aba Console)
4. Você DEVE ver:
   ```
   [WebSocket] Connected
   ```
5. Olhe o **sininho** no header (canto superior direito)

### 2️⃣ Crie um Agendamento Público (janela 2)

1. Abra **outra aba/janela** (pode ser modo anônimo)
2. Vá para: http://localhost:3000/sua-empresa (substitua `sua-empresa` pelo slug real)
3. Crie um **novo agendamento** preenchendo o formulário
4. Clique em **Agendar**

### 3️⃣ Veja a Notificação (janela 1)

1. **Volte para o dashboard** (janela 1)
2. O **sininho** deve mostrar um **badge vermelho** com "1"
3. **Clique no sininho** → deve aparecer:
   ```
   🔔 Novo Agendamento
   [Nome do Cliente] agendou [Serviço] com [Profissional]
   ```

### 4️⃣ Teste Confirmação WhatsApp (webhook)

1. Certifique-se de que o **webhook está configurado** (veja WEBHOOK_SETUP.md)
2. Cliente recebe mensagem no WhatsApp com botões
3. Cliente clica em **"✅ Confirmar"**
4. Dashboard mostra notificação:
   ```
   ✅ Agendamento Confirmado
   [Nome do Cliente] confirmou o agendamento de [Serviço]
   ```

## 🔍 Troubleshooting

### ❌ Não aparece "[WebSocket] Connected" no console

**Problema:** WebSocket não conectou

**Solução:**

```bash
# 1. Verifique se a porta 3001 está livre
netstat -ano | findstr :3001

# 2. Reinicie o servidor
npm run dev

# 3. Verifique os logs do servidor (terminal)
# Deve aparecer:
[WebSocket] Server listening on port 3001
```

### ❌ Sininho não mostra badge/notificação

**Problema:** Notificação não está sendo emitida ou recebida

**Solução:**

1. Verifique o **Console do navegador** (F12)
2. Procure por: `[WebSocket] Notification received:`
3. Se NÃO aparecer, verifique os **logs do servidor** (terminal do npm run dev)
4. Deve aparecer algo como:
   ```
   [WebSocket] Emitted notification to company:123
   ```

### ❌ Erro "Cannot connect to WebSocket"

**Problema:** Porta 3001 bloqueada ou servidor não iniciou

**Solução:**

```bash
# Windows: Adicione exceção no firewall
netsh advfirewall firewall add rule name="WebSocket 3001" dir=in action=allow protocol=TCP localport=3001

# Ou use outro terminal para testar:
curl http://localhost:3001
# Deve retornar resposta do Socket.IO
```

## 📊 Logs Esperados

### Servidor (Terminal npm run dev):

```
[Instrumentation] Initializing WebSocket server...
[WebSocket] Server initialized
[WebSocket] Server listening on port 3001
✓ Ready in 4.1s

# Quando alguém faz login:
[WebSocket] Client connected: xyz123abc
[WebSocket] User 1 joined room company:5

# Quando evento acontece:
[WebSocket] Emitted notification to company:5
```

### Cliente (Console do navegador):

```
[WebSocket] Connected
[WebSocket] Notification received: {
  id: "apt-123",
  type: "appointment",
  title: "Novo Agendamento",
  message: "João Silva agendou Corte de Cabelo com Maria",
  timestamp: "2026-01-29T..."
}
```

## 🚀 Próximos Passos

1. ✅ Testar localmente (siga este guia)
2. ⏳ Fazer push para produção
3. ⏳ Adicionar porta 3001 no Docker/Dokploy
4. ⏳ Testar em produção

## 💡 Dica

Deixe **duas janelas abertas lado a lado**:

- **Esquerda:** Dashboard com sininho visível
- **Direita:** Página pública de agendamento

Assim você vê a notificação aparecer **instantaneamente** quando criar um agendamento! 🎉
