# 🔒 Segurança da Plataforma ToLivre

## Arquitetura de Autenticação

### Fluxo de Login

```
Cliente                    Servidor                    Banco de Dados
   |                          |                              |
   |-- POST /api/auth/login ->|                              |
   |   (email, password)       |                              |
   |                          |-- bcrypt.compare() --------->|
   |                          |                              |
   |                          |<-- password match ------------|
   |                          |                              |
   |                          |-- JWT token generation       |
   |                          |-- HttpOnly cookie            |
   |<-------------------------|                              |
   |   Set-Cookie: token=...  |                              |
```

### ✅ Práticas de Segurança Implementadas

#### 1. **Senha e Criptografia**

- ✅ Senhas hasheadas com **bcrypt** (10 rounds) no servidor
- ✅ Senhas **NUNCA** armazenadas em texto simples
- ✅ Comparação segura com `bcrypt.compare()`
- ✅ HTTPS obrigatório em produção (variável `NODE_ENV=production`)

**Por que enviamos senha em plain text?**

- HTTPS criptografa TODA a comunicação (TLS 1.3)
- Hasher no cliente não adiciona segurança (pode-se enviar o hash diretamente)
- O importante é hasher no SERVIDOR antes de salvar no banco

#### 2. **JWT Token**

- ✅ Armazenado em **HttpOnly Cookie** (JavaScript não consegue acessar)
- ✅ **SameSite=lax** (proteção contra CSRF)
- ✅ **Secure flag** em produção (apenas HTTPS)
- ✅ Expiração de **24 horas**
- ✅ Secret forte no `.env` (`JWT_SECRET`)

#### 3. **Rate Limiting**

- ✅ Máximo de **5 tentativas** de login por email em 24h
- ✅ Bloqueio automático após exceder limite
- ✅ Rate limiting por IP para registro (`checkRateLimit()`)

#### 4. **Autenticação de Dois Fatores (2FA)**

- ✅ TOTP (Time-based One-Time Password) com app autenticador
- ✅ Backup codes para recuperação
- ✅ QR Code para configuração fácil
- ✅ Obrigatório em logins após ativação

#### 5. **Monitoramento e Auditoria**

- ✅ Histórico completo de logins (`LoginHistory`)
  - IP, User-Agent, Device, Browser, OS
  - Timestamp, Sucesso/Falha
- ✅ Tentativas de login registradas (`LoginAttempt`)
- ✅ Sessões ativas rastreadas (`UserSession`)
- ✅ Score de risco calculado (`calculateLoginRiskScore()`)

#### 6. **Detecção de Ameaças**

- ✅ Detecção de **novo dispositivo**
- ✅ Detecção de **novo IP**
- ✅ Detecção de **IP suspeito** (mudança de região/país)
- ✅ Score de risco baseado em:
  - Novo dispositivo: +30 pontos
  - Novo IP: +20 pontos
  - IP suspeito: +40 pontos
  - Tentativas falhadas: +10 por tentativa
  - Login rápido após outro: +20 pontos

#### 7. **Notificações de Segurança**

- ✅ Alerta em tempo real via WebSocket para:
  - Login de novo dispositivo
  - Login com alto score de risco (>50)
- ✅ Informações detalhadas: IP, device, browser, OS

#### 8. **Proteção Contra Bots**

- ✅ **reCAPTCHA v3** no registro
- ✅ Verificação server-side com `verifyRecaptcha()`

#### 9. **Content Security Policy (CSP)**

- ✅ CSP headers configurados no Next.js
- ✅ Restrição de scripts inline
- ✅ Whitelist de domínios externos (Mercado Pago)

#### 10. **Conformidade LGPD**

- ✅ Dados criptografados em trânsito (HTTPS)
- ✅ Dados sensíveis hasheados no banco
- ✅ Logs de auditoria para compliance
- ✅ Backups automáticos diários

## 🚨 Checklist de Produção

Antes de fazer deploy, garanta:

- [ ] `NODE_ENV=production` configurado
- [ ] `JWT_SECRET` forte (mínimo 32 caracteres aleatórios)
- [ ] HTTPS habilitado no servidor (nginx/cloudflare)
- [ ] Certificado SSL válido
- [ ] `RECAPTCHA_SECRET_KEY` configurado
- [ ] Database connection string segura
- [ ] Firewall configurado para bloquear IPs maliciosos
- [ ] Backups automáticos configurados
- [ ] Monitoramento de logs ativo

## 🔐 Configurações Recomendadas

### Variáveis de Ambiente (.env)

```bash
# JWT (gerar com: openssl rand -base64 32)
JWT_SECRET=sua_chave_super_secreta_com_minimo_32_caracteres

# reCAPTCHA (https://www.google.com/recaptcha)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...

# Ambiente
NODE_ENV=production
```

### Nginx (HTTPS)

```nginx
server {
    listen 443 ssl http2;
    server_name tolivre.com.br;

    ssl_certificate /etc/letsencrypt/live/tolivre.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tolivre.com.br/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 Monitoramento

### Métricas de Segurança

- Taxa de tentativas de login falhadas
- Logins de novos dispositivos por dia
- Score médio de risco de logins
- IPs bloqueados por rate limit

### Alertas

- Login com score de risco > 70
- Mais de 3 tentativas falhadas seguidas
- Acesso de IP internacional inesperado

## 🛡️ Resposta a Incidentes

Se suspeitar de comprometimento:

1. **Revogar todas as sessões ativas**

   ```sql
   DELETE FROM "UserSession" WHERE "userId" = 'user_id';
   ```

2. **Forçar reset de senha**

   ```sql
   UPDATE "User" SET "password" = 'temp_hash' WHERE "id" = 'user_id';
   ```

3. **Investigar logs**

   ```sql
   SELECT * FROM "LoginHistory"
   WHERE "userId" = 'user_id'
   ORDER BY "createdAt" DESC;
   ```

4. **Bloquear IP suspeito**
   - Adicionar IP na blacklist do firewall
   - Rate limit agressivo para aquele IP

## 📚 Referências

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [LGPD - Lei Geral de Proteção de Dados](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [bcrypt Best Practices](https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Última atualização**: 12 de Dezembro de 2025
