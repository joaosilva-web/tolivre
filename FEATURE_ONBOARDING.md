# Feature: Sistema de Onboarding (Configuração Inicial)

## Visão Geral

Sistema de onboarding em 4 etapas que guia novos clientes na configuração completa do sistema, garantindo que nenhum passo essencial seja esquecido.

## Funcionalidades

### 🎯 Wizard de Configuração em 4 Etapas

#### **Etapa 1: Informações da Empresa**

- Nome fantasia (obrigatório)
- Razão social (opcional)
- CNPJ/CPF com validação e formatação automática
- WhatsApp/Telefone com máscara
- Endereço completo
- Email para contato
- Dicas contextuais para cada campo

#### **Etapa 2: Horários de Funcionamento**

- Seleção visual dos dias de atendimento
- Configuração de horário de abertura e fechamento para cada dia
- Interface intuitiva com botões de toggle
- Visualização em lista organizada por dia da semana
- Horários padrão pré-configurados (8h às 18h)

#### **Etapa 3: Serviços Oferecidos**

- Adicionar múltiplos serviços
- Campos: nome, preço, duração
- Duração com select pré-definido (15min a 3h)
- Possibilidade de adicionar/remover serviços dinamicamente
- Validação de pelo menos 1 serviço

#### **Etapa 4: Configuração Completa**

- Tela de sucesso com resumo
- Cards mostrando o que o sistema oferece
- Sugestões de próximos passos
- Botão para ir ao dashboard

## Componentes Criados

### Página Principal

**Arquivo:** `src/app/dashboard/onboarding/page.tsx`

Componente principal que gerencia o fluxo completo do onboarding:

- Estado multi-etapas
- Validações por etapa
- Salvamento progressivo dos dados
- Navegação entre etapas
- Indicador visual de progresso

### OnboardingGuard

**Arquivo:** `src/components/onboarding-guard.tsx`

Componente de proteção que:

- Verifica se usuário precisa fazer onboarding
- Redireciona automaticamente para `/dashboard/onboarding`
- Previne acesso ao dashboard sem configuração completa
- Não interfere nas rotas de onboarding e login

### API de Status

**Arquivo:** `src/app/api/onboarding/status/route.ts`

Endpoint que verifica se onboarding foi completado:

```typescript
GET / api / onboarding / status;
```

Retorna:

```json
{
  "needsOnboarding": boolean,
  "hasEssentialData": boolean,
  "hasServices": boolean,
  "hasWorkingHours": boolean,
  "servicesCount": number,
  "workingHoursCount": number
}
```

### Componente UI Progress

**Arquivo:** `src/components/ui/progress.tsx`

Barra de progresso visual usando Radix UI para mostrar avanço no wizard.

## Integração com o Sistema

### Layout do Dashboard

Modificado para incluir o `OnboardingGuard`:

```tsx
<OnboardingGuard>{children}</OnboardingGuard>
```

### Fluxo de Usuário

```
Login/Registro
    ↓
Dashboard Layout
    ↓
OnboardingGuard verifica status
    ↓
    ├─→ Dados completos → Dashboard normal
    │
    └─→ Dados incompletos → /dashboard/onboarding
            ↓
        Wizard 4 etapas
            ↓
        Configuração completa
            ↓
        Dashboard liberado
```

## Critérios de Onboarding Completo

O sistema considera onboarding completo quando:

1. ✅ Empresa tem `nomeFantasia`, `cnpjCpf` e `telefone`
2. ✅ Pelo menos 1 serviço cadastrado
3. ✅ Pelo menos 1 horário de funcionamento configurado

## UX/UI Features

### Indicadores Visuais

- **Barra de progresso**: Mostra porcentagem de conclusão
- **Ícones por etapa**: Representação visual clara
- **Check marks**: Etapas concluídas ficam marcadas
- **Estados visuais**: Etapa atual destacada com ring

### Mensagens de Ajuda

- Dicas contextuais em cada etapa
- Descrições claras do que preencher
- Exemplos de preenchimento nos placeholders
- Validações com mensagens amigáveis

### Navegação

- Botões "Voltar" e "Continuar"
- Salvamento automático ao avançar
- Validação antes de próxima etapa
- Estado de loading durante salvamento

### Design Responsivo

- Grid adaptativo (1 coluna mobile, 2 desktop)
- Botões full-width em mobile
- Espaçamentos otimizados
- Texto legível em qualquer tela

## Melhorias de Experiência

### Dados Pré-configurados

- Horários padrão de funcionamento (Segunda a Sexta, 8h-18h)
- Duração padrão de serviço (30 minutos)
- Primeiro serviço já disponível para preenchimento

### Validações Inteligentes

- CNPJ/CPF aceita apenas números
- Telefone com máscara automática
- Email com validação de formato
- Horários não podem ser vazios

### Feedback Visual

- Skeleton/loading durante carregamento
- Mensagens de erro contextuais
- Animações suaves entre etapas
- Cards com resumo final

## Rotas Afetadas

### Protegidas pelo OnboardingGuard

Todas as rotas dentro de `/dashboard/*` exceto:

- `/dashboard/onboarding` (página do wizard)
- `/login`
- `/registro`

### Nova Rota

- `GET /dashboard/onboarding` - Página do wizard
- `GET /api/onboarding/status` - Verificação de status

## Considerações Técnicas

### Performance

- Verificação de status apenas no mount
- Cache do resultado durante sessão
- Redirecionamento imediato sem flash

### Segurança

- Todas as rotas protegidas por autenticação
- Validação server-side de todos os dados
- CompanyId do usuário logado sempre usado

### Manutenibilidade

- Código modular e componentizado
- Estados bem definidos
- Fácil adicionar novos passos ao wizard
- Documentação inline

## Próximas Melhorias Possíveis

1. **Página pública de agendamento**

   - Criar slug personalizado da empresa
   - Configurar aparência da página

2. **Onboarding de múltiplos profissionais**

   - Cadastro de equipe
   - Atribuição de serviços

3. **Tutorial interativo**

   - Tour guiado pós-onboarding
   - Tooltips com dicas

4. **Progresso salvo**

   - Salvar progresso parcial
   - Continuar de onde parou

5. **Analytics**
   - Tracking de conclusão
   - Identificar pontos de abandono

## Testes Sugeridos

1. ✅ Novo usuário é redirecionado automaticamente
2. ✅ Dados são salvos corretamente em cada etapa
3. ✅ Validações impedem avanço com dados inválidos
4. ✅ Botão voltar mantém dados preenchidos
5. ✅ Usuário com onboarding completo não é redirecionado
6. ✅ Múltiplos serviços podem ser adicionados
7. ✅ Horários de funcionamento são salvos corretamente
8. ✅ Responsividade em mobile e desktop
