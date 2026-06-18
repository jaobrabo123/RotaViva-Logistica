import { SetMetadata } from "@nestjs/common";

export enum Role {
    ADMIN = "ADMIN",
    ENTREGADOR = "ENTREGADOR",
}

export const ROLES_KEY = Symbol("roles");
export const RequireRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
