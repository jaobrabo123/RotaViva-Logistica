import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpStatus,
    HttpCode,
} from "@nestjs/common";
import { EntregadorService } from "./entregador.service";
import { CreateEntregadorDTO } from "./dto/create-entregador.dto";
import { UpdateEntregadorDTO } from "./dto/update-entregador.dto";
import { RequireRoles, Role } from "../../shared/decorators/request/roles.decorator";
import { CurrentUser } from "../../shared/decorators/request/current-user.decorator";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { PublicEntregador } from "./entities/public-entregador.entity";

@Controller("entregadores")
export class EntregadorController {
    constructor(private readonly entregadorService: EntregadorService) {}

    @RequireRoles(Role.ADMIN)
    @Post()
    @ApiCreatedResponse({ type: PublicEntregador })
    create(@Body() dto: CreateEntregadorDTO) {
        return this.entregadorService.create(dto);
    }

    @RequireRoles(Role.ADMIN)
    @Get()
    @ApiOkResponse({ type: PublicEntregador, isArray: true })
    findAll() {
        return this.entregadorService.findAll();
    }

    @RequireRoles(Role.ENTREGADOR)
    @Get("me")
    @ApiOkResponse({ type: PublicEntregador })
    findMe(@CurrentUser("roleId") entregadorId: string) {
        return this.entregadorService.findOne(entregadorId);
    }

    @RequireRoles(Role.ADMIN)
    @Get(":id")
    @ApiOkResponse({ type: PublicEntregador })
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.entregadorService.findOne(id);
    }

    @RequireRoles(Role.ADMIN)
    @Patch(":id")
    @ApiOkResponse({ type: PublicEntregador })
    update(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateEntregadorDTO) {
        return this.entregadorService.update(id, dto);
    }

    @RequireRoles(Role.ADMIN)
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id", ParseUUIDPipe) id: string) {
        await this.entregadorService.remove(id);
    }
}
