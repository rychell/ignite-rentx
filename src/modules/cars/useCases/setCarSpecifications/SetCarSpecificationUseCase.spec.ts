import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { generateRandomNumber, generateRandomString } from "@utils/generators";

import { SetCarSpecificationUseCase } from "./SetCarSpecificationUseCase";

let carsRepository: CarsRepositoryInMemory;
let setCarSpecificationUseCase: SetCarSpecificationUseCase;
describe("Set car specifications", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    setCarSpecificationUseCase = new SetCarSpecificationUseCase(carsRepository);
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
    const specifications = [generateRandomString(), generateRandomString()];

    const result = await setCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: specifications,
    });

    expect(result).toBe(true);
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
