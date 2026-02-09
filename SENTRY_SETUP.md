# Configuração do Sentry

O Sentry está configurado para monitorar erros em produção. Para ativá-lo:

## 1. Criar conta no Sentry

1. Acesse https://sentry.io e crie uma conta gratuita
2. Crie um novo projeto, selecione "Next.js"
3. Copie o **DSN** fornecido

## 2. Configurar variáveis de ambiente

Adicione no seu `.env` (ou nas variáveis de ambiente do servidor):

```env
NEXT_PUBLIC_SENTRY_DSN=https://[sua-key]@[sua-org].ingest.sentry.io/[project-id]
```

### Opcional: Upload de Source Maps (recomendado para produção)

Para ter stack traces mais detalhados em produção:

```env
SENTRY_AUTH_TOKEN=seu_token_aqui
SENTRY_ORG=tolivre
SENTRY_PROJECT=tolivre-app
```

Para gerar o auth token:

1. Vá em https://sentry.io/settings/account/api/auth-tokens/
2. Crie um novo token com permissões: `project:releases` e `org:read`

## 3. Comportamento

### Desenvolvimento

- Erros são **logados no console** mas **não enviados** ao Sentry
- Isso evita poluir o Sentry com erros de desenvolvimento

### Produção

- Erros são automaticamente capturados e enviados ao Sentry
- Session Replay ativo para 10% das sessões
- Errors são sempre gravados com replay

## 4. Testar

Para testar se está funcionando, adicione em qualquer página:

```tsx
<button
  onClick={() => {
    throw new Error("Test Sentry");
  }}
>
  Test Error
</button>
```

## 5. Features Configuradas

✅ Client-side error tracking  
✅ Server-side error tracking  
✅ Edge runtime error tracking  
✅ Session Replay (10% das sessões, 100% em erros)  
✅ Performance monitoring (10% de sample rate em prod)  
✅ Automatic instrumentation  
✅ Source maps upload (quando configurado)  
✅ Filtragem de dados sensíveis (cookies, tokens)  
✅ Remoção de erros irrelevantes (extensões de navegador, etc)

## 6. Visualizar Erros

Acesse https://sentry.io e vá no seu projeto para ver:

- Erros em tempo real
- Stack traces detalhados
- Session replays
- Performance metrics
- User context (quando logado)

## Custos

Plano gratuito do Sentry inclui:

- 5.000 erros/mês
- 500 replays/mês
- Retenção de 30 dias
- Suficiente para MVP e pequenos projetos
