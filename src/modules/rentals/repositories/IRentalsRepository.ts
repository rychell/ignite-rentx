import { ICreateRentalDTO } from "../dtos/ICreateHandleDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
}

export { IRentalsRepository };
