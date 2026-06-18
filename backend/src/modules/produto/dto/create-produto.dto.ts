import { NumberField, StringField } from "../../../shared/decorators/fields";

export class CreateProdutoDTO {
    @StringField({ apiProperty: true, max: 50 })
    nome!: string;

    @StringField({ apiProperty: true, max: 250 })
    descricao!: string;

    @NumberField({ apiProperty: true, maxDecimalPlaces: 2 })
    preco!: number;
}
