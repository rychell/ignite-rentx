import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
  async findById(id: string | string[]): Promise<Specification[]> {
    let searchIdsArray: string[] = [];
    if (!Array.isArray(id)) {
      searchIdsArray = [id];
    } else {
      searchIdsArray = id;
    }
    return this.repository.findByIds(searchIdsArray);
  }
}

export { SpecificationsRepository };
