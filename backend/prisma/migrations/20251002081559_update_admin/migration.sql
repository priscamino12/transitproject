/*
  Warnings:

  - You are about to drop the column `emailAdmin` on the `admin_systeme` table. All the data in the column will be lost.
  - You are about to drop the column `nomAdmin` on the `admin_systeme` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailAdminSysteme]` on the table `admin_systeme` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailAdminSysteme` to the `admin_systeme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomAdminSysteme` to the `admin_systeme` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."admin_systeme_emailAdmin_key";

-- AlterTable
ALTER TABLE "public"."admin_systeme" DROP COLUMN "emailAdmin",
DROP COLUMN "nomAdmin",
ADD COLUMN     "emailAdminSysteme" TEXT NOT NULL,
ADD COLUMN     "nomAdminSysteme" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "admin_systeme_emailAdminSysteme_key" ON "public"."admin_systeme"("emailAdminSysteme");
