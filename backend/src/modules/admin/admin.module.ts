import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { DatabaseModule } from "../../infra/database/database.module";
import { AdminRepositoryProvider } from "./admin.repository";

@Module({
    imports: [DatabaseModule],
    providers: [AdminService, AdminRepositoryProvider],
    exports: [AdminService],
})
export class AdminModule {}
