#!/bin/bash
# Script de Restore de Backup - PostgreSQL

set -e

# Verificar argumentos
if [ -z "$1" ]; then
    echo "❌ Uso: ./restore.sh <arquivo_backup.sql.gz>"
    echo ""
    echo "📦 Backups disponíveis:"
    ls -lh ./backups/tolivre_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"
    exit 1
fi

BACKUP_FILE=$1

# Verificar se o arquivo existe
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Erro: Arquivo $BACKUP_FILE não encontrado"
    exit 1
fi

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${RED}⚠️  ATENÇÃO: Este processo irá sobrescrever o banco de dados atual!${NC}"
echo -n "Digite 'CONFIRMAR' para prosseguir: "
read CONFIRM

if [ "$CONFIRM" != "CONFIRMAR" ]; then
    echo "Operação cancelada"
    exit 0
fi

echo -e "${YELLOW}🗄️  Restaurando backup: $BACKUP_FILE${NC}"

# Parar a aplicação
echo "🛑 Parando aplicação..."
docker-compose stop app

# Dropar e recriar o banco
echo "🗑️  Recriando banco de dados..."
docker-compose exec -T postgres psql -U tolivre -d postgres -c "DROP DATABASE IF EXISTS tolivre_prod;"
docker-compose exec -T postgres psql -U tolivre -d postgres -c "CREATE DATABASE tolivre_prod;"

# Restaurar backup
echo "📥 Restaurando dados..."
gunzip -c "$BACKUP_FILE" | docker-compose exec -T postgres psql -U tolivre -d tolivre_prod

# Executar migrations (caso haja novas)
echo "🔄 Aplicando migrations..."
docker-compose run --rm app npx prisma migrate deploy

# Reiniciar aplicação
echo "▶️  Reiniciando aplicação..."
docker-compose up -d

echo ""
echo -e "${GREEN}✅ Restore concluído com sucesso!${NC}"
