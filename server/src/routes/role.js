import { Router } from "express";
import roleController from "../controllers/role.js";
import validation from "../middlewares/validation.js";
import { createRoleSchema, updateRoleSchema } from "../schemas/role.js";

const router = Router();

router.get("/", roleController.getAll);
router.post("/", validation(createRoleSchema), roleController.create);
router.put("/:id", validation(updateRoleSchema), roleController.update);
router.delete("/:id", validation(updateRoleSchema), roleController.delete);

export default router;
