import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppErrors";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}
@injectable()
class AuthenticateUserUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expire_time,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expire_time_refresh_token,
    });

    const today = new Date();
    const expire_time_refresh_token = new Date(
      today.setDate(today.getDay() + 30)
    );

    await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date: expire_time_refresh_token,
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}
export { AuthenticateUserUserCase };
