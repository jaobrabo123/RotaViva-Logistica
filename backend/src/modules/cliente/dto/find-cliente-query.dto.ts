import { IsOptional } from "class-validator";
import { StringField } from "../../../shared/decorators/fields";
import { PaginationQueryDTO } from "../../../shared/dto/pagination-query.dto";

export class FindClienteQueryDTO extends PaginationQueryDTO {
    @IsOptional()
    @StringField({ apiProperty: true, max: 50 })
    nome?: string;
}
