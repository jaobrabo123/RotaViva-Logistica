import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomRequest } from "../../entities/custom-request.entity";

export const Cookies = createParamDecorator(
    (data: keyof CustomRequest["cookies"], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<CustomRequest>();
        return data ? request.cookies[data] : request.cookies;
    },
);
