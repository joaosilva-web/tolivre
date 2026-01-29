# Configuração de Produção para WebSocket

## Problema
Em produção, o WebSocket tentava conectar na porta 3001, mas essa porta não estava exposta no Docker/servidor.

## Solução

O servidor WebSocket roda em uma porta separada (3001) do Next.js (3000). Ambas as portas precisam estar acessíveis.

### Dokploy / Docker Compose

Adicione a porta 3001 no arquivo `docker-compose.yml` ou nas configurações do Dokploy:

```yaml
services:
  app:
    ports:
      - "3000:3000"  # Next.js
      - "3001:3001"  # WebSocket
    environment:
      - WS_PORT=3001
      - NEXT_PUBLIC_WS_PORT=3001
```

### Dockerfile

O Dockerfile já expõe a porta 3000. Adicione a porta 3001:

```dockerfile
EXPOSE 3000
EXPOSE 3001
```

### Dokploy UI

Se estiver usando Dokploy, adicione nas configurações:

1. **Ports**: `3000:3000,3001:3001`
2. **Environment Variables**:
   - `WS_PORT=3001`
   - `NEXT_PUBLIC_WS_PORT=3001`

### Firewall

Certifique-se de que a porta 3001 está aberta no firewall do servidor:

```bash
# Ubuntu/Debian
sudo ufw allow 3001/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

### Nginx Reverse Proxy (Opcional)

Se estiver usando Nginx, você pode fazer proxy da porta 3001:

```nginx
# WebSocket upgrade
location /socket.io/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Com essa configuração, o WebSocket usará a mesma porta do Next.js (3000) e você não precisa expor a 3001.

## Verificação

Depois de configurar, teste:

```bash
# No servidor, verifique se a porta está aberta
netstat -tulpn | grep 3001

# Do seu computador, teste a conexão
telnet tolivre.app 3001
```

## Em Desenvolvimento

Em desenvolvimento local, o WebSocket já funciona automaticamente na porta 3001 sem configuração adicional.

## Fallback

O sistema tem reconexão automática e tentará conectar várias vezes. Se o WebSocket não conectar, o sistema continua funcionando mas sem notificações em tempo real.
