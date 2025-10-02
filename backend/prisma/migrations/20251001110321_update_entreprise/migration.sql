/*
  Warnings:

  - Made the column `nif` on table `entreprise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."entreprise" ALTER COLUMN "nif" SET NOT NULL;
