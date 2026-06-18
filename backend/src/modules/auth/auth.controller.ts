import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { minutes, seconds, Throttle } from "@nestjs/throttler";
import { Public } from "../../shared/decorators/request/public.decorator";
import { ApiOkResponse } from "@nestjs/swagger";
import { LoginResponseDTO } from "./dto/login-response.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Throttle({ short: { ttl: seconds(1), limit: 1 }, long: { ttl: minutes(15), limit: 10 } })
    @Post("login/admin")
    @ApiOkResponse({ type: LoginResponseDTO })
    async loginAdmin(@Body() dto: LoginDTO) {
        return this.authService.loginAdmin(dto);
    }

    @Public()
    @Throttle({ short: { ttl: seconds(1), limit: 1 }, long: { ttl: minutes(15), limit: 10 } })
    @Post("login/entregador")
    @ApiOkResponse({ type: LoginResponseDTO })
    async loginEntregador(@Body() dto: LoginDTO) {
        return this.authService.loginEntregador(dto);
    }
}
