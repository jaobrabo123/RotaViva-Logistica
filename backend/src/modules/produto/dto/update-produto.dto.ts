import { PartialType } from "@nestjs/swagger";
import { CreateProdutoDTO } from "./create-produto.dto";

export class UpdateProdutoDTO extends PartialType(CreateProdutoDTO) {}
