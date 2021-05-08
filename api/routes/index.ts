import express from "express";
import userRoutes from "./users";
import itemRoutes from "./items";
import orderRoutes from "./orders";
const router = express.Router();

router.use("/user", userRoutes);
router.use("/items", itemRoutes);
router.use("/orders", orderRoutes);

export default router;
