import { IsOptional } from "class-validator";
import { StringField } from "../../../shared/decorators/fields";
import { ToLowerCase } from "../../../shared/decorators/transformers/lower-case.transformer";
import { PaginationQueryDTO } from "../../../shared/dto/pagination-query.dto";

export class FindEntregadorQueryDTO extends PaginationQueryDTO {
    @IsOptional()
    @StringField({ apiProperty: true, max: 50 })
    nome?: string;

    @IsOptional()
    @StringField({ apiProperty: true, max: 2 })
    cnh?: string;

    @IsOptional()
    @StringField({ apiProperty: true, max: 30 })
    @ToLowerCase()
    acesso?: string;
}
