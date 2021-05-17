import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    description,
    name,
    daily_rate,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      description,
      name,
      daily_rate,
      fine_amount,
      license_plate,
    });
    this.cars.push(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async findAllAvailable(data?: {
    name?: string;
    brand?: string;
    category_id?: string;
  }): Promise<Car[]> {
    const name = data?.name;
    const brand = data?.brand;
    const category_id = data?.category_id;

    if (name || brand || category_id) {
      return this.cars
        .filter((car) => car.available)
        .filter((car) => {
          if (
            (name && car.name === name) ||
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id)
          ) {
            return true;
          }
          return false;
        });
    }
    return this.cars.filter((car) => car.available);
  }
  async setAvailability({
    id,
    availability,
  }: {
    id: string;
    availability: boolean;
  }): Promise<Car> {
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        car.setAvailability(availability);
      }
      return car;
    });

    return this.cars.find((car) => car.id === id);
  }
  async findById(id: string) {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
