/*
  Warnings:

  - A unique constraint covering the columns `[acesso]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[acesso]` on the table `entregador` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `acesso` to the `entregador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entregador" ADD COLUMN     "acesso" VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_acesso_key" ON "Admin"("acesso");

-- CreateIndex
CREATE UNIQUE INDEX "entregador_acesso_key" ON "entregador"("acesso");
