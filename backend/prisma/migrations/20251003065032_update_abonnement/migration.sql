/*
  Warnings:

  - You are about to drop the column `duree` on the `abonnement` table. All the data in the column will be lost.
  - Added the required column `dateDebut` to the `abonnement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateFin` to the `abonnement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."abonnement" DROP COLUMN "duree",
ADD COLUMN     "dateDebut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateFin" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "public"."DureeAbonnement";
