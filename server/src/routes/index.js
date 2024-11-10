import { Router } from "express";
import authController from "../controllers/auth.js";
import roleRoutes from "./role.js";
import auth from "../middlewares/auth.js";
import roles from "../middlewares/role.js";

const router = Router();

router.post("/auth", authController.login);
router.use("/roles", auth, roles("admin"), roleRoutes);

export default router;
