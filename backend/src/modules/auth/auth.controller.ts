import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { clearAccessTokenCookie, setAccessTokenCookie } from "../../shared/utils/cookie.util";
import type { Response } from "express";
import { minutes, seconds, Throttle } from "@nestjs/throttler";
import { Public } from "../../shared/decorators/request/public.decorator";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Throttle({ short: { ttl: seconds(1), limit: 1 }, long: { ttl: minutes(15), limit: 10 } })
    @Post("login/admin")
    @HttpCode(HttpStatus.NO_CONTENT)
    async loginAdmin(@Body() dto: LoginDTO, @Res({ passthrough: true }) res: Response) {
        const { cookies } = await this.authService.loginAdmin(dto);

        setAccessTokenCookie(cookies.accessToken, res);
    }

    @Public()
    @Throttle({ short: { ttl: seconds(1), limit: 1 }, long: { ttl: minutes(15), limit: 10 } })
    @Post("login/entregador")
    @HttpCode(HttpStatus.NO_CONTENT)
    async loginEntregador(@Body() dto: LoginDTO, @Res({ passthrough: true }) res: Response) {
        const { cookies } = await this.authService.loginEntregador(dto);

        setAccessTokenCookie(cookies.accessToken, res);
    }

    @Post("logout")
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@Res({ passthrough: true }) res: Response) {
        clearAccessTokenCookie(res);
    }
}
