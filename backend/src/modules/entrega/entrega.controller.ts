import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from "@nestjs/common";
import { EntregaService } from "./entrega.service";
import { CreateEntregaDTO } from "./dto/create-entrega.dto";
import { UpdateEntregaDTO } from "./dto/update-entrega.dto";
import { RequireRoles, Role } from "../../shared/decorators/request/roles.decorator";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { PublicEntrega } from "./entities/public-entrega.entity";

@Controller("entregas")
export class EntregaController {
    constructor(private readonly entregaService: EntregaService) {}

    @RequireRoles(Role.ADMIN)
    @Post()
    @ApiCreatedResponse({ type: PublicEntrega })
    create(@Body() createEntregaDto: CreateEntregaDTO) {
        return this.entregaService.create(createEntregaDto);
    }

    @Get()
    @ApiOkResponse({ type: PublicEntrega, isArray: true })
    findAll() {
        return this.entregaService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: PublicEntrega })
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.entregaService.findOne(id);
    }

    @Patch(":id")
    @ApiOkResponse({ type: PublicEntrega })
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateEntregaDto: UpdateEntregaDTO) {
        return this.entregaService.update(id, updateEntregaDto);
    }

    @RequireRoles(Role.ADMIN)
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.entregaService.remove(id);
    }
}
