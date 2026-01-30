# Guia de Implementação - HTTP WebSocket Emitter

## ✅ Implementado com Sucesso

Solução para comunicação entre workers do Next.js 16 usando HTTP.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js App (múltiplos workers)                            │
│                                                              │
│  ┌──────────────────┐      ┌──────────────────────────┐    │
│  │ Worker Principal │      │ Worker API Route         │    │
│  │                  │      │                          │    │
│  │ instrumentation  │      │ POST /api/appointments   │    │
│  │   ↓              │      │   ↓                      │    │
│  │ initWebSocket()  │      │ emitAppointmentCreated() │    │
│  │   ↓              │      │   ↓                      │    │
│  │ HTTP Server      │◄─────┤ POST localhost:3001/emit │    │
│  │ porta 3001       │      │                          │    │
│  │   ↓              │      └──────────────────────────┘    │
│  │ Socket.IO        │                                       │
│  │   ↓              │                                       │
│  │ Emit to Room     │      ┌──────────────────────────┐    │
│  │                  │      │ Worker Webhook           │    │
│  └──────────────────┘      │                          │    │
│         ↓                  │ POST /api/webhooks/uazapi│    │
│    WebSocket WSS           │   ↓                      │    │
│         ↓                  │ emitNotification()       │    │
│  ┌──────────────┐          │   ↓                      │    │
│  │   Clients    │◄─────────┤ POST localhost:3001/emit │    │
│  └──────────────┘          └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Componentes

### 1. **WebSocket Server** (`src/lib/websocket.ts`)
```typescript
server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/emit") {
    // Recebe { companyId, event, data }
    // Emite via Socket.IO para room company:{companyId}
  }
});
```

**Endpoint:** `POST http://localhost:3001/emit`

**Payload:**
```json
{
  "companyId": "cml...",
  "event": "notification",
  "data": {
    "id": "notif-123",
    "type": "appointment",
    "title": "Novo Agendamento",
    "message": "Cliente confirmou"
  }
}
```

**Response:**
```json
{
  "success": true,
  "roomSockets": 2
}
```

### 2. **HTTP Emitter** (`src/lib/websocketEmit.ts`)
```typescript
// Funções helpers que fazem POST para o endpoint /emit
export async function emitNotification(companyId, notification)
export async function emitAppointmentCreated(companyId, appointment)
export async function emitAppointmentUpdated(companyId, appointment)
export async function emitAppointmentCanceled(companyId, appointment)
export async function emitNewClient(companyId, client)
```

**Uso nos API routes:**
```typescript
import { emitNotification } from "@/lib/websocketEmit";

// Ao invés de:
// emitNotification(companyId, data); // Não funciona (workers isolados)

// Usar:
await emitNotification(companyId, {
  id: "notif-123",
  type: "appointment",
  title: "Novo Agendamento",
  message: "Cliente confirmou",
  timestamp: new Date().toISOString(),
});
```

### 3. **API Routes Atualizados**
- ✅ `src/app/api/appointments/route.ts`
- ✅ `src/app/api/appointments/public/route.ts`
- ✅ `src/app/api/appointments/[id]/reschedule/route.ts`
- ✅ `src/app/api/webhooks/uazapi/route.ts`
- ✅ `src/app/api/clients/route.ts`

Todos agora importam de `@/lib/websocketEmit` ao invés de `@/lib/websocket`.

## Fluxo de Notificação

1. **Cliente faz agendamento** → `POST /api/appointments/public`
2. API route cria appointment no banco
3. API route chama `await emitAppointmentCreated(companyId, data)`
4. `websocketEmit` faz `POST http://localhost:3001/emit`
5. Servidor HTTP recebe request
6. Socket.IO emite para `company:{companyId}` room
7. **Clientes conectados recebem notificação em tempo real** 🎉

## Logs Esperados em Produção

```
[Instrumentation] Initializing WebSocket server...
[WebSocket] Server listening on 0.0.0.0:3001
[WebSocket] Client connected: xxx
[WebSocket] User xxx joined room company:yyy

# Quando appointment é criado:
[WebSocket Emit] Success: appointmentCreated to company:yyy { roomSockets: 2 }
[WebSocket HTTP] Emitted appointmentCreated to company:yyy { 
  connectedSockets: 3, 
  roomSockets: 2 
}
```

## Vantagens da Solução

✅ **Funciona com workers isolados** - Comunicação via HTTP (localhost)  
✅ **Sem dependências externas** - Não precisa Redis  
✅ **Latência baixa** - HTTP local (~1-5ms)  
✅ **Simples** - Apenas HTTP POST  
✅ **Debugging fácil** - Logs claros em ambos os lados  
✅ **Escalável** - Pode migrar para Redis depois se necessário

## Próximos Passos

1. **Redeploy no Dokploy** para aplicar mudanças
2. **Testar notificações:**
   - Criar appointment via página pública
   - Confirmar via WhatsApp
   - Ver notificação aparecer no sininho 🔔
3. **Monitorar logs** para confirmar funcionamento

## Troubleshooting

### Erro: `ECONNREFUSED localhost:3001`
**Causa:** WebSocket server não inicializou ainda  
**Solução:** Aguardar `instrumentation.ts` rodar (primeiros segundos do deploy)

### Notificações não aparecem
**Causa:** Cliente não está na room correta  
**Solução:** Verificar logs `[WebSocket] User xxx joined room company:yyy`

### roomSockets: 0
**Causa:** Nenhum cliente conectado nessa company  
**Solução:** Abrir dashboard no navegador para conectar cliente

## Migração Futura para Redis (opcional)

Se precisar escalar horizontalmente:
```typescript
// websocketEmit.ts
import { publisher } from './redis';

export async function emitNotification(companyId, data) {
  await publisher.publish('notifications', JSON.stringify({
    companyId,
    event: 'notification',
    data
  }));
}
```

Mas **não é necessário agora** - HTTP local funciona perfeitamente para single-instance deployments.
