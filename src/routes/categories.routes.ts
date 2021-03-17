import { response, Router } from "express";

import { CategoryRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const categoryAlreadyExists = categoryRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category Already Exists" });
  }
  categoryRepository.create({ name, description });
  return response.status(201).json(true);
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();

  return response.status(201).json(categories);
});

export { categoriesRoutes };
