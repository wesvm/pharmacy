import { Router } from "express";
import auth from "../middlewares/auth.js";
import roles from "../middlewares/role.js";
import authController from "../controllers/auth.js";
import roleRoutes from "./role.js";
import userRoutes from "./user.js";
import categoryRoutes from "./category.js"
const router = Router();

router.post("/auth", authController.login);
router.use("/roles", auth, roles("admin"), roleRoutes);
router.use("/users", auth, roles("admin"), userRoutes);
router.use("/categories",auth,categoryRoutes);

export default router;
