import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
  async create({
    name,
    driver_license,
    email,
    password,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      email,
      password,
      id,
      avatar,
    });
    await this.repository.save(user);
  }
}
export { UsersRepository };
