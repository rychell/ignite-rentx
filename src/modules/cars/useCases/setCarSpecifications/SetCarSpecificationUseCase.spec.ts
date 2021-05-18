import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { generateRandomNumber, generateRandomString } from "@utils/generators";

import { SetCarSpecificationUseCase } from "./SetCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
let setCarSpecificationUseCase: SetCarSpecificationUseCase;
describe("Set car specifications", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    setCarSpecificationUseCase = new SetCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("Should be able to set a specifications to a car", async () => {
    const car = await carsRepository.create({
      name: generateRandomString(),
      brand: generateRandomString(),
      category_id: generateRandomString(),
      daily_rate: generateRandomNumber(),
      description: generateRandomString(),
      fine_amount: generateRandomNumber(),
      license_plate: generateRandomString(),
    });
    const specification1 = await specificationsRepository.create({
      name: generateRandomString(),
      description: generateRandomString(),
    });
    const specification2 = await specificationsRepository.create({
      name: generateRandomString(),
      description: generateRandomString(),
    });

    const specifications_ids = [specification1.id, specification2.id];
    const result1 = await setCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: specifications_ids,
    });
    expect(result1.specifications).toEqual([specification1, specification2]);

    const result2 = await setCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: specification1.id,
    });
    expect(result2.specifications).toEqual([specification1]);
  });
  it("Should not be able to set a specifications to a inexistent car", async () => {
    const car_id = "123";
    const specifications = [generateRandomString(), generateRandomString()];

    await expect(
      setCarSpecificationUseCase.execute({
        car_id,
        specifications_id: specifications,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
