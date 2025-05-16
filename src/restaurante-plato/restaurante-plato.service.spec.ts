import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantePlatoService } from './restaurante-plato.service';
import { Repository } from 'typeorm';
import { RestauranteEntity, TipoCocina } from '../restaurante/restaurante.entity';
import { Categoria, PlatoEntity } from '../plato/plato.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';

describe('RestaurantePlatoService', () => {
  let service: RestaurantePlatoService;
  let restauranteRepository: Repository<RestauranteEntity>;
  let platoRepository: Repository<PlatoEntity>;
  let restaurante: RestauranteEntity;
  let platosList : PlatoEntity[];

  const categorias = Object.values(Categoria);
  const tiposCocina = Object.values(TipoCocina);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RestaurantePlatoService],
    }).compile();

    service = module.get<RestaurantePlatoService>(RestaurantePlatoService);
    restauranteRepository = module.get<Repository<RestauranteEntity>>(getRepositoryToken(RestauranteEntity));
    platoRepository = module.get<Repository<PlatoEntity>>(getRepositoryToken(PlatoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    platoRepository.clear();
    restauranteRepository.clear();

    platosList = [];
    for(let i = 0; i < 5; i++){
        const plato: PlatoEntity = await platoRepository.save({
          nombre: faker.lorem.words(3),
          descripcion: faker.lorem.paragraph(),
          precio: faker.number.int({ min: 5, max: 50}),
          categoria: faker.helpers.arrayElement(categorias),
        });
        platosList.push(plato);
    }

    restaurante = await restauranteRepository.save({
      nombre: faker.lorem.words(3),
      direccion: faker.location.secondaryAddress(),
      tipoCocina: faker.helpers.arrayElement(tiposCocina),
      urlPaginaWeb: faker.image.url(),
      platos: platosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addDishRestaurant should add a dish to a restaurant', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    const newRestaurante: RestauranteEntity = await restauranteRepository.save({
      nombre: faker.lorem.words(3),
      direccion: faker.location.secondaryAddress(),
      tipoCocina: faker.helpers.arrayElement(tiposCocina),
      urlPaginaWeb: faker.image.url(),
    })

    const result: RestauranteEntity = await service.addDishRestaurant(newRestaurante.id, newPlato.id);

    expect(result.platos.length).toBe(1);
    expect(result.platos[0]).not.toBeNull();
    expect(result.platos[0].nombre).toBe(newPlato.nombre)
    expect(result.platos[0].descripcion).toBe(newPlato.descripcion)
    expect(result.platos[0].precio).toBe(newPlato.precio)
    expect(result.platos[0].categoria).toBe(newPlato.categoria)
  });

  it('addDishRestaurant should thrown exception for an invalid dish', async () => {
    const newRestaurante: RestauranteEntity = await restauranteRepository.save({
      nombre: faker.lorem.words(3),
      direccion: faker.location.secondaryAddress(),
      tipoCocina: faker.helpers.arrayElement(tiposCocina),
      urlPaginaWeb: faker.image.url(),
    })

    await expect(() => service.addDishRestaurant(newRestaurante.id, "0")).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada");
  });

  it('addDishRestaurant should throw an exception for an invalid restaurante', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    await expect(() => service.addDishRestaurant("0", newPlato.id)).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada");
  });

  it('findDishFromRestaurant should return plato by restaurant', async () => {
    const plato: PlatoEntity = platosList[0];
    const storedPlato: PlatoEntity = await service.findDishFromRestaurant(restaurante.id, plato.id, )
    expect(storedPlato).not.toBeNull();
    expect(storedPlato.nombre).toBe(plato.nombre);
    expect(storedPlato.descripcion).toBe(plato.descripcion);
    expect(storedPlato.precio).toBe(plato.precio);
    expect(storedPlato.categoria).toBe(plato.categoria);
  });

  it('findDishFromRestaurant should throw an exception for an invalid dish', async () => {
    await expect(()=> service.findDishFromRestaurant(restaurante.id, "0")).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada");
  });

  it('findDishFromRestaurant should throw an exception for an invalid restaurant', async () => {
    const plato: PlatoEntity = platosList[0];
    await expect(()=> service.findDishFromRestaurant("0", plato.id)).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada");
  });

  it('findDishFromRestaurant should throw an exception for an plato not associated to the restaurante', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    await expect(()=> service.findDishFromRestaurant(restaurante.id, newPlato.id)).rejects.toHaveProperty("message", "El plato con el id dado no está asociado con el restaurante"); 
  });

  it('findDishesFromRestaurant should return dishes by restaurant', async ()=>{
    const platos: PlatoEntity[] = await service.findDishesFromRestaurant(restaurante.id);
    expect(platos.length).toBe(5)
  });

  it('findDishesFromRestaurant should throw an exception for an invalid restaurant', async () => {
    await expect(()=> service.findDishesFromRestaurant("0")).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada");
  });

  it('updateDishesFromRestaurant should update dishes list for a restaurant', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    const updatedRestaurante: RestauranteEntity = await service.updateDishesFromRestaurant(restaurante.id, [newPlato]);
    expect(updatedRestaurante.platos.length).toBe(1);

    expect(updatedRestaurante.platos[0].nombre).toBe(newPlato.nombre);
    expect(updatedRestaurante.platos[0].descripcion).toBe(newPlato.descripcion);
    expect(updatedRestaurante.platos[0].precio).toBe(newPlato.precio);
    expect(updatedRestaurante.platos[0].categoria).toBe(newPlato.categoria);
  });

  it('updateDishesFromRestaurant should throw an exception for an invalid restaurante', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    await expect(()=> service.updateDishesFromRestaurant("0", [newPlato])).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada");
  });

  it('updateDishesFromRestaurant should throw an exception for an invalid dish', async () => {
    const newPlato: PlatoEntity = platosList[0];
    newPlato.id = "0";

    await expect(()=> service.updateDishesFromRestaurant(restaurante.id, [newPlato])).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada");
  });

  it('deleteDishFromRestaurant should remove an dish from a restaurant', async () => {
    const plato: PlatoEntity = platosList[0];

    await service.deleteDishFromRestaurant(restaurante.id, plato.id);

    const storedRestaurante: RestauranteEntity | null = await restauranteRepository.findOne({where: {id: restaurante.id}, relations: ["platos"]});
    const deletedPlato: PlatoEntity | undefined = storedRestaurante?.platos.find(a => a.id === plato.id);

    expect(deletedPlato).toBeUndefined();

  });

  it('deleteDishFromRestaurant should thrown an exception for an invalid dish', async () => {
    await expect(()=> service.deleteDishFromRestaurant(restaurante.id, "0")).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada");
  });

  it('deleteDishFromRestaurant should thrown an exception for an invalid restaurant', async () => {
    const plato: PlatoEntity = platosList[0];
    await expect(()=> service.deleteDishFromRestaurant("0", plato.id)).rejects.toHaveProperty("message", "No se encontró el restaurante con la identificación proporcionada");
  });

  it('deleteDishFromRestaurant should thrown an exception for an non asocciated dish', async () => {
    const newPlato: PlatoEntity = await platoRepository.save({
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
    });

    await expect(()=> service.deleteDishFromRestaurant(restaurante.id, newPlato.id)).rejects.toHaveProperty("message", "El plato con el id dado no está asociado con el restaurante");
  });
});
