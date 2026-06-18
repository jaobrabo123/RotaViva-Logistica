import { StringField } from "../../../shared/decorators/fields";
import { ToLowerCase } from "../../../shared/decorators/transformers/lower-case.transformer";

export class LoginDTO {
    @StringField({ apiProperty: true, max: 30 })
    @ToLowerCase()
    acesso!: string;

    @StringField({ apiProperty: true, max: 200 })
    senha!: string;
}
