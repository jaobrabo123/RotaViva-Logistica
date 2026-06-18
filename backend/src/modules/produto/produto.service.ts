import { Injectable } from "@nestjs/common";
import { CreateProdutoDTO } from "./dto/create-produto.dto";
import { UpdateProdutoDTO } from "./dto/update-produto.dto";

@Injectable()
export class ProdutoService {
    create(createProdutoDto: CreateProdutoDTO) {
        return "This action adds a new produto";
    }

    findAll() {
        return `This action returns all produto`;
    }

    findOne(id: number) {
        return `This action returns a #${id} produto`;
    }

    update(id: number, updateProdutoDto: UpdateProdutoDTO) {
        return `This action updates a #${id} produto`;
    }

    remove(id: number) {
        return `This action removes a #${id} produto`;
    }
}
