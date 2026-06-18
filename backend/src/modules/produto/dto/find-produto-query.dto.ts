import { IsOptional } from "class-validator";
import { NumberStringField, StringField } from "../../../shared/decorators/fields";
import { PaginationQueryDTO } from "../../../shared/dto/pagination-query.dto";

export class FindProdutoQueryDTO extends PaginationQueryDTO {
    @IsOptional()
    @StringField({ apiProperty: true, max: 50 })
    nome?: string;

    @IsOptional()
    @NumberStringField({ apiProperty: true, withSymbols: true })
    precoMax?: string;

    @IsOptional()
    @NumberStringField({ apiProperty: true, withSymbols: true })
    precoMin?: string;
}
