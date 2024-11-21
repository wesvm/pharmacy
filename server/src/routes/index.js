import { Router } from "express";
import auth from "../middlewares/auth.js";
import roles from "../middlewares/role.js";
import authController from "../controllers/auth.js";
import roleRoutes from "./role.js";
import userRoutes from "./user.js";
import categoryRoutes from "./category.js";
import supplierRoutes from "./supplier.js";
import productRoutes from "./product.js";
import saleRoutes from "./sale.js";
import deliveryRoutes from "./delivery.js";

const router = Router();

router.post("/auth", authController.login);
router.use("/roles", auth, roles("administrador"), roleRoutes);
router.use("/users", auth, roles("administrador"), userRoutes);
router.use("/categories", auth, categoryRoutes);
router.use("/suppliers", auth, supplierRoutes);
router.use("/products", auth, productRoutes);
router.use("/sales", auth, saleRoutes);
router.use("/deliveries", auth, deliveryRoutes);

export default router;
