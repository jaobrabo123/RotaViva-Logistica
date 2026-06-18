import { Decimal } from "@prisma/client/runtime/index-browser";
import { StatusEntrega } from "../../../../generated/prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { PublicCliente } from "../../cliente/entities/public-cliente.entity";
import { PublicProduto } from "../../produto/entities/public-produto.entity";
import { PublicEntregador } from "../../entregador/entities/public-entregador.entity";

export class PublicEntrega {
    id!: string;
    status!: StatusEntrega;
    duracaoMinutos!: number | null;
    @ApiProperty({ type: "string", nullable: true })
    latitude!: Decimal | null;
    @ApiProperty({ type: "string", nullable: true })
    longitude!: Decimal | null;
    detalhes!: string | null;
    imagem!: string | null;
    codigo!: string;
    entregadorId!: string;
    clienteId!: string;
    produtoId!: string;

    cliente!: PublicCliente;
    produto!: PublicProduto;
    entregador!: PublicEntregador;
}
