import { StringField } from "../../../shared/decorators/fields";

export class CreateClienteDTO {
    @StringField({ apiProperty: true, max: 50 })
    nome!: string;

    @StringField({ apiProperty: true, max: 150 })
    endereco!: string;
}
