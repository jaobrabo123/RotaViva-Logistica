import { StatusEntrega } from "../../../../generated/prisma/enums";
import {
    EnumField,
    IntField,
    NumberField,
    StringField,
    UrlField,
    UUIDField,
} from "../../../shared/decorators/fields";

export class CreateEntregaDTO {
    @EnumField(StatusEntrega, { apiProperty: true })
    status!: StatusEntrega;

    @IntField({ apiProperty: true, nullAble: true })
    duracaoMinutos!: number | null;

    @NumberField({ apiProperty: true, maxDecimalPlaces: 6, nullAble: true })
    latitude!: number | null;

    @NumberField({ apiProperty: true, maxDecimalPlaces: 6, nullAble: true })
    longitude!: number | null;

    @StringField({ apiProperty: true, max: 300, nullAble: true })
    detalhes!: string | null;

    @StringField({ apiProperty: true, max: 100 })
    codigo!: string;

    @UUIDField({ apiProperty: true })
    entregadorId!: string;

    @UUIDField({ apiProperty: true })
    clienteId!: string;

    @UUIDField({ apiProperty: true })
    produtoId!: string;

    @UrlField({ apiProperty: true, nullAble: true })
    imagem!: string | null;
}
