import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController{
    async handle(request: Request, response: Response): Promise<Rental>{
        const {id: user_id} = request.user
        const {id: rental_id} = request.params

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
        
        const devolution = await devolutionRentalUseCase.execute({
            rental_id,
            user_id
        })

        return response.json(devolution)
    }
}
// Falta ainda criar a rota e ajeitar o useCase. Acredito que o melhor seja escrever os teste de integração para já validar todas as regras de negócio

export {DevolutionRentalController}