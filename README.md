# 🗓️ TôLivre — Agendamentos sem complicação

**TôLivre** é uma plataforma SaaS (Software as a Service) feita para profissionais autônomos que querem ter controle total dos seus agendamentos, lembretes e cobranças, sem depender de atendentes, WhatsApp ou processos manuais.

A proposta é simples: **automatizar tarefas rotineiras e libertar tempo para que o profissional foque no que realmente importa — atender bem seus clientes.**

---

## 🚀 Funcionalidades

- 📅 **Agendamento online**  
  Seus clientes podem visualizar sua disponibilidade e agendar serviços de forma prática, a qualquer momento.

- 🔔 **Lembretes automáticos**  
  Notificações por e-mail, WhatsApp ou SMS para reduzir faltas e esquecimentos.

- 💰 **Cobrança automatizada**  
  Gere links de pagamento, envie cobranças recorrentes e tenha integração com plataformas como Pix, cartão e boleto.

- 🗓️ **Gestão de agenda inteligente**  
  Bloqueios de horários, reagendamentos e controle total da sua disponibilidade.

- 📊 **Dashboard de métricas**  
  Acompanhe seus atendimentos, faturamento e performance com gráficos e relatórios.

- 👥 **Multiusuário (em breve)**  
  Perfeito para pequenos negócios com mais de um profissional.

---

## 🏗️ Arquitetura e Tecnologias

O Ocupaê é construído com uma stack moderna, escalável e preparada para SaaS de alta performance.

### ⚙️ Frontend

- **Next.js 14 (App Router + Server Actions)**
- **React**
- **Tailwind CSS**
- **Framer Motion** (animações fluidas)
- **Zod + React Hook Form** (validação robusta de formulários)

### 🧠 Backend

- **API Route + Server Actions do Next.js**
- **Prisma ORM**
- **Banco de Dados PostgreSQL**
- **Redis** (para cache e filas futuras)
- **Auth personalizada ou NextAuth (em definição)**
- **Rate Limiting, reCAPTCHA e Double Opt-in** (segurança e proteção contra spam)

### ☁️ Infraestrutura

- **Docker + Docker Compose** (para ambientes consistentes)
- **Hospedagem:** Vercel (Frontend e API) + Neon (Banco/Postgres)
- **Armazenamento de arquivos:** (em definição)

### 🔒 Segurança

- Proteções contra brute-force e spam
- Confirmação de e-mail (double opt-in)
- Hash de senhas (bcrypt ou argon2)
- Autorização baseada em roles (admin, profissional, cliente)

---

## 🗂️ Organização do projeto

```
/app              → Rotas e páginas (Next.js App Router)
/components       → Componentes reutilizáveis (UI)
/hooks            → Hooks customizados
/libs             → Configurações externas (prisma, auth, recaptcha...)
/services         → Serviços e integrações externas (ex: envio de e-mails, pagamento)
/controllers      → Regras de negócio (server side)
/validators       → Schemas Zod e validações
/public           → Arquivos públicos (imagens, favicon, etc.)
/prisma           → Esquema do banco de dados (schema.prisma)
```

---

## 🏗️ Como rodar o projeto localmente

### Pré-requisitos:

- Node.js 18+
- Docker instalado
- Yarn ou npm

### Passos:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tolivre.git
cd tolivre

# Instale as dependências
yarn install

# Crie o arquivo .env
cp .env.example .env

# Suba o banco de dados
docker-compose up -d

# Rode as migrations
npx prisma migrate dev

# Rode o projeto
yarn dev
```

---

## 🌎 Variáveis de ambiente

Exemplo de `.env`:

```
POSTGRES_URL="postgresql://postgres@localhost:5432/tolivre-dev"
POSTGRES_URL_NON_POOLING="postgresql://postgres@localhost:5432/tolivre-dev"

RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

---

## 🚧 Status do projeto

- ✅ Landing page
- 🏗️ Em desenvolvimento:
  - MVP funcional: Cadastro, login, agendamento e dashboard básico
  - Integração com meios de pagamento (Pix, cartão, boleto)
  - Área do cliente (para que clientes possam reagendar ou cancelar)
  - Dashboard financeiro
  - Envio de lembretes automáticos (WhatsApp, e-mail e SMS)

---

## 🧠 Roadmap

- [ ] Lançamento do MVP
- [ ] Integração com meios de pagamento
- [ ] Suporte a múltiplos profissionais (plano avançado)
- [ ] Aplicativo mobile (React Native)
- [ ] Marketplace de serviços (opcional)

---

## 💙 Feito com carinho por João

[🔗 LinkedIn](https://www.linkedin.com/in/joaosilvadeveloper/) • [🐙 GitHub](https://github.com/joaosilva-web)

---

## 📌 Como funciona `appointments/new` (fluxo de criação de agendamento)

Esta seção documenta o fluxo usado pela página de criação de agendamentos (`/dashboard/appointments/new`) — quais chamadas ao backend ela faz, por que cada chamada existe, formatos esperados e as principais validações/seguranças aplicadas.

Visão geral do fluxo (cliente):

- Verificar sessão e recuperar `companyId` com `/api/auth/whoami` (cookie-based JWT). Se não autenticado, o cliente redireciona para `/auth?next=...`.
- Buscar lista de serviços da empresa: `GET /api/services?companyId=...`.
- Buscar profissionais vinculados: `GET /api/company/{companyId}/professionals`.
- Quando o usuário escolhe uma data e um serviço, buscar horários de funcionamento e agendamentos existentes:
  - `GET /api/working-hours?companyId=...&date=YYYY-MM-DD` — retorna os horários de funcionamento (openTime/closeTime) para o dia.
  - `GET /api/appointments?companyId=...&from=YYYY-MM-DD&to=YYYY-MM-DD` — retorna agendamentos do dia para calcular disponibilidade.
- O cliente (front-end) usa utilitários (`src/lib/slotGeneration`) para gerar os slots disponíveis a partir dos dados acima (horário de funcionamento, duração do serviço e agendamentos existentes).
- Quando o usuário confirma um slot, o front envia `POST /api/appointments` com os dados do agendamento.

API endpoints usados (resumo técnico)

- GET /api/auth/whoami

  - Propósito: confirmar sessão e recuperar `user` + `companyId` (cookie JWT).
  - Uso: o formulário interno precisa do `companyId` para carregar serviços/profissionais.

- GET /api/services?companyId={companyId}

  - Propósito: listar serviços da empresa (nome, duração em minutos, id).
  - Retorno esperado: array de serviços ou ApiEnvelope { success, data }.

- GET /api/company/{companyId}/professionals

  - Propósito: obter profissionais para atribuição do agendamento.
  - Retorno esperado: array de profissionais (id, name) ou ApiEnvelope.

- GET /api/working-hours?companyId={companyId}&date=YYYY-MM-DD

  - Propósito: retornar horários de funcionamento (por dia) para gerar os slots.
  - Retorno esperado: array de objetos com { dayOfWeek, openTime, closeTime }.

- GET /api/appointments?companyId={companyId}&from={YYYY-MM-DD}&to={YYYY-MM-DD}[&professionalId=...]

  - Propósito: retornar agendamentos existentes no intervalo informado. Usado para detectar conflitos e gerar disponibilidade.
  - Parâmetros: `companyId` (obrigatório), `from`, `to` (opcionais — quando omitidos, lista todos da company), `professionalId` (opcional).
  - Retorno: lista de agendamentos com relações `service` e `professional` incluídas.

- POST /api/appointments
  - Propósito: criar um novo agendamento.
  - Corpo esperado (JSON):
    {
    companyId: string,
    professionalId: string,
    clientName: string,
    serviceId: string,
    startTime: string (ISO datetime)
    }
  - Validação server-side: Zod schema (`companyId`, `professionalId`, `clientName`, `serviceId`, `startTime` validado como ISO date).
  - Regras importantes executadas no servidor (por que existem):
    - Verifica que o `serviceId` pertence à `companyId` (evita inconsistência / ataque horizontal).
    - Carrega `workingHours` do dia e verifica se o horário solicitado está dentro do intervalo (open/close) — evita agendamentos fora do expediente.
    - Usa um `pg_advisory_xact_lock` por `professionalId` (hash -> dois inteiros) para serializar verificações e criação, evitando condições de corrida em concorrência alta.
    - Dentro de uma transação, conta sobreposições (start < end && end > start) para impedir agendamentos conflitantes — garante consistência sem depender apenas de checagens client-side.
    - Calcula `endTime` com base na `duration` do serviço (server decide duração final).
  - Respostas:
    - 200/201 (success): { success: true, data: <appointment> }
    - 400 (validation / business rule): { success: false, error: "mensagem" } (ex.: serviço não pertence à empresa, horário fora do expediente)
    - 500 (erro inesperado): { success: false, error: "mensagem" }

Exemplo de corpo de criação:

```json
{
  "companyId": "cmp_abc",
  "professionalId": "pro_123",
  "clientName": "Maria Silva",
  "serviceId": "svc_456",
  "startTime": "2025-10-30T14:00:00.000Z"
}
```

Por que certas decisões foram tomadas (motivações)

- Validação server-side com Zod: confiança nos dados e respostas claras para o cliente (campo faltando, formato inválido).
- Verificação de propriedade do serviço: segurança e integridade (um serviceId roubado não pode ser usado para outra empresa).
- Horário de funcionamento verificado no servidor: impossibilita agendamentos fora do expediente mesmo que o cliente tente enviar manualmente uma hora inválida.
- `pg_advisory_xact_lock` + checagem de sobreposição: evita race conditions quando múltiplos clientes tentam reservar o mesmo horário ao mesmo tempo; a lock serializa o trecho crítico por profissional.
- Uso de `startTime` ISO + manipulação em UTC no servidor: evita ambiguidades de fuso horário (o front envia ISO; o servidor calcula minutos UTC para comparações e armazenamentos consistentes).

Boas práticas no front-end (como a página `appointments/new` trabalha)

- Sempre chamar `/api/auth/whoami` antes de carregar dados dependentes de `companyId`.
- Buscar `working-hours` e `appointments` do dia quando o usuário seleciona a data; gerar slots no cliente (melhora responsividade e permite visualizações ricas).
- Antes de chamar `POST /api/appointments` validar localmente (zod no cliente, campos obrigatórios) e exibir mensagens úteis ao usuário.
- Tratar erros do servidor: quando a API retorna `error` ou `errorDetails` (400), exibir a mensagem ao usuário e não presumir sucesso.

Observações e pontos futuros

- Atualmente a geração de slots usa um utilitário local (`src/lib/slotGeneration`) que leva em conta duração de serviço e agendamentos existentes; se quiser diminuir latência, considere um endpoint que já retorne slots pré-computados.
- A API de criação executa checagens fortes e é segura para concorrência, mas se houver muito volume (muitos pedidos simultâneos) revisar a estratégia de locks/filas e considerar uma fila (e.g. Redis) para suavizar picos.
- Se for oferecer a página de agendamento ao público (clientes externos), considere adicionar medidas anti-spam adicionais: rate-limit por IP, reCAPTCHA e/ou double opt-in por e-mail.

Se quiser, posso também adicionar exemplos práticos de request/responses no README (curl + fetch) ou um diagrama simples do fluxo cliente ↔ servidor. Quer que eu inclua isso?
