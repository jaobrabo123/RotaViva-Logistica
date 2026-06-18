import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProdutoDTO } from "./dto/create-produto.dto";
import { UpdateProdutoDTO } from "./dto/update-produto.dto";
import { PRODUTO_REPOSITORY, type ProdutoRepository } from "./produto.repository";
import { FindProdutoQueryDTO } from "./dto/find-produto-query.dto";
import { paginationByQuery } from "../../shared/utils/format.util";
import { Decimal } from "../../../generated/prisma/internal/prismaNamespace";

@Injectable()
export class ProdutoService {
    constructor(
        @Inject(PRODUTO_REPOSITORY) private readonly produtoRepository: ProdutoRepository,
    ) {}

    private assertProdutoExists<T>(produto: T): asserts produto is NonNullable<T> {
        if (!produto) throw new NotFoundException("Produto não encontrado");
    }

    async create(dto: CreateProdutoDTO) {
        return this.produtoRepository.save(dto);
    }

    async findAll(query: FindProdutoQueryDTO) {
        const pagination = paginationByQuery(query);
        return this.produtoRepository.findByNomeContainsInsensitiveOptionalAndPrecoBetweenOptionalPaginated(
            query.nome,
            query.precoMin && query.precoMax
                ? [new Decimal(query.precoMin), new Decimal(query.precoMax)]
                : undefined,
            pagination,
        );
    }

    async findOne(id: string) {
        const produto = await this.produtoRepository.get(id);
        this.assertProdutoExists(produto);
        return produto;
    }

    async update(id: string, dto: UpdateProdutoDTO) {
        const produto = await this.produtoRepository.get(id);
        this.assertProdutoExists(produto);
        return this.produtoRepository.save({ ...produto, ...dto });
    }

    async remove(id: string) {
        const produto = await this.produtoRepository.get(id);
        this.assertProdutoExists(produto);
        await this.produtoRepository.remove(id);
    }
}
