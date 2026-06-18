import { PartialType } from "@nestjs/swagger";
import { CreateEntregadorDTO } from "./create-entregador.dto";

export class UpdateEntregadorDTO extends PartialType(CreateEntregadorDTO) {}
