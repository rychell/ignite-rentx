import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUser = new ListRentalsByUserController()
const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/user", ensureAuthenticated, listRentalsByUser.handle);

export { rentalsRoutes };
