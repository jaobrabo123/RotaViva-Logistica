import { Role } from "../decorators/request/roles.decorator";

export interface AccessTokenPayload {
    role: Role;
    roleId: string;
}
