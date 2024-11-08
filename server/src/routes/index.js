import { Router } from "express";
import authController from "../controllers/auth.js";

const router = Router();

router.post("/api/auth", authController.login);

export default router;
