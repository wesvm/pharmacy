import { Router } from "express";
import purchaseController from "../controllers/purchase.js";
import validation from "../middlewares/validation.js";
import { createPurchaseSchema } from "../schemas/purchase.js";

const router = Router();

router.get("/", purchaseController.getAll);
router.get("/:id", purchaseController.getById);
router.post("/", validation(createPurchaseSchema), purchaseController.create);

export default router;
