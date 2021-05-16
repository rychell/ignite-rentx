import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "a",
      description: "a",
      daily_rate: 1,
      license_plate: "a",
      fine_amount: 2,
      brand: "a",
      category_id: "a",
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to create a car with a license plate that is already registered to another car", async () => {
    await createCarUseCase.execute({
      name: "a",
      description: "a",
      daily_rate: 1,
      license_plate: "a",
      fine_amount: 2,
      brand: "a",
      category_id: "a",
    });
    await expect(
      createCarUseCase.execute({
        name: "a",
        description: "a",
        daily_rate: 1,
        license_plate: "a",
        fine_amount: 2,
        brand: "a",
        category_id: "a",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Should register a new car with availability true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "a",
      description: "a",
      daily_rate: 1,
      license_plate: "a",
      fine_amount: 2,
      brand: "a",
      category_id: "a",
    });
    expect(car.available).toBe(true);
  });
});
