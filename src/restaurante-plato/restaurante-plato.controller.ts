import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { plainToInstance } from 'class-transformer';
import { PlatoEntity } from 'src/plato/plato.entity';
import { PlatoDto } from 'src/plato/plato.dto';

@Controller('restaurants')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestaurantePlatoController {
    constructor(private readonly restaurantePlatoService: RestaurantePlatoService){}

    @Post(':restauranteId/dishes/:platoId')
    async addDishRestaurant(@Param('restauranteId') restauranteId: string, @Param('platoId') platoId: string){
        return await this.restaurantePlatoService.addDishRestaurant(restauranteId, platoId);
    }

    @Get(':restauranteId/dishes/:platoId')
    async findDishFromRestaurant(@Param('restauranteId') restauranteId: string, @Param('platoId') platoId: string){
        return await this.restaurantePlatoService.findDishFromRestaurant(restauranteId, platoId);
    }

    @Get(':restauranteId/dishes')
    async findDishesFromRestaurant(@Param('restauranteId') restauranteId: string){
        return await this.restaurantePlatoService.findDishesFromRestaurant(restauranteId);
    }

    @Put(':restauranteId/dishes')
    async updateDishesFromRestaurant(@Body() platoDto: PlatoDto[], @Param('restauranteId') restauranteId: string){
        const platos = plainToInstance(PlatoEntity, platoDto)
        return await this.restaurantePlatoService.updateDishesFromRestaurant(restauranteId, platos);
    }

    @Delete(':restauranteId/dishes/:platoId')
    @HttpCode(204)
    async deleteDishFromRestaurant(@Param('restauranteId') restauranteId: string, @Param('platoId') platoId: string){
        return await this.restaurantePlatoService.deleteDishFromRestaurant(restauranteId, platoId);
    }
}
