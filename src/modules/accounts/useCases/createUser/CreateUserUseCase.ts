import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    username,
    password,
    driver_license,
    email,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      password,
      driver_license,
      email,
    });
  }
}

export { CreateUserUseCase };
