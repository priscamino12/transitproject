/*
  Warnings:

  - Added the required column `idEntreprise` to the `client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `conteneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `employe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `hawb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `hbl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `mawb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `mbl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `suivi_hawb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `suivi_hbl` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `trans_aerienne` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idEntreprise` to the `trans_maritime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StatusAbonnement" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU');

-- CreateEnum
CREATE TYPE "public"."DureeAbonnement" AS ENUM ('MENSUEL', 'TRIMESTRIEL', 'ANNUEL');

-- AlterTable
ALTER TABLE "public"."client" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."conteneur" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."employe" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."hawb" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."hbl" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."mawb" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."mbl" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."suivi_hawb" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."suivi_hbl" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."trans_aerienne" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."trans_maritime" ADD COLUMN     "idEntreprise" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."type_acces" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prixBase" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_acces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."abonnement" (
    "id" SERIAL NOT NULL,
    "typeAccesId" INTEGER NOT NULL,
    "duree" "public"."DureeAbonnement" NOT NULL,
    "reductionPourcentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonnement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mode_paiement" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "frais" DOUBLE PRECISION,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mode_paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."paiement" (
    "id" SERIAL NOT NULL,
    "abonnementId" INTEGER NOT NULL,
    "entrepriseId" INTEGER NOT NULL,
    "modePaiementId" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "datePaiement" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."entreprise" (
    "idEntreprise" SERIAL NOT NULL,
    "nomEntreprise" TEXT NOT NULL,
    "emailEntreprise" TEXT,
    "telEntreprise" TEXT,
    "adresseEntreprise" TEXT,
    "typeAccesId" INTEGER NOT NULL,
    "statusAbonnement" "public"."StatusAbonnement" NOT NULL DEFAULT 'ACTIF',
    "dateDebutAbonnement" TIMESTAMP(3),
    "dateFinAbonnement" TIMESTAMP(3),
    "montantAbonnement" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entreprise_pkey" PRIMARY KEY ("idEntreprise")
);

-- CreateIndex
CREATE UNIQUE INDEX "type_acces_nom_key" ON "public"."type_acces"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "mode_paiement_nom_key" ON "public"."mode_paiement"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "entreprise_emailEntreprise_key" ON "public"."entreprise"("emailEntreprise");

-- AddForeignKey
ALTER TABLE "public"."abonnement" ADD CONSTRAINT "abonnement_typeAccesId_fkey" FOREIGN KEY ("typeAccesId") REFERENCES "public"."type_acces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "public"."abonnement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."paiement" ADD CONSTRAINT "paiement_modePaiementId_fkey" FOREIGN KEY ("modePaiementId") REFERENCES "public"."mode_paiement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."entreprise" ADD CONSTRAINT "entreprise_typeAccesId_fkey" FOREIGN KEY ("typeAccesId") REFERENCES "public"."type_acces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."employe" ADD CONSTRAINT "employe_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client" ADD CONSTRAINT "client_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_aerienne" ADD CONSTRAINT "trans_aerienne_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_maritime" ADD CONSTRAINT "trans_maritime_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mawb" ADD CONSTRAINT "mawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mbl" ADD CONSTRAINT "mbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conteneur" ADD CONSTRAINT "conteneur_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suivi_hawb" ADD CONSTRAINT "suivi_hawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suivi_hbl" ADD CONSTRAINT "suivi_hbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "public"."entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;
