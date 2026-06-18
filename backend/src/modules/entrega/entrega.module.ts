import { Module } from "@nestjs/common";
import { EntregaService } from "./entrega.service";
import { EntregaController } from "./entrega.controller";
import { DatabaseModule } from "../../infra/database/database.module";
import { EntregaRepositoryProvider } from "./entrega.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [EntregaController],
    providers: [EntregaService, EntregaRepositoryProvider],
})
export class EntregaModule {}
