import { Injectable } from '@nestjs/common';
import { RestauranteEntity, TipoCocina } from './restaurante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RestauranteService {
    constructor(
       @InjectRepository(RestauranteEntity)
       private readonly restauranteRepository: Repository<RestauranteEntity>
    ){}

    async findAll(): Promise<RestauranteEntity[]> {
       return await this.restauranteRepository.find({ relations: ["platos"] });
    }

    async findOne(id: string): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id}, relations: ["platos"] } );
        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND);

        return restaurante;
    }

    async create(restaurante: RestauranteEntity): Promise<RestauranteEntity> {
        this.validateRestaurante(restaurante);
        return await this.restauranteRepository.save(restaurante);
    }

    async update(id: string, restaurante: RestauranteEntity): Promise<RestauranteEntity> {
       const persistedRestaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where:{id}});
        if (!persistedRestaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND);

        const updatedRestaurante = { ...persistedRestaurante, ...restaurante };
        this.validateRestaurante(updatedRestaurante);

        return await this.restauranteRepository.save(updatedRestaurante);
    }

    async delete(id: string) {
        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where:{id}});
        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND);

        await this.restauranteRepository.remove(restaurante);
    }

    private validateRestaurante(restaurante: RestauranteEntity): void {
        const tiposCocinasValidas = [
            TipoCocina.ITALIANA,
            TipoCocina.JAPONESA,
            TipoCocina.MEXICANA,
            TipoCocina.COLOMBIANA,
            TipoCocina.INDIA,
            TipoCocina.INTERNACIONAL
        ];
        if (!tiposCocinasValidas.includes(restaurante.tipoCocina)) {
            throw new BusinessLogicException("El tipo de cocina no es válida para el restaurante", BusinessError.PRECONDITION_FAILED);
        }
    }
}
