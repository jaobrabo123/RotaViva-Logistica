import { Provider } from "@nestjs/common";
import { Produto } from "../../../generated/prisma/client";
import { RepositoryOf, setupVSRepo } from "../../../generated/vsrepo";
import { PrismaService } from "../../infra/database/prisma.service";

const produtoVSRepo = setupVSRepo<Produto, "Produto">()({
    tableName: "produto",
    pkName: "id",
    methods: {
        findByNomeContainsInsensitiveOptionalAndPrecoBetweenOptionalPaginated: { map: true },
    },
});

export type ProdutoRepository = RepositoryOf<typeof produtoVSRepo>;

export const PRODUTO_REPOSITORY = Symbol("PRODUTO_REPOSITORY");

export const ProdutoRepositoryProvider: Provider = {
    provide: PRODUTO_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return produtoVSRepo.build(prisma);
    },
};
