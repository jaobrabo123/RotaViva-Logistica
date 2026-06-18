import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateEntregadorDTO } from "./dto/create-entregador.dto";
import { UpdateEntregadorDTO } from "./dto/update-entregador.dto";
import { ENTREGADOR_REPOSITORY, type EntregadorRepository } from "./entregador.repository";
import { Argon2Provider } from "../auth/providers/argon2.provider";

@Injectable()
export class EntregadorService {
    constructor(
        @Inject(ENTREGADOR_REPOSITORY) private readonly entregadorRepository: EntregadorRepository,
        private readonly argon2Provider: Argon2Provider,
    ) {}

    private assertEntregadorExists<T>(entregador: T): asserts entregador is NonNullable<T> {
        if (!entregador) throw new NotFoundException("Entregador não encontrado");
    }

    public async findByAcesso(acesso: string) {
        return this.entregadorRepository.findByAcesso(acesso);
    }

    async create(dto: CreateEntregadorDTO) {
        const acessoEmUso = await this.entregadorRepository.existsByAcesso(dto.acesso);
        if (acessoEmUso) throw new ConflictException("Esse acesso já está em uso.");

        // * Faz o hash da senha do entregador
        dto.senha = await this.argon2Provider.hash(dto.senha);
        return this.entregadorRepository.save(dto);
    }

    async findAll() {
        return this.entregadorRepository.getAll();
    }

    async findOne(id: string) {
        const entregador = await this.entregadorRepository.get(id);
        this.assertEntregadorExists(entregador);
        return entregador;
    }

    async update(id: string, dto: UpdateEntregadorDTO) {
        const entregador = await this.entregadorRepository.get(id, { selectModel: "internal" });
        this.assertEntregadorExists(entregador);

        if (dto.acesso && dto.acesso !== entregador.acesso) {
            const acessoEmUso = await this.entregadorRepository.existsByAcesso(dto.acesso);
            if (acessoEmUso) throw new ConflictException("Esse acesso já está em uso.");
        }

        // * Se passou a senha para atualizar, faz o hash da nova senha
        if (dto.senha) dto.senha = await this.argon2Provider.hash(dto.senha);
        return this.entregadorRepository.save({ ...entregador, ...dto });
    }

    async remove(id: string) {
        const entregador = await this.entregadorRepository.get(id);
        this.assertEntregadorExists(entregador);
        await this.entregadorRepository.remove(id);
    }
}
