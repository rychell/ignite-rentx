import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppErrors";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class SetCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    console.log(
      "🚀 ~ file: setCarSpecificationUseCase.ts ~ line 13 ~ SetCarSpecificationUseCase ~ execute ~ car_id",
      car_id
    );
    const car = await this.carsRepository.findById(car_id);
    console.log(
      "🚀 ~ file: setCarSpecificationUseCase.ts ~ line 18 ~ SetCarSpecificationUseCase ~ execute ~ car",
      car
    );
    if (!car) {
      throw new AppError("Car does not exists");
    }
    return car;
  }
}

export { SetCarSpecificationUseCase };
