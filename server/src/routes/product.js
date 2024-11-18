import { Router } from "express";
import productController from "../controllers/product.js";
import validation from "../middlewares/validation.js";
import {
  createProductSchema,
  searchProductSchema,
  updateProductSchema,
} from "../schemas/product.js";

const router = Router();

router.get("/sale", productController.getAllToSale);
router.get("/", validation(searchProductSchema), productController.getAll);
router.post("/", validation(createProductSchema), productController.create);
router.get("/:id", validation(updateProductSchema), productController.getById);
router.put("/:id", validation(updateProductSchema), productController.update);
router.delete("/:id", validation(updateProductSchema), productController.delete);

export default router;
