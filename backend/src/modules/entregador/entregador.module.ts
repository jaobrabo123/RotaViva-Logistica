import { forwardRef, Module } from "@nestjs/common";
import { EntregadorService } from "./entregador.service";
import { EntregadorController } from "./entregador.controller";
import { DatabaseModule } from "../../infra/database/database.module";
import { EntregadorRepositoryProvider } from "./entregador.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [DatabaseModule, forwardRef(() => AuthModule)],
    controllers: [EntregadorController],
    providers: [EntregadorService, EntregadorRepositoryProvider],
    exports: [EntregadorService],
})
export class EntregadorModule {}
