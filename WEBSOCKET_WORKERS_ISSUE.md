# WebSocket e Workers no Next.js 16

## Problema Identificado

Next.js 16 com Turbopack usa **processos isolados (workers)** para API routes. Isso significa que:

1. `instrumentation.ts` roda no **worker principal**
2. API routes rodam em **workers separados**
3. **Variáveis globais não são compartilhadas** entre workers

### Evidência dos Logs

```
01:34:31 [Instrumentation] Initializing WebSocket server...
01:34:31 [WebSocket] Server listening on 0.0.0.0:3001    ← Worker principal
01:34:38 [WebSocket] Client connected                     ← Clientes conectam OK

01:36:03 [WebSocket] Not initialized yet                  ← API route worker
01:36:03 [WebSocket] Still not initialized                ← Não vê o `io`
01:36:03 [WebSocket] IO not initialized - cannot emit
```

## Arquitetura Atual

### Servidor WebSocket (porta 3001)

- Inicializado via `instrumentation.ts` no worker principal
- Gerencia conexões de clientes
- Clientes se conectam via `/ws/socket.io`
- Autentica usuários e adiciona em rooms por `companyId`

### Emissão de Notificações (workers de API)

- API routes tentam emitir eventos via `emitToCompany()`
- **Problema**: `io` é `null` nos workers de API
- **Resultado**: Notificações não funcionam

## Soluções Possíveis

### 1. ✅ Solução Atual (Implementada)

Aceitar que notificações podem não funcionar em todos os ambientes:

- `getIO()` retorna `null` em workers sem WebSocket
- Funções de emit checam se `io` existe antes de emitir
- Aplicação continua funcionando normalmente
- **Limitação**: Notificações em tempo real podem não funcionar em produção

### 2. Redis Pub/Sub (Recomendado para Produção)

```typescript
// Publicar notificação via Redis
redis.publish(
  "notifications",
  JSON.stringify({
    companyId,
    event: "appointmentCreated",
    data,
  }),
);

// WebSocket server subscreve ao canal
redis.subscribe("notifications", (message) => {
  const { companyId, event, data } = JSON.parse(message);
  io.to(`company:${companyId}`).emit(event, data);
});
```

**Vantagens:**

- Funciona com múltiplos workers
- Escalável horizontalmente
- Workers podem se comunicar

**Desvantagens:**

- Requer Redis
- Mais complexo

### 3. Database Polling

```typescript
// API route insere notificação no banco
await prisma.notification.create({ ... });

// WebSocket server faz polling a cada X segundos
setInterval(async () => {
  const pending = await prisma.notification.findMany({
    where: { sent: false }
  });
  pending.forEach(notif => {
    io.to(`company:${notif.companyId}`).emit('notification', notif);
  });
}, 5000);
```

**Vantagens:**

- Não requer infraestrutura adicional
- Notificações persistem no banco

**Desvantagens:**

- Latência maior (até 5s)
- Mais carga no banco

### 4. HTTP Request ao WebSocket Server

```typescript
// API route faz POST para localhost:3001/emit
await fetch("http://localhost:3001/emit", {
  method: "POST",
  body: JSON.stringify({ companyId, event, data }),
});

// WebSocket server expõe endpoint /emit
app.post("/emit", (req, res) => {
  const { companyId, event, data } = req.body;
  io.to(`company:${companyId}`).emit(event, data);
  res.sendStatus(200);
});
```

**Vantagens:**

- Simples
- Sem dependências externas

**Desvantagens:**

- Mais uma porta/endpoint
- Latência de rede local

## Recomendação

Para **produção séria**, usar **Redis Pub/Sub** (solução #2).

Para **MVP/desenvolvimento**, a solução atual é aceitável (notificações podem falhar silenciosamente).

## Implementação Redis (Futura)

```bash
# Instalar dependências
npm install ioredis
```

```typescript
// src/lib/redis.ts
import Redis from "ioredis";

export const publisher = new Redis(process.env.REDIS_URL);
export const subscriber = new Redis(process.env.REDIS_URL);
```

```typescript
// src/lib/websocket.ts
import { subscriber } from "./redis";

export function initializeWebSocket(server: HTTPServer) {
  // ... código existente ...

  // Subscrever ao canal de notificações
  subscriber.subscribe("notifications");
  subscriber.on("message", (channel, message) => {
    if (channel === "notifications") {
      const { companyId, event, data } = JSON.parse(message);
      io.to(`company:${companyId}`).emit(event, data);
    }
  });
}
```

```typescript
// src/lib/notificationPublisher.ts
import { publisher } from "./redis";

export async function publishNotification(
  companyId: string,
  event: string,
  data: any,
) {
  await publisher.publish(
    "notifications",
    JSON.stringify({
      companyId,
      event,
      data,
    }),
  );
}
```

Então substituir todas as chamadas `emitToCompany()` por `publishNotification()`.

## Status Atual

✅ WebSocket conecta em produção  
✅ Clientes autenticam e entram em rooms  
❌ Notificações não chegam (workers isolados)  
🔄 Solução temporária: emit falha silenciosamente  
📋 TODO: Implementar Redis Pub/Sub para produção
