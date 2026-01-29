#!/bin/sh
set -e

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "✅ Migrations completed successfully!"
echo "🚀 Starting Next.js server..."

# Executar o comando original
exec "$@"
