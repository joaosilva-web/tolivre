# Sistema de Suporte em Tempo Real - TôLivre

## 📋 Visão Geral

Sistema completo de chat de suporte integrado ao TôLivre, permitindo comunicação em tempo real entre usuários e a equipe de suporte.

## 🎯 Funcionalidades

### Para Usuários

- ✅ Widget de chat acessível via botão no header
- ✅ Criar novas conversas com assunto e mensagem inicial
- ✅ Visualizar histórico de conversas
- ✅ Trocar mensagens em tempo real via WebSocket
- ✅ Contador de mensagens não lidas
- ✅ Notificações de novas mensagens do staff
- ✅ Interface responsiva (mobile-first)

### Para Staff (@tolivre.app)

- ✅ Dashboard dedicado em `/dashboard/support`
- ✅ Visualizar todas as conversas de todos os clientes
- ✅ Filtrar por status: Abertas / Em Andamento / Fechadas
- ✅ Atribuir conversas para si mesmo
- ✅ Responder em tempo real
- ✅ Fechar conversas resolvidas
- ✅ Ver informações da empresa e usuário
- ✅ Contador de mensagens não lidas dos usuários

## 🏗️ Arquitetura

### Banco de Dados (Prisma)

```prisma
model SupportConversation {
  id           String        @id @default(cuid())
  companyId    String        // Multi-tenant
  userId       String        // Usuário que criou
  subject      String        // Assunto
  status       SupportStatus @default(OPEN)
  assignedToId String?       // Staff atribuído
  closedAt     DateTime?
  messages     SupportMessage[]
}

model SupportMessage {
  id             String   @id @default(cuid())
  conversationId String
  senderId       String
  content        String   @db.Text
  isStaff        Boolean  @default(false)
  readAt         DateTime?
}

enum SupportStatus {
  OPEN
  IN_PROGRESS
  CLOSED
}
```

### API Routes

#### Usuários

- `GET /api/support/conversations` - Lista conversas do usuário
- `POST /api/support/conversations` - Cria nova conversa
- `GET /api/support/conversations/[id]/messages` - Lista mensagens
- `POST /api/support/conversations/[id]/messages` - Envia mensagem
- `POST /api/support/conversations/[id]/read` - Marca mensagens como lidas

#### Staff (apenas @tolivre.app)

- `GET /api/support/admin/conversations` - Lista todas conversas (com filtros)
- `PATCH /api/support/conversations/[id]` - Atualiza status/atribuição
- `POST /api/support/conversations/[id]/assign` - Atribui conversa ao staff logado
- `POST /api/support/conversations/[id]/close` - Fecha conversa

### WebSocket (Tempo Real)

**Eventos emitidos:**

- `supportMessage` - Nova mensagem criada
- `supportConversationUpdated` - Status ou atribuição alterada

**Infraestrutura:**

- Socket.IO server na porta 3001 (dev) ou via Traefik /ws (prod)
- Rooms baseadas em `companyId` (multi-tenant)
- HTTP endpoint `/emit` para comunicação cross-worker (Next.js 16)

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── api/support/
│   │   ├── conversations/
│   │   │   ├── route.ts                    # GET/POST conversas usuário
│   │   │   └── [id]/
│   │   │       ├── route.ts                # PATCH status/assign
│   │   │       ├── messages/route.ts       # GET/POST mensagens
│   │   │       ├── assign/route.ts         # POST atribuir
│   │   │       ├── close/route.ts          # POST fechar
│   │   │       └── read/route.ts           # POST marcar lido
│   │   └── admin/
│   │       └── conversations/route.ts      # GET todas (staff)
│   └── dashboard/support/
│       └── page.tsx                        # Dashboard staff
│
├── components/support/
│   ├── SupportButton.tsx                   # Botão no header
│   ├── SupportChatWidget.tsx               # Widget principal
│   ├── ConversationList.tsx                # Lista usuário
│   ├── ConversationView.tsx                # Chat usuário
│   ├── NewConversationForm.tsx             # Form criar conversa
│   ├── StaffConversationList.tsx           # Lista staff
│   ├── StaffConversationView.tsx           # Chat staff
│   ├── SupportSkeletons.tsx                # Loading states
│   └── ErrorState.tsx                      # Error handling
│
├── hooks/
│   └── useSupportChat.ts                   # Hook com lógica de estado
│
└── lib/
    ├── websocket.ts                        # Tipos e configuração WS
    └── websocketEmit.ts                    # Funções de emissão HTTP
```

## 🚀 Como Usar

### Configuração Inicial

1. **Banco de dados já migrado** ✅

   ```bash
   # Migration: 20260130153834_add_support_chat
   npx prisma migrate deploy
   ```

2. **WebSocket Server**
   - Já configurado via `src/instrumentation.ts`
   - Porta 3001 (dev) ou /ws (prod via Traefik)

3. **Usuários Staff**
   - Qualquer usuário com email terminando em `@tolivre.app`
   - Acesso automático ao dashboard de suporte

### Para Usuários

1. Acesse o dashboard logado
2. Clique no ícone de mensagem (💬) no header
3. Clique em "Nova Conversa"
4. Preencha assunto e mensagem inicial
5. Aguarde resposta do suporte em tempo real

### Para Staff

1. Faça login com email `@tolivre.app`
2. Acesse "Suporte" na sidebar
3. Use as tabs para filtrar: Abertas / Em Andamento / Fechadas
4. Clique em uma conversa para visualizar
5. Use "Atribuir a mim" para assumir a conversa
6. Responda e use "Fechar conversa" quando resolvido

## 🔐 Permissões

**Usuários normais:**

- Ver apenas suas próprias conversas
- Criar novas conversas
- Enviar mensagens nas próprias conversas
- Marcar mensagens do staff como lidas

**Staff (@tolivre.app):**

- Ver todas as conversas de todas as empresas
- Filtrar por status, empresa
- Atribuir conversas para si
- Mudar status das conversas
- Fechar conversas
- Marcar mensagens dos usuários como lidas

## 📊 Fluxo Típico

```
1. Usuário → Clica em "Nova Conversa"
2. Usuário → Preenche assunto + mensagem
3. Sistema → Cria conversa com status OPEN
4. Sistema → Emite evento WebSocket
5. Staff → Recebe notificação no sininho
6. Staff → Abre dashboard de suporte
7. Staff → Clica em "Atribuir a mim"
8. Sistema → Muda status para IN_PROGRESS
9. Staff → Envia resposta
10. Sistema → Emite evento WebSocket
11. Usuário → Recebe notificação
12. Usuário → Abre widget e vê resposta
13. [Conversa continua em tempo real]
14. Staff → Clica em "Fechar conversa"
15. Sistema → Muda status para CLOSED
16. Sistema → Desabilita input de mensagens
```

## 🎨 Customização

### Cores e Estilos

- Usa tokens do `globals.css`
- Componentes shadcn/ui
- Totalmente responsivo (Tailwind)

### Limites

- Assunto: 3-200 caracteres
- Mensagem: 1-1000 caracteres
- Notificações: últimas 50 mantidas em memória

## 🧪 Testando

1. **Teste básico:**

   ```bash
   # Terminal 1: Dev server
   npm run dev

   # Terminal 2: Usuário normal
   # Login com usuário comum
   # Criar conversa via widget

   # Terminal 3: Staff
   # Login com email @tolivre.app
   # Acessar /dashboard/support
   ```

2. **Teste WebSocket:**
   - Abra duas abas: usuário e staff
   - Envie mensagem de um lado
   - Verifique se aparece em tempo real no outro

3. **Teste multi-tenant:**
   - Login com empresas diferentes
   - Staff vê todas, usuários veem apenas suas conversas

## 📈 Melhorias Futuras

- [ ] Anexos/imagens nas mensagens
- [ ] Busca e filtros avançados (data, empresa, texto)
- [ ] Indicador "digitando..."
- [ ] Som de notificação customizável
- [ ] Templates de respostas para staff
- [ ] Métricas: tempo médio de resposta, satisfação
- [ ] Chatbot/FAQ automático
- [ ] Integração com email (conversa por email)

## 🐛 Debug

### Logs importantes:

```typescript
// WebSocket connection
[WebSocket] Connected
[WebSocket] Support message received: {...}

// API calls
[useSupportChat] Erro ao carregar conversas
[StaffConversationView] Erro ao enviar
```

### Problemas comuns:

**WebSocket não conecta:**

- Verificar se server está rodando (porta 3001)
- Verificar configuração Traefik em produção
- Conferir cookies de autenticação

**Mensagens não aparecem em tempo real:**

- Verificar evento sendo emitido no backend
- Conferir listener no componente
- Validar companyId na room

**Staff não vê conversas:**

- Confirmar email termina com @tolivre.app
- Verificar permissões da API

## 📝 Changelog

### v1.0.0 (30/01/2026)

- ✅ Sistema completo implementado
- ✅ Backend: API + WebSocket
- ✅ Frontend: Widget usuário + Dashboard staff
- ✅ Notificações em tempo real
- ✅ Responsivo mobile
- ✅ Documentação completa

---

**Desenvolvido para TôLivre** 🎉
