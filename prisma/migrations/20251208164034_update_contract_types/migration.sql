-- AlterEnum
BEGIN;
CREATE TYPE "ContractType_new" AS ENUM ('TRIAL', 'BASIC', 'PROFESSIONAL', 'BUSINESS');
ALTER TABLE "Company" ALTER COLUMN "contrato" DROP DEFAULT;
ALTER TABLE "Company" ALTER COLUMN "contrato" TYPE "ContractType_new" USING (
  CASE "contrato"::text
    WHEN 'FREE' THEN 'TRIAL'
    WHEN 'PRO' THEN 'BASIC'
    WHEN 'PREMIUM' THEN 'PROFESSIONAL'
    WHEN 'ENTERPRISE' THEN 'BUSINESS'
    ELSE 'TRIAL'
  END::"ContractType_new"
);
ALTER TYPE "ContractType" RENAME TO "ContractType_old";
ALTER TYPE "ContractType_new" RENAME TO "ContractType";
DROP TYPE "ContractType_old";
ALTER TABLE "Company" ALTER COLUMN "contrato" SET DEFAULT 'TRIAL';
COMMIT;
