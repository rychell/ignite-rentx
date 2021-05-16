import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureUserIsAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
