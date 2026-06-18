import { Provider } from "@nestjs/common";
import { Admin } from "../../../generated/prisma/client";
import { RepositoryOf, setupVSRepo } from "../../../generated/vsrepo";
import { PrismaService } from "../../infra/database/prisma.service";

const adminVSRepo = setupVSRepo<Admin, "Admin">()({
    tableName: "admin",
    pkName: "id",
    selectModels: {
        public: {
            id: true,
            acesso: true,
        },
        internal: {
            id: true,
            acesso: true,
            senha: true,
        },
    },
    defaultSelectModel: "public",
    methods: {
        findByAcesso: { map: true, fbMode: "one", selectModel: "internal" },
    },
});

export type AdminRepository = RepositoryOf<typeof adminVSRepo>;

export const ADMIN_REPOSITORY = Symbol("ADMIN_REPOSITORY");

export const AdminRepositoryProvider: Provider = {
    provide: ADMIN_REPOSITORY,
    inject: [PrismaService],
    useFactory: (prisma: PrismaService) => {
        return adminVSRepo.build(prisma);
    },
};
