import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  car_id: string;
  specifications_id: string | string[];
}
@injectable()
class SetCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car does not exists");
    }

    const specifications = await this.specificationsRepository.findById(
      specifications_id
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}

export { SetCarSpecificationUseCase };
