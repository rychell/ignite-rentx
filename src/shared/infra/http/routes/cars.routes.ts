import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { SetCarSpecificationController } from "@modules/cars/useCases/setCarSpecifications/SetCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdmin";

const carsRoutes = Router();

const uploadImage = multer(uploadConfig.upload("./tmp/avatar"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const setCarSpecificationController = new SetCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

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
carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureUserIsAdmin,
  uploadImage.array("images"),
  uploadCarImageController.handle
);
carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes };
