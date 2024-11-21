import { Router } from "express";
import deliveryController from "../controllers/delivey.js";
import validation from "../middlewares/validation.js";
import { updateDeliverySchema } from "../schemas/delivery.js";

const router = Router();

router.get("/", deliveryController.getAll);
router.get("/:id", deliveryController.getById);
router.put("/:id", validation(updateDeliverySchema), deliveryController.update);

export default router;
