#!/bin/bash
# Script de Deploy para TôLivre - KVM 4 Hostinger

set -e

echo "🚀 Iniciando deploy do TôLivre..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Erro: docker-compose.yml não encontrado${NC}"
    echo "Execute este script no diretório raiz do projeto"
    exit 1
fi

# Verificar se o arquivo .env.production existe
if [ ! -f ".env.production" ]; then
    echo -e "${RED}❌ Erro: .env.production não encontrado${NC}"
    echo "Copie .env.production.example para .env.production e configure"
    exit 1
fi

# Pull das imagens mais recentes
echo -e "${YELLOW}📦 Baixando imagens Docker...${NC}"
docker-compose pull

# Build da aplicação
echo -e "${YELLOW}🔨 Compilando aplicação...${NC}"
docker-compose build --no-cache app

# Parar containers antigos
echo -e "${YELLOW}🛑 Parando containers antigos...${NC}"
docker-compose down

# Executar migrations
echo -e "${YELLOW}🗄️  Executando migrations do banco de dados...${NC}"
docker-compose run --rm app npx prisma migrate deploy

# Iniciar containers
echo -e "${YELLOW}▶️  Iniciando containers...${NC}"
docker-compose up -d

# Aguardar serviços ficarem saudáveis
echo -e "${YELLOW}⏳ Aguardando serviços iniciarem...${NC}"
sleep 10

# Verificar status
echo -e "${YELLOW}🔍 Verificando status dos serviços...${NC}"
docker-compose ps

# Health check
echo -e "${YELLOW}🏥 Verificando health dos serviços...${NC}"
RETRIES=10
until [ "$(docker inspect --format='{{.State.Health.Status}}' tolivre-postgres)" == "healthy" ] || [ $RETRIES -eq 0 ]; do
    echo "Aguardando PostgreSQL... ($RETRIES tentativas restantes)"
    sleep 5
    RETRIES=$((RETRIES-1))
done

if [ $RETRIES -eq 0 ]; then
    echo -e "${RED}❌ PostgreSQL não ficou saudável${NC}"
    docker-compose logs postgres
    exit 1
fi

RETRIES=10
until [ "$(docker inspect --format='{{.State.Health.Status}}' tolivre-app)" == "healthy" ] || [ $RETRIES -eq 0 ]; do
    echo "Aguardando App... ($RETRIES tentativas restantes)"
    sleep 5
    RETRIES=$((RETRIES-1))
done

if [ $RETRIES -eq 0 ]; then
    echo -e "${RED}❌ App não ficou saudável${NC}"
    docker-compose logs app
    exit 1
fi

# Limpar imagens antigas
echo -e "${YELLOW}🧹 Limpando imagens antigas...${NC}"
docker image prune -f

echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo ""
echo "📊 Status dos serviços:"
docker-compose ps
echo ""
echo "🌐 Aplicação disponível em: http://localhost (ou seu domínio)"
echo "📝 Logs: docker-compose logs -f"
echo "🛑 Parar: docker-compose down"
