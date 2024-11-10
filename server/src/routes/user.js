import { Router } from "express";
import userController from "../controllers/user.js";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
