import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteService } from './restaurante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { RestauranteEntity, TipoCocina } from './restaurante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

/**
 * Pruebas unitarias para el servicio RestauranteService.
 */
describe('RestauranteService', () => {
  let service: RestauranteService;
  let repository: Repository<RestauranteEntity>;
  let restaurantesList: RestauranteEntity[];

  const tiposCocina = Object.values(TipoCocina);

  const seedDatabase = async () => {
    repository.clear();
    restaurantesList = [];
    for(let i = 0; i < 5; i++){
        const restaurante: RestauranteEntity = await repository.save({
          nombre: faker.lorem.words(3),
          direccion: faker.location.secondaryAddress(),
          tipoCocina: faker.helpers.arrayElement(tiposCocina),
          urlPaginaWeb: faker.image.url(),
        });
        restaurantesList.push(restaurante);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestauranteService],
    }).compile();

    service = module.get<RestauranteService>(RestauranteService);
    repository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all restaurants', async () => {
    const restaurantes: RestauranteEntity[] = await service.findAll();
    expect(restaurantes).not.toBeNull();
    expect(restaurantes).toHaveLength(restaurantesList.length);
  });

  it('findOne should return a resturant by id', async () => {
    const storedResturante: RestauranteEntity = restaurantesList[0];
    const restaurante: RestauranteEntity = await service.findOne(storedResturante.id);
    expect(restaurante).not.toBeNull();
    expect(restaurante.nombre).toEqual(storedResturante.nombre)
    expect(restaurante.direccion).toEqual(storedResturante.direccion)
    expect(restaurante.tipoCocina).toEqual(storedResturante.tipoCocina)
    expect(restaurante.urlPaginaWeb).toEqual(storedResturante.urlPaginaWeb)
  });

  it('findOne should throw an exception for an invalid restaurant', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada")
  });

  it('create should return a new restaurant', async () => {
    const restaurante: RestauranteEntity = {
      id: "",
      nombre: faker.lorem.words(3),
      direccion: faker.location.secondaryAddress(),
      tipoCocina: faker.helpers.arrayElement(tiposCocina),
      urlPaginaWeb: faker.image.url(),
      platos: [],
    }

    const newRestaurante: RestauranteEntity = await service.create(restaurante);
    expect(newRestaurante).not.toBeNull();

    const storedRestaurante: RestauranteEntity | null = await repository.findOne({where: {id: newRestaurante.id}})
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante?.nombre).toEqual(newRestaurante.nombre)
    expect(storedRestaurante?.direccion).toEqual(newRestaurante.direccion)
    expect(storedRestaurante?.tipoCocina).toEqual(newRestaurante.tipoCocina)
    expect(storedRestaurante?.urlPaginaWeb).toEqual(newRestaurante.urlPaginaWeb)
  });

  it('update should modify a restaurant', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    restaurante.nombre = "Nuevo nombre";
    restaurante.direccion = "Nueva dirección";
    const updatedRestaurante: RestauranteEntity = await service.update(restaurante.id, restaurante);
    expect(updatedRestaurante).not.toBeNull();
    const storedRestaurante: RestauranteEntity | null = await repository.findOne({ where: { id: restaurante.id } })
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante?.nombre).toEqual(restaurante.nombre)
    expect(storedRestaurante?.direccion).toEqual(restaurante.direccion)
    expect(storedRestaurante?.tipoCocina).toEqual(restaurante.tipoCocina)
    expect(storedRestaurante?.urlPaginaWeb).toEqual(restaurante.urlPaginaWeb)
  });

  it('update should throw an exception for an invalid restaurant', async () => {
    let restaurante: RestauranteEntity = restaurantesList[0];
    restaurante = {
     ...restaurante, nombre: "Nuevo nombre", direccion: "Nueva dirección"
    }
    await expect(() => service.update("0", restaurante)).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada")
  });

  it('delete should remove a restaurant', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await service.delete(restaurante.id);
    const deletedRestaurante: RestauranteEntity | null = await repository.findOne({ where: { id: restaurante.id } })
    expect(deletedRestaurante).toBeNull();
  });

  it('delete should throw an exception for an invalid restaurant', async () => {
    const restaurante: RestauranteEntity = restaurantesList[0];
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada")
  });
});
