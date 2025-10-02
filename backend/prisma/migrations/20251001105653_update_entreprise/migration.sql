/*
  Warnings:

  - You are about to drop the column `emailEntreprise` on the `entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `montantAbonnement` on the `entreprise` table. All the data in the column will be lost.
  - You are about to drop the column `telEntreprise` on the `entreprise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nif]` on the table `entreprise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."entreprise_emailEntreprise_key";

-- AlterTable
ALTER TABLE "public"."entreprise" DROP COLUMN "emailEntreprise",
DROP COLUMN "montantAbonnement",
DROP COLUMN "telEntreprise",
ADD COLUMN     "logoEntreprise" TEXT,
ADD COLUMN     "nif" TEXT,
ADD COLUMN     "statJuridique" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "entreprise_nif_key" ON "public"."entreprise"("nif");
