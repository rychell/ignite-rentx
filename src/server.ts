import express from "express";

import { router } from "./routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();

app.use(express.json());

app.use(router);

app.get("/", (request, response) => {
  return response.status(201).json(true);
});

app.listen(3333, () => console.log("Server has started"));
