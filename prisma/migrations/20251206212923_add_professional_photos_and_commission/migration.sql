-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "commissionAmount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "commissionPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "commissionPaidAt" TIMESTAMP(3),
ADD COLUMN     "commissionRate" DOUBLE PRECISION DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "commissionRate" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "photoUrl" TEXT;
