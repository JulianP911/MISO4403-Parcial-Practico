import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { TipoCocina } from "./restaurante.entity";

export class RestauranteDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    tipoCocina: TipoCocina;

    @IsUrl()
    @IsNotEmpty()
    urlPaginaWeb: string;
}
