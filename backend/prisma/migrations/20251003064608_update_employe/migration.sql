/*
  Warnings:

  - You are about to drop the column `codeTemp` on the `employe` table. All the data in the column will be lost.
  - You are about to drop the column `codeTempExpires` on the `employe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."employe" DROP COLUMN "codeTemp",
DROP COLUMN "codeTempExpires";
