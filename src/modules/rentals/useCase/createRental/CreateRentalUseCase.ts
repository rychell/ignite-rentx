import { inject, injectable } from "tsyringe";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateHandleDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { hourDiff } from "@utils/date";

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
    start_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumRentTimeInHours = 24;
    const isCarUnAvailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (isCarUnAvailable) {
      throw new AppError("Car is unavailable");
    }

    const userHasRentalOpened = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (userHasRentalOpened) {
      throw new AppError("User has a rental in progress");
    }

    const today = new Date();

    const IsLessThanMinimum =
      minimumRentTimeInHours > hourDiff(expected_return_date, today);

    if (IsLessThanMinimum) {
      throw new AppError(`Minimum time is ${minimumRentTimeInHours} hours`);
    }
    return this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });
  }
}

export { CreateRentalUseCase };
