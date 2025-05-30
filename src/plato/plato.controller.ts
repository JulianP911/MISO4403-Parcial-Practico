import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PlatoService } from './plato.service';
import { PlatoEntity } from './plato.entity';
import { plainToInstance } from 'class-transformer';
import { PlatoDto } from './plato.dto';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

/**
 * Controlador que maneja las rutas relacionadas con el recurso Plato.
 */
@Controller('dishes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PlatoController {
    constructor(private readonly platoService: PlatoService) {}

    @Get()
    async findAll() {
        return await this.platoService.findAll();
    }

    @Get(':platoId')
    async findOne(@Param('platoId') platoId: string) {
        return await this.platoService.findOne(platoId);
    }

    @Post()
    async create(@Body() platoDto: PlatoDto) {
        const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
        return await this.platoService.create(plato);
    }

    @Put(':platoId')
    async update(@Param('platoId') platoId: string, @Body() platoDto: PlatoDto) {
        const plato: PlatoEntity = plainToInstance(PlatoEntity, platoDto);
        return await this.platoService.update(platoId, plato);
    }

    @Delete(':platoId')
    @HttpCode(204)
    async delete(@Param('platoId') platoId: string) {
        return await this.platoService.delete(platoId);
    }
}
