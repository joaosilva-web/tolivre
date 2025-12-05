# 🏢 Expansão Futura: Sistema de Locação no TôLivre

**Data da Discussão:** 05 de Dezembro de 2025  
**Status:** Ideia em análise - Não implementar ainda

---

## 📋 Resumo Executivo

Análise de viabilidade para expandir o TôLivre além de agendamentos de serviços profissionais para também atender **empresas de locação** (aluguel de produtos/equipamentos).

**Conclusão:** ✅ **Altamente viável** - 80% do código atual pode ser reaproveitado.

---

## 🎯 Proposta de Valor

### Mercado Atual (TôLivre)
- Profissionais de serviços (salões, clínicas, estúdios)
- Agendamento por horário (slots de minutos)
- Profissional → Serviço → Cliente

### Novo Mercado (Expansão)
- Empresas de locação (festas, equipamentos, veículos)
- Reserva por período (dias/semanas/meses)
- Produto → Estoque → Cliente

### Mercado Híbrido (Ambos)
- Estúdios fotográficos: sessões + locação de equipamentos
- Espaços de eventos: reserva de data + mobiliário
- Academias: aulas + aluguel de armários

---

## 🏗️ Arquitetura Proposta

### 1. Modo de Operação por Empresa

```prisma
enum CompanyMode {
  SERVICES  // Apenas agendamentos (atual)
  RENTALS   // Apenas locação (novo)
  BOTH      // Híbrido
}

model Company {
  // ... campos existentes
  businessMode CompanyMode @default(SERVICES)
}
```

### 2. Novos Modelos de Dados

#### RentalProduct (Produtos para Locação)
```prisma
model RentalProduct {
  id           String        @id @default(cuid())
  companyId    String
  company      Company       @relation(fields: [companyId], references: [id])
  name         String        // Ex: "Cadeira Tiffany Branca"
  description  String?       @db.Text
  category     String?       // "Móveis", "Decoração", "Equipamentos"
  quantity     Int           // Quantidade total em estoque
  pricePerDay  Float         // Preço por dia
  pricePerWeek Float?        // Preço semanal (com desconto)
  pricePerMonth Float?       // Preço mensal (com desconto)
  imageUrl     String?
  status       ProductStatus @default(AVAILABLE)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  
  rentals      Rental[]
  
  @@index([companyId])
}

enum ProductStatus {
  AVAILABLE    // Disponível para locação
  MAINTENANCE  // Em manutenção
  RETIRED      // Aposentado/descontinuado
}
```

#### Rental (Substituindo/Complementando Appointment)
```prisma
model Rental {
  id              String            @id @default(cuid())
  companyId       String
  company         Company           @relation(fields: [companyId], references: [id])
  productId       String
  product         RentalProduct     @relation(fields: [productId], references: [id])
  clientId        String
  client          Client            @relation(fields: [clientId], references: [id])
  quantity        Int               // Quantas unidades do produto
  startDate       DateTime          // Data de retirada
  endDate         DateTime          // Data de devolução prevista
  actualReturnDate DateTime?        // Data real de devolução
  status          RentalStatus      @default(RESERVED)
  
  // Financeiro
  dailyRate       Float             // Taxa diária aplicada
  totalDays       Int               // Dias calculados
  totalAmount     Float             // Valor total calculado
  paidAmount      Float             @default(0)
  paymentStatus   PaymentStatusType @default(PENDING)
  paymentMethod   String?
  paymentDate     DateTime?
  deposit         Float?            // Caução/depósito
  depositReturned Boolean           @default(false)
  depositReturnedAt DateTime?
  
  notes           String?           @db.Text
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  @@index([companyId])
  @@index([productId, startDate, endDate])
  @@index([clientId])
}

enum RentalStatus {
  RESERVED     // Reservado (aguardando retirada)
  PICKED_UP    // Retirado (em uso)
  RETURNED     // Devolvido
  OVERDUE      // Atrasado (passou da data)
  CANCELED     // Cancelado
}
```

---

## 🔄 Comparação: Serviços vs Locação

| Aspecto | Profissionais (Atual) | Locação (Novo) |
|---------|----------------------|----------------|
| **Recurso** | Profissional (pessoa) | Produto (item físico) |
| **Unidade de Tempo** | Minutos/Horas | Dias/Semanas/Meses |
| **Capacidade** | 1 cliente por slot | Múltiplos clientes (estoque) |
| **Duração Típica** | 30min - 2h | 1 dia - 30 dias |
| **Precificação** | Preço fixo por serviço | Preço por período + descontos |
| **Controle** | Disponibilidade de agenda | Controle de estoque |
| **Financeiro Extra** | - | Caução/depósito |
| **Status Flow** | PENDING → CONFIRMED → COMPLETED | RESERVED → PICKED_UP → RETURNED |
| **Recorrência** | Sim (semanal, mensal) | Sim (contratos longos) |

---

## 💻 Lógica de Disponibilidade

### Serviços (Atual)
```typescript
// 1 profissional atende 1 cliente por vez
// Verificar conflito de horário exato
function isSlotAvailable(professionalId, startTime, endTime) {
  // Buscar appointments que se sobrepõem
  // Se encontrar algum = indisponível
}
```

### Locação (Novo)
```typescript
// 1 produto pode ter múltiplas reservas simultâneas
// Verificar quantidade disponível no período
async function checkProductAvailability(
  productId: string,
  startDate: Date,
  endDate: Date,
  requestedQuantity: number
): Promise<boolean> {
  const product = await prisma.rentalProduct.findUnique({
    where: { id: productId },
    include: {
      rentals: {
        where: {
          status: { in: ['RESERVED', 'PICKED_UP'] },
          OR: [
            // Verificar se há sobreposição de datas
            {
              AND: [
                { startDate: { lte: endDate } },
                { endDate: { gte: startDate } }
              ]
            }
          ]
        }
      }
    }
  });

  if (!product) return false;

  // Somar quantidade reservada no período
  const reservedQuantity = product.rentals.reduce(
    (sum, rental) => sum + rental.quantity,
    0
  );

  const availableQuantity = product.quantity - reservedQuantity;
  
  return availableQuantity >= requestedQuantity;
}
```

---

## 🎨 Adaptações de Interface

### Dashboard Mode Switcher
```typescript
// src/context/CompanyModeProvider.tsx
type CompanyMode = 'SERVICES' | 'RENTALS' | 'BOTH';

// Componentes condicionais:
{mode === 'SERVICES' && <AppointmentsView />}
{mode === 'RENTALS' && <RentalsView />}
{mode === 'BOTH' && <UnifiedView />}
```

### Navegação Adaptável

**Modo SERVICES (atual):**
- 📅 Agendamentos
- 👥 Profissionais
- ✂️ Serviços
- 👤 Clientes

**Modo RENTALS:**
- 📦 Locações
- 📦 Produtos
- 📊 Estoque
- 👤 Clientes

**Modo BOTH:**
- 📅 Agendamentos
- 📦 Locações
- 👥 Profissionais
- 📦 Produtos
- ✂️ Serviços
- 👤 Clientes

### Calendar Adaptado

**WeeklyCalendar (atual):**
- Colunas: Dias da semana
- Linhas: Horários (30min slots)
- Blocos: Agendamentos

**RentalCalendar (novo):**
- Colunas: Dias/semanas
- Linhas: Produtos
- Blocos: Períodos de locação
- Cor baseada em quantidade disponível

---

## 🚀 Plano de Implementação (Quando Decidir Executar)

### Fase 1: Schema e Migrações (1-2 dias)
- [ ] Criar model `RentalProduct`
- [ ] Criar model `Rental`
- [ ] Adicionar campo `businessMode` em `Company`
- [ ] Criar migration
- [ ] Testar no desenvolvimento

### Fase 2: Backend API (3-4 dias)
- [ ] `POST /api/rental-products` - Criar produto
- [ ] `GET /api/rental-products` - Listar produtos
- [ ] `PATCH /api/rental-products/[id]` - Editar produto
- [ ] `DELETE /api/rental-products/[id]` - Deletar produto
- [ ] `GET /api/rental-products/[id]/availability` - Verificar disponibilidade
- [ ] `POST /api/rentals` - Criar locação
- [ ] `GET /api/rentals` - Listar locações (com filtros)
- [ ] `PATCH /api/rentals/[id]` - Atualizar status
- [ ] `POST /api/rentals/[id]/return` - Registrar devolução
- [ ] Lógica de cálculo automático de valores
- [ ] Verificação de conflitos e estoque
- [ ] Alertas de devoluções atrasadas

### Fase 3: Frontend Dashboard (4-5 dias)
- [ ] Página de gestão de produtos (`/dashboard/rental-products`)
- [ ] Formulário de criação/edição de produtos
- [ ] Página de locações (`/dashboard/rentals`)
- [ ] Formulário de nova locação (wizard 4 passos):
  1. Selecionar produto
  2. Definir período (startDate → endDate)
  3. Informações do cliente
  4. Revisar e confirmar
- [ ] Calendar adaptado para períodos de dias
- [ ] Dashboard com métricas:
  - Produtos mais locados
  - Taxa de ocupação
  - Receita por período
  - Devoluções pendentes/atrasadas

### Fase 4: Features Especiais (2-3 dias)
- [ ] Sistema de caução (depósito):
  - Registro de valor
  - Controle de devolução
  - Status: PENDING → RETURNED/FORFEITED
- [ ] Alertas automáticos:
  - WhatsApp 1 dia antes da retirada
  - WhatsApp no dia da devolução
  - WhatsApp se atrasar (diário)
- [ ] Upload de imagens de produtos
- [ ] Galeria de fotos (antes/depois da locação)
- [ ] Relatórios:
  - Histórico de locação por produto
  - Produtos em manutenção
  - Análise de lucratividade

### Fase 5: Página Pública (2 dias)
- [ ] Estender `/[slug]` para modo RENTALS
- [ ] Catálogo de produtos disponíveis
- [ ] Filtros por categoria
- [ ] Seletor de período
- [ ] Verificação de disponibilidade em tempo real
- [ ] Reserva online

---

## 📊 Casos de Uso Reais

### 1. Locadora de Festas
**Produtos:**
- Cadeiras Tiffany (100 unidades)
- Mesas redondas (20 unidades)
- Toalhas de mesa (50 unidades)
- Decoração temática

**Fluxo:**
1. Cliente acessa página pública
2. Seleciona produtos e período (ex: 15-17/12/2025)
3. Sistema verifica estoque disponível
4. Cliente confirma reserva
5. Paga caução + 50% antecipado
6. Recebe confirmação por WhatsApp
7. Retira no dia 15
8. Devolve no dia 17
9. Inspeção de qualidade
10. Devolução de caução

### 2. Aluguel de Equipamentos Fotográficos
**Produtos:**
- Câmera Sony A7III (3 unidades)
- Lente 24-70mm (5 unidades)
- Flash (10 unidades)
- Tripé (8 unidades)

**Diferenciais:**
- Preço por dia com desconto semanal/mensal
- Sistema híbrido: também agenda sessões fotográficas (BOTH mode)
- Controle rigoroso de manutenção

### 3. Locação de Veículos
**Produtos:**
- Carro Econômico (5 unidades)
- Carro Sedan (3 unidades)
- SUV (2 unidades)

**Features Específicas:**
- Caução alta (R$ 500-1000)
- Verificação de CNH
- Checklist de vistoria (fotos antes/depois)
- Integração com seguro

### 4. Aluguel de Trajes/Fantasias
**Produtos:**
- Smoking (10 tamanhos diferentes)
- Vestidos de festa (50 modelos)
- Fantasias temáticas (100+ peças)

**Fluxo Específico:**
- Agendamento de prova (SERVICES mode)
- Reserva do traje (RENTALS mode)
- Retirada 1 dia antes do evento
- Devolução 1 dia depois

---

## 💰 Análise de Mercado

### Concorrentes (Locação)
- **ERP tradicionais:** SAP, TOTVS (R$ 500-2000/mês) - Complexos, desktop
- **Planilhas Excel:** Gratuito - Sem automação, propenso a erros
- **Sistemas específicos:** Locasoft, SGI - Caros, UX ruim

### Diferenciais do TôLivre
- ✅ Preço acessível (mesmo modelo de assinatura)
- ✅ Interface moderna e intuitiva
- ✅ Mobile-friendly (PWA)
- ✅ Notificações automáticas (WhatsApp)
- ✅ Página pública para reservas online
- ✅ QR Code para acesso rápido
- ✅ Sistema híbrido (BOTH mode) - único no mercado
- ✅ Multi-tenant já implementado
- ✅ Controle financeiro integrado

### Potencial de Mercado
**Empresas que podem usar:**
- 🎉 Locadoras de festas (50k+ no Brasil)
- 🏗️ Locadoras de equipamentos (construção, jardinagem)
- 🎭 Locadoras de trajes/fantasias
- 🚗 Locadoras de veículos (pequenas/médias)
- 📷 Estúdios fotográficos (híbrido)
- 🏢 Espaços de eventos (híbrido)
- 🎮 Locadoras de games/consoles
- 🏕️ Equipamentos de camping
- 👶 Produtos infantis (berços, carrinhos)

---

## 🔧 Reutilização de Código Existente

### ✅ O que já funciona (80%)
- [x] Autenticação JWT + 2FA
- [x] Multi-tenant (Company → Users)
- [x] Gestão de clientes
- [x] Controle financeiro (pagamentos, status)
- [x] Notificações WhatsApp (Uazapi)
- [x] WebSocket em tempo real
- [x] Calendar com drag-and-drop
- [x] Página pública personalizada
- [x] QR Code
- [x] Sistema de tags
- [x] Filtros avançados
- [x] Histórico e auditoria
- [x] Sessões e segurança

### 🔄 O que precisa adaptar (20%)
- [ ] Lógica de disponibilidade (estoque vs horário)
- [ ] Cálculo de valores (período vs serviço)
- [ ] Status flow (RESERVED → RETURNED)
- [ ] Calendar view (dias vs horas)
- [ ] Formulários (produto + período vs serviço + horário)

---

## 📈 Impacto nos Planos de Assinatura

### Planos Atuais
- **FREE:** 50 agendamentos/mês, 1 profissional
- **PRO:** 200 agendamentos/mês, 5 profissionais
- **PREMIUM:** Ilimitado, profissionais ilimitados

### Adaptação para Locação
- **FREE:** 30 locações/mês, 10 produtos
- **PRO:** 150 locações/mês, 50 produtos
- **PREMIUM:** Ilimitado, produtos ilimitados

### Modo BOTH (Híbrido)
- Contar appointments + rentals no limite mensal
- Profissionais + Produtos nos limites de recursos
- Ou criar plano específico "HYBRID" com preço diferenciado

---

## ⚠️ Considerações Técnicas

### Desafios Identificados

1. **Calendar View:**
   - Atual: Grade de horas (30min slots)
   - Locação: Precisa mostrar dias/semanas
   - Solução: Component condicional ou calendar configurável

2. **Cálculo de Disponibilidade:**
   - Atual: Simples (horário ocupado ou livre)
   - Locação: Complexo (quantidade em estoque × reservas simultâneas)
   - Solução: Query otimizada com agregação

3. **Performance:**
   - Locação pode ter períodos longos (30+ dias)
   - Verificar disponibilidade em range grande = query pesada
   - Solução: Índices otimizados, cache de disponibilidade

4. **UX:**
   - Usuários de serviços pensam em "horário"
   - Usuários de locação pensam em "estoque"
   - Solução: Onboarding explicativo, wizards diferentes

### Mitigações

- **Isolamento:** Modo RENTALS não afeta código SERVICES
- **Feature Flags:** Lançar gradualmente para beta testers
- **Testes:** Cenários de stress (100 produtos, 1000 locações)
- **Documentação:** Guias específicos para cada modo

---

## 🎯 Decisão Final

### Quando Implementar?

**Indicadores de "GO":**
- [ ] Base de usuários sólida em SERVICES mode (1000+ empresas)
- [ ] Demanda clara de clientes (10+ pedidos)
- [ ] Recursos técnicos disponíveis (1 dev dedicado por 3 semanas)
- [ ] Validação de mercado (pesquisa com locadoras)

**Critérios de Sucesso:**
- 50 empresas usando RENTALS mode em 6 meses
- NPS > 8 entre usuários de locação
- 0 bugs críticos no primeiro mês
- Documentação completa

---

## 📚 Próximos Passos (Quando Decidir Avançar)

1. **Pesquisa de Mercado:**
   - Entrevistar 20 locadoras (festas, equipamentos, veículos)
   - Mapear pain points específicos
   - Validar precificação

2. **Prototipagem:**
   - Wireframes do novo fluxo
   - Teste de usabilidade com 5 usuários
   - Ajustes no design

3. **MVP:**
   - Implementar apenas produtos + locações básicas
   - Sem features avançadas (caução, fotos)
   - Testar com 3 clientes beta

4. **Expansão:**
   - Features avançadas conforme feedback
   - Integração com marketplaces (iFood, Rappi)
   - IA para previsão de demanda

---

## 📝 Notas de Desenvolvimento

### Convenções de Nomenclatura
- `RentalProduct` (não `Product`) - evitar conflito futuro
- `Rental` (não `RentalAppointment`) - entidade própria
- `businessMode` (não `type`) - mais descritivo

### Estrutura de Pastas
```
src/
  app/
    dashboard/
      rentals/           # Novo
        page.tsx
        new/
          page.tsx
      rental-products/   # Novo
        page.tsx
  lib/
    rentalAvailability.ts  # Novo
    rentalCalculations.ts  # Novo
  components/
    rental-calendar.tsx    # Novo
```

### Testes Essenciais
```typescript
// __tests__/rentalAvailability.test.ts
describe('checkProductAvailability', () => {
  it('should return true when product has stock', async () => {})
  it('should return false when product is fully booked', async () => {})
  it('should handle partial availability', async () => {})
  it('should handle overlapping periods correctly', async () => {})
})
```

---

## 🔗 Referências

- **Schema Atual:** `/prisma/schema.prisma`
- **Appointment Logic:** `/src/lib/appointments.ts`
- **Calendar Component:** `/src/components/weekly-calendar.tsx`
- **API Pattern:** `/src/app/api/appointments/route.ts`

---

## 🏷️ Análise do Nome "TôLivre"

### Questão: O nome ficaria ruim para locação?

**Resposta: NÃO. O nome é perfeito e versátil para ambos os mercados.**

### ✅ Por que "TôLivre" Funciona Perfeitamente

#### 1. Sentido Duplo Inteligente
- **"Tô livre"** = Tenho disponibilidade (profissional/produto livre)
- Funciona para serviços: "O profissional tá livre às 14h?"
- Funciona para locação: "A cadeira Tiffany tá livre no sábado?"
- Funciona para veículos: "O carro tá livre essa semana?"

#### 2. Memorável e Brasileiro
- Linguagem coloquial, fácil de lembrar
- Diferente dos nomes genéricos (Locasoft, RentSystem, AgendaPro)
- "Vou ver se tá livre no TôLivre" - soa natural e conversacional

#### 3. Flexível e Escalável
- Não menciona "agendamento" ou "locação" especificamente
- Pode abranger ambos os negócios sem conflito
- Escalável para outras verticais futuras (reservas, bookings)

#### 4. Capital de Marca Já Estabelecido
- Trocar nome = perder reconhecimento de usuários atuais
- URLs, domínio, redes sociais já configurados
- Links e menções existentes mantêm valor
- Rebranding é caro e arriscado

### ⚠️ Pontos de Atenção (e Como Mitigar)

#### 1. Pode Soar Informal
- **Preocupação:** Empresas B2B maiores podem achar pouco profissional
- **Mitigação:** Posicionamento de marca moderno e descomplicado (vide Nubank, iFood)
- **Realidade:** Informalidade é tendência em SaaS moderno

#### 2. Não É Autoexplicativo
- **Preocupação:** Nome não deixa claro que é software de gestão
- **Mitigação:** Tagline/slogan complementar + SEO bem feito
- **Realidade:** Marcas fortes raramente são descritivas (Apple, Amazon, Uber)

### 🎯 Recomendação Estratégica

#### **MANTER "TôLivre"** com ajustes de comunicação:

#### Opção 1: Tagline Adaptável
```
TôLivre
Agendamentos e Locações sem Complicação

ou

TôLivre
Gestão Inteligente para Serviços e Locação

ou

TôLivre
O sistema que cresce com seu negócio
```

#### Opção 2: Submarcas (Apenas se Crescer Muito)
```
TôLivre Services    → Para profissionais (salões, clínicas)
TôLivre Rentals     → Para locadoras (festas, equipamentos)
TôLivre             → Marca mãe (plataforma unificada)
```

#### Opção 3: Marketing Segmentado (Recomendado)
```
Homepage Hero:
"TôLivre - Sistema de Gestão para:"
  ✓ Profissionais de Serviços
  ✓ Empresas de Locação
  ✓ Negócios Híbridos

[Começar Grátis]
```

---

### 🔍 Comparação com Concorrentes

| Nome | Setor | Vantagem | Desvantagem |
|------|-------|----------|-------------|
| **TôLivre** | Ambos | Memorável, duplo sentido, brasileiro | Informal (mitigável) |
| Agendor | Serviços | Óbvio (agendamentos) | Não serve para locação |
| Calendly | Serviços | Internacional, conhecido | Só agenda, não tem locação |
| Locasoft | Locação | Óbvio (locação) | Não serve para serviços |
| RentUp | Locação | Moderno | Só locação, genérico |
| SAP/TOTVS | Ambos | Estabelecido | Genérico, corporativo demais |

**TôLivre é único:** pode abraçar ambos os mercados mantendo identidade forte e brasileira.

---

### 💡 Argumentação Final

#### Por que NÃO mudar o nome:

1. **"Tá livre?" é universal:**
   - Profissional tá livre?
   - Produto tá livre?
   - Espaço tá livre?
   - Horário tá livre?

2. **Marcas fortes são memoráveis, não descritivas:**
   - Apple não vende maçãs 🍎
   - Amazon não é só uma floresta 🌳
   - Nike vem de deusa grega, não de tênis 👟
   - TôLivre não precisa ter "agenda" ou "aluguel" no nome

3. **O que importa é o posicionamento:**
   - SEO: "sistema de agendamento" + "sistema de locação"
   - Marketing: Foque nos benefícios, não no nome
   - Comunicação: Deixe claro que atende ambos

4. **Trocar nome agora = jogar capital de marca fora:**
   - Perder reconhecimento de usuários atuais
   - Perder links e menções em blogs/redes sociais
   - Custo de rebranding (novo domínio, materiais, anúncios)
   - Confusão no mercado ("cadê o TôLivre?")

---

### ✏️ Sugestões de Comunicação

#### Homepage (Hero Section)
```html
<h1>TôLivre</h1>
<h2>O sistema que cresce com seu negócio</h2>

<div class="features">
  <div>✓ Profissional de serviços? Gerencie agendamentos</div>
  <div>✓ Empresa de locação? Controle seu estoque</div>
  <div>✓ Trabalha com ambos? Temos a solução completa</div>
</div>

<button>Começar Grátis</button>
```

#### SEO/Meta Tags
```html
<title>TôLivre - Sistema de Agendamento e Gestão de Locação</title>
<meta name="description" content="Plataforma completa para profissionais 
de serviços e empresas de locação. Agenda, controle de estoque, 
pagamentos, notificações automáticas e muito mais.">

<meta name="keywords" content="sistema de agendamento, gestão de locação, 
software para salão, sistema para locadora, agenda online, controle de estoque">
```

#### Google Ads (Duas Campanhas)
```
Campanha 1 - Serviços:
"TôLivre - Agendamentos Online"
Gerencie sua agenda com facilidade. Grátis para começar!

Campanha 2 - Locação:
"TôLivre - Gestão de Locação"
Controle seu estoque e locações em um só lugar. Teste grátis!
```

#### Página de Recursos (Separação Clara)
```
/recursos/agendamento       → Para profissionais
/recursos/locacao           → Para locadoras
/recursos/hibrido           → Para negócios BOTH
```

---

### 📊 Casos de Sucesso de Nomes "Ambíguos"

**Exemplos de marcas que não explicam o que fazem:**

1. **Trello** - Nome não diz nada sobre gerenciamento de projetos
2. **Slack** - "Folga" não indica comunicação empresarial
3. **Zoom** - Poderia ser qualquer coisa, virou sinônimo de videochamada
4. **Notion** - Noção? Virou software de produtividade líder
5. **Asana** - Posição de yoga? É gerenciamento de tarefas

**O que fizeram certo:** Marketing, posicionamento e produto excelente.

---

### 🎯 Decisão Final Recomendada

✅ **MANTER "TôLivre"**

**Implementar:**
1. Tagline clara: "Agendamentos e Locações sem Complicação"
2. Homepage com seções separadas para cada mercado
3. SEO otimizado para ambas as keywords
4. Materiais de marketing segmentados
5. Onboarding que pergunta: "Qual seu tipo de negócio?"

**Não implementar:**
- ❌ Mudança de nome
- ❌ Rebranding completo
- ❌ Criação de marca separada (ainda não justifica)

---

### 🚀 Próximos Passos (Comunicação)

Quando decidir implementar modo RENTALS:

1. **Atualizar Homepage:**
   - Adicionar seção "Para Empresas de Locação"
   - Mostrar screenshots do modo RENTALS
   - Cases de sucesso de locadoras

2. **Criar Landing Pages Específicas:**
   - `/locacao` → Focada em locadoras
   - `/agendamento` → Focada em profissionais
   - `/hibrido` → Focada em negócios BOTH

3. **SEO:**
   - Blog posts: "Como gerenciar locadora de festas"
   - Blog posts: "Sistema para controle de estoque de locação"
   - Otimizar para long-tail keywords

4. **Anúncios:**
   - Google Ads para ambos os mercados
   - Facebook Ads segmentados
   - LinkedIn para B2B (locadoras maiores)

---

**Conclusão:** TôLivre é um **nome forte, versátil e memorável**. Mantenha e use a comunicação estratégica para posicionar nos dois mercados. O nome não vai te impedir de crescer - **vai te diferenciar da concorrência genérica**! 🎯

---

**Documento criado para referência futura. Não implementar sem discussão e validação de mercado.**

_Última atualização: 05/12/2025_
