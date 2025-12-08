-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "subscriptionStatus" TEXT DEFAULT 'trial',
ADD COLUMN     "trialEndsAt" TIMESTAMP(3);
