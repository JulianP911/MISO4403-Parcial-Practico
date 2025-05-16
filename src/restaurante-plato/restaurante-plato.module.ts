import { Module } from '@nestjs/common';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { RestaurantePlatoController } from './restaurante-plato.controller';
import { PlatoEntity } from 'src/plato/plato.entity';

/**
 * Módulo que encapsula la lógica relacionada con la asociación entre Restaurantes y Platos.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity, PlatoEntity])],
  providers: [RestaurantePlatoService],
  controllers: [RestaurantePlatoController]
})
export class RestaurantePlatoModule {}
