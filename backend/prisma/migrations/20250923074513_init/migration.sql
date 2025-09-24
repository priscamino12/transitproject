-- CreateTable
CREATE TABLE "public"."employe" (
    "idEmploye" SERIAL NOT NULL,
    "nomEmploye" TEXT NOT NULL,
    "emailEmploye" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "typeEmploye" TEXT NOT NULL DEFAULT 'Employe',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employe_pkey" PRIMARY KEY ("idEmploye")
);

-- CreateTable
CREATE TABLE "public"."client" (
    "idClient" SERIAL NOT NULL,
    "nomClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "telClient" TEXT,
    "adresseClient" TEXT,
    "CINClient" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,

    CONSTRAINT "client_pkey" PRIMARY KEY ("idClient")
);

-- CreateTable
CREATE TABLE "public"."trans_aerienne" (
    "idTransAerienne" SERIAL NOT NULL,
    "numVol" TEXT NOT NULL,
    "nomCompagnie" TEXT NOT NULL,
    "dateChargement" TIMESTAMP(3) NOT NULL,
    "paysChargement" TEXT NOT NULL,
    "villeChargement" TEXT NOT NULL,
    "paysDechargement" TEXT NOT NULL,
    "villeDechargement" TEXT,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trans_aerienne_pkey" PRIMARY KEY ("idTransAerienne")
);

-- CreateTable
CREATE TABLE "public"."trans_maritime" (
    "idTransMaritime" SERIAL NOT NULL,
    "numIMO" TEXT NOT NULL,
    "armateur" TEXT NOT NULL,
    "nomNavire" TEXT NOT NULL,
    "dateChargement" TIMESTAMP(3) NOT NULL,
    "paysChargement" TEXT NOT NULL,
    "villeChargement" TEXT NOT NULL,
    "paysDechargement" TEXT NOT NULL,
    "villeDechargement" TEXT,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trans_maritime_pkey" PRIMARY KEY ("idTransMaritime")
);

-- CreateTable
CREATE TABLE "public"."mawb" (
    "idMAWB" SERIAL NOT NULL,
    "numMAWB" TEXT NOT NULL,
    "idTransport" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "dateArrivePrevue" TIMESTAMP(3),
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mawb_pkey" PRIMARY KEY ("idMAWB")
);

-- CreateTable
CREATE TABLE "public"."mbl" (
    "idMBL" SERIAL NOT NULL,
    "numMBL" TEXT NOT NULL,
    "idTransport" INTEGER NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL,
    "dateArrivePrevue" TIMESTAMP(3) NOT NULL,
    "creerPar" INTEGER NOT NULL,
    "modifierPar" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mbl_pkey" PRIMARY KEY ("idMBL")
);

-- CreateTable
CREATE TABLE "public"."conteneur" (
    "idConteneur" SERIAL NOT NULL,
    "numConteneur" TEXT NOT NULL,
    "typeConteneur" TEXT NOT NULL,
    "numPlomb" TEXT NOT NULL,
    "numMBL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conteneur_pkey" PRIMARY KEY ("idConteneur")
);

-- CreateTable
CREATE TABLE "public"."hawb" (
    "idHAWB" SERIAL NOT NULL,
    "numHAWB" TEXT NOT NULL,
    "nbColis" INTEGER NOT NULL,
    "poid" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "idMAWB" INTEGER NOT NULL,
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
CREATE TABLE "public"."hbl" (
    "idHBL" SERIAL NOT NULL,
    "numHBL" TEXT NOT NULL,
    "nbColis" INTEGER NOT NULL,
    "poid" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "idMBL" INTEGER NOT NULL,
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
CREATE TABLE "public"."suivi_hawb" (
    "idSuiviHAWB" SERIAL NOT NULL,
    "numHAWB" TEXT NOT NULL,
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
CREATE TABLE "public"."suivi_hbl" (
    "idSuiviHBL" SERIAL NOT NULL,
    "numHBL" TEXT NOT NULL,
    "etape" TEXT NOT NULL,
    "dateEtape" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "commentaire" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suivi_hbl_pkey" PRIMARY KEY ("idSuiviHBL")
);

-- CreateIndex
CREATE UNIQUE INDEX "employe_emailEmploye_key" ON "public"."employe"("emailEmploye");

-- CreateIndex
CREATE UNIQUE INDEX "client_emailClient_key" ON "public"."client"("emailClient");

-- CreateIndex
CREATE UNIQUE INDEX "client_telClient_key" ON "public"."client"("telClient");

-- CreateIndex
CREATE UNIQUE INDEX "client_CINClient_key" ON "public"."client"("CINClient");

-- CreateIndex
CREATE UNIQUE INDEX "trans_aerienne_numVol_key" ON "public"."trans_aerienne"("numVol");

-- CreateIndex
CREATE UNIQUE INDEX "trans_maritime_numIMO_key" ON "public"."trans_maritime"("numIMO");

-- CreateIndex
CREATE UNIQUE INDEX "mawb_numMAWB_key" ON "public"."mawb"("numMAWB");

-- CreateIndex
CREATE UNIQUE INDEX "mbl_numMBL_key" ON "public"."mbl"("numMBL");

-- CreateIndex
CREATE UNIQUE INDEX "hawb_numHAWB_key" ON "public"."hawb"("numHAWB");

-- CreateIndex
CREATE UNIQUE INDEX "hbl_numHBL_key" ON "public"."hbl"("numHBL");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_hawb_numHAWB_etape_key" ON "public"."suivi_hawb"("numHAWB", "etape");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_hbl_numHBL_etape_key" ON "public"."suivi_hbl"("numHBL", "etape");

-- AddForeignKey
ALTER TABLE "public"."client" ADD CONSTRAINT "client_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."client" ADD CONSTRAINT "client_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_aerienne" ADD CONSTRAINT "trans_aerienne_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_aerienne" ADD CONSTRAINT "trans_aerienne_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_maritime" ADD CONSTRAINT "trans_maritime_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trans_maritime" ADD CONSTRAINT "trans_maritime_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mawb" ADD CONSTRAINT "mawb_idTransport_fkey" FOREIGN KEY ("idTransport") REFERENCES "public"."trans_aerienne"("idTransAerienne") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mawb" ADD CONSTRAINT "mawb_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mawb" ADD CONSTRAINT "mawb_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mbl" ADD CONSTRAINT "mbl_idTransport_fkey" FOREIGN KEY ("idTransport") REFERENCES "public"."trans_maritime"("idTransMaritime") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mbl" ADD CONSTRAINT "mbl_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mbl" ADD CONSTRAINT "mbl_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."conteneur" ADD CONSTRAINT "conteneur_numMBL_fkey" FOREIGN KEY ("numMBL") REFERENCES "public"."mbl"("numMBL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_idMAWB_fkey" FOREIGN KEY ("idMAWB") REFERENCES "public"."mawb"("idMAWB") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_idExpediteur_fkey" FOREIGN KEY ("idExpediteur") REFERENCES "public"."client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_idDestinataire_fkey" FOREIGN KEY ("idDestinataire") REFERENCES "public"."client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hawb" ADD CONSTRAINT "hawb_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_idMBL_fkey" FOREIGN KEY ("idMBL") REFERENCES "public"."mbl"("idMBL") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_idExpediteur_fkey" FOREIGN KEY ("idExpediteur") REFERENCES "public"."client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_idDestinataire_fkey" FOREIGN KEY ("idDestinataire") REFERENCES "public"."client"("idClient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_creerPar_fkey" FOREIGN KEY ("creerPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."hbl" ADD CONSTRAINT "hbl_modifierPar_fkey" FOREIGN KEY ("modifierPar") REFERENCES "public"."employe"("idEmploye") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suivi_hawb" ADD CONSTRAINT "suivi_hawb_numHAWB_fkey" FOREIGN KEY ("numHAWB") REFERENCES "public"."hawb"("numHAWB") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."suivi_hbl" ADD CONSTRAINT "suivi_hbl_numHBL_fkey" FOREIGN KEY ("numHBL") REFERENCES "public"."hbl"("numHBL") ON DELETE CASCADE ON UPDATE CASCADE;
