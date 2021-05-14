import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppErrors";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new AppError("Category Already Exists");
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
