import { Specification } from "../../entities/Specification";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  create({ name, description }: ICreateCategoryDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });
  }
  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (spec) => spec.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };
