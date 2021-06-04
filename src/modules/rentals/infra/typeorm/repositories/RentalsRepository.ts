import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateHandleDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    
    await this.repository.save(rental);
    
    return rental;
  }
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({ user_id, end_date: null });
  }
  findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({ car_id, end_date: null });
  }
  findById(id: string): Promise<Rental> {
    throw this.repository.findOne({id})
  }
}

export { RentalsRepository };
