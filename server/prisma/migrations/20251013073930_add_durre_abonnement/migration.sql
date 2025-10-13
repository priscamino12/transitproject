/*
  Warnings:

  - You are about to drop the column `reductionPourcentage` on the `abonnement` table. All the data in the column will be lost.
  - Added the required column `dureeAbonnementId` to the `abonnement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "abonnement" DROP COLUMN "reductionPourcentage",
ADD COLUMN     "dureeAbonnementId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "duree_abonnement" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "nbMois" INTEGER NOT NULL,
    "reduction" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "duree_abonnement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "abonnement" ADD CONSTRAINT "abonnement_dureeAbonnementId_fkey" FOREIGN KEY ("dureeAbonnementId") REFERENCES "duree_abonnement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
