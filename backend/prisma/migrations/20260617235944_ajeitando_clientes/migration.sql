/*
  Warnings:

  - You are about to drop the column `cpf` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cliente" DROP COLUMN "cpf",
DROP COLUMN "senha";

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "acesso" VARCHAR(30) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
