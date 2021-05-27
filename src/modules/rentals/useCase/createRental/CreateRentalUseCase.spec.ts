import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
describe("Create rental useCase", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });
  it("Should be able to create a new rental", async () => {
    const rental = {
      user_id: "123",
      car_id: "123",
      expected_return_date: new Date("2022-06-03T00:00:00"),
    };
    const result = await createRentalUseCase.execute(rental);

    expect(result).toHaveProperty("id");
  });
  it("Should not be able to create a new rental if user has another rental in progress", async () => {
    await expect(async () => {
      const rental = {
        user_id: "123",
        car_id: "123",
        start_date: new Date(),
        expected_return_date: new Date(),
      };
      await createRentalUseCase.execute(rental);
      const result = await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
