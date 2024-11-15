import { Router } from "express";
import categoryController from "../controllers/category.js";
import validation from "../middlewares/validation.js";
import { createCategorySchema, updateCategorySchema } from "../schemas/category.js";

const router = Router();

router.get("/", categoryController.getAll);
router.post("/", validation(createCategorySchema), categoryController.create);
router.get("/:id", validation(updateCategorySchema), categoryController.getById);
router.put("/:id", validation(updateCategorySchema), categoryController.update);
router.delete("/:id", validation(updateCategorySchema), categoryController.delete);

export default router;
