import { ICategoriesRepository } from "../modules/cars/repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}
  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoryRepository.findByName(name);
    if (categoryAlreadyExists) {
      throw new Error("Category Already Exists");
    }
    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryService };