import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.get("/", (request, response) => {
  return response.status(201).json(true);
});

app.listen(3333, () => console.log("Server has started"));
