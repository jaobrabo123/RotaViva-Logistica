import { applyDecorators } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, ValidateIf } from "class-validator";
import { FieldConfig } from "./entities/field-config.entity";
import { Trim } from "../transformers/trim.transformer";

interface EnumFieldConfig extends FieldConfig {
    nonTrim?: boolean;
}

export function EnumField(enumEntity: object, config?: EnumFieldConfig) {
    const decorators = [IsEnum(enumEntity, { message: "Campo deve ser uma string." })];

    if (config) {
        if (!config.nonTrim) decorators.push(Trim());
        if (config.nullAble) decorators.push(ValidateIf((_, value) => value !== null));
        if (config.apiProperty) decorators.push(ApiProperty(config.apiPropertyOptions));
    }

    return applyDecorators(...decorators);
}
