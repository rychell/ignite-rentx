import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { SetCarSpecificationController } from "@modules/cars/useCases/setCarSpecifications/SetCarSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const setCarSpecificationController = new SetCarSpecificationController();
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureUserIsAdmin,
  createCarController.handle
);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureUserIsAdmin,
  setCarSpecificationController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
