import { Specification } from "../model/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationRepository };
