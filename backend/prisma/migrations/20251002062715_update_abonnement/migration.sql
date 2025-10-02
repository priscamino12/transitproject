/*
  Warnings:

  - The primary key for the `abonnement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `abonnement` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."paiement" DROP CONSTRAINT "paiement_abonnementId_fkey";

-- AlterTable
ALTER TABLE "public"."abonnement" DROP CONSTRAINT "abonnement_pkey",
DROP COLUMN "id",
ADD COLUMN     "Abonnement" SERIAL NOT NULL,
ADD CONSTRAINT "abonnement_pkey" PRIMARY KEY ("Abonnement");

-- AddForeignKey
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "public"."abonnement"("Abonnement") ON DELETE CASCADE ON UPDATE CASCADE;
