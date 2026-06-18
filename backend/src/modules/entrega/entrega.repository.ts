import { Provider } from "@nestjs/common";
import { EntregaGetPayload, EntregaSelect } from "../../../generated/prisma/models";
import { RepositoryOf, setupVSRepo } from "../../../generated/vsrepo";
import { PrismaService } from "../../infra/database/prisma.service";

type Entrega = EntregaGetPayload<{
    include: {
        cliente: true;
        entregador: true;
        produto: true;
    };
}>;

const entregaPublicSelectModel = {
    id: true,
    codigo: true,
    clienteId: true,
    detalhes: true,
    imagem: true,
    latitude: true,
    produtoId: true,
    status: true,
    longitude: true,
    duracaoMinutos: true,
    entregadorId: true,
} satisfies EntregaSelect;

const entregaVSRepo = setupVSRepo<Entrega, "Entrega">()({
    tableName: "entrega",
    pkName: "id",
    selectModels: {
        public: entregaPublicSelectModel,
        publicWithRelations: {
            ...entregaPublicSelectModel,
            cliente: true,
            entregador: { omit: { senha: true } },
            produto: true,
        },
    },
    defaultSelectModel: "publicWithRelations",
    methods: {
        findByStatusOptionalAndCodigoOptionalAndEntregadorIdOptionalAndClienteIdOptionalAndProdutoIdOptionalPaginated:
            {
                map: true,
            },
    },
});

export type EntregaRepository = RepositoryOf<typeof entregaVSRepo>;

export const ENTREGA_REPOSITORY = Symbol("ENTREGA_REPOSITORY");

export const EntregaRepositoryProvider: Provider = {
    provide: ENTREGA_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return entregaVSRepo.build(prisma);
    },
};
