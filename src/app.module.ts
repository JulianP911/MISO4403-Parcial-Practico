import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestauranteModule } from './restaurante/restaurante.module';
import { PlatoModule } from './plato/plato.module';
import { RestauranteEntity } from './restaurante/restaurante.entity';
import { PlatoEntity } from './plato/plato.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantePlatoModule } from './restaurante-plato/restaurante-plato.module';

@Module({
  imports: [PlatoModule, RestauranteModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'restaurante',
      entities: [PlatoEntity, RestauranteEntity],
      dropSchema: true,
      synchronize: true,
    }),
    RestaurantePlatoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
