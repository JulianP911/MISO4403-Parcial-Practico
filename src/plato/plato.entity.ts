import { RestauranteEntity } from "../restaurante/restaurante.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Categoria {
  ENTRADA = 'Entrada',
  PLATO_FUERTE = 'Plato Fuerte',
  POSTRE = 'Postre',
  BEBIDA = 'Bebida',
}

/**
 * Entidad que representa un Plato en la base de datos.
 */
@Entity()
export class PlatoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column('float')
    precio: number;

    @Column({ type: 'text' })
    categoria: Categoria;

    @ManyToMany(() => RestauranteEntity, restaurante => restaurante.platos)
    restaurantes: RestauranteEntity[];
}
