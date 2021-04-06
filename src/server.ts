import "reflect-metadata";

import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";

import "./database";
import "./shared/container";

import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.get("/", (request, response) => {
  return response.status(201).json(true);
});

app.listen(3333, () => console.log("Server has started"));
