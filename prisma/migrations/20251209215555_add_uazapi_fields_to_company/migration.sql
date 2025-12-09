-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "uazapiConnected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uazapiInstanceName" TEXT,
ADD COLUMN     "uazapiInstanceToken" TEXT,
ADD COLUMN     "uazapiProfileName" TEXT;
