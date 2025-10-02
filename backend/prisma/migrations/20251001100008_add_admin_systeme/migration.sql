/*
  Warnings:

  - You are about to drop the column `typeEmploye` on the `employe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."client" ADD COLUMN     "motDePasse" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'client';

-- AlterTable
ALTER TABLE "public"."employe" DROP COLUMN "typeEmploye",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';

-- CreateTable
CREATE TABLE "public"."admin_systeme" (
    "idAdmin" SERIAL NOT NULL,
    "nomAdmin" TEXT NOT NULL,
    "emailAdmin" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'SuperAdmin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_systeme_pkey" PRIMARY KEY ("idAdmin")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_systeme_emailAdmin_key" ON "public"."admin_systeme"("emailAdmin");
