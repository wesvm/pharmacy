import { Router } from "express";
import saleController from "../controllers/sale.js";
import validation from "../middlewares/validation.js";
import { createSaleSchema } from "../schemas/sale.js";

const router = Router();

router.get("/", saleController.getAll);
router.post("/", validation(createSaleSchema), saleController.create);

export default router;
