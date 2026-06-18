import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEntregaDTO } from "./dto/create-entrega.dto";
import { UpdateEntregaDTO } from "./dto/update-entrega.dto";
import { ENTREGA_REPOSITORY, type EntregaRepository } from "./entrega.repository";

@Injectable()
export class EntregaService {
    constructor(
        @Inject(ENTREGA_REPOSITORY) private readonly entregaRepository: EntregaRepository,
    ) {}

    private assertEntregaExists<T>(entrega: T): asserts entrega is NonNullable<T> {
        if (!entrega) throw new NotFoundException("Entrega não encontrada.");
    }

    create(dto: CreateEntregaDTO) {
        return this.entregaRepository.save(dto);
    }

    findAll() {
        return this.entregaRepository.getAll();
    }

    async findOne(id: string) {
        const entrega = await this.entregaRepository.get(id);
        this.assertEntregaExists(entrega);
        return entrega;
    }

    async update(id: string, dto: UpdateEntregaDTO) {
        const entrega = await this.entregaRepository.get(id, { selectModel: "public" });
        this.assertEntregaExists(entrega);
        return this.entregaRepository.save({ ...entrega, ...dto });
    }

    async remove(id: string) {
        const entrega = await this.entregaRepository.get(id, { selectModel: "public" });
        this.assertEntregaExists(entrega);
        await this.entregaRepository.remove(id);
    }
}
