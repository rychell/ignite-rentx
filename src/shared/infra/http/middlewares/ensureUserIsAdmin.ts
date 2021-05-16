import { NextFunction, Request, response, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppErrors";

export async function ensureUserIsAdmin(
  request: Request,
  reponse: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't an admin");
  }
  return next();
}
