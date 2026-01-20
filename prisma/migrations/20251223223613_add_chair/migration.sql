/*
  Warnings:

  - You are about to drop the column `stripePaymentIntentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripePriceId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `CashBox` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CashEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommissionPayout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CashBox" DROP CONSTRAINT "CashBox_closedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashBox" DROP CONSTRAINT "CashBox_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashBox" DROP CONSTRAINT "CashBox_openedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashBox" DROP CONSTRAINT "CashBox_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashEntry" DROP CONSTRAINT "CashEntry_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashEntry" DROP CONSTRAINT "CashEntry_cashBoxId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CashEntry" DROP CONSTRAINT "CashEntry_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommissionPayout" DROP CONSTRAINT "CommissionPayout_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommissionPayout" DROP CONSTRAINT "CommissionPayout_paidById_fkey";

-- DropForeignKey
ALTER TABLE "public"."CommissionPayout" DROP CONSTRAINT "CommissionPayout_professionalId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_stripePaymentIntentId_key";

-- DropIndex
DROP INDEX "public"."Subscription_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "chairId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "stripePaymentIntentId";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripePriceId",
DROP COLUMN "stripeSubscriptionId";

-- DropTable
DROP TABLE "public"."CashBox";

-- DropTable
DROP TABLE "public"."CashEntry";

-- DropTable
DROP TABLE "public"."CommissionPayout";

-- DropEnum
DROP TYPE "public"."CashBoxStatus";

-- DropEnum
DROP TYPE "public"."CashEntrySource";

-- DropEnum
DROP TYPE "public"."CashEntryType";

-- CreateTable
CREATE TABLE "Chair" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Chair_companyId_idx" ON "Chair"("companyId");

-- CreateIndex
CREATE INDEX "Appointment_chairId_idx" ON "Appointment"("chairId");

-- AddForeignKey
ALTER TABLE "Chair" ADD CONSTRAINT "Chair_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_chairId_fkey" FOREIGN KEY ("chairId") REFERENCES "Chair"("id") ON DELETE SET NULL ON UPDATE CASCADE;
