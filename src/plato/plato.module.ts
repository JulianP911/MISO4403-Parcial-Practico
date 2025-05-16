import { Module } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoEntity } from './plato.entity';
import { PlatoController } from './plato.controller';

/**
 * Módulo que encapsula la lógica relacionada con el recurso Plato.
 */
@Module({
  imports: [TypeOrmModule.forFeature([PlatoEntity])],
  providers: [PlatoService],
  controllers: [PlatoController]
})
export class PlatoModule {}
