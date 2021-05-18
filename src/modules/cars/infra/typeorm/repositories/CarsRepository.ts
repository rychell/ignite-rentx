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
  async findAllAvailable(data?: {
    name?: string;
    brand?: string;
    category_id?: string;
  }): Promise<Car[]> {
    const name = data?.name;
    const brand = data?.brand;
    const category_id = data?.category_id;

    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.where("cars.brand = :brand", { brand });
    }
    if (name) {
      carsQuery.where("cars.name = :name", { name });
    }
    if (category_id) {
      carsQuery.where("cars.category_id = :category_id", { category_id });
    }

    return carsQuery.getMany();
  }
  async create({
    name,
    description,
    fine_amount,
    license_plate,
    brand,
    category_id,
    daily_rate,
    specifications,
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
      specifications,
    });
    return this.repository.save(car);
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }
  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ id });
  }
}

export { CarsRepository };
