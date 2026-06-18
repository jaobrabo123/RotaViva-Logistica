import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Argon2Provider } from "./providers/argon2.provider";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow("JWT_SECRET"),
                signOptions: { expiresIn: "1d" },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, Argon2Provider],
    exports: [JwtModule, Argon2Provider],
})
export class AuthModule {}
