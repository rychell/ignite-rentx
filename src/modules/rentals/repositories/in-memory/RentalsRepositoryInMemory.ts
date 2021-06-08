import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateHandleDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  findById(id: string): Promise<Rental> {
    throw new Error("Method not implemented.");
  }
  findByUser(id: string): Promise<Rental[]> {
    throw new Error("Method not implemented.");
  }
  private rentals: Rental[] = [];
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
      created_at: new Date(),
      update_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
}

export { RentalsRepositoryInMemory };
