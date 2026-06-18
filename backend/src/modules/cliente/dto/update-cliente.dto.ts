import { PartialType } from "@nestjs/swagger";
import { CreateClienteDTO } from "./create-cliente.dto";

export class UpdateClienteDTO extends PartialType(CreateClienteDTO) {}
