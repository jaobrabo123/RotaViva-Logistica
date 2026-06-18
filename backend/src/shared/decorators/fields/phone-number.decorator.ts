import { applyDecorators } from "@nestjs/common";
import { IsPhoneNumber, ValidateIf } from "class-validator";
import { FieldConfig } from "./entities/field-config.entity";
import { ApiProperty } from "@nestjs/swagger";
import parsePhoneNumberFromString, { CountryCode } from "libphonenumber-js/max";
import { Transform } from "class-transformer";

interface PhoneNumberFieldConfig extends FieldConfig {
    region?: CountryCode;
    nonFormat?: boolean;
}

export function PhoneNumberField(config?: PhoneNumberFieldConfig) {
    const decorators = [
        IsPhoneNumber(config?.region, {
            message: `Campo deve ser um telefone válido${config?.region ? ` dessa região: ${config.region}` : ""}.`,
        }),
    ];

    if (config) {
        if (!config.nonFormat)
            decorators.push(
                Transform(({ value }: { value: unknown }) => {
                    if (typeof value !== "string") return value;
                    const phoneNumber = parsePhoneNumberFromString(value, config?.region);
                    return phoneNumber ? phoneNumber.format("E.164") : value;
                }),
            );
        if (config.nullAble) decorators.push(ValidateIf((_, value) => value !== null));
        if (config.apiProperty) decorators.push(ApiProperty(config.apiPropertyOptions));
    }

    return applyDecorators(...decorators);
}
