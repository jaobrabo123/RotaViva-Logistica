import { Module } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { ProdutoController } from "./produto.controller";
import { DatabaseModule } from "../../infra/database/database.module";
import { ProdutoRepositoryProvider } from "./produto.repository";

@Module({
    imports: [DatabaseModule],
    controllers: [ProdutoController],
    providers: [ProdutoService, ProdutoRepositoryProvider],
})
export class ProdutoModule {}
