# Dockerfile para TôLivre - Otimizado para Produção
# Node.js 20 LTS com Alpine (imagem leve)
FROM node:20-alpine AS base

# Instalar dependências necessárias para Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências de produção
FROM base AS deps
RUN npm ci --only=production --legacy-peer-deps

# Instalar todas as dependências para build
FROM base AS builder

# Build-time secrets (pass via build args)
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
ARG MERCADO_PAGO_ACCESS_TOKEN

# Expor envs para o build do Next
ENV STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ENV RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
ENV MERCADO_PAGO_ACCESS_TOKEN=${MERCADO_PAGO_ACCESS_TOKEN}

RUN npm ci --legacy-peer-deps

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Build Next.js
# Desabilitar telemetry
ENV NEXT_TELEMETRY_DISABLED=1
RUN POSTGRES_URL="postgresql://temp:temp@localhost:5432/temp" \
  DATABASE_URL="postgresql://temp:temp@localhost:5432/temp" \
  npx prisma generate && \
  npx next build

# Imagem de produção - apenas o necessário
FROM node:20-alpine AS runner
WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=deps /app/node_modules ./node_modules

# Copiar script de entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Definir usuário
USER nextjs

# Expor porta
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Definir entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Iniciar aplicação
CMD ["node", "server.js"]
