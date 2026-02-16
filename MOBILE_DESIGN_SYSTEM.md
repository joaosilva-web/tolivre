# 🎨 TôLivre - Design System & Brand Guidelines (Mobile App)

> Guia completo de design, cores, tipografia e componentes para desenvolvimento do aplicativo mobile TôLivre

---

## 📱 Sobre o TôLivre

**TôLivre** é uma plataforma SaaS de agendamentos online com foco em profissionais autônomos e pequenos negócios. O sistema automatiza confirmações via WhatsApp, reduz no-shows e otimiza a gestão de horários.

**Proposta de Valor:** _"Agendamentos sem complicação - mais tempo para focar no que realmente importa"_

---

## 🎨 Paleta de Cores

### Cores Primárias

```typescript
// Cor principal - Verde Teal (confiança, crescimento, saúde)
primary: "#0d542b"; // oklch(0.3935 0.0957 152.28)
primaryForeground: "#fafafa"; // oklch(0.985 0 0)

// Cor secundária - Verde claro
secondary: "#c5e8d7"; // oklch(0.82 0.06 152.28)
secondaryForeground: "#fafafa";

// Cor de destaque/accent
accent: "#3d9970"; // oklch(0.62 0.08 152.28)
accentForeground: "#fafafa";
```

### Cores de Sistema

```typescript
// Backgrounds
background: "#ffffff"; // oklch(1 0 0)
foreground: "#0a0a0a"; // oklch(0.145 0 0)

// Cards e Superfícies
card: "#ffffff";
cardForeground: "#0a0a0a";
popover: "#ffffff";
popoverForeground: "#0a0a0a";

// Estados
muted: "#f7f7f7"; // oklch(0.97 0 0)
mutedForeground: "#737373"; // oklch(0.556 0 0)

// Bordas e Inputs
border: "#e5e5e5"; // oklch(0.922 0 0)
input: "#e5e5e5";
ring: "#0d542b"; // Mesmo da primary

// Destructivo (Erros/Deletar)
destructive: "#dc2626"; // oklch(0.577 0.245 27.325)
destructiveForeground: "#fafafa";
```

### Cores para Gráficos/Charts

```typescript
chart1: "#2d7a4f"; // oklch(0.55 0.12 152.28)
chart2: "#4a9966"; // oklch(0.65 0.1 152.28)
chart3: "#1f5e3a"; // oklch(0.45 0.08 152.28)
chart4: "#66b380"; // oklch(0.75 0.09 152.28)
chart5: "#0f3d22"; // oklch(0.35 0.07 152.28)
```

### Dark Mode

```typescript
// Dark Theme
background: "#0a0a0a"; // oklch(0.145 0 0)
foreground: "#fafafa"; // oklch(0.985 0 0)
card: "#1a1a1a"; // oklch(0.205 0 0)
primary: "#4fb582"; // oklch(0.65 0.13 165) - Verde mais claro
border: "rgba(255,255,255,0.1)";
```

---

## 🔤 Tipografia

### Fontes

```typescript
// Família principal
fontFamily: {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
  mono: ['Geist Mono', 'ui-monospace', 'Courier New']
}

// Pesos disponíveis
fontWeight: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700
}
```

### Escala Tipográfica Mobile

```typescript
fontSize: {
  xs: '12px',      // Labels pequenas, badges
  sm: '14px',      // Body text secundário
  base: '16px',    // Body text principal (padrão mobile)
  lg: '18px',      // Subtítulos
  xl: '20px',      // Títulos de card
  '2xl': '24px',   // Títulos de seção
  '3xl': '28px',   // Títulos de página
  '4xl': '32px',   // Headlines
}

lineHeight: {
  tight: 1.2,      // Títulos
  normal: 1.5,     // Body text
  relaxed: 1.75    // Textos longos
}
```

### Hierarquia de Texto (Exemplos)

```tsx
// H1 - Título de Página
<Text style={{ fontSize: 28, fontWeight: '700', color: '#0a0a0a' }}>
  Meus Agendamentos
</Text>

// H2 - Subtítulo de Seção
<Text style={{ fontSize: 20, fontWeight: '600', color: '#0a0a0a' }}>
  Próximos Horários
</Text>

// Body - Texto Principal
<Text style={{ fontSize: 16, fontWeight: '400', color: '#0a0a0a' }}>
  Você tem 3 agendamentos confirmados hoje
</Text>

// Caption - Texto Secundário
<Text style={{ fontSize: 14, fontWeight: '400', color: '#737373' }}>
  Última atualização há 5 minutos
</Text>
```

---

## 📐 Espaçamento e Grid

### Sistema de Espaçamento (8pt Grid)

```typescript
spacing: {
  0: '0px',
  1: '4px',      // 0.25rem
  2: '8px',      // 0.5rem  - Espaçamento mínimo
  3: '12px',     // 0.75rem
  4: '16px',     // 1rem    - Espaçamento padrão entre elementos
  5: '20px',     // 1.25rem
  6: '24px',     // 1.5rem  - Espaçamento entre seções
  8: '32px',     // 2rem    - Margens laterais mobile
  10: '40px',    // 2.5rem
  12: '48px',    // 3rem
  16: '64px',    // 4rem
}
```

### Margens Padrão Mobile

```typescript
// Container lateral
paddingHorizontal: 16,  // 4 (spacing[4])

// Espaçamento vertical entre cards
marginBottom: 12,       // 3 (spacing[3])

// Espaçamento interno de cards
padding: 16,            // 4 (spacing[4])

// Espaçamento entre seções
marginBottom: 24,       // 6 (spacing[6])
```

---

## 🔘 Componentes UI

### Botões

#### Variantes

```typescript
// Primary Button - Ação principal
{
  background: 'linear-gradient(to right, #0d542b, #3d9970)',
  color: '#ffffff',
  fontWeight: '600',
  fontSize: 16,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 10,
  // Sombra sutil
  shadowColor: '#0d542b',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
}

// Secondary Button
{
  background: 'linear-gradient(to right, #c5e8d7, #3d9970)',
  color: '#ffffff',
  fontWeight: '600',
  // ... mesmo padding/radius
}

// Outline Button
{
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderColor: '#0d542b',
  color: '#0d542b',
  fontWeight: '600',
  // ... mesmo padding/radius
}

// Ghost Button (sem borda)
{
  backgroundColor: 'transparent',
  color: '#0d542b',
  fontWeight: '500',
}

// Destructive Button
{
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontWeight: '600',
}
```

#### Tamanhos

```typescript
size: {
  sm: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
  md: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },  // default
  lg: { paddingVertical: 14, paddingHorizontal: 32, fontSize: 18 },
  icon: { width: 40, height: 40, borderRadius: 10 }  // Botões com apenas ícone
}
```

#### Estados

```typescript
// Pressed (pressão)
opacity: 0.9;
scale: 1.02;

// Disabled
opacity: 0.5;
pointerEvents: "none";

// Loading
// Mostrar ActivityIndicator no lugar do texto
```

---

### Cards

```typescript
// Card padrão
{
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
  borderWidth: 1,
  borderColor: '#e5e5e5'
}

// Card com hover/press (para listas clicáveis)
{
  // ... mesmas propriedades +
  activeOpacity: 0.7  // no TouchableOpacity
}

// Card de destaque
{
  // ... mesmas propriedades +
  borderWidth: 2,
  borderColor: '#0d542b'
}
```

---

### Inputs

```typescript
// Text Input padrão
{
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#e5e5e5',
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 16,
  fontSize: 16,
  color: '#0a0a0a',
  // Focus state
  focusBorderColor: '#0d542b',
  focusBorderWidth: 2,
}

// Input com erro
{
  borderColor: '#dc2626',
  borderWidth: 2,
}

// Input disabled
{
  backgroundColor: '#f7f7f7',
  color: '#737373',
  opacity: 0.6
}
```

---

### Badges/Pills

```typescript
// Status Badge - Confirmado
{
  backgroundColor: '#dcfce7',  // verde claro
  color: '#166534',            // verde escuro
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderRadius: 16,
  fontSize: 12,
  fontWeight: '600'
}

// Status Badge - Pendente
{
  backgroundColor: '#fef3c7',  // amarelo claro
  color: '#92400e',            // marrom escuro
}

// Status Badge - Cancelado
{
  backgroundColor: '#fee2e2',  // vermelho claro
  color: '#991b1b',            // vermelho escuro
}
```

---

### Avatars

```typescript
// Avatar com imagem
{
  width: 40,
  height: 40,
  borderRadius: 20,  // 100% circular
  borderWidth: 2,
  borderColor: '#0d542b',
  overflow: 'hidden'
}

// Avatar com iniciais (sem foto)
{
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#0d542b',
  justifyContent: 'center',
  alignItems: 'center',
  // Texto
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600'
}

// Tamanhos
size: {
  sm: { width: 32, height: 32, fontSize: 14 },
  md: { width: 40, height: 40, fontSize: 16 },
  lg: { width: 56, height: 56, fontSize: 20 },
  xl: { width: 80, height: 80, fontSize: 28 }
}
```

---

## 🎭 Ícones

### Biblioteca Recomendada

- **React Native:** `@expo/vector-icons` (Lucide icons)
- **Flutter:** `lucide_icons`
- **Tamanho padrão:** 24x24px
- **Cor padrão:** `#0a0a0a` (foreground)

### Ícones Principais do App

```typescript
icons: {
  // Navegação
  home: 'Home',
  calendar: 'Calendar',
  users: 'Users',
  settings: 'Settings',

  // Agendamentos
  clock: 'Clock',
  checkCircle: 'CheckCircle',
  xCircle: 'XCircle',
  bell: 'Bell',

  // Ações
  plus: 'Plus',
  edit: 'Edit',
  trash: 'Trash',
  share: 'Share',

  // Comunicação
  messageCircle: 'MessageCircle',
  phone: 'Phone',
  mail: 'Mail',

  // Financeiro
  creditCard: 'CreditCard',
  dollarSign: 'DollarSign',
  trendingUp: 'TrendingUp',

  // UI
  chevronRight: 'ChevronRight',
  chevronLeft: 'ChevronLeft',
  chevronDown: 'ChevronDown',
  search: 'Search',
  filter: 'Filter',
  moreVertical: 'MoreVertical'
}
```

---

## 🌈 Bordas e Sombras

### Border Radius

```typescript
borderRadius: {
  none: 0,
  sm: 6,       // Elementos pequenos (badges, pills)
  md: 10,      // Padrão (botões, inputs, cards pequenos)
  lg: 12,      // Cards médios
  xl: 16,      // Cards grandes, modals
  '2xl': 20,   // Hero sections
  full: 9999   // Círculos perfeitos (avatars)
}

// Valor padrão do projeto
--radius: 10px  // 0.625rem
```

### Sombras (Elevação)

```typescript
// Sombra sutil (cards, inputs)
shadowLight: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
}

// Sombra média (botões flutuantes, modals)
shadowMedium: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
}

// Sombra forte (popups, dropdowns)
shadowStrong: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
}

// Sombra colorida (botões primary)
shadowPrimary: {
  shadowColor: '#0d542b',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
}
```

---

## 🎬 Animações e Transições

### Duração

```typescript
duration: {
  fast: 150,      // Feedback instantâneo (hover, press)
  normal: 300,    // Transições padrão
  slow: 500,      // Animações complexas
}
```

### Easing (Curvas de animação)

```typescript
easing: {
  // Padrão - suave e natural
  default: 'cubic-bezier(0.16, 1, 0.3, 1)',

  // Entrada - começa devagar
  in: 'ease-in',

  // Saída - termina devagar
  out: 'ease-out',

  // Entrada e saída
  inOut: 'ease-in-out',

  // Bounce suave
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}
```

### Animações Comuns

```typescript
// Fade In (aparecer suavemente)
{
  opacity: { from: 0, to: 1 },
  duration: 300,
  easing: 'ease-out'
}

// Slide Up (deslizar para cima)
{
  translateY: { from: 40, to: 0 },
  opacity: { from: 0, to: 1 },
  duration: 500,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
}

// Scale (crescer)
{
  scale: { from: 0.9, to: 1 },
  opacity: { from: 0, to: 1 },
  duration: 300,
  easing: 'spring'
}

// Press Animation (botões)
{
  scale: { from: 1, to: 1.02 },
  duration: 150
}
```

---

## 📱 Layout Mobile

### Estrutura de Telas

#### Bottom Tab Navigation

```typescript
tabs: [
  { name: 'Início', icon: 'Home', route: '/home' },
  { name: 'Agenda', icon: 'Calendar', route: '/calendar' },
  { name: 'Clientes', icon: 'Users', route: '/clients' },
  { name: 'Perfil', icon: 'User', route: '/profile' }
]

// Estilo da Tab Bar
{
  height: 60,
  backgroundColor: '#ffffff',
  borderTopWidth: 1,
  borderTopColor: '#e5e5e5',
  paddingBottom: 8,  // Safe area iOS

  // Tab ativa
  activeColor: '#0d542b',
  activeFontWeight: '600',

  // Tab inativa
  inactiveColor: '#737373',
  inactiveFontWeight: '400'
}
```

#### Header/AppBar

```typescript
{
  height: 56,
  backgroundColor: '#ffffff',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  // Título
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a0a0a'
  }
}
```

### Safe Areas (iOS)

```typescript
// Sempre usar SafeAreaView para evitar notch/home indicator
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
  {/* Conteúdo aqui */}
</SafeAreaView>
```

### Breakpoints (Tablets)

```typescript
breakpoints: {
  mobile: 0,
  tablet: 768,
  desktop: 1024
}

// Exemplo de uso
const isMobile = width < 768;
const isTablet = width >= 768 && width < 1024;
```

---

## 🎨 Temas Personalizados (Multi-tenant)

Para páginas públicas de agendamento, o app pode adaptar cores da empresa:

```typescript
// Cores dinâmicas (vindas da API)
companyTheme: {
  primary: company.primaryColor || '#0d542b',
  accent: company.accentColor || '#3d9970',
  logo: company.logo || '/default-logo.svg',

  // Aplicar em:
  buttonBackground: companyTheme.primary,
  headerBackground: companyTheme.primary,
  iconColor: companyTheme.primary,
  linkColor: companyTheme.primary
}
```

---

## 📊 Componentes Específicos do App

### Card de Agendamento

```typescript
{
  backgroundColor: '#ffffff',
  borderRadius: 12,
  padding: 16,
  borderLeftWidth: 4,
  borderLeftColor: '#0d542b',  // Cor do status
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  elevation: 1,

  // Header do card
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

  // Hora grande
  time: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0a0a0a'
  },

  // Badge de status
  badge: {
    // Ver seção Badges acima
  },

  // Nome do cliente
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0a0a',
    marginBottom: 4
  },

  // Serviço
  service: {
    fontSize: 14,
    color: '#737373'
  }
}
```

### Lista de Clientes

```typescript
{
  // Item da lista
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5'
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12
  },

  info: {
    flex: 1
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a0a0a',
    marginBottom: 2
  },

  detail: {
    fontSize: 14,
    color: '#737373'
  },

  chevron: {
    color: '#737373'
  }
}
```

### Calendário (Agenda)

```typescript
calendar: {
  // Header do mês
  monthHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a0a0a',
    textAlign: 'center',
    marginBottom: 16
  },

  // Dias da semana
  weekDays: {
    fontSize: 12,
    fontWeight: '600',
    color: '#737373',
    textAlign: 'center'
  },

  // Dia do calendário
  day: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Dia selecionado
  selectedDay: {
    backgroundColor: '#0d542b',
    color: '#ffffff'
  },

  // Dia com agendamento (badge/indicador)
  dayWithAppointment: {
    // Adicionar dot indicator
    indicator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#0d542b',
      position: 'absolute',
      bottom: 4
    }
  }
}
```

---

## 🚀 Estados de Loading

### Skeleton Loader

```typescript
skeleton: {
  backgroundColor: '#e5e5e5',
  borderRadius: 4,
  overflow: 'hidden',

  // Animação shimmer
  shimmer: {
    background: 'linear-gradient(90deg, #e5e5e5 0%, #f7f7f7 50%, #e5e5e5 100%)',
    animation: 'shimmer 1.5s infinite'
  }
}

// Uso
<View style={{ width: '100%', height: 60, backgroundColor: '#e5e5e5', borderRadius: 10 }}>
  {/* Animated shimmer aqui */}
</View>
```

### Activity Indicator

```typescript
{
  size: 'large',  // ou 'small'
  color: '#0d542b',  // primary color
}
```

### Empty States

```typescript
emptyState: {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32
  },

  icon: {
    width: 80,
    height: 80,
    color: '#737373',
    marginBottom: 16
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0a0a0a',
    textAlign: 'center',
    marginBottom: 8
  },

  description: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    marginBottom: 24
  },

  // Botão de ação (opcional)
  action: {
    // Ver botão primary
  }
}
```

---

## ⚠️ Mensagens e Feedbacks

### Toast/Snackbar

```typescript
toast: {
  // Sucesso
  success: {
    backgroundColor: '#dcfce7',
    borderLeftColor: '#166534',
    borderLeftWidth: 4,
    color: '#166534'
  },

  // Erro
  error: {
    backgroundColor: '#fee2e2',
    borderLeftColor: '#991b1b',
    borderLeftWidth: 4,
    color: '#991b1b'
  },

  // Informação
  info: {
    backgroundColor: '#dbeafe',
    borderLeftColor: '#1e40af',
    borderLeftWidth: 4,
    color: '#1e40af'
  },

  // Aviso
  warning: {
    backgroundColor: '#fef3c7',
    borderLeftColor: '#92400e',
    borderLeftWidth: 4,
    color: '#92400e'
  },

  // Container
  container: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  }
}
```

---

## 📏 Acessibilidade

### Tamanhos Mínimos

```typescript
accessibility: {
  minTouchTarget: 44,  // 44x44pt (iOS HIG)
  minFontSize: 16,     // Evitar zoom automático em iOS
  contrastRatio: 4.5,  // WCAG AA para texto normal
}
```

### Labels e Hints

```typescript
// Sempre usar accessibilityLabel em componentes interativos
<TouchableOpacity
  accessibilityLabel="Agendar novo horário"
  accessibilityHint="Abre tela para criar um novo agendamento"
  accessibilityRole="button"
>
  <Text>Novo Agendamento</Text>
</TouchableOpacity>
```

---

## 🔧 Utilitários e Helpers

### Formatação de Cores (Converter HEX/OKLCH)

```typescript
// Cores principais em formatos alternativos
colors: {
  primary: {
    hex: '#0d542b',
    rgb: 'rgb(13, 84, 43)',
    rgba: 'rgba(13, 84, 43, 1)',
    oklch: 'oklch(0.3935 0.0957 152.28)'
  }
}
```

### Gradientes

```typescript
gradients: {
  // Gradiente primary (padrão dos botões)
  primary: ['#0d542b', '#3d9970'],  // left to right

  // Gradiente secondary
  secondary: ['#c5e8d7', '#3d9970'],

  // Gradiente de fundo (hero sections)
  backgroundHero: ['#ffffff', '#f7f7f7']  // top to bottom
}

// Uso (React Native)
import LinearGradient from 'react-native-linear-gradient';

<LinearGradient
  colors={['#0d542b', '#3d9970']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{ borderRadius: 10, padding: 12 }}
>
  <Text style={{ color: '#ffffff', fontWeight: '600' }}>Botão</Text>
</LinearGradient>
```

---

## 🖼️ Assets e Imagens

### Logo

```typescript
logo: {
  default: '/logo.svg',          // Ícone quadrado (32x32)
  full: '/full-logo-white.svg',  // Logo completo com texto (branco)
  fullColor: '/logo.svg'         // Logo completo colorido
}
```

### Placeholders

```typescript
placeholders: {
  avatar: 'https://via.placeholder.com/80/0d542b/ffffff?text=User',
  noImage: 'https://via.placeholder.com/400/e5e5e5/737373?text=Sem+Imagem'
}
```

---

## 📱 Fluxos Principais do App

### 1. Login/Onboarding

- Tela de splash com logo
- Login com email/senha
- Botão "Esqueci minha senha"
- Link para criar conta

### 2. Dashboard (Tela Inicial)

- Cards de resumo (agendamentos hoje, semana, receita)
- Lista de próximos agendamentos
- Botão flutuante FAB "+" para novo agendamento

### 3. Agenda/Calendário

- Calendário mensal com indicadores
- Lista de agendamentos do dia selecionado
- Filtros por profissional/serviço

### 4. Novo Agendamento

- Formulário step-by-step:
  1. Selecionar cliente (ou cadastrar novo)
  2. Selecionar serviço
  3. Selecionar profissional
  4. Selecionar data/hora
  5. Adicionar observações (opcional)
  6. Confirmar

### 5. Detalhes do Agendamento

- Informações completas
- Botões de ação: Editar, Cancelar, WhatsApp
- Histórico de alterações

### 6. Lista de Clientes

- Busca por nome/telefone
- Scroll infinito ou paginação
- Card com avatar, nome, último agendamento
- Tap para ver detalhes

---

## 🎯 Boas Práticas Mobile

### Performance

- Usar `FlatList` para listas longas (virtualização)
- Lazy load de imagens com placeholder
- Debounce em campos de busca (300ms)
- Cache de dados com AsyncStorage/MMKV

### UX

- Feedback visual imediato (ripple effect, opacity)
- Loading states em todas operações assíncronas
- Pull-to-refresh em listas
- Mensagens de erro claras e acionáveis
- Confirmação antes de ações destrutivas

### Navegação

- Bottom tabs para navegação principal
- Stack navigation para fluxos secundários
- Gestos nativos (swipe back no iOS)
- Deep linking para notificações

---

## 📦 Recursos Exportados

### Design Tokens (JSON)

```json
{
  "colors": {
    "primary": "#0d542b",
    "secondary": "#c5e8d7",
    "accent": "#3d9970",
    "background": "#ffffff",
    "foreground": "#0a0a0a",
    "muted": "#f7f7f7",
    "border": "#e5e5e5",
    "destructive": "#dc2626"
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 24,
    "xl": 32
  },
  "borderRadius": {
    "sm": 6,
    "md": 10,
    "lg": 12,
    "xl": 16,
    "full": 9999
  },
  "fontSize": {
    "xs": 12,
    "sm": 14,
    "base": 16,
    "lg": 18,
    "xl": 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32
  }
}
```

---

## 🔗 Links Úteis

- **API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Figma (Design System):** _(pendente criação)_
- **Protótipo Mobile:** _(pendente criação)_

---

## 📞 Contato

Para dúvidas sobre design ou implementação:

- 📧 Email: suporte@tolivre.app
- 💬 Chat: disponível no dashboard

---

**Última atualização:** 10/02/2026  
**Versão:** 1.0
