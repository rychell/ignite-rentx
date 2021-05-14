import { AppError } from "@shared/errors/AppErrors";

import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUserCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authentica User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUserCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "aaaaa",
      email: "usaer@maeil.com",
      name: "joao",
      password: "asldkajsldkjas",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });
  it("shoul not be able to authenticate with a non existent user", async () => {
    return expect(
      authenticateUserUseCase.execute({
        email: "user.email",
        password: "user.password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shoul not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driver_license: "aaaaa",
      email: "usaer@maeil.com",
      name: "joao",
      password: "asldkajsldkjas",
    };
    await createUserUseCase.execute(user);
    return expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "asdasdasdas",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
