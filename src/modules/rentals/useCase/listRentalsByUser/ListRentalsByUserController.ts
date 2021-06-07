import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController{
    async handle(request: Request, response: Response): Promise<Response>{
        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

        const user_id = request.user.id
        const rentals = await listRentalsByUserUseCase.execute(user_id)
        return response.json(rentals)
    }
}

export {ListRentalsByUserController}