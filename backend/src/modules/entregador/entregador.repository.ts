import { Provider } from "@nestjs/common";
import { Entregador } from "../../../generated/prisma/client";
import { RepositoryOf, setupVSRepo } from "../../../generated/vsrepo";
import { PrismaService } from "../../infra/database/prisma.service";

const entregadorVSRepo = setupVSRepo<Entregador, "Entregador">()({
    pkName: "id",
    tableName: "entregador",
    selectModels: {
        public: {
            id: true,
            nome: true,
            cnh: true,
            telefone: true,
            acesso: true,
        },
        internal: {
            id: true,
            nome: true,
            cnh: true,
            telefone: true,
            senha: true,
            acesso: true,
        },
    },
    defaultSelectModel: "public",
    methods: {
        findByAcesso: { map: true, selectModel: "internal", fbMode: "one" },
        existsByAcesso: { map: true },
        findByNomeContainsInsensitiveOptionalAndCnhOptionalAndAcessoContainsInsensitiveOptionalPaginated:
            { map: true },
    },
});

export type EntregadorRepository = RepositoryOf<typeof entregadorVSRepo>;

export const ENTREGADOR_REPOSITORY = Symbol("ENTREGADOR_REPOSITORY");

export const EntregadorRepositoryProvider: Provider = {
    provide: ENTREGADOR_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return entregadorVSRepo.build(prisma, { showWorking: false });
    },
};
