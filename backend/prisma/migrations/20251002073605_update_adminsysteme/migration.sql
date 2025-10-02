/*
  Warnings:

  - The primary key for the `admin_systeme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAdmin` on the `admin_systeme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."admin_systeme" DROP CONSTRAINT "admin_systeme_pkey",
DROP COLUMN "idAdmin",
ADD COLUMN     "idAdminSysteme" SERIAL NOT NULL,
ADD CONSTRAINT "admin_systeme_pkey" PRIMARY KEY ("idAdminSysteme");
