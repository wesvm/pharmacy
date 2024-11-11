import { Router } from "express";
import supplierController from "../controllers/supplier.js";

const router = Router();

router.get("/", supplierController.getAll);
router.post("/", supplierController.create);
router.get("/:id", supplierController.getById);
router.put("/:id", supplierController.update);
router.delete("/:id", supplierController.delete);

export default router;
