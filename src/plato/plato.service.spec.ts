import { Test, TestingModule } from '@nestjs/testing';
import { PlatoService } from './plato.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { Categoria, PlatoEntity } from './plato.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

/**
 * Pruebas unitarias para el servicio PlatoService.
 */
describe('PlatoService', () => {
  let service: PlatoService;
  let repository: Repository<PlatoEntity>;
  let platosList: PlatoEntity[];

  const categorias = Object.values(Categoria);

  const seedDatabase = async () => {
    repository.clear();
    platosList = [];
    for (let i = 0; i < 5; i++) {
      const plato: PlatoEntity = await repository.save({
          nombre: faker.lorem.words(3),
          descripcion: faker.lorem.paragraph(),
          precio: faker.number.int({ min: 5, max: 50}),
          categoria: faker.helpers.arrayElement(categorias),
      });
      platosList.push(plato);
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PlatoService],
    }).compile();

    service = module.get<PlatoService>(PlatoService);
    repository = module.get<Repository<PlatoEntity>>(getRepositoryToken(PlatoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all dishes', async () => {
    const platos: PlatoEntity[] = await service.findAll();
    expect(platos).not.toBeNull();
    expect(platos).toHaveLength(platosList.length);
  });

  it('findOne should return a dish by id', async () => {
    const storedResturante: PlatoEntity = platosList[0];
    const plato: PlatoEntity = await service.findOne(storedResturante.id);
    expect(plato).not.toBeNull();
    expect(plato.nombre).toEqual(storedResturante.nombre)
    expect(plato.descripcion).toEqual(storedResturante.descripcion)
    expect(plato.precio).toEqual(storedResturante.precio)
    expect(plato.categoria).toEqual(storedResturante.categoria)
  });

  it('findOne should throw an exception for an invalid dishes', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada")
  });

  it('create should return a new dish', async () => {
    const plato: PlatoEntity = {
      id: "",
      nombre: faker.lorem.words(3),
      descripcion: faker.lorem.paragraph(),
      precio: faker.number.int({ min: 5, max: 50}),
      categoria: faker.helpers.arrayElement(categorias),
      restaurantes: [],
    }

    const newRestaurante: PlatoEntity = await service.create(plato);
    expect(newRestaurante).not.toBeNull();

    const storedRestaurante: PlatoEntity | null = await repository.findOne({where: {id: newRestaurante.id}})
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante?.nombre).toEqual(newRestaurante.nombre)
    expect(storedRestaurante?.descripcion).toEqual(newRestaurante.descripcion)
    expect(storedRestaurante?.precio).toEqual(newRestaurante.precio)
    expect(storedRestaurante?.categoria).toEqual(newRestaurante.categoria)
  });

  it('update should modify a dish', async () => {
    const plato: PlatoEntity = platosList[0];
    plato.nombre = "Nuevo nombre";
    plato.descripcion = "Nueva descripción";
    const updatedRestaurante: PlatoEntity = await service.update(plato.id, plato);
    expect(updatedRestaurante).not.toBeNull();
    const storedRestaurante: PlatoEntity | null = await repository.findOne({ where: { id: plato.id } })
    expect(storedRestaurante).not.toBeNull();
    expect(storedRestaurante?.nombre).toEqual(plato.nombre)
    expect(storedRestaurante?.descripcion).toEqual(plato.descripcion)
    expect(storedRestaurante?.precio).toEqual(plato.precio)
    expect(storedRestaurante?.categoria).toEqual(plato.categoria)
  });

  it('update should throw an exception for an invalid dish', async () => {
    let plato: PlatoEntity = platosList[0];
    plato = {
      ...plato, nombre: "Nuevo nombre", descripcion: "Nueva descripción"
    }
    await expect(() => service.update("0", plato)).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada")
  });

  it('delete should remove a dish', async () => {
    const plato: PlatoEntity = platosList[0];
    await service.delete(plato.id);
    const deletedPlato: PlatoEntity | null = await repository.findOne({ where: { id: plato.id } })
    expect(deletedPlato).toBeNull();
  });

  it('delete should throw an exception for an invalid dish', async () => {
    const plato: PlatoEntity = platosList[0];
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "No se encontró el plato con la identificación proporcionada")
  });
});
