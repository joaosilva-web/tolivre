# 🚀 Configuração WebSocket no Dokploy (Path-Based Routing)

## ✅ Nova Arquitetura

- **Cliente conecta**: `wss://tolivre.app/ws` (porta 443 com SSL ✅)
- **Traefik** faz proxy interno para porta 3001
- **Servidor WebSocket**: roda internamente na porta 3001 (sem SSL)

## 📋 Passos no Dokploy

### 1️⃣ Remover Porta 3001 dos Ports

No painel do Dokploy → seu projeto → **Ports**:
- **Deletar** a configuração da porta 3001 que você criou
- A porta 3001 agora será **apenas interna** (não exposta publicamente)

### 2️⃣ Adicionar Labels do Traefik

No painel do Dokploy → seu projeto → **Advanced** → **Labels**:

Adicione estas labels (clique em "Add Label" para cada uma):

```
traefik.http.routers.tolivre-ws.rule=Host(`tolivre.app`) && PathPrefix(`/ws`)
traefik.http.routers.tolivre-ws.entrypoints=websecure
traefik.http.routers.tolivre-ws.tls=true
traefik.http.routers.tolivre-ws.tls.certresolver=letsencrypt
traefik.http.services.tolivre-ws.loadbalancer.server.port=3001
```

**Explicação das labels:**
- `rule`: Roteia `/ws` para o WebSocket
- `entrypoints=websecure`: Usa porta 443 (HTTPS)
- `tls=true`: Ativa SSL
- `certresolver`: Usa certificado Let's Encrypt existente
- `server.port=3001`: Faz proxy para porta interna 3001

### 3️⃣ Verificar Variáveis de Ambiente

No painel do Dokploy → **Environment**:

Confirme que estas variáveis existem:
- `WS_PORT=3001`
- `NEXT_PUBLIC_WS_PORT=3001` (pode remover essa, não é mais usada)

### 4️⃣ Push e Redeploy

```bash
git push origin master
```

No Dokploy, clique em **Redeploy**.

## ✅ Como Testar

Após o deploy:

1. **Abra o navegador** em `https://tolivre.app/dashboard`
2. **Abra o F12** (Console)
3. **Procure por**:
   ```
   [WebSocket] Connecting to: wss://tolivre.app/ws
   [WebSocket] Connected
   ```

4. **Teste de notificação**:
   - Abra em uma aba anônima: `https://tolivre.app/[seu-slug]`
   - Agende um compromisso
   - Na aba do dashboard, deve aparecer notificação no sino 🔔

## 🔍 Troubleshooting

### Se não conectar:

1. **Verifique logs do servidor** (Dokploy → Logs):
   ```
   [WebSocket] Server listening on 0.0.0.0:3001
   ```

2. **Verifique labels do Traefik**:
   ```bash
   docker inspect <container-name> | grep traefik
   ```

3. **Teste direto na porta 3001** (dev):
   ```bash
   curl http://localhost:3001/socket.io/
   ```

### Se der erro 404:

- Labels do Traefik não foram aplicadas corretamente
- Refaça o deploy

### Se der erro SSL:

- Certificado não está configurado
- Verifique se `certresolver=letsencrypt` está correto

## 📊 Vantagens desta Abordagem

✅ **SSL automático** - Usa certificado existente do Traefik  
✅ **Sem porta extra** - Tudo passa pela porta 443  
✅ **Mais seguro** - Porta 3001 não exposta publicamente  
✅ **Compatível com firewalls** - Muitos firewalls bloqueiam portas customizadas  
✅ **Melhor DX** - Não precisa abrir portas no VPS  

## 🎯 Resultado Final

```
Antes: wss://tolivre.app:3001 ❌ (sem SSL, porta bloqueada)
Depois: wss://tolivre.app/ws ✅ (com SSL, mesma porta do site)
```
