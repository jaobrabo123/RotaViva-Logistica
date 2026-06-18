import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/index-browser";

export class PublicProduto {
    id!: string;
    nome!: string;
    descricao!: string;
    @ApiProperty({ type: "string" })
    preco!: string | Decimal;
}
