/*
  Warnings:

  - You are about to drop the column `chairId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `mpPaymentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `mpPreapprovalPlanId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `mpSubscriptionId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `Chair` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_chairId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Chair" DROP CONSTRAINT "Chair_companyId_fkey";

-- DropIndex
DROP INDEX "public"."Appointment_chairId_idx";

-- DropIndex
DROP INDEX "public"."Payment_mpPaymentId_key";

-- DropIndex
DROP INDEX "public"."Subscription_mpSubscriptionId_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "chairId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "mpPaymentId",
ADD COLUMN     "stripePaymentIntentId" TEXT;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "mpPreapprovalPlanId",
DROP COLUMN "mpSubscriptionId",
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT;

-- DropTable
DROP TABLE "public"."Chair";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_stripePaymentIntentId_key" ON "Payment"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
