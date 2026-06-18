import { Module } from "@nestjs/common";
import { EntregaModule } from "./modules/entrega/entrega.module";
import { EntregadorModule } from "./modules/entregador/entregador.module";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ProdutoModule } from "./modules/produto/produto.module";
import { ClienteModule } from "./modules/cliente/cliente.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "./modules/auth/guards/roles.guard";
import { DatabaseModule } from "./infra/database/database.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot([
            {
                name: "short",
                ttl: seconds(1),
                limit: 5,
            },
            {
                name: "long",
                ttl: seconds(60),
                limit: 50,
            },
        ]),
        DatabaseModule,
        EntregaModule,
        EntregadorModule,
        ProdutoModule,
        ClienteModule,
        AuthModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {}
