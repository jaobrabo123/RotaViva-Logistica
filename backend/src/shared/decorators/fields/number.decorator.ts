import { applyDecorators } from "@nestjs/common";
import { IsNumber, Max, Min, ValidateIf } from "class-validator";
import { FieldConfig } from "./entities/field-config.entity";
import { ApiProperty } from "@nestjs/swagger";

interface NumberFieldConfig extends FieldConfig {
    max?: number;
    min?: number;
    maxDecimalPlaces?: number;
}

export function NumberField(config?: NumberFieldConfig) {
    const decorators = [
        IsNumber(
            { maxDecimalPlaces: config?.maxDecimalPlaces },
            {
                message: `Campo deve ser um número válido${config?.maxDecimalPlaces !== undefined ? ` com até ${config.maxDecimalPlaces} casas decimais` : ""}.`,
            },
        ),
    ];

    if (config) {
        if (config.max) decorators.push(Max(config.max));
        if (config.min) decorators.push(Min(config.min));
        if (config.nullAble) decorators.push(ValidateIf((_, value) => value !== null));
        if (config.apiProperty) decorators.push(ApiProperty(config.apiPropertyOptions));
    }

    return applyDecorators(...decorators);
}
