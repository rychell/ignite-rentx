import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

export { rentalsRoutes };
