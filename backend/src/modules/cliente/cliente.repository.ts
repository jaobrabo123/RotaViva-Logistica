import { Provider } from "@nestjs/common";
import { Cliente } from "../../../generated/prisma/client";
import { RepositoryOf, setupVSRepo } from "../../../generated/vsrepo";
import { PrismaService } from "../../infra/database/prisma.service";

const clienteVSRepo = setupVSRepo<Cliente, "Cliente">()({
    tableName: "cliente",
    pkName: "id",
    methods: {
        findByNomeContainsInsensitiveOptionalPaginated: { map: true },
    },
});

export type ClienteRepository = RepositoryOf<typeof clienteVSRepo>;

export const CLIENTE_REPOSITORY = Symbol("CLIENTE_REPOSITORY");

export const ClienteRepositoryProvider: Provider = {
    provide: CLIENTE_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return clienteVSRepo.build(prisma);
    },
};
