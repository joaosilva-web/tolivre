# Sistema de Notificações em Tempo Real

## Visão Geral

O sistema de notificações usa **WebSocket** (Socket.IO) para enviar notificações em tempo real para usuários conectados no dashboard. Quando eventos importantes acontecem (novos agendamentos, confirmações, cancelamentos), todos os usuários da empresa recebem uma notificação instantânea.

## Arquitetura

### Componentes

1. **Servidor WebSocket** (`src/instrumentation.ts`)
   - Inicializa automaticamente quando a aplicação Next.js inicia
   - Roda em porta separada (padrão: 3001)
   - Gerencia conexões e autenticação via cookies

2. **Biblioteca WebSocket** (`src/lib/websocket.ts`)
   - Inicializa o servidor Socket.IO
   - Autentica usuários via JWT nos cookies
   - Gerencia rooms por empresa (isolamento multi-tenant)
   - Provê funções helper para emitir notificações

3. **Context Provider** (`src/context/WebSocketProvider.tsx`)
   - Gerencia conexão do cliente com o servidor WebSocket
   - Mantém estado de notificações no frontend
   - Auto-reconecta se a conexão cair
   - Solicita permissões para notificações do navegador

4. **Componente UI** (`src/components/notification-bell.tsx`)
   - Sininho no header com badge de contador
   - Dropdown com lista de notificações
   - Botões para marcar como lida e limpar tudo
   - Indicador de conexão

## Fluxo de Funcionamento

```
1. Usuário faz login → Recebe JWT em cookie
2. WebSocketProvider conecta no servidor (porta 3001)
3. Servidor valida JWT e adiciona usuário ao room da empresa
4. Evento acontece (ex: novo agendamento)
5. API emite notificação: emitNotification(companyId, {...})
6. Servidor envia para todos no room "company:${companyId}"
7. Clientes recebem e atualizam UI (badge + dropdown)
8. Navegador pode exibir notificação nativa (se permitido)
```

## Eventos que Geram Notificações

### 1. Novo Agendamento (público)
**Arquivo:** `src/app/api/appointments/public/route.ts`
```typescript
emitAppointmentCreated(result.companyId, {
  id: result.id,
  clientName: result.clientName,
  serviceName: result.service.name,
  professionalName: result.professional.name,
  startTime: result.startTime.toISOString(),
  action: "created",
});
```

### 2. Cliente Confirmou (WhatsApp)
**Arquivo:** `src/app/api/webhooks/uazapi/route.ts`
```typescript
emitNotification(appointment.companyId, {
  id: `confirm-${appointmentId}`,
  type: "appointment",
  title: "Agendamento Confirmado",
  message: `${appointment.clientName} confirmou o agendamento de ${appointment.service.name}`,
  timestamp: new Date().toISOString(),
  data: { appointmentId, action: "confirmed" },
});
```

### 3. Cliente Cancelou (WhatsApp)
**Arquivo:** `src/app/api/webhooks/uazapi/route.ts`
```typescript
emitNotification(appointment.companyId, {
  id: `cancel-${appointmentId}`,
  type: "appointment",
  title: "Agendamento Cancelado",
  message: `${appointment.clientName} cancelou o agendamento de ${appointment.service.name}`,
  timestamp: new Date().toISOString(),
  data: { appointmentId, action: "canceled" },
});
```

### 4. Reagendamento (Admin)
**Arquivo:** `src/app/api/appointments/[id]/reschedule/route.ts`
```typescript
emitNotification(updated.companyId, {
  id: `reschedule-${updated.id}`,
  type: "appointment",
  title: "Agendamento Reagendado",
  message: `${updated.clientName} foi reagendado de ${oldFormattedDate} para ${newFormattedDate}`,
  timestamp: new Date().toISOString(),
  data: { appointmentId: updated.id, action: "rescheduled" },
});
```

## Como Testar

### Desenvolvimento Local

1. **Inicie o servidor:**
   ```bash
   npm run dev
   ```
   Você verá nos logs:
   ```
   [Instrumentation] Initializing WebSocket server...
   [WebSocket] Server initialized
   [WebSocket] Server listening on port 3001
   ```

2. **Faça login no dashboard:**
   - Acesse http://localhost:3000
   - Faça login com um usuário válido
   - Abra o Console do navegador (F12)
   - Você verá: `[WebSocket] Connected`

3. **Teste criando um agendamento público:**
   - Abra outra aba/janela em modo anônimo
   - Vá para a página pública de agendamentos (ex: `http://localhost:3000/sua-empresa`)
   - Crie um agendamento
   - Volte para o dashboard → notificação deve aparecer no sininho

4. **Teste confirmação via WhatsApp:**
   - Configure o webhook (veja WEBHOOK_SETUP.md)
   - Cliente recebe mensagem com botões
   - Cliente clica em "Confirmar"
   - Dashboard mostra notificação "Agendamento Confirmado"

### Produção

1. **Variáveis de ambiente necessárias:**
   ```env
   WS_PORT=3001
   NEXT_PUBLIC_WS_PORT=3001
   NEXT_PUBLIC_APP_URL=https://tolivre.app
   ```

2. **Docker Compose:**
   ```yaml
   services:
     app:
       ports:
         - "3000:3000"  # Next.js
         - "3001:3001"  # WebSocket
       environment:
         - WS_PORT=3001
         - NEXT_PUBLIC_WS_PORT=3001
   ```

3. **Firewall:**
   - Certifique-se de que a porta 3001 está aberta para conexões externas

## Troubleshooting

### Notificações não aparecem

1. **Verifique conexão WebSocket:**
   - Abra Console do navegador (F12)
   - Procure por: `[WebSocket] Connected`
   - Se não aparecer, verifique se a porta 3001 está acessível

2. **Verifique logs do servidor:**
   ```
   [WebSocket] Client connected: ABC123
   [WebSocket] User 1234 joined room company:5678
   ```

3. **Teste emissão manual:**
   No servidor, você pode testar emitindo uma notificação:
   ```typescript
   import { emitNotification } from "@/lib/websocket";
   
   emitNotification("seu-company-id", {
     id: "test-123",
     type: "system",
     title: "Teste",
     message: "Notificação de teste",
     timestamp: new Date().toISOString(),
   });
   ```

### WebSocket não conecta

1. **Verifique porta:**
   ```bash
   netstat -ano | findstr :3001  # Windows
   lsof -i :3001                 # Linux/Mac
   ```

2. **Verifique CORS:**
   - Servidor está configurado para aceitar do `NEXT_PUBLIC_APP_URL`
   - Em produção, adicione domínios extras se necessário

3. **Verifique autenticação:**
   - WebSocket só conecta se usuário estiver autenticado
   - Cookie `token` deve estar presente e válido

### Notificações duplicadas

- O sistema mantém máximo de 50 notificações
- Notificações antigas são removidas automaticamente
- Cada notificação tem ID único para evitar duplicatas

## Segurança

1. **Autenticação obrigatória:**
   - Apenas usuários autenticados podem conectar
   - JWT validado em cada conexão

2. **Isolamento por empresa:**
   - Notificações são enviadas apenas para o room da empresa
   - Usuário só recebe notificações da própria empresa

3. **Validação de token:**
   - Token extraído do cookie httpOnly
   - Verificado com a mesma função usada nas APIs

## Próximos Passos

- [ ] Adicionar notificações para pagamentos recebidos
- [ ] Notificar quando novo cliente é cadastrado
- [ ] Permitir marcar notificação individual como lida
- [ ] Adicionar sons customizáveis por tipo de notificação
- [ ] Salvar histórico de notificações no banco de dados
- [ ] Configurações de preferências de notificação por usuário
