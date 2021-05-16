import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute(data?: {
    name?: string;
    brand?: string;
    category_id?: string;
  }): Promise<Car[]> {
    return this.carsRepository.findAllAvailable(data);
  }
}

export { ListCarsUseCase };
