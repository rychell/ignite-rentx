import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationRepositoryDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({
    name,
    description,
  }: ISpecificationRepositoryDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findById(id: string | string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ISpecificationRepositoryDTO };
