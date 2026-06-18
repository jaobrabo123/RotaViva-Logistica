import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ProdutoService } from "./produto.service";
import { CreateProdutoDTO } from "./dto/create-produto.dto";
import { UpdateProdutoDTO } from "./dto/update-produto.dto";
import { RequireRoles, Role } from "../../shared/decorators/request/roles.decorator";

@Controller("produto")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @RequireRoles(Role.ADMIN)
    @Post()
    create(@Body() dto: CreateProdutoDTO) {
        return this.produtoService.create(dto);
    }

    @Get()
    findAll() {
        return this.produtoService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.produtoService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDTO) {
        return this.produtoService.update(+id, updateProdutoDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.produtoService.remove(+id);
    }
}
