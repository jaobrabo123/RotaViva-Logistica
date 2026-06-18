import { Request } from "express";
import { AccessTokenPayload } from "./access-token-payload.entity";
import { Cookies } from "./cookies.entity";

export interface CustomRequest<TAuth extends boolean = false> extends Request {
    user: TAuth extends true ? AccessTokenPayload : AccessTokenPayload | undefined;
    cookies: TAuth extends true ? Cookies : Partial<Cookies>;
}
