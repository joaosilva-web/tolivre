# 🚀 Guia de Deploy - TôLivre em Produção (KVM 4 Hostinger)

Este guia detalha o processo completo de deploy do TôLivre em um servidor KVM 4 da Hostinger.

---

## 📋 Pré-requisitos

### Servidor (KVM 4)
- ✅ 4 vCPU
- ✅ 8 GB RAM
- ✅ 80 GB SSD NVMe
- ✅ Ubuntu Server 22.04 LTS
- ✅ Acesso root via SSH

### Software Necessário
- Docker 24.x ou superior
- Docker Compose 2.x ou superior
- Git
- Nginx (opcional, já incluído no docker-compose)

---

## 🛠️ Instalação Inicial do Servidor

### 1. Conectar ao Servidor
```bash
ssh root@seu-servidor-ip
```

### 2. Atualizar Sistema
```bash
apt update && apt upgrade -y
```

### 3. Instalar Docker
```bash
# Instalar dependências
apt install -y ca-certificates curl gnupg lsb-release

# Adicionar chave GPG do Docker
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Adicionar repositório
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Verificar instalação
docker --version
docker compose version
```

### 4. Configurar Swap (Importante!)
```bash
# Criar arquivo de swap de 4GB
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Tornar permanente
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

# Ajustar swappiness (recomendado para servidores)
echo 'vm.swappiness=10' | tee -a /etc/sysctl.conf
sysctl -p
```

### 5. Configurar Firewall
```bash
# Instalar UFW
apt install -y ufw

# Configurar regras
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp

# Ativar firewall
ufw enable
ufw status
```

### 6. Criar Usuário para Deploy (Segurança)
```bash
# Criar usuário
adduser tolivre

# Adicionar ao grupo docker
usermod -aG docker tolivre

# Configurar sudo
usermod -aG sudo tolivre

# Trocar para o usuário
su - tolivre
```

---

## 📦 Deploy da Aplicação

### 1. Clonar Repositório
```bash
cd ~
git clone https://github.com/joaosilva-web/tolivre.git
cd tolivre
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.production.example .env.production

# Editar com suas configurações
nano .env.production
```

**Variáveis obrigatórias:**
```env
# Database
POSTGRES_PASSWORD=SENHA_FORTE_AQUI

# JWT
JWT_SECRET=CHAVE_SECRETA_AQUI

# App
NEXT_PUBLIC_APP_URL=https://ocupae.com.br

# Uazapi (WhatsApp)
UAZAPI_URL=https://api.uazapi.com
UAZAPI_TOKEN=seu_token
UAZAPI_HEADER=apikey

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=seu_token

# reCAPTCHA
RECAPTCHA_SECRET_KEY=sua_chave
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_publica
```

**Gerar senhas seguras:**
```bash
# JWT_SECRET
openssl rand -base64 32

# POSTGRES_PASSWORD
openssl rand -base64 24
```

### 3. Executar Deploy
```bash
# Dar permissão aos scripts
chmod +x scripts/*.sh

# Executar deploy
./scripts/deploy.sh
```

O script irá:
1. ✅ Baixar imagens Docker
2. ✅ Compilar aplicação
3. ✅ Executar migrations
4. ✅ Iniciar containers
5. ✅ Verificar health dos serviços

### 4. Verificar Status
```bash
# Ver containers rodando
docker ps

# Ver logs em tempo real
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f app
docker compose logs -f postgres
docker compose logs -f nginx
```

---

## 🔒 Configurar SSL (HTTPS)

### 1. Apontar Domínio
Antes de configurar SSL, certifique-se que seu domínio aponta para o IP do servidor:

```
Tipo A: ocupae.com.br -> SEU_IP
Tipo A: www.ocupae.com.br -> SEU_IP
```

### 2. Configurar Let's Encrypt
```bash
# Executar script de setup SSL
./scripts/setup-ssl.sh ocupae.com.br contato@ocupae.com.br
```

### 3. Verificar HTTPS
Acesse: https://ocupae.com.br

### 4. Habilitar HSTS (Após Testar)
```bash
# Editar configuração do Nginx
nano nginx/conf.d/tolivre.conf

# Descomentar linha:
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

# Recarregar Nginx
docker compose exec nginx nginx -s reload
```

---

## 💾 Backups Automáticos

### 1. Configurar Cron para Backups Diários
```bash
# Editar crontab
crontab -e

# Adicionar linha (backup diário às 3h da manhã)
0 3 * * * /home/tolivre/tolivre/scripts/backup.sh >> /home/tolivre/logs/backup.log 2>&1
```

### 2. Fazer Backup Manual
```bash
./scripts/backup.sh
```

Backups são salvos em: `./backups/tolivre_backup_YYYYMMDD_HHMMSS.sql.gz`

### 3. Restaurar Backup
```bash
./scripts/restore.sh ./backups/tolivre_backup_20251205_030000.sql.gz
```

---

## 📊 Monitoramento

### 1. Instalar Netdata (Dashboard de Métricas)
```bash
# Instalação rápida
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# Acessar dashboard
# http://SEU_IP:19999
```

### 2. Instalar PM2 (Opcional - se não usar Docker)
```bash
npm install -g pm2
pm2 startup
```

### 3. Configurar Alertas (UptimeRobot)
1. Criar conta em: https://uptimerobot.com
2. Adicionar monitor HTTP(S) para: https://ocupae.com.br
3. Configurar email de alerta

---

## 🔧 Comandos Úteis

### Docker Compose
```bash
# Iniciar serviços
docker compose up -d

# Parar serviços
docker compose down

# Reiniciar serviço específico
docker compose restart app

# Ver logs
docker compose logs -f

# Ver uso de recursos
docker stats

# Limpar volumes não utilizados
docker volume prune

# Limpar imagens não utilizadas
docker image prune -a
```

### Database
```bash
# Acessar PostgreSQL
docker compose exec postgres psql -U tolivre -d tolivre_prod

# Executar migration
docker compose run --rm app npx prisma migrate deploy

# Prisma Studio (GUI)
docker compose run --rm -p 5555:5555 app npx prisma studio
```

### Nginx
```bash
# Recarregar configuração
docker compose exec nginx nginx -s reload

# Testar configuração
docker compose exec nginx nginx -t

# Ver logs de acesso
docker compose logs nginx | grep "GET"
```

---

## 🐛 Troubleshooting

### App não inicia
```bash
# Ver logs detalhados
docker compose logs app

# Verificar se migrations rodaram
docker compose run --rm app npx prisma migrate status

# Recriar containers
docker compose down
docker compose up -d --force-recreate
```

### Database com problemas
```bash
# Ver logs
docker compose logs postgres

# Verificar conexões
docker compose exec postgres psql -U tolivre -d tolivre_prod -c "SELECT count(*) FROM pg_stat_activity;"

# Resetar conexões (cuidado!)
docker compose restart postgres
```

### SSL não funciona
```bash
# Verificar logs do certbot
docker compose logs certbot

# Renovar certificado manualmente
docker compose run --rm certbot renew

# Verificar se domínio está apontando corretamente
nslookup ocupae.com.br
```

### Memória esgotada
```bash
# Ver uso de memória
free -h

# Ver containers usando mais memória
docker stats --no-stream

# Limpar cache do sistema
sync; echo 3 > /proc/sys/vm/drop_caches
```

---

## 📈 Otimizações de Performance

### 1. Habilitar Cloudflare (Recomendado)
1. Criar conta no Cloudflare
2. Adicionar domínio
3. Alterar nameservers
4. Habilitar proxy (nuvem laranja)
5. Configurar cache rules

### 2. Ajustar PostgreSQL
Se o banco crescer muito, ajustar configurações em `docker-compose.yml`:
```yaml
POSTGRES_SHARED_BUFFERS: 1024MB  # Era 512MB
POSTGRES_EFFECTIVE_CACHE_SIZE: 3GB  # Era 1536MB
```

### 3. Adicionar Redis (Se necessário)
```yaml
redis:
  image: redis:7-alpine
  restart: unless-stopped
  command: redis-server --maxmemory 512mb --maxmemory-policy allkeys-lru
  networks:
    - tolivre-network
```

---

## 🔐 Security Checklist

- [ ] Firewall configurado (UFW)
- [ ] Swap habilitado
- [ ] SSL/HTTPS ativo
- [ ] HSTS habilitado (após teste)
- [ ] Backups automáticos configurados
- [ ] Senhas fortes (32+ caracteres)
- [ ] Usuário root desabilitado
- [ ] SSH com chave pública (não senha)
- [ ] Fail2ban instalado (opcional)
- [ ] Rate limiting ativo no Nginx
- [ ] Monitoramento configurado

---

## 📞 Suporte

Em caso de problemas:

1. **Verificar logs:** `docker compose logs -f`
2. **Consultar documentação:** Este arquivo
3. **Verificar issues:** GitHub do projeto
4. **Contato:** admin@tolivre.com.br

---

## 🎯 Próximos Passos

Após deploy bem-sucedido:

1. ✅ Testar todas funcionalidades
2. ✅ Configurar domínios adicionais
3. ✅ Monitorar performance (Netdata)
4. ✅ Configurar alertas (UptimeRobot)
5. ✅ Documentar processos internos
6. ✅ Criar usuário admin
7. ✅ Fazer primeiro backup manual
8. ✅ Testar restore de backup

---

**Documento atualizado em:** 05/12/2025  
**Versão:** 1.0  
**Testado em:** KVM 4 Hostinger + Ubuntu 22.04 LTS
