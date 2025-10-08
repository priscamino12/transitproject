-- CreateTable
CREATE TABLE "AdminSysteme" (
    "idAdminSysteme" SERIAL NOT NULL,
    "nomAdminSysteme" TEXT NOT NULL,
    "emailAdminSysteme" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'SuperAdmin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSysteme_pkey" PRIMARY KEY ("idAdminSysteme")
);

-- CreateTable
CREATE TABLE "Employe" (
    "idEmploye" SERIAL NOT NULL,
    "nomEmploye" TEXT NOT NULL,
    "emailEmploye" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employe_pkey" PRIMARY KEY ("idEmploye")
);

-- CreateTable
CREATE TABLE "Client" (
    "idClient" SERIAL NOT NULL,
    "nomClient" TEXT NOT NULL,
    "emailClient" TEXT NOT NULL,
    "motDePasse" TEXT,
    "role" TEXT NOT NULL DEFAULT 'client',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("idClient")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminSysteme_emailAdminSysteme_key" ON "AdminSysteme"("emailAdminSysteme");

-- CreateIndex
CREATE UNIQUE INDEX "Employe_emailEmploye_key" ON "Employe"("emailEmploye");

-- CreateIndex
CREATE UNIQUE INDEX "Client_emailClient_key" ON "Client"("emailClient");
