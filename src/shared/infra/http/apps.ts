import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../../container";

import { AppError } from "@shared/errors/AppErrors";

import swaggerFile from "../../../swagger.json";
import { createDBConnection } from "../typeorm";
import { router } from "./routes";

async function startApp() {
  const connection = await createDBConnection();
  const migrations = await connection.runMigrations();
  console.log("🚀 apps.ts ~ line 19 ~ startApp ~ migrations", migrations);

  const app = express();

  app.use(express.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(router);

  app.use(
    (
      error: AppError | Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          message: error.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${error.message}`,
      });
    }
  );
  app.get("/", (request, response) => {
    return response.status(201).json(true);
  });

  return app;
}
export { startApp };
