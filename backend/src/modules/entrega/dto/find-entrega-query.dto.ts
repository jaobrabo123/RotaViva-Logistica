import { IsOptional } from "class-validator";
import { StatusEntrega } from "../../../../generated/prisma/enums";
import { EnumField, StringField, UUIDField } from "../../../shared/decorators/fields";
import { PaginationQueryDTO } from "../../../shared/dto/pagination-query.dto";

export class FindEntregaQueryDTO extends PaginationQueryDTO {
    @IsOptional()
    @EnumField(StatusEntrega, { apiProperty: true })
    status?: StatusEntrega;

    @IsOptional()
    @StringField({ apiProperty: true, max: 100 })
    codigo?: string;

    @IsOptional()
    @UUIDField({ apiProperty: true })
    entregadorId?: string;

    @IsOptional()
    @UUIDField({ apiProperty: true })
    clienteId?: string;

    @IsOptional()
    @UUIDField({ apiProperty: true })
    produtoId?: string;
}
