-- Migration: Add trialEndsAt to User model
-- Description: Adiciona campo para controlar período de teste de 14 dias

-- Step 1: Add trialEndsAt column
ALTER TABLE "User" ADD COLUMN "trialEndsAt" TIMESTAMP(3);

-- Step 2: Set trial for existing users (14 days from now)
UPDATE "User" 
SET "trialEndsAt" = NOW() + INTERVAL '14 days'
WHERE "trialEndsAt" IS NULL;

-- Note: Novos usuários terão trialEndsAt definido automaticamente no registro
