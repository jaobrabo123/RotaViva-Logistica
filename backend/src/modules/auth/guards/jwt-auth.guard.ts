import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService, TokenExpiredError } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { STATUS_CODES } from "node:http";
import { AccessTokenPayload } from "../../../shared/entities/access-token-payload.entity";
import { CustomRequest } from "../../../shared/entities/custom-request.entity";
import { IS_PUBLIC_KEY } from "../../../shared/decorators/request/public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<CustomRequest>();

        const accessToken =
            // this.extractTokenFromHeader(request) ??
            this.extractTokenFromCookies(request);
        if (!accessToken) {
            throw new UnauthorizedException({
                error: STATUS_CODES[HttpStatus.UNAUTHORIZED],
                message: "AccessToken ausente.",
                statusCode: HttpStatus.UNAUTHORIZED,
                code: "TOKEN_REQUIRED",
            });
        }

        try {
            const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);

            request.user = payload;
        } catch (err) {
            if (err instanceof TokenExpiredError)
                throw new UnauthorizedException({
                    error: STATUS_CODES[HttpStatus.UNAUTHORIZED],
                    message: "AccessToken expirado.",
                    statusCode: HttpStatus.UNAUTHORIZED,
                    code: "TOKEN_EXPIRED",
                });

            throw new UnauthorizedException({
                error: STATUS_CODES[HttpStatus.UNAUTHORIZED],
                message: "AccessToken inválido.",
                statusCode: HttpStatus.UNAUTHORIZED,
                code: "TOKEN_INVALID",
            });
        }

        return true;
    }

    private extractTokenFromCookies(request: CustomRequest) {
        return request.cookies.accessToken;
    }

    // private extractTokenFromHeader(request: CustomUnauthRequest) {
    //     const [type, token] = request.headers.authorization?.split(" ") ?? [];
    //     return type === "Bearer" ? token : undefined;
    // }
}
