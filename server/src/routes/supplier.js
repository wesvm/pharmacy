import { Router } from "express";
import supplierController from "../controllers/supplier.js";
import validation from "../middlewares/validation.js";
import { createSupplierSchema, updateSupplierSchema } from "../schemas/supplier.js";

const router = Router();

router.get("/", supplierController.getAll);
router.post("/", validation(createSupplierSchema), supplierController.create);
router.get("/:id", validation(updateSupplierSchema), supplierController.getById);
router.put("/:id", validation(updateSupplierSchema), supplierController.update);
router.delete("/:id", validation(updateSupplierSchema), supplierController.delete);

export default router;
