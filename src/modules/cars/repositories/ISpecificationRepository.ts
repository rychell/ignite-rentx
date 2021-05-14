import { Specification } from "../infra/typeorm/entities/Specification";
import { ICreateCategoryDTO } from "./ICategoriesRepository";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationRepository };
