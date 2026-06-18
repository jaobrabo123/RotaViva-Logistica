import { Module } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ClienteController } from "./cliente.controller";
import { DatabaseModule } from "../../infra/database/database.module";
import { ClienteRepositoryProvider } from "./cliente.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [ClienteController],
    providers: [ClienteService, ClienteRepositoryProvider],
})
export class ClienteModule {}
