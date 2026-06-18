import { PasswordField, StringField } from "../../../shared/decorators/fields";

export class CreateEntregadorDTO {
    @StringField({ apiProperty: true, max: 50 })
    nome!: string;

    @StringField({ apiProperty: true, max: 18 })
    telefone!: string;

    @StringField({ apiProperty: true, max: 2 })
    cnh!: string;

    @PasswordField({ apiProperty: true })
    senha!: string;
}
