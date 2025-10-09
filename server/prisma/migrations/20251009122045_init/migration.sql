-- CreateEnum
CREATE TYPE "StatusAbonnement" AS ENUM ('ACTIF', 'INACTIF', 'SUSPENDU');

-- CreateTable
CREATE TABLE "admin_systeme" (
    "idAdminSysteme" SERIAL NOT NULL,
    "nomAdminSysteme" TEXT NOT NULL,
    "emailAdminSysteme" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'SuperAdmin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_systeme_pkey" PRIMARY KEY ("idAdminSysteme")
);

-- CreateTable
CREATE TABLE "type_acces" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prixBase" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "type_acces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abonnement" (
    "idAbonnement" SERIAL NOT NULL,
    "typeAccesId" INTEGER NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,
    "reductionPourcentage" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abonnement_pkey" PRIMARY KEY ("idAbonnement")
);

-- CreateTable
CREATE TABLE "mode_paiement" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "frais" DOUBLE PRECISION,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mode_paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paiement" (
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
CREATE TABLE "entreprise" (
    "idEntreprise" SERIAL NOT NULL,
    "nomEntreprise" TEXT NOT NULL,
    "logoEntreprise" TEXT,
    "adresseEntreprise" TEXT,
    "nif" TEXT NOT NULL,
    "statJuridique" TEXT,
    "typeAccesId" INTEGER NOT NULL,
    "statusAbonnement" "StatusAbonnement" NOT NULL DEFAULT 'ACTIF',
    "dateDebutAbonnement" TIMESTAMP(3),
    "dateFinAbonnement" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entreprise_pkey" PRIMARY KEY ("idEntreprise")
);

-- CreateTable
CREATE TABLE "employe" (
    "idEmploye" SERIAL NOT NULL,
    "nomEmploye" TEXT NOT NULL,
    "emailEmploye" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idEntreprise" INTEGER NOT NULL,

    CONSTRAINT "employe_pkey" PRIMARY KEY ("idEmploye")
);

-- CreateTable
CREATE TABLE "client" (
    "idClient" SERIAL NOT NULL,
    "nomClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "motDePasse" TEXT,
    "role" TEXT NOT NULL DEFAULT 'client',
    "telClient" TEXT,
    "adresseClient" TEXT,
    "CINClient" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,

    CONSTRAINT "client_pkey" PRIMARY KEY ("idClient")
);

-- CreateTable
CREATE TABLE "trans_aerienne" (
    "idTransAerienne" SERIAL NOT NULL,
    "numVol" TEXT NOT NULL,
    "nomCompagnie" TEXT NOT NULL,
    "dateChargement" TIMESTAMP(3) NOT NULL,
    "paysChargement" TEXT NOT NULL,
    "villeChargement" TEXT NOT NULL,
    "paysDechargement" TEXT NOT NULL,
    "villeDechargement" TEXT,
    "idEntreprise" INTEGER NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trans_aerienne_pkey" PRIMARY KEY ("idTransAerienne")
);

-- CreateTable
CREATE TABLE "trans_maritime" (
    "idTransMaritime" SERIAL NOT NULL,
    "numIMO" TEXT NOT NULL,
    "armateur" TEXT NOT NULL,
    "nomNavire" TEXT NOT NULL,
    "dateChargement" TIMESTAMP(3) NOT NULL,
    "paysChargement" TEXT NOT NULL,
    "villeChargement" TEXT NOT NULL,
    "paysDechargement" TEXT NOT NULL,
    "villeDechargement" TEXT,
    "idEntreprise" INTEGER NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trans_maritime_pkey" PRIMARY KEY ("idTransMaritime")
);

-- CreateTable
CREATE TABLE "mawb" (
    "idMAWB" SERIAL NOT NULL,
    "numMAWB" TEXT NOT NULL,
    "idTransport" INTEGER NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "dateArrivePrevue" TIMESTAMP(3),
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mawb_pkey" PRIMARY KEY ("idMAWB")
);

-- CreateTable
CREATE TABLE "mbl" (
    "idMBL" SERIAL NOT NULL,
    "numMBL" TEXT NOT NULL,
    "idTransport" INTEGER NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "dateArrivePrevue" TIMESTAMP(3) NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mbl_pkey" PRIMARY KEY ("idMBL")
);

-- CreateTable
CREATE TABLE "conteneur" (
    "idConteneur" SERIAL NOT NULL,
    "numConteneur" TEXT NOT NULL,
    "typeConteneur" TEXT NOT NULL,
    "numPlomb" TEXT NOT NULL,
    "numMBL" TEXT NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conteneur_pkey" PRIMARY KEY ("idConteneur")
);

-- CreateTable
CREATE TABLE "hawb" (
    "idHAWB" SERIAL NOT NULL,
    "numHAWB" TEXT NOT NULL,
    "nbColis" INTEGER NOT NULL,
    "poid" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "idMAWB" INTEGER NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "idExpediteur" INTEGER NOT NULL,
    "idDestinataire" INTEGER NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hawb_pkey" PRIMARY KEY ("idHAWB")
);

-- CreateTable
CREATE TABLE "hbl" (
    "idHBL" SERIAL NOT NULL,
    "numHBL" TEXT NOT NULL,
    "nbColis" INTEGER NOT NULL,
    "poid" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "idMBL" INTEGER NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "idExpediteur" INTEGER NOT NULL,
    "idDestinataire" INTEGER NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hbl_pkey" PRIMARY KEY ("idHBL")
);

-- CreateTable
CREATE TABLE "suivi_hawb" (
    "idSuiviHAWB" SERIAL NOT NULL,
    "numHAWB" TEXT NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "etape" TEXT NOT NULL,
    "dateEtape" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "commentaire" TEXT,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suivi_hawb_pkey" PRIMARY KEY ("idSuiviHAWB")
);

-- CreateTable
CREATE TABLE "suivi_hbl" (
    "idSuiviHBL" SERIAL NOT NULL,
    "numHBL" TEXT NOT NULL,
    "idEntreprise" INTEGER NOT NULL,
    "etape" TEXT NOT NULL,
    "dateEtape" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "commentaire" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suivi_hbl_pkey" PRIMARY KEY ("idSuiviHBL")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_systeme_emailAdminSysteme_key" ON "admin_systeme"("emailAdminSysteme");

-- CreateIndex
CREATE UNIQUE INDEX "type_acces_nom_key" ON "type_acces"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "mode_paiement_nom_key" ON "mode_paiement"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "entreprise_nif_key" ON "entreprise"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "employe_emailEmploye_key" ON "employe"("emailEmploye");

-- CreateIndex
CREATE UNIQUE INDEX "client_emailClient_key" ON "client"("emailClient");

-- CreateIndex
CREATE UNIQUE INDEX "client_telClient_key" ON "client"("telClient");

-- CreateIndex
CREATE UNIQUE INDEX "client_CINClient_key" ON "client"("CINClient");

-- CreateIndex
CREATE UNIQUE INDEX "trans_aerienne_numVol_key" ON "trans_aerienne"("numVol");

-- CreateIndex
CREATE UNIQUE INDEX "trans_maritime_numIMO_key" ON "trans_maritime"("numIMO");

-- CreateIndex
CREATE UNIQUE INDEX "mawb_numMAWB_key" ON "mawb"("numMAWB");

-- CreateIndex
CREATE UNIQUE INDEX "mbl_numMBL_key" ON "mbl"("numMBL");

-- CreateIndex
CREATE UNIQUE INDEX "hawb_numHAWB_key" ON "hawb"("numHAWB");

-- CreateIndex
CREATE UNIQUE INDEX "hbl_numHBL_key" ON "hbl"("numHBL");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_hawb_numHAWB_etape_key" ON "suivi_hawb"("numHAWB", "etape");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_hbl_numHBL_etape_key" ON "suivi_hbl"("numHBL", "etape");

-- AddForeignKey
ALTER TABLE "abonnement" ADD CONSTRAINT "abonnement_typeAccesId_fkey" FOREIGN KEY ("typeAccesId") REFERENCES "type_acces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "paiement_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "abonnement"("idAbonnement") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "paiement_entrepriseId_fkey" FOREIGN KEY ("entrepriseId") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paiement" ADD CONSTRAINT "paiement_modePaiementId_fkey" FOREIGN KEY ("modePaiementId") REFERENCES "mode_paiement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entreprise" ADD CONSTRAINT "entreprise_typeAccesId_fkey" FOREIGN KEY ("typeAccesId") REFERENCES "type_acces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employe" ADD CONSTRAINT "employe_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_aerienne" ADD CONSTRAINT "trans_aerienne_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_aerienne" ADD CONSTRAINT "trans_aerienne_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_aerienne" ADD CONSTRAINT "trans_aerienne_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_maritime" ADD CONSTRAINT "trans_maritime_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_maritime" ADD CONSTRAINT "trans_maritime_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_maritime" ADD CONSTRAINT "trans_maritime_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mawb" ADD CONSTRAINT "mawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mawb" ADD CONSTRAINT "mawb_idTransport_fkey" FOREIGN KEY ("idTransport") REFERENCES "trans_aerienne"("idTransAerienne") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mawb" ADD CONSTRAINT "mawb_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mawb" ADD CONSTRAINT "mawb_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbl" ADD CONSTRAINT "mbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbl" ADD CONSTRAINT "mbl_idTransport_fkey" FOREIGN KEY ("idTransport") REFERENCES "trans_maritime"("idTransMaritime") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbl" ADD CONSTRAINT "mbl_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mbl" ADD CONSTRAINT "mbl_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteneur" ADD CONSTRAINT "conteneur_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conteneur" ADD CONSTRAINT "conteneur_numMBL_fkey" FOREIGN KEY ("numMBL") REFERENCES "mbl"("numMBL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_idMAWB_fkey" FOREIGN KEY ("idMAWB") REFERENCES "mawb"("idMAWB") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_idExpediteur_fkey" FOREIGN KEY ("idExpediteur") REFERENCES "client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_idDestinataire_fkey" FOREIGN KEY ("idDestinataire") REFERENCES "client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hawb" ADD CONSTRAINT "hawb_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_idMBL_fkey" FOREIGN KEY ("idMBL") REFERENCES "mbl"("idMBL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_idExpediteur_fkey" FOREIGN KEY ("idExpediteur") REFERENCES "client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_idDestinataire_fkey" FOREIGN KEY ("idDestinataire") REFERENCES "client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hbl" ADD CONSTRAINT "hbl_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_hawb" ADD CONSTRAINT "suivi_hawb_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_hawb" ADD CONSTRAINT "suivi_hawb_numHAWB_fkey" FOREIGN KEY ("numHAWB") REFERENCES "hawb"("numHAWB") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_hbl" ADD CONSTRAINT "suivi_hbl_idEntreprise_fkey" FOREIGN KEY ("idEntreprise") REFERENCES "entreprise"("idEntreprise") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_hbl" ADD CONSTRAINT "suivi_hbl_numHBL_fkey" FOREIGN KEY ("numHBL") REFERENCES "hbl"("numHBL") ON DELETE CASCADE ON UPDATE CASCADE;
