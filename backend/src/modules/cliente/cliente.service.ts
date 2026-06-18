import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClienteDTO } from "./dto/create-cliente.dto";
import { UpdateClienteDTO } from "./dto/update-cliente.dto";
import { CLIENTE_REPOSITORY, type ClienteRepository } from "./cliente.repository";

@Injectable()
export class ClienteService {
    constructor(
        @Inject(CLIENTE_REPOSITORY) private readonly clienteRepository: ClienteRepository,
    ) {}

    private assertClienteExists<T>(cliente: T): asserts cliente is NonNullable<T> {
        if (!cliente) throw new NotFoundException("Cliente não encontrado.");
    }

    create(dto: CreateClienteDTO) {
        return this.clienteRepository.save(dto);
    }

    findAll() {
        return this.clienteRepository.getAll();
    }

    async findOne(id: string) {
        const cliente = await this.clienteRepository.get(id);
        this.assertClienteExists(cliente);
        return cliente;
    }

    async update(id: string, dto: UpdateClienteDTO) {
        const cliente = await this.clienteRepository.get(id);
        this.assertClienteExists(cliente);
        return this.clienteRepository.save({ ...cliente, ...dto });
    }

    async remove(id: string) {
        const cliente = await this.clienteRepository.get(id);
        this.assertClienteExists(cliente);
        await this.clienteRepository.remove(id);
    }
}
