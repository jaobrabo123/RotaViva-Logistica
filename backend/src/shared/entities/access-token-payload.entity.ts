import { Role } from "../decorators/request/roles.decorator";

export interface AccessTokenPayload {
    sub: string;
    role: Role;
    roleId: string;
}
