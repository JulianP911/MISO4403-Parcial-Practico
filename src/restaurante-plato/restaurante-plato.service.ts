import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatoEntity } from '../plato/plato.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

/**
 * Servicio que maneja la lógica de negocio relacionada con la asociación entre Restaurantes y Platos.
 */
@Injectable()
export class RestaurantePlatoService {
    constructor(
        @InjectRepository(RestauranteEntity)
        private readonly restauranteRepository: Repository<RestauranteEntity>,

        @InjectRepository(PlatoEntity)
        private readonly platoRepository: Repository<PlatoEntity>
    )  {}

    // Logica  Añadir un plato a un restaurante
    async addDishRestaurant(restauranteId: string, platoId: string): Promise<RestauranteEntity> {
       const plato: PlatoEntity | null = await this.platoRepository.findOne({where: {id: platoId}});
        if (!plato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND);

        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["platos"]})
        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND);

        restaurante.platos = [...restaurante.platos, plato];
        return await this.restauranteRepository.save(restaurante);
    }

    async findDishFromRestaurant(restauranteId: string, platoId: string): Promise<PlatoEntity> {
        const plato: PlatoEntity | null = await this.platoRepository.findOne({where: {id: platoId}});
        if (!plato)
             throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND)

        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["platos"]});
        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND)

        const restaurantePlato: PlatoEntity | undefined = restaurante.platos.find(e => e.id === plato.id);

        if (!restaurantePlato)
            throw new BusinessLogicException("El plato con el id dado no está asociado con el restaurante", BusinessError.PRECONDITION_FAILED)

        return restaurantePlato;
    }

    async findDishesFromRestaurant(restauranteId: string): Promise<PlatoEntity[]> {
        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["platos"]});
        if (!restaurante)
             throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND)

        return restaurante.platos;
    }

    async updateDishesFromRestaurant(restauranteId: string, platos: PlatoEntity[]): Promise<RestauranteEntity> {
        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["platos"]});

        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND)

        for (let i = 0; i < platos.length; i++) {
            const plato: PlatoEntity | null = await this.platoRepository.findOne({where: {id: platos[i].id}});
            if (!plato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND)
        }

        restaurante.platos = platos;
        return await this.restauranteRepository.save(restaurante);
    }

    async deleteDishFromRestaurant(restauranteId: string, platoId: string){
        const plato: PlatoEntity | null = await this.platoRepository.findOne({where: {id: platoId}});
        if (!plato)
            throw new BusinessLogicException("No se encontró el plato con la identificación proporcionada", BusinessError.NOT_FOUND)

        const restaurante: RestauranteEntity | null = await this.restauranteRepository.findOne({where: {id: restauranteId}, relations: ["platos"]});
        if (!restaurante)
            throw new BusinessLogicException("No se encontró el restaurante con la identificación proporcionada", BusinessError.NOT_FOUND)

        const restaurantePlato: PlatoEntity | undefined = restaurante.platos.find(e => e.id === plato.id);

        if (!restaurantePlato)
           throw new BusinessLogicException("El plato con el id dado no está asociado con el restaurante", BusinessError.PRECONDITION_FAILED)

        restaurante.platos = restaurante.platos.filter(e => e.id !== platoId);
        await this.restauranteRepository.save(restaurante);
    }
}
