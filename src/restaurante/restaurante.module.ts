import { Module } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteController } from './restaurante.controller';

/**
 * Módulo que encapsula la lógica relacionada con el recurso Restaurante.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity])],
  providers: [RestauranteService],
  controllers: [RestauranteController]
})
export class RestauranteModule {}
