import { Router } from "express";
import userController from "../controllers/user.js";
import validation from "../middlewares/validation.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.js";

const router = Router();

router.get("/", userController.getAll);
router.post("/", validation(createUserSchema), userController.create);
router.get("/:id", validation(updateUserSchema), userController.getById);
router.put("/:id", validation(updateUserSchema), userController.update);
router.delete("/:id", validation(updateUserSchema), userController.delete);

export default router;
