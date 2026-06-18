import { applyDecorators, Type as ClassType } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ValidateIf, ValidateNested } from "class-validator";
import { FieldConfig } from "./entities/field-config.entity";
import { Type } from "class-transformer";

interface NestedFieldConfig extends FieldConfig {
    each?: boolean;
}

export function NestedField(type: ClassType<any>, config?: NestedFieldConfig) {
    const decorators = [
        ValidateNested({ message: "Campo inválido.", each: config?.each }),
        Type(() => type),
    ];

    if (config) {
        if (config.nullAble) decorators.push(ValidateIf((_, value) => value !== null));
        if (config.apiProperty) decorators.push(ApiProperty(config.apiPropertyOptions));
    }

    return applyDecorators(...decorators);
}
