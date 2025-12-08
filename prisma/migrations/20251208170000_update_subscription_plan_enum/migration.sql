-- Migration to update SubscriptionPlan enum values
-- Converting FREE/PROFESSIONAL/ENTERPRISE to TRIAL/BASIC/PROFESSIONAL/BUSINESS

-- Update existing records to new enum values
-- Map: FREE -> TRIAL, PROFESSIONAL -> PROFESSIONAL (unchanged), ENTERPRISE -> BUSINESS
ALTER TYPE "SubscriptionPlan" RENAME TO "SubscriptionPlan_old";

CREATE TYPE "SubscriptionPlan" AS ENUM ('TRIAL', 'BASIC', 'PROFESSIONAL', 'BUSINESS');

ALTER TABLE "Subscription" 
  ALTER COLUMN "plan" DROP DEFAULT;

ALTER TABLE "Subscription" 
  ALTER COLUMN "plan" TYPE "SubscriptionPlan" 
  USING (
    CASE "plan"::text
      WHEN 'FREE' THEN 'TRIAL'
      WHEN 'PROFESSIONAL' THEN 'PROFESSIONAL'
      WHEN 'ENTERPRISE' THEN 'BUSINESS'
      ELSE 'TRIAL'
    END
  )::"SubscriptionPlan";

ALTER TABLE "Subscription"
  ALTER COLUMN "plan" SET DEFAULT 'TRIAL';

DROP TYPE "SubscriptionPlan_old";
