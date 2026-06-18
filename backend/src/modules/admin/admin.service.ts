import { Inject, Injectable } from "@nestjs/common";
import { ADMIN_REPOSITORY, type AdminRepository } from "./admin.repository";

@Injectable()
export class AdminService {
    constructor(@Inject(ADMIN_REPOSITORY) private readonly adminRepository: AdminRepository) {}

    public async findByAcesso(acesso: string) {
        return this.adminRepository.findByAcesso(acesso);
    }
}
