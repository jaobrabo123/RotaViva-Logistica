import { Request } from "express";
import { AccessTokenPayload } from "./access-token-payload.entity";

export interface CustomRequest<TAuth extends boolean = false> extends Request {
    user: TAuth extends true ? AccessTokenPayload : AccessTokenPayload | undefined;
}
