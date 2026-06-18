import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
    HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { STATUS_CODES } from "http";
import { Role, ROLES_KEY } from "../../../shared/decorators/request/roles.decorator";
import { CustomRequest } from "../../../shared/entities/custom-request.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Se a rota não tiver o decorator @Roles(), libera o acesso (qualquer logado acessa)
        if (!requiredRoles || !requiredRoles.length) {
            return true;
        }

        // Pega o request (neste ponto o AuthGuard já colocou o usuário lá dentro)
        const { user } = context.switchToHttp().getRequest<CustomRequest>();

        // Se por algum motivo não houver usuário, bloqueia
        if (!user) {
            throw new UnauthorizedException("Usuário não autenticado.");
        }

        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException({
                error: STATUS_CODES[HttpStatus.FORBIDDEN],
                message: "Acesso negado.",
                statusCode: HttpStatus.FORBIDDEN,
                code: "ACCESS_DENIED",
            });
        }

        return true;
    }
}
