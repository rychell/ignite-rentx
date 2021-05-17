import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
