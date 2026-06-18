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
import { ProdutoService } from "./produto.service";
import { CreateProdutoDTO } from "./dto/create-produto.dto";
import { UpdateProdutoDTO } from "./dto/update-produto.dto";
import { RequireRoles, Role } from "../../shared/decorators/request/roles.decorator";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { PublicProduto } from "./entities/public-produto.entity";

@Controller("produtos")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @RequireRoles(Role.ADMIN)
    @Post()
    @ApiCreatedResponse({ type: PublicProduto })
    create(@Body() dto: CreateProdutoDTO) {
        return this.produtoService.create(dto);
    }

    @Get()
    @ApiOkResponse({ type: PublicProduto, isArray: true })
    findAll() {
        return this.produtoService.findAll();
    }

    @Get(":id")
    @ApiOkResponse({ type: PublicProduto })
    findOne(@Param("id", ParseUUIDPipe) id: string) {
        return this.produtoService.findOne(id);
    }

    @RequireRoles(Role.ADMIN)
    @Patch(":id")
    @ApiOkResponse({ type: PublicProduto })
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateProdutoDto: UpdateProdutoDTO) {
        return this.produtoService.update(id, updateProdutoDto);
    }

    @RequireRoles(Role.ADMIN)
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id", ParseUUIDPipe) id: string) {
        await this.produtoService.remove(id);
    }
}
