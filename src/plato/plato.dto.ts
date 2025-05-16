import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Categoria } from './plato.entity';

/**
 * Data Transfer Object (DTO) para representar la información de un Plato.
 */
export class PlatoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    precio: number;

    @IsString()
    @IsNotEmpty()
    categoria: Categoria;
}
