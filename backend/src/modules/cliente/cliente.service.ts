import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateClienteDTO } from "./dto/create-cliente.dto";
import { UpdateClienteDTO } from "./dto/update-cliente.dto";
import { CLIENTE_REPOSITORY, type ClienteRepository } from "./cliente.repository";
import { FindClienteQueryDTO } from "./dto/find-cliente-query.dto";
import { paginationByQuery } from "../../shared/utils/format.util";

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

    findAll(query: FindClienteQueryDTO) {
        const pagination = paginationByQuery(query);
        return this.clienteRepository.findByNomeContainsInsensitiveOptionalPaginated(
            query.nome,
            pagination,
        );
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
