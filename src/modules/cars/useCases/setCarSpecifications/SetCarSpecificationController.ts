import { Request, Response } from "express";
import { container } from "tsyringe";

import { SetCarSpecificationUseCase } from "./SetCarSpecificationUseCase";

class SetCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const setCarSpecificationUseCase = container.resolve(
      SetCarSpecificationUseCase
    );
    const car = await setCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });
    return response.json(car);
  }
}
export { SetCarSpecificationController };
