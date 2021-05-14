import { AppError } from "@shared/errors/AppErrors";

import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category test",
      description: "Category description teste",
    };
    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a category with a name that already exists", async () => {
    const category = {
      name: "Category test 2asdas",
      description: "Category description teste 1",
    };
    await createCategoryUseCase.execute(category);
    return expect(
      createCategoryUseCase.execute(category)
    ).rejects.toBeInstanceOf(AppError);
  });
});
