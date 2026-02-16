# Configuração CORS para App Mobile - TôLivre

## ✅ Configuração Implementada

O CORS foi configurado no `next.config.ts` para permitir que o app mobile (React Native, Flutter, etc.) acesse a API.

## 🔧 Como Funciona

### Desenvolvimento (NODE_ENV !== production)

```typescript
// Headers CORS em desenvolvimento (permite qualquer origem)
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Cookie
Access-Control-Allow-Credentials: true
```

**Origens permitidas em dev:**
- ✅ `http://localhost:8081` (Metro Bundler - React Native)
- ✅ `http://localhost:19000` (Expo)
- ✅ `http://localhost:19006` (Expo Web)
- ✅ `http://localhost:3000` (Next.js dev)
- ✅ Qualquer outra origem local

### Produção (NODE_ENV === production)

```typescript
// Headers CORS em produção (restrito ao domínio principal)
Access-Control-Allow-Origin: https://tolivre.app (ou NEXT_PUBLIC_APP_URL)
```

**Configurar variável de ambiente:**
```bash
NEXT_PUBLIC_APP_URL=https://tolivre.app
```

---

## 📱 Uso no App Mobile

### React Native (fetch)

```typescript
// Exemplo de requisição autenticada
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // ✅ Importante para cookies
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'senha123'
  })
});

const data = await response.json();
```

### React Native (Axios)

```typescript
import axios from 'axios';

// Configurar base URL
const api = axios.create({
  baseURL: __DEV__ 
    ? 'http://localhost:3000/api'  // Desenvolvimento
    : 'https://tolivre.app/api',   // Produção
  withCredentials: true, // ✅ Permite cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Uso
const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'senha123'
});
```

### Flutter (http package)

```dart
import 'package:http/http.dart' as http;

final response = await http.post(
  Uri.parse('http://localhost:3000/api/auth/login'),
  headers: {
    'Content-Type': 'application/json',
  },
  body: jsonEncode({
    'email': 'user@example.com',
    'password': 'senha123',
  }),
);
```

---

## 🔒 Autenticação com Cookies

### Problema: Cookies em Mobile

**⚠️ IMPORTANTE:** Cookies httpOnly não funcionam nativamente em apps mobile (React Native/Flutter) da mesma forma que no navegador.

### Soluções Recomendadas

#### Opção 1: Token JWT no Header (Recomendado para Mobile)

Modificar a API para retornar o token no body:

```typescript
// Em src/app/api/auth/login/route.ts
export async function POST(request: Request) {
  // ... validação
  
  const token = createAuthToken(user);
  
  // Retornar token no body para mobile
  return Response.json({
    success: true,
    data: {
      user,
      token  // ✅ Mobile pode salvar em AsyncStorage/SecureStore
    }
  });
}
```

No mobile, salvar e enviar em cada requisição:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Após login, salvar token
await AsyncStorage.setItem('auth-token', data.token);

// Em cada requisição
const token = await AsyncStorage.getItem('auth-token');
const response = await fetch('http://localhost:3000/api/appointments', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

#### Opção 2: Cookie Manager (React Native)

Usar biblioteca para gerenciar cookies:

```bash
npm install @react-native-cookies/cookies
```

```typescript
import CookieManager from '@react-native-cookies/cookies';

// Após login bem-sucedido
const cookies = await CookieManager.get('http://localhost:3000');
console.log('Cookies:', cookies);

// Cookies serão enviados automaticamente em próximas requisições
```

---

## 🧪 Testando CORS

### 1. Teste com cURL

```bash
# Preflight (OPTIONS)
curl -X OPTIONS http://localhost:3000/api/auth/login \
  -H "Origin: http://localhost:8081" \
  -H "Access-Control-Request-Method: POST" \
  -v

# Requisição real
curl -X POST http://localhost:3000/api/auth/login \
  -H "Origin: http://localhost:8081" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"senha123"}' \
  -v
```

**Verificar headers na resposta:**
```
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
< Access-Control-Allow-Credentials: true
```

### 2. Teste no React Native

```typescript
// No seu app mobile (App.tsx ou similar)
useEffect(() => {
  fetch('http://localhost:3000/api/health')
    .then(res => res.json())
    .then(data => console.log('✅ CORS funcionando:', data))
    .catch(err => console.error('❌ Erro CORS:', err));
}, []);
```

---

## 🚨 Troubleshooting

### Erro: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Causa:** Headers CORS não estão sendo aplicados.

**Solução:**
1. Verificar se a rota começa com `/api/`
2. Reiniciar o servidor Next.js: `npm run dev`
3. Limpar cache: `rm -rf .next && npm run dev`

### Erro: "Network request failed" (React Native)

**Causa:** Android não consegue acessar `localhost`.

**Solução Android:**
```typescript
// Use IP da máquina ao invés de localhost
const API_URL = __DEV__
  ? 'http://10.0.2.2:3000/api'  // Android Emulator
  // ? 'http://192.168.1.100:3000/api'  // Device físico (use seu IP local)
  : 'https://tolivre.app/api';
```

**Solução iOS:**
```typescript
// iOS pode usar localhost normalmente
const API_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://tolivre.app/api';
```

### Erro: Cookies não estão sendo enviados

**Causa:** Cookies httpOnly não funcionam em mobile por padrão.

**Solução:**
1. Use Opção 1 (Token JWT no header) - recomendado
2. Ou implemente Cookie Manager (Opção 2)

---

## 📝 Checklist de Implementação

### Backend (Next.js) ✅
- [x] Configurar headers CORS no `next.config.ts`
- [x] Permitir todas origens em desenvolvimento
- [x] Restringir origens em produção
- [x] Habilitar `Access-Control-Allow-Credentials`
- [x] Configurar cache de preflight (24h)

### Mobile (React Native/Flutter) ⏳
- [ ] Instalar biblioteca HTTP (axios ou fetch nativo)
- [ ] Configurar base URL (dev vs prod)
- [ ] Implementar autenticação com token JWT
- [ ] Salvar token em AsyncStorage/SecureStore
- [ ] Adicionar interceptor para incluir token em requests
- [ ] Tratar erros de rede e CORS
- [ ] Testar em Android (emulador e device)
- [ ] Testar em iOS (simulador e device)

---

## 🔐 Segurança em Produção

### Recomendações

1. **Whitelist de Origens**
   ```typescript
   // next.config.ts (produção)
   const allowedOrigins = [
     'https://tolivre.app',
     'https://www.tolivre.app',
     'https://app.tolivre.app'  // Se tiver subdomínio
   ];
   
   // No middleware ou API routes
   const origin = request.headers.get('origin');
   if (allowedOrigins.includes(origin)) {
     headers.set('Access-Control-Allow-Origin', origin);
   }
   ```

2. **Rate Limiting** (já implementado em `/api/auth/*`)

3. **HTTPS Obrigatório** em produção

4. **Token Expiration**
   ```typescript
   // Expirar tokens JWT após 7 dias
   const token = jwt.sign(payload, secret, { expiresIn: '7d' });
   ```

5. **Refresh Tokens** (implementação futura)

---

## 📚 Documentação Relacionada

- [API Documentation](./API_DOCUMENTATION.md) - Todos os endpoints disponíveis
- [Mobile Design System](./MOBILE_DESIGN_SYSTEM.md) - Guia de design do app
- [Security](./SECURITY.md) - Práticas de segurança

---

## 🆘 Suporte

**Dúvidas sobre CORS ou integração mobile?**
- 📧 Email: suporte@tolivre.app
- 💬 Chat: disponível no dashboard
- 📖 API Docs: https://tolivre.app/api/docs

---

**Última atualização:** 10/02/2026  
**Status:** ✅ CORS configurado e funcionando
