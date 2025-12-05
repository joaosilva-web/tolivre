#!/bin/bash
# Script de Backup Automático - PostgreSQL

set -e

# Configurações
BACKUP_DIR="/app/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="tolivre_backup_$DATE.sql.gz"
KEEP_DAYS=7

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}🗄️  Iniciando backup do banco de dados...${NC}"

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Fazer backup
docker-compose exec -T postgres pg_dump -U tolivre tolivre_prod | gzip > "$BACKUP_DIR/$BACKUP_FILE"

# Verificar se o backup foi criado
if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup criado com sucesso: $BACKUP_FILE ($SIZE)${NC}"
else
    echo -e "${RED}❌ Erro ao criar backup${NC}"
    exit 1
fi

# Limpar backups antigos
echo -e "${YELLOW}🧹 Limpando backups antigos (mais de $KEEP_DAYS dias)...${NC}"
find "$BACKUP_DIR" -name "tolivre_backup_*.sql.gz" -mtime +$KEEP_DAYS -delete

# Listar backups disponíveis
echo ""
echo "📦 Backups disponíveis:"
ls -lh "$BACKUP_DIR"/tolivre_backup_*.sql.gz 2>/dev/null || echo "Nenhum backup encontrado"

echo ""
echo -e "${GREEN}✅ Backup concluído${NC}"
