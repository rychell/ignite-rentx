import { Request, Response } from "express";

import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createCategoryUseCase.execute({ name, description });
    return response.status(201).json(true);
  }
}

export { CreateCategoryController };
