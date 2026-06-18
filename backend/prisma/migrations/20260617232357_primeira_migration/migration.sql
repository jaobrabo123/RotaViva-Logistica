-- CreateEnum
CREATE TYPE "status_entrega" AS ENUM ('PENDENTE', 'A_CAMINHO', 'ENTREGUE', 'FALHA');

-- CreateTable
CREATE TABLE "entregador" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(50) NOT NULL,
    "telefone" VARCHAR(18) NOT NULL,
    "cnh" VARCHAR(2) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "entregador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cpf" VARCHAR(11) NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "endereco" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(50) NOT NULL,
    "descricao" VARCHAR(250) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrega" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "status_entrega" NOT NULL,
    "duracao_minutos" INTEGER,
    "latitude" INTEGER,
    "longitude" INTEGER,
    "detalhes" VARCHAR(300),
    "imagem" VARCHAR(255),
    "codigo" VARCHAR(100) NOT NULL,
    "entregador_id" UUID NOT NULL,
    "cliente_id" UUID NOT NULL,
    "produto_id" UUID NOT NULL,

    CONSTRAINT "entrega_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_entregador_id_fkey" FOREIGN KEY ("entregador_id") REFERENCES "entregador"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega" ADD CONSTRAINT "entrega_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
