import { ICreateUserTokenDTO } from "@modules/accounts/dto/ICreateUserTokenDTO";

import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokenRepository {
  create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
}

export { IUsersTokenRepository };
