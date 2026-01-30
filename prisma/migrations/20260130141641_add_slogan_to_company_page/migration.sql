-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "reminderSentAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CompanyPage" ADD COLUMN     "slogan" TEXT;
