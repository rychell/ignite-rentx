import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ISpecificationRepository,
  ISpecificationRepositoryDTO,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ISpecificationRepositoryDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async findById(id: string | string[]): Promise<Specification[]> {
    let searchIdArray: string[] = [];
    if (!Array.isArray(id)) {
      searchIdArray = [id];
    } else {
      searchIdArray = id;
    }

    return this.specifications.filter((spec) =>
      searchIdArray.includes(spec.id)
    );
  }
}

export { SpecificationsRepositoryInMemory };
