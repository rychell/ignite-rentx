import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const ceateRentalController = new CreateRentalController();

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, ceateRentalController.handle);

export { rentalsRoutes };
