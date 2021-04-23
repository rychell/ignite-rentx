import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppErrors";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const { sub: user_id } = verify(token, "abcde") as IPayload;
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }
    request.user = {
      id: user.id,
    };
    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
