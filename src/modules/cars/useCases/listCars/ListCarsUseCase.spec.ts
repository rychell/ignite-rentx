import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { generateRandomNumber, generateRandomString } from "@utils/generators";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carRepositoryInMemory: CarsRepositoryInMemory;
describe("List cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const randomCar = () => ({
      name: generateRandomString(),
      brand: generateRandomString(),
      category_id: generateRandomString(),
      description: generateRandomString(),
      daily_rate: generateRandomNumber(),
      fine_amount: generateRandomNumber(),
      license_plate: generateRandomString(),
    });

    const car1 = await carRepositoryInMemory.create(randomCar());
    const car2 = await carRepositoryInMemory.create(randomCar());
    await carRepositoryInMemory.setAvailability({
      id: car2.id,
      availability: false,
    });
    const result = await listCarsUseCase.execute();

    expect(result).toEqual([car1]);
  });
  it("should be able to list all available cars by name", async () => {
    const randomCar = () => ({
      name: generateRandomString(),
      brand: generateRandomString(),
      category_id: generateRandomString(),
      description: generateRandomString(),
      daily_rate: generateRandomNumber(),
      fine_amount: generateRandomNumber(),
      license_plate: generateRandomString(),
    });

    const car1 = await carRepositoryInMemory.create(randomCar());
    const car2 = await carRepositoryInMemory.create(randomCar());
    const car3 = await carRepositoryInMemory.create(randomCar());
    const car4 = await carRepositoryInMemory.create(randomCar());
    const car5 = await carRepositoryInMemory.create(randomCar());

    const car6 = await carRepositoryInMemory.create({
      ...car1,
      license_plate: generateRandomString(),
    });

    car6.setAvailability(false);

    const result = await listCarsUseCase.execute({ name: car1.name });

    expect(result).toEqual([car1]);
  });
  it("should be able to list all available cars by brand", async () => {
    const randomCar = () => ({
      name: generateRandomString(),
      brand: generateRandomString(),
      category_id: generateRandomString(),
      description: generateRandomString(),
      daily_rate: generateRandomNumber(),
      fine_amount: generateRandomNumber(),
      license_plate: generateRandomString(),
    });

    const car1 = await carRepositoryInMemory.create(randomCar());
    const car2 = await carRepositoryInMemory.create(randomCar());
    const car3 = await carRepositoryInMemory.create(randomCar());
    const car4 = await carRepositoryInMemory.create(randomCar());
    const car5 = await carRepositoryInMemory.create(randomCar());

    const car6 = await carRepositoryInMemory.create({
      ...car1,
      license_plate: generateRandomString(),
    });

    car6.setAvailability(false);

    const result = await listCarsUseCase.execute({ brand: car1.brand });

    expect(result).toEqual([car1]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const randomCar = () => ({
      name: generateRandomString(),
      brand: generateRandomString(),
      category_id: generateRandomString(),
      description: generateRandomString(),
      daily_rate: generateRandomNumber(),
      fine_amount: generateRandomNumber(),
      license_plate: generateRandomString(),
    });

    const car1 = await carRepositoryInMemory.create(randomCar());
    const car2 = await carRepositoryInMemory.create(randomCar());
    const car3 = await carRepositoryInMemory.create(randomCar());
    const car4 = await carRepositoryInMemory.create(randomCar());
    const car5 = await carRepositoryInMemory.create(randomCar());

    const car6 = await carRepositoryInMemory.create({
      ...car1,
      license_plate: generateRandomString(),
    });

    car6.setAvailability(false);

    const result = await listCarsUseCase.execute({
      category_id: car1.category_id,
    });

    expect(result).toEqual([car1]);
  });
});
