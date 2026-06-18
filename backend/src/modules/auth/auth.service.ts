import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EntregadorService } from "../entregador/entregador.service";
import { LoginDTO } from "./dto/login.dto";
import { Argon2Provider } from "./providers/argon2.provider";
import { Role } from "../../shared/decorators/request/roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenPayload } from "../../shared/entities/access-token-payload.entity";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly entregadorService: EntregadorService,
        private readonly argon2Provider: Argon2Provider,
        private readonly jwtService: JwtService,
        private readonly adminService: AdminService,
    ) {}

    private async validateCredentials<T extends { senha: string }>(
        user: T | null,
        providedSenha: string,
    ): Promise<T> {
        if (!user) throw new UnauthorizedException("Credencias inválidas.");

        const senhaCorreta = await this.argon2Provider.compare(user.senha, providedSenha);
        if (!senhaCorreta) throw new UnauthorizedException("Credencias inválidas.");

        return user;
    }

    private async createSession(data: { sub: string; role: Role }) {
        const accessToken = await this.jwtService.signAsync<AccessTokenPayload>(data);
        return { accessToken };
    }

    async loginEntregador(dto: LoginDTO) {
        const entregador = await this.entregadorService.findByAcesso(dto.acesso);
        const entregadorValidado = await this.validateCredentials(entregador, dto.senha);

        const session = await this.createSession({
            sub: entregadorValidado.id,
            role: Role.ENTREGADOR,
        });

        return { cookies: session };
    }

    async loginAdmin(dto: LoginDTO) {
        const admin = await this.adminService.findByAcesso(dto.acesso);
        const adminValidado = await this.validateCredentials(admin, dto.senha);

        const session = await this.createSession({
            sub: adminValidado.id,
            role: Role.ADMIN,
        });

        return { cookies: session };
    }
}
