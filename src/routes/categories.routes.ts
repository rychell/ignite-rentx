import { Router } from "express";

import { CategoryRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });
  return response.status(201).json(true);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();

  return response.status(201).json(categories);
});

export { categoriesRoutes };