import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  setAvailability(data: { id: string; availability: boolean }): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  async findAllAvailable(): Promise<Car[]> {
    return this.repository.find({ available: true });
  }
  async create({
    name,
    description,
    fine_amount,
    license_plate,
    brand,
    category_id,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      fine_amount,
      license_plate,
      brand,
      category_id,
      daily_rate,
    });
    return this.repository.save(car);
  }
  findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }
}

export { CarsRepository };
