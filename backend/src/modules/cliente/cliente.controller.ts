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
    Query,
} from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { CreateClienteDTO } from "./dto/create-cliente.dto";
import { UpdateClienteDTO } from "./dto/update-cliente.dto";
import { RequireRoles, Role } from "../../shared/decorators/request/roles.decorator";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { PublicCliente } from "./entities/public-cliente.entity";
import { FindClienteQueryDTO } from "./dto/find-cliente-query.dto";

@Controller("clientes")
@RequireRoles(Role.ADMIN)
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) {}

    @Post()
    @ApiCreatedResponse({ type: PublicCliente })
    create(@Body() createClienteDto: CreateClienteDTO) {
        return this.clienteService.create(createClienteDto);
    }

    @Get()
    @ApiOkResponse({ type: PublicCliente, isArray: true })
    findAll(@Query() query: FindClienteQueryDTO) {
        return this.clienteService.findAll(query);
    }

    @Get(":id")
    @ApiOkResponse({ type: PublicCliente })
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.clienteService.findOne(id);
    }

    @Patch(":id")
    @ApiOkResponse({ type: PublicCliente })
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateClienteDto: UpdateClienteDTO) {
        return this.clienteService.update(id, updateClienteDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param("id", ParseUUIDPipe) id: string) {
        return this.clienteService.remove(id);
    }
}
