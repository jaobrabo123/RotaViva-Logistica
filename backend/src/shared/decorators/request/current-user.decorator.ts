import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { CustomRequest } from "../../entities/custom-request.entity";

export const CurrentUser = createParamDecorator(
    (data: keyof CustomRequest<true>["user"], context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest<CustomRequest<true>>();

        return data ? request.user[data] : request.user;
    },
);
