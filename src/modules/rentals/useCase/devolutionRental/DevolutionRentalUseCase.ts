import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppErrors";
import { inject, injectable } from "tsyringe";
import {dayDiff} from './../../../../utils/date'
interface IRequest{
    rental_id: string
    user_id: string
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({rental_id, user_id}:IRequest){
        const rental = await this.rentalsRepository.findById(rental_id)
        const car = await this.carsRepository.findById(rental.car_id)
        if(!rental){
            throw new AppError("Rental does not exists")
        }
        
        const expectedRentalTimeInDays = dayDiff(rental.expected_return_date, rental.start_date)
        const rentalTimeInDays = dayDiff(new Date(), rental.start_date);
        
        let delay = rentalTimeInDays - expectedRentalTimeInDays
        delay = delay > 0 ? delay : 0

        let total = 0
        total = expectedRentalTimeInDays * car.daily_rate
        total += delay * car.fine_amount

        rental.total = total
        rental.end_date = new Date()

        await this.rentalsRepository.create(rental)
        await this.carsRepository.setAvailability({
            id: user_id,
            availability: true
        })

        return rental
    }
}

export {DevolutionRentalUseCase}