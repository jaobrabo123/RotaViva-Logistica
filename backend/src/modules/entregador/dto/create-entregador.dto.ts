import { PasswordField, StringField } from "../../../shared/decorators/fields";
import { ToLowerCase } from "../../../shared/decorators/transformers/lower-case.transformer";

export class CreateEntregadorDTO {
    @StringField({ apiProperty: true, max: 50 })
    nome!: string;

    @StringField({ apiProperty: true, max: 18 })
    telefone!: string;

    @StringField({ apiProperty: true, max: 2 })
    cnh!: string;

    @StringField({ apiProperty: true, max: 30 })
    @ToLowerCase()
    acesso!: string;

    @PasswordField({ apiProperty: true })
    senha!: string;
}
