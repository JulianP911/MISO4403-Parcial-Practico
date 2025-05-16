import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria, PlatoEntity } from './plato.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

/**
 * Servicio que maneja la lógica de negocio relacionada con el recurso Plato.
 */
@Injectable()
export class PlatoService {
    constructor(
        @InjectRepository(PlatoEntity)
        private readonly platoRepository: Repository<PlatoEntity>
    ){}

    async findAll(): Promise<PlatoEntity[]> {
        return await this.platoRepository.find({ relations: ["restaurantes"] });
    }

    async findOne(id: string): Promise<PlatoEntity> {
        const plato: PlatoEntity | null = await this.platoRepository.findOne({where: {id}, relations: ["restaurantes"] } );
        if (!plato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND);

        return plato;
    }

    async create(plato: PlatoEntity): Promise<PlatoEntity> {
        this.validatePlato(plato);
        return await this.platoRepository.save(plato);
    }

    async update(id: string, plato: PlatoEntity): Promise<PlatoEntity> {
        const persistedPlato: PlatoEntity | null = await this.platoRepository.findOne({where:{id}});
        if (!persistedPlato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND);

        const updatedPlato = { ...persistedPlato, ...plato };
        this.validatePlato(updatedPlato);

        return await this.platoRepository.save(updatedPlato);
    }

    async delete(id: string) {
        const plato: PlatoEntity | null = await this.platoRepository.findOne({where:{id}});
        if (!plato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND);

        await this.platoRepository.remove(plato);
    }

    private validatePlato(plato: PlatoEntity): void {
        if (typeof plato.precio !== 'number' || plato.precio <= 0) {
            throw new BusinessLogicException("El precio del plato debe ser un número positivo", BusinessError.PRECONDITION_FAILED);
        }

        const categoriasValidas = [
            Categoria.ENTRADA,
            Categoria.PLATO_FUERTE,
            Categoria.POSTRE,
            Categoria.BEBIDA
        ];
        if (!categoriasValidas.includes(plato.categoria)) {
            throw new BusinessLogicException("La categoría no es válida para el plato", BusinessError.PRECONDITION_FAILED);
        }
    }
}
