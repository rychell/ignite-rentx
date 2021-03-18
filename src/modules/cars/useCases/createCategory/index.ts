import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const createCategoryUseCate = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCate
);

export { createCategoryController };
