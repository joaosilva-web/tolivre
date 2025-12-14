#!/bin/bash
# Setup SSL com Let's Encrypt (Certbot)

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar argumentos
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Uso: ./setup-ssl.sh <dominio> <email>"
    echo "Exemplo: ./setup-ssl.sh ocupae.com.br contato@ocupae.com.br"
    exit 1
fi

DOMAIN=$1
EMAIL=$2

echo -e "${YELLOW}🔒 Configurando SSL para $DOMAIN${NC}"

# Criar diretórios
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

# Solicitar certificado
echo -e "${YELLOW}📝 Solicitando certificado Let's Encrypt...${NC}"
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Recarregar Nginx
echo -e "${YELLOW}🔄 Recarregando Nginx...${NC}"
docker-compose exec nginx nginx -s reload

echo ""
echo -e "${GREEN}✅ SSL configurado com sucesso!${NC}"
echo ""
echo "📋 Próximos passos:"
echo "1. Verifique se o certificado foi instalado: https://$DOMAIN"
echo "2. Descomente a linha HSTS no nginx config após testar"
echo "3. O certificado será renovado automaticamente"
