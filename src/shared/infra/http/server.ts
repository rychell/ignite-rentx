import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../typeorm";
import "../../container";

import { AppError } from "@shared/errors/AppErrors";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);
app.get("/", (request, response) => {
  console.log("Listening");
  
  return response.status(201).json(true);
});

app.listen(3333, () => console.log("Server has started"));
