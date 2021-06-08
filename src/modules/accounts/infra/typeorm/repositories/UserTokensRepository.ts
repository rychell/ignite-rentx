import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dto/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });
    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokenRepository };
