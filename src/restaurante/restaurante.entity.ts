import { PlatoEntity } from "../plato/plato.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export enum TipoCocina {
  ITALIANA = 'Italiana',
  JAPONESA = 'Japonesa',
  MEXICANA = 'Mexicana',
  COLOMBIANA = 'Colombiana',
  INDIA = 'India',
  INTERNACIONAL = 'Internacional',
}

@Entity()
export class RestauranteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    direccion: string;

    @Column({ type: 'text' })
    tipoCocina: TipoCocina;

    @Column()
    urlPaginaWeb: string;

    @ManyToMany(() => PlatoEntity, plato => plato.restaurantes)
    @JoinTable()
    platos: PlatoEntity[];
}
