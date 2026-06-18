import { PartialType } from "@nestjs/swagger";
import { CreateEntregaDTO } from "./create-entrega.dto";

export class UpdateEntregaDTO extends PartialType(CreateEntregaDTO) {}
