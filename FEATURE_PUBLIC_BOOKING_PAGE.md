# Feature: Página Personalizada de Agendamentos

## 📋 Visão Geral

Esta feature permite que cada empresa/usuário do ToLivre configure uma página personalizada e pública para seus clientes, onde eles podem:

- Visualizar informações da empresa (história, serviços, depoimentos)
- Agendar horários online de forma autônoma
- Acessar informações de contato e redes sociais

## 🎯 Funcionalidades

### Para os Usuários do ToLivre (Dashboard)

1. **Configuração da Página** (`/dashboard/company/page-settings`)

   - Nome e slug personalizado (URL amigável)
   - Descrição/história da empresa
   - Logo e imagem de capa
   - Cores da marca (primária e acento)
   - Endereço físico
   - WhatsApp, Instagram, Facebook
   - Gerenciar depoimentos de clientes
   - Controlar o que exibir (serviços, depoimentos, sobre)
   - Configurações de SEO (meta title, meta description)

2. **Permissões**
   - Apenas OWNER e MANAGER podem configurar a página
   - EMPLOYEE não tem acesso às configurações

### Para os Clientes Finais (Público)

1. **Página da Empresa** (`/[slug]`)

   - Hero section com logo e imagem de capa
   - Barra de informações de contato
   - Seção "Sobre Nós" (opcional)
   - Grid de serviços com preços e duração (opcional)
   - Depoimentos de clientes com avaliações (opcional)
   - CTA para agendamento
   - Links para redes sociais
   - Footer personalizado

2. **Página de Agendamento** (`/[slug]/agendar`)
   - Wizard de 4 etapas:
     1. **Seleção de Serviço**: Lista de todos os serviços disponíveis
     2. **Seleção de Profissional**: Profissionais que oferecem o serviço escolhido
     3. **Seleção de Data e Horário**: Calendário + slots disponíveis
     4. **Confirmação**: Formulário com dados do cliente + resumo
   - Validação de conflitos em tempo real
   - Notificação via WhatsApp automática
   - Tela de sucesso com detalhes do agendamento

## 🗄️ Estrutura de Dados

### Novos Modelos Prisma

```prisma
model CompanyPage {
  id               String   @id @default(cuid())
  companyId        String   @unique
  slug             String   @unique
  title            String
  description      String?  @db.Text
  logo             String?
  coverImage       String?
  primaryColor     String   @default("#6366f1")
  accentColor      String   @default("#3b82f6")
  whatsapp         String?
  instagram        String?
  facebook         String?
  address          String?
  showServices     Boolean  @default(true)
  showTestimonials Boolean  @default(true)
  showAbout        Boolean  @default(true)
  metaTitle        String?
  metaDescription  String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  company      Company             @relation(...)
  testimonials PageTestimonial[]
}

model PageTestimonial {
  id            String      @id @default(cuid())
  companyPageId String
  authorName    String
  authorAvatar  String?
  rating        Int         @default(5)
  text          String      @db.Text
  position      Int         @default(0)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  companyPage CompanyPage @relation(...)
}
```

## 🔌 Endpoints API

### Autenticados (Dashboard)

- **GET** `/api/company/page` - Obter configuração da página
- **POST** `/api/company/page` - Criar configuração da página
- **PUT** `/api/company/page` - Atualizar configuração (incluindo testimonials)

### Públicos (Sem autenticação)

- **GET** `/api/public/page/[slug]` - Obter dados da página pública
- **POST** `/api/appointments/public` - Criar agendamento público

## 📁 Arquivos Criados/Modificados

### Backend

- ✅ `prisma/schema.prisma` - Novos modelos CompanyPage e PageTestimonial
- ✅ `src/app/api/company/page/route.ts` - API de configuração
- ✅ `src/app/api/public/page/[slug]/route.ts` - API pública
- ✅ `src/app/api/appointments/public/route.ts` - Agendamento público

### Frontend

- ✅ `src/app/[slug]/page.tsx` - Página pública da empresa
- ✅ `src/app/[slug]/agendar/page.tsx` - Wizard de agendamento
- ✅ `src/app/dashboard/company/page-settings/page.tsx` - Configurações
- ✅ `src/components/app-sidebar.tsx` - Adicionado link "Public Page"

### Database

- ✅ Migration: `20251201101231_add_company_page`

## 🚀 Como Usar

### 1. Configurar a Página (Dashboard)

```
1. Faça login no dashboard
2. Navegue até "Public Page" na sidebar
3. Preencha as informações:
   - Nome da página e slug
   - Descrição da empresa
   - URLs de logo e capa
   - Escolha as cores da marca
   - Configure redes sociais
   - Adicione depoimentos
4. Clique em "Salvar"
5. Clique em "Visualizar" para ver a página
```

### 2. Compartilhar com Clientes

```
Sua página estará disponível em:
https://tolivre.com/[seu-slug]

Exemplo:
https://tolivre.com/salao-bella
```

### 3. Clientes Agendarem

```
1. Cliente acessa a página pública
2. Clica em "Agendar Agora"
3. Escolhe o serviço desejado
4. Seleciona o profissional
5. Escolhe data e horário disponível
6. Preenche seus dados
7. Confirma o agendamento
8. Recebe confirmação via WhatsApp
```

## 🔐 Segurança

- Validação de dados com Zod em todos os endpoints
- Advisory locks para prevenir conflitos de agendamento
- Isolamento de dados por companyId
- Rate limiting em endpoints públicos (herança do sistema)
- Verificação de permissões (OWNER/MANAGER)

## 🎨 Design

- Cores personalizáveis por empresa
- Responsivo (desktop, tablet, mobile)
- Gradientes e animações suaves
- Hero section com imagem de capa
- Cards para serviços e depoimentos
- Wizard intuitivo para agendamento

## 📱 Integrações

- **WhatsApp**: Notificação automática de confirmação
- **Google Calendar**: (futuro) Sincronização de agendamentos
- **Redes Sociais**: Links para Instagram e Facebook

## 🔄 Fluxo de Agendamento Público

```
Cliente acessa /[slug]
    ↓
Clica em "Agendar"
    ↓
Escolhe serviço → /[slug]/agendar?step=1
    ↓
Escolhe profissional → step=2
    ↓
Escolhe data → Busca working hours
    ↓
Sistema gera slots disponíveis
    ↓
Escolhe horário → step=3
    ↓
Preenche dados pessoais → step=4
    ↓
POST /api/appointments/public
    ↓
Verifica conflitos (advisory lock)
    ↓
Cria/busca cliente
    ↓
Cria agendamento
    ↓
Envia WhatsApp (background)
    ↓
Exibe tela de sucesso
```

## 🧪 Testes

### Teste Manual

1. **Criar Página**

   ```
   - Acessar /dashboard/company/page-settings
   - Preencher formulário
   - Salvar
   - Verificar se salvou corretamente
   ```

2. **Visualizar Página Pública**

   ```
   - Clicar em "Visualizar"
   - Verificar se todos os elementos aparecem
   - Testar responsividade
   ```

3. **Fazer Agendamento**
   ```
   - Acessar /[slug]
   - Clicar em "Agendar Agora"
   - Completar wizard
   - Verificar agendamento criado no dashboard
   - Verificar recebimento de WhatsApp
   ```

## 📊 Métricas de Sucesso

- Número de páginas públicas criadas
- Taxa de conversão (visitas → agendamentos)
- Tempo médio para completar agendamento
- Taxa de cancelamento de agendamentos públicos
- Satisfação dos clientes (via depoimentos)

## 🎯 Próximas Melhorias

- [ ] Upload de imagens (logo e capa) direto no sistema
- [ ] Editor de texto rico para descrição
- [ ] Templates prontos de páginas
- [ ] Analytics da página pública
- [ ] Suporte a múltiplos idiomas
- [ ] Integração com Google Calendar
- [ ] Sistema de avaliação pós-atendimento
- [ ] Galeria de fotos do estabelecimento
- [ ] Vídeo de apresentação
- [ ] Chat em tempo real
- [ ] Pagamento online

## 🐛 Troubleshooting

### Página não aparece

- Verifique se o slug está correto
- Confirme que a página foi salva
- Verifique se há erro no console

### Horários não aparecem

- Confirme que há working hours configurados
- Verifique se a data selecionada é válida
- Check console para erros de API

### Agendamento não é criado

- Verifique se todos os campos obrigatórios estão preenchidos
- Confirme que o horário ainda está disponível
- Check logs do servidor para erros

## 📝 Notas Técnicas

- Slugs devem ser únicos no sistema
- Advisory locks previnem double-booking
- WhatsApp é enviado em background (não bloqueia resposta)
- Geração de slots usa UTC internamente
- Componentes usam client-side rendering ("use client")
- TypeScript para type safety
- Zod para validação de dados

## 🎉 Conclusão

Esta feature transforma o ToLivre em uma solução completa de agendamento online, permitindo que empresas tenham sua própria página de agendamentos personalizada, aumentando conversão e melhorando a experiência do cliente final.
